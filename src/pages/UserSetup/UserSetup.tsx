import { useForm } from "react-hook-form";
import { useState } from "react";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../services/firebase";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants";
import { useDebounce } from "../../hooks/useDebounce";
import { usePopup } from "../../hooks/usePopup";

import { useCharactersByName } from "../../hooks/useCharactersByMovie";
import type { DisneyCharacter } from "../../types";

type FormValues = {
  name: string;
};

function UserSetup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const [query, setQuery] = useState("");
  const [selectedCharacter, setSelectedCharacter] =
    useState<DisneyCharacter | null>(null);

  const debouncedQuery = useDebounce(query, 300);
  const {
    data: characters,
    isLoading,
    isError,
  } = useCharactersByName(debouncedQuery);

  const navigate = useNavigate();
  const { showPopup } = usePopup();

  const onSubmit = async (data: FormValues) => {
    const user = auth.currentUser;
    if (!user || !selectedCharacter) return;

    try {
      await setDoc(doc(db, "users", user.uid), {
        name: data.name,
        avatar: selectedCharacter.imageUrl,
        characterName: selectedCharacter.name,
        createdAt: serverTimestamp(),
      });

      showPopup("🎉 Usuario creado correctamente");
      navigate(ROUTES.HOME);
    } catch (error) {
      console.error("Error guardando perfil:", error);
      showPopup("❌ Error al crear usuario");
    }
  };

  return (
    <div className="h-full flex flex-col justify-center items-center p-6 bg-background">
      <h1 className="text-2xl font-bold text-primary mb-6">
        ✨ Crea tu perfil
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm space-y-4"
      >
        {/* Nombre */}
        <div>
          <input
            type="text"
            placeholder="Tu nombre"
            {...register("name", { required: "El nombre es obligatorio" })}
            className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-primary"
          />
          {errors.name && (
            <p className="text-red-600 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Buscar personaje */}
        <div>
          <input
            type="text"
            placeholder="Busca tu personaje favorito (ej: Mickey)"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedCharacter(null);
            }}
            className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-primary"
          />

          <div className="min-h-[200px] mt-3">
            {isLoading && <p>Cargando personajes...</p>}
            {isError && (
              <p className="text-red-600">Error al cargar personajes</p>
            )}

            {characters && characters.length > 0 && (
              <div className="grid grid-cols-3 gap-3 mt-2">
                {characters.slice(0, 6).map((char) => (
                  <button
                    type="button"
                    key={char._id}
                    onClick={() => setSelectedCharacter(char)}
                    className={`rounded-full border-4 ${
                      selectedCharacter?._id === char._id
                        ? "border-primary"
                        : "border-transparent"
                    }`}
                  >
                    <img
                      src={char.imageUrl}
                      alt={char.name}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                    <p className="text-xs mt-1">{char.name}</p>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Guardar */}
        <button
          type="submit"
          disabled={!selectedCharacter}
          className="w-full py-3 bg-primary text-white rounded-xl font-semibold hover:bg-blue-600 transition mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Guardar perfil
        </button>
      </form>
    </div>
  );
}

export default UserSetup;
