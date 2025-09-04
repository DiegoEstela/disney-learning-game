import { useQuery } from "@tanstack/react-query";
import { fetchDisneyCharacters } from "../services/disneyService";
import type { DisneyCharacter } from "../types";

export function useDisneyCharacters(page = 1, pageSize = 20) {
  return useQuery<DisneyCharacter[], Error>({
    queryKey: ["disneyCharacters", page, pageSize],
    queryFn: () =>
      fetchDisneyCharacters(page, pageSize, false) as Promise<
        DisneyCharacter[]
      >,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
}
