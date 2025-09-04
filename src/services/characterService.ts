import type { DisneyCharacter } from "../types";

type DisneyApiResponse = {
  data: DisneyCharacter[];
};

/**
 * Busca personajes de Disney por nombre.
 * Solo devuelve aquellos con `imageUrl`.
 */
export async function fetchCharactersByName(
  name: string
): Promise<DisneyCharacter[]> {
  if (!name) return [];

  const res = await fetch(
    `https://api.disneyapi.dev/character?name=${encodeURIComponent(name)}`
  );

  if (!res.ok) {
    throw new Error("Error buscando personajes en Disney API");
  }

  const data: DisneyApiResponse = await res.json();

  return data.data.filter(
    (char) => typeof char.imageUrl === "string" && char.imageUrl.trim() !== ""
  );
}
