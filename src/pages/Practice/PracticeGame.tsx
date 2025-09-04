import { useMemo, useState } from "react";
import type { TrueFalseQuestion } from "../../types";
import questionsData from "../../data/trueFalseQuestions.json";
import TrueFalseGame from "../../components/Games/TrueFalseGame";
import MatchCharactersGame from "../../components/Games/MatchCharactersGame";
import DisneyPopup from "../../components/Popup/DisneyPopup";

function PracticeGames() {
  const [game, setGame] = useState<"trueFalse" | "match">("trueFalse");
  const [lastGame, setLastGame] = useState<"trueFalse" | "match" | null>(null);

  const [popupMessage, setPopupMessage] = useState<React.ReactNode | null>(
    null
  );
  const [feedback, setFeedback] = useState<null | "correct" | "wrong">(null);
  const [transitioning, setTransitioning] = useState(false);

  // preguntas random para TrueFalse
  const questions = useMemo(() => {
    const shuffled = [...(questionsData as TrueFalseQuestion[])].sort(
      () => Math.random() - 0.5
    );
    return shuffled.slice(0, 10);
  }, []);

  function nextGame() {
    const games = ["trueFalse", "match"] as const;
    const available = lastGame ? games.filter((g) => g !== lastGame) : games;
    const next = available[Math.floor(Math.random() * available.length)];

    setLastGame(next);

    // transición de salida → luego cambio de juego
    setTransitioning(true);
    setTimeout(() => {
      setGame(next);
      setTransitioning(false);
    }, 600); // duración de la animación
  }

  function handleTrueFalseAnswer({ correct }: { correct: boolean }) {
    setFeedback(correct ? "correct" : "wrong");

    // ⏳ animación feedback más larga
    setTimeout(() => {
      setFeedback(null);
      nextGame();
    }, 1800);
  }

  function handleMatchAnswer(res: {
    correct: boolean;
    message: React.ReactNode;
    autoClose?: boolean;
  }) {
    setPopupMessage(res.message);

    if (res.autoClose) {
      setTimeout(() => {
        setPopupMessage(null);
        nextGame();
      }, 1500);
    }
  }

  const title =
    game === "trueFalse" ? "Verdadero o Falso" : "Encuentra la Pareja";

  return (
    <div className="h-full flex flex-col items-center justify-start p-6 bg-gradient-to-b from-sky-100 via-blue-100 to-indigo-100 relative overflow-hidden">
      {/* Título dinámico */}
      <h1 className="text-lg md:text-xl font-extrabold text-center text-indigo-700 mb-6 whitespace-nowrap">
        {title}
      </h1>

      {/* Render dinámico con animación */}
      <div
        className={`w-full h-full flex items-center justify-center transition-all duration-500 ${
          transitioning
            ? "opacity-0 -translate-x-10"
            : "opacity-100 translate-x-0"
        }`}
      >
        {game === "trueFalse" && (
          <TrueFalseGame
            questions={questions}
            onAnswer={handleTrueFalseAnswer}
          />
        )}
        {game === "match" && (
          <MatchCharactersGame onAnswer={handleMatchAnswer} />
        )}
      </div>

      {/* Feedback animado SOLO para TrueFalse */}
      {feedback && (
        <div className="absolute inset-0 flex items-center justify-center z-50">
          <div
            className={`px-6 py-4 rounded-2xl text-2xl font-extrabold shadow-lg ${
              feedback === "correct"
                ? "bg-green-500 text-white animate-bounce"
                : "bg-red-500 text-white animate-pulse"
            }`}
          >
            {feedback === "correct" ? "¡Correcto! 🎉" : "¡Ups! ❌"}
          </div>
        </div>
      )}

      {/* Popup global SOLO para match */}
      {popupMessage && (
        <DisneyPopup
          message={popupMessage}
          onClose={() => {
            setPopupMessage(null);
            nextGame();
          }}
        />
      )}
    </div>
  );
}

export default PracticeGames;
