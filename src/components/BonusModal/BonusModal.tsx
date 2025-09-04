import { ALL_RELATIONS } from "../../constants";

type Props = {
  readonly pair: {
    mainName: string;
    partnerName: string;
    relation: string;
  };
  readonly onAnswer: (answer: string) => void;
};

function capitalize(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function BonusModal({ pair, onAnswer }: Props) {
  // Generar 3 opciones incorrectas + la correcta
  const incorrects = ALL_RELATIONS.filter((r) => r !== pair.relation);
  const randomIncorrects = incorrects
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);
  const options = [...randomIncorrects, pair.relation].sort(
    () => Math.random() - 0.5
  );

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/60 z-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-[360px] mx-4 text-center">
        <h3 className="text-2xl font-bold mb-4 text-green-600">
          🎉 ¡Acertaste todas las uniones!
        </h3>
        <p className="mb-6 text-gray-700">
          Ahora podés <b>multiplicar tus puntos x2</b> si respondés la pregunta
          bonus: <br />
          ¿Cuál es la relación entre <b>{pair.mainName}</b> y{" "}
          <b>{pair.partnerName}</b>?
        </p>
        <div className="flex flex-col gap-3">
          {options.map((rel) => (
            <button
              key={rel}
              onClick={() => onAnswer(rel)}
              className="py-2 px-4 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
            >
              {capitalize(rel)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BonusModal;
