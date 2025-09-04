import type { ReactNode } from "react";
import { useRandomDisneyCharacter } from "../../hooks/useRandomDisneyCharacter";

type Props = {
  readonly message: string | ReactNode;
  readonly onClose?: () => void;
};

function DisneyPopup({ message, onClose }: Props) {
  const { data: character, isLoading, isError } = useRandomDisneyCharacter();

  return (
    <div
      className="fixed inset-x-0 z-50 flex justify-center px-4"
      style={{ top: "110px" }}
    >
      <div className="relative w-full max-w-[360px] bg-gray-200 shadow-xl rounded-2xl p-4 flex gap-3 items-start">
        {/* Imagen del personaje */}
        {isLoading && (
          <div className="w-12 h-12 rounded-full bg-gray-300 animate-pulse" />
        )}
        {isError && (
          <div className="w-12 h-12 rounded-full bg-red-200 flex items-center justify-center text-red-600 font-bold">
            !
          </div>
        )}
        {character && (
          <img
            src={character.imageUrl}
            alt={character.name}
            className="w-12 h-12 rounded-full border-2 border-primary object-cover"
          />
        )}

        {/* Contenido del mensaje */}
        <div className="flex-1 pr-6">
          <p className="font-semibold text-gray-900">{message}</p>
          {character && (
            <span className="block text-xs text-gray-600 mt-1">
              – {character.name}
            </span>
          )}
        </div>

        {/* Botón cerrar */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-red-500 hover:text-red-700 text-xl font-bold"
            aria-label="Cerrar popup"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}

export default DisneyPopup;
