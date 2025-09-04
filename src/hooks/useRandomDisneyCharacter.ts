import { useQuery } from "@tanstack/react-query";
import { fetchDisneyCharacters } from "../services/disneyService";
import type { DisneyCharacter } from "../types";

export function useRandomDisneyCharacter() {
  return useQuery<DisneyCharacter, Error>({
    queryKey: ["randomDisneyCharacter"],
    queryFn: () =>
      fetchDisneyCharacters(1, 50, true) as Promise<DisneyCharacter>,
    refetchOnWindowFocus: false,
  });
}
