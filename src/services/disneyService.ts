import type { DisneyCharacter } from "../types";

type DisneyApiResponse = {
  data: DisneyCharacter[];
  totalPages: number;
  count: number;
};

/**
 * Obtiene personajes de Disney.
 * - Si `random = true`, devuelve 1 personaje aleatorio.
 * - Si `random = false`, devuelve una lista (paginada).
 */
export async function fetchDisneyCharacters(
  page = 1,
  pageSize = 20,
  random = false
): Promise<DisneyCharacter[] | DisneyCharacter> {
  const res = await fetch(
    `https://api.disneyapi.dev/character?page=${page}&pageSize=${pageSize}`
  );

  if (!res.ok) {
    throw new Error("Error al obtener personajes de Disney");
  }

  const data: DisneyApiResponse = await res.json();
  const characters = data.data.filter((char) => char.imageUrl);

  if (random) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    return characters[randomIndex];
  }

  return characters;
}
