import { useEffect, useState } from "react";
import pairs from "../../data/pairs.json";
import BonusModal from "../BonusModal/BonusModal";

import { getNewRound, getColor } from "../../utils/matchUtils";
import type { Pair } from "../../types";
import { COLORS } from "../../constants";

type Props = {
  onAnswer: (res: {
    correct: boolean;
    message: React.ReactNode;
    autoClose?: boolean;
  }) => void;
};

function MatchCharactersGame({ onAnswer }: Props) {
  const [roundPairs, setRoundPairs] = useState<Pair[]>([]);
  const [partners, setPartners] = useState<string[]>([]);
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [colorMap, setColorMap] = useState<Record<string, string>>({});
  const [corrections, setCorrections] = useState<Record<string, boolean>>({});
  const [selectedMain, setSelectedMain] = useState<string | null>(null);
  const [selectedPartner, setSelectedPartner] = useState<string | null>(null);

  const [completed, setCompleted] = useState(false);
  const [showBonus, setShowBonus] = useState(false);
  const [bonusPair, setBonusPair] = useState<Pair | null>(null);

  const loadNewRound = () => {
    const newRound = getNewRound(pairs);
    setRoundPairs(newRound);
    setPartners(
      newRound.map((p) => p.partnerName).sort(() => Math.random() - 0.5)
    );
    setMatches({});
    setColorMap({});
    setCorrections({});
    setSelectedMain(null);
    setSelectedPartner(null);
    setCompleted(false);
    setShowBonus(false);
    setBonusPair(null);
  };

  useEffect(() => {
    loadNewRound();
  }, []);

  const handleSelect = (main?: string, partner?: string) => {
    if (main && (selectedMain === main || matches[main])) {
      // deseleccionar main
      const partnerToRemove = matches[main];
      setMatches((prev) => {
        const copy = { ...prev };
        delete copy[main];
        return copy;
      });
      setColorMap((prev) => {
        const copy = { ...prev };
        delete copy[main];
        if (partnerToRemove) delete copy[partnerToRemove];
        return copy;
      });
      setSelectedMain(null);
      return;
    }

    if (
      partner &&
      (selectedPartner === partner || Object.values(matches).includes(partner))
    ) {
      // deseleccionar partner
      const mainToRemove = Object.keys(matches).find(
        (m) => matches[m] === partner
      );
      setMatches((prev) => {
        const copy = { ...prev };
        if (mainToRemove) delete copy[mainToRemove];
        return copy;
      });
      setColorMap((prev) => {
        const copy = { ...prev };
        delete copy[partner];
        if (mainToRemove) delete copy[mainToRemove];
        return copy;
      });
      setSelectedPartner(null);
      return;
    }

    if (main) {
      setSelectedMain(main);
      setColorMap((prev) => ({ ...prev, [main]: "bg-blue-400 text-white" }));
    }
    if (partner && selectedMain) {
      const nextColor =
        COLORS[Object.keys(matches).length % COLORS.length] || "bg-gray-300";
      setMatches((prev) => ({ ...prev, [selectedMain]: partner }));
      setColorMap((prev) => ({
        ...prev,
        [selectedMain]: nextColor,
        [partner]: nextColor,
      }));
      setSelectedMain(null);
      setSelectedPartner(null);

      if (Object.keys(matches).length + 1 === roundPairs.length) {
        setCompleted(true);
      }
    } else if (partner) {
      setSelectedPartner(partner);
      setColorMap((prev) => ({ ...prev, [partner]: "bg-blue-400 text-white" }));
    }
  };

  const handleCheckAnswers = () => {
    const newCorrections: Record<string, boolean> = {};
    const mistakes: string[] = [];
    let allCorrect = true;

    roundPairs.forEach((p) => {
      if (matches[p.mainName] === p.partnerName) {
        newCorrections[p.mainName] = true;
      } else {
        newCorrections[p.mainName] = false;
        mistakes.push(`${p.mainName} → ${p.partnerName}`);
        allCorrect = false;
      }
    });

    setCorrections(newCorrections);

    if (!allCorrect) {
      onAnswer({
        correct: false,
        autoClose: false,
        message: (
          <div>
            <p className="font-semibold mb-2">Algunas uniones estaban mal:</p>
            <ul className="list-disc list-inside text-left space-y-1">
              {mistakes.map((m, i) => (
                <li key={i} className="text-gray-800">
                  ✅ {m}
                </li>
              ))}
            </ul>
          </div>
        ),
      });
      setCompleted(false);
    } else {
      const randomPair =
        roundPairs[Math.floor(Math.random() * roundPairs.length)];
      setBonusPair(randomPair);
      setShowBonus(true);
    }
  };

  const handleBonusAnswer = (answer: string) => {
    if (bonusPair && answer === bonusPair.relation) {
      onAnswer({
        correct: true,
        autoClose: false,
        message: "🎉 ¡Correcto! Ganaste puntos bonus",
      });
    } else {
      onAnswer({
        correct: false,
        autoClose: false,
        message: `❌ Ups... la relación correcta era "${bonusPair?.relation}"`,
      });
    }

    setShowBonus(false);
    loadNewRound();
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-4">
      <div className="grid grid-cols-2 gap-8 w-full max-w-md">
        {/* Columna izquierda */}
        <div className="flex flex-col gap-4">
          {roundPairs.map((pair) => (
            <button
              key={pair.mainName}
              type="button"
              onClick={() => handleSelect(pair.mainName, undefined)}
              className={`py-3 px-4 rounded-xl shadow-md font-semibold transition text-center whitespace-nowrap truncate max-w-[140px] ${getColor(
                pair.mainName,
                corrections,
                colorMap
              )}`}
            >
              {pair.mainName}
            </button>
          ))}
        </div>

        {/* Columna derecha */}
        <div className="flex flex-col gap-4">
          {partners.map((partner) => (
            <button
              key={partner}
              type="button"
              onClick={() => handleSelect(undefined, partner)}
              className={`py-3 px-4 rounded-xl shadow-md font-semibold transition text-center whitespace-nowrap truncate max-w-[140px] ${getColor(
                partner,
                corrections,
                colorMap
              )}`}
            >
              {partner}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 h-12 flex items-center justify-center">
        {completed && !showBonus && (
          <button
            onClick={handleCheckAnswers}
            className="bg-primary text-white font-bold py-2 px-6 rounded-xl shadow-md hover:bg-blue-600"
          >
            Verificar
          </button>
        )}
      </div>

      {showBonus && bonusPair && (
        <BonusModal pair={bonusPair} onAnswer={handleBonusAnswer} />
      )}
    </div>
  );
}

export default MatchCharactersGame;
