import { useQuery } from "@tanstack/react-query";
import type { DisneyCharacter } from "../types";

type DisneyApiResponse = {
  data: DisneyCharacter[];
  totalPages: number;
  count: number;
};

async function fetchDisneyMovies(query: string): Promise<string[]> {
  if (!query) return [];

  const res = await fetch(`https://api.disneyapi.dev/character?name=${query}`);
  if (!res.ok) throw new Error("Error al buscar en Disney API");

  const data: DisneyApiResponse = await res.json();

  // Extraemos películas únicas de los personajes encontrados
  const movies = new Set<string>();
  data.data.forEach((char) => {
    if (Array.isArray(char.films)) {
      char.films.forEach((film) => movies.add(film));
    }
  });

  return Array.from(movies);
}

export function useDisneySearch(query: string) {
  return useQuery<string[], Error>({
    queryKey: ["disneyMovies", query],
    queryFn: () => fetchDisneyMovies(query),
    enabled: !!query,
  });
}
