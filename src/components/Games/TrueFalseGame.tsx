import type { TrueFalseQuestion } from "../../types";

type Props = {
  questions: TrueFalseQuestion[];
  onAnswer: (res: { correct: boolean }) => void;
};

function TrueFalseGame({ questions, onAnswer }: Props) {
  const current = questions[0]; // 👈 por ahora solo tomamos la primera para demo

  if (!questions.length) {
    return (
      <p className="text-center mt-10 text-gray-600">Cargando preguntas...</p>
    );
  }

  function handleAnswer(choice: boolean) {
    const correct = choice === current.answer;
    onAnswer({ correct });
  }

  return (
    <div className="h-full flex flex-col items-center justify-start p-6">
      {/* Tarjeta de la pregunta */}
      <div className="bg-white rounded-xl shadow-lg p-4 max-w-sm text-center">
        <p className="text-xs text-pink-600 font-semibold mb-2">
          🎬 De la película: <span className="italic">{current?.movie}</span>
        </p>
        <h2 className="text-lg md:text-xl font-bold text-gray-800 leading-relaxed">
          {current?.question}
        </h2>
      </div>

      {/* Botones */}
      <div className="flex space-x-6 mt-8">
        <button
          onClick={() => handleAnswer(true)}
          className="flex flex-col items-center justify-center w-20 h-20 bg-green-500 text-white rounded-full shadow-lg hover:scale-110 transition"
        >
          <span className="text-2xl">✔️</span>
          <span className="mt-1 text-sm font-bold">Verdadero</span>
        </button>
        <button
          onClick={() => handleAnswer(false)}
          className="flex flex-col items-center justify-center w-20 h-20 bg-red-500 text-white rounded-full shadow-lg hover:scale-110 transition"
        >
          <span className="text-2xl">❌</span>
          <span className="mt-1 text-sm font-bold">Falso</span>
        </button>
      </div>
    </div>
  );
}

export default TrueFalseGame;
