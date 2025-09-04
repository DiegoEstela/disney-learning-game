import { useQuery } from "@tanstack/react-query";

import type { DisneyCharacter } from "../types";
import { fetchCharactersByName } from "../services/characterService";

export function useCharactersByName(query: string) {
  return useQuery<DisneyCharacter[]>({
    queryKey: ["charactersByName", query],
    queryFn: () => fetchCharactersByName(query),
    enabled: !!query && query.length > 1, // solo busca con 2+ letras
  });
}
