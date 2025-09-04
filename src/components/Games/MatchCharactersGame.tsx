import { useEffect, useState, type ReactNode } from "react";
import pairs from "../../data/pairs.json";
import DisneyPopup from "../../components/Popup/DisneyPopup";
import BonusModal from "../../components/BonusModal/BonusModal";

import { getNewRound, getColor } from "../../utils/matchUtils";
import type { Pair } from "../../types";
import { COLORS } from "../../constants";

function MatchCharactersGame() {
  const [roundPairs, setRoundPairs] = useState<Pair[]>([]);
  const [partners, setPartners] = useState<string[]>([]);
  const [selectedMain, setSelectedMain] = useState<string | null>(null);
  const [selectedPartner, setSelectedPartner] = useState<string | null>(null);
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [colorMap, setColorMap] = useState<Record<string, string>>({});
  const [corrections, setCorrections] = useState<Record<string, boolean>>({});
  const [completed, setCompleted] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState<string | ReactNode>("");

  // BONUS modal
  const [showBonus, setShowBonus] = useState(false);
  const [bonusPair, setBonusPair] = useState<Pair | null>(null);

  // Inicializar ronda
  const loadNewRound = () => {
    const newRound = getNewRound(pairs);
    setRoundPairs(newRound);
    setPartners(
      newRound.map((p) => p.partnerName).sort(() => Math.random() - 0.5)
    );
    setSelectedMain(null);
    setSelectedPartner(null);
    setMatches({});
    setColorMap({});
    setCorrections({});
    setCompleted(false);
    setShowPopup(false);
    setShowBonus(false);
    setBonusPair(null);
  };

  useEffect(() => {
    loadNewRound();
  }, []);

  // Selección de personajes
  const handleSelect = (main?: string, partner?: string) => {
    // Deselección main
    if (main && (selectedMain === main || matches[main])) {
      const partnerToRemove = matches[main];
      setMatches((prev) => {
        const newMatches = { ...prev };
        delete newMatches[main];
        return newMatches;
      });
      setColorMap((prev) => {
        const newColors = { ...prev };
        delete newColors[main];
        if (partnerToRemove) delete newColors[partnerToRemove];
        return newColors;
      });
      setSelectedMain(null);
      return;
    }

    // Deselección partner
    if (
      partner &&
      (selectedPartner === partner || Object.values(matches).includes(partner))
    ) {
      const mainToRemove = Object.keys(matches).find(
        (m) => matches[m] === partner
      );
      setMatches((prev) => {
        const newMatches = { ...prev };
        if (mainToRemove) delete newMatches[mainToRemove];
        return newMatches;
      });
      setColorMap((prev) => {
        const newColors = { ...prev };
        delete newColors[partner];
        if (mainToRemove) delete newColors[mainToRemove];
        return newColors;
      });
      setSelectedPartner(null);
      return;
    }

    // Selección normal
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

  // Verificar respuestas
  const handleCheckAnswers = () => {
    const newCorrections: Record<string, boolean> = {};
    const mistakes: string[] = [];

    roundPairs.forEach((p) => {
      if (matches[p.mainName] === p.partnerName) {
        newCorrections[p.mainName] = true;
      } else {
        newCorrections[p.mainName] = false;
        mistakes.push(`${p.mainName} → ${p.partnerName}`);
      }
    });

    setCorrections(newCorrections);

    if (mistakes.length > 0) {
      setPopupMessage(
        <div>
          <p className="font-semibold mb-2">
            Ups... estas eran las uniones correctas:
          </p>
          <ul className="list-disc list-inside text-left space-y-1">
            {mistakes.map((m, i) => (
              <li key={i} className="text-gray-800">
                ✅ {m}
              </li>
            ))}
          </ul>
        </div>
      );
      setShowPopup(true);
      setCompleted(false); // 👈 oculta botón
    } else {
      const randomPair =
        roundPairs[Math.floor(Math.random() * roundPairs.length)];
      setBonusPair(randomPair);
      setShowBonus(true);
      setCompleted(false); // 👈 oculta botón
    }
  };

  // Respuesta bonus
  const handleBonusAnswer = (answer: string) => {
    if (bonusPair && answer === bonusPair.relation) {
      setPopupMessage(
        "¡Correcto! Ganaste puntos bonus 🎉 Tus puntos se duplicaron ✨"
      );
    } else {
      setPopupMessage(
        `Ups... la relación correcta era "${bonusPair?.relation}"`
      );
    }

    setShowBonus(false);
    setShowPopup(true);

    setTimeout(() => {
      loadNewRound();
      setShowPopup(false);
    }, 2500);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-4">
      <h2 className="text-xl font-bold mb-6">Une a los personajes</h2>

      <div className="grid grid-cols-2 gap-8 w-full max-w-md">
        {/* Columna izquierda */}
        <div className="flex flex-col gap-4">
          {roundPairs.map((pair) => (
            <button
              key={pair.mainName}
              type="button"
              onClick={() => handleSelect(pair.mainName, undefined)}
              className={`py-3 px-4 rounded-xl shadow-md font-semibold transition ${getColor(
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
              className={`py-3 px-4 rounded-xl shadow-md font-semibold transition ${getColor(
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
        {completed && !showPopup && !showBonus && (
          <button
            onClick={handleCheckAnswers}
            className="bg-primary text-white font-bold py-2 px-6 rounded-xl shadow-md hover:bg-blue-600"
          >
            Verificar
          </button>
        )}
      </div>

      {/* Modal Bonus */}
      {showBonus && bonusPair && (
        <BonusModal pair={bonusPair} onAnswer={handleBonusAnswer} />
      )}

      {/* Popup final */}
      {showPopup && (
        <DisneyPopup
          message={popupMessage || ""}
          onClose={() => loadNewRound()}
        />
      )}
    </div>
  );
}

export default MatchCharactersGame;
