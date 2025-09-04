import type { Pair } from "../types";

export function getNewRound(pairs: Pair[]): Pair[] {
  const shuffled = [...pairs].sort(() => Math.random() - 0.5);
  const unique: Pair[] = [];
  const usedPartners = new Set<string>();

  for (const p of shuffled) {
    if (!usedPartners.has(p.partnerName)) {
      unique.push(p);
      usedPartners.add(p.partnerName);
    }
    if (unique.length === 4) break;
  }
  return unique;
}

// Calcular color de un botón
export function getColor(
  name: string,
  corrections: Record<string, boolean>,
  colorMap: Record<string, string>
) {
  if (corrections[name] === true) return "bg-green-500 text-white";
  if (corrections[name] === false) return "bg-red-500 text-white";
  return colorMap[name] || "bg-white text-gray-800";
}
