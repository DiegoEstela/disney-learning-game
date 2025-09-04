import { useRandomDisneyCharacter } from "../../hooks/useRandomDisneyCharacter";

type Props = {
  readonly message: string;
};

function DisneyPopup({ message }: Props) {
  const { data: character, isLoading, isError } = useRandomDisneyCharacter();

  return (
    <div className="fixed inset-0 flex justify-center items-end mb-10 z-50 pointer-events-none">
      <div className="flex items-center bg-white shadow-2xl rounded-2xl p-4 max-w-md animate-bounce pointer-events-auto">
        {/* Loading */}
        {isLoading && (
          <div className="w-16 h-16 mr-3 rounded-full bg-gray-200 animate-pulse" />
        )}

        {/* Error */}
        {isError && (
          <div className="w-16 h-16 mr-3 rounded-full bg-red-200 flex items-center justify-center text-red-600 font-bold">
            !
          </div>
        )}

        {/* Personaje */}
        {character && (
          <img
            src={character.imageUrl}
            alt={character.name}
            className="w-16 h-16 rounded-full border-2 border-primary mr-3 object-cover"
          />
        )}

        {/* Mensaje estilo burbuja */}
        <div className="bg-primary text-white rounded-2xl px-4 py-2 relative">
          <p className="font-semibold">{message}</p>
          {character && (
            <span className="block text-xs opacity-80 mt-1">
              – {character.name}
            </span>
          )}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -ml-2 w-0 h-0 border-t-8 border-b-8 border-r-8 border-transparent border-r-primary"></div>
        </div>
      </div>
    </div>
  );
}

export default DisneyPopup;
