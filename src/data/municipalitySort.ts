import { Municipality } from "./municipalities";

function typePriority(municipality: Municipality) {
  if (municipality.type === "デジタル住民票") return 0;
  if (municipality.type.includes("NFT") || municipality.programName.includes("NFT")) return 3;
  return 1;
}

export function sortByDisplayPriority(municipalities: Municipality[]) {
  return [...municipalities].sort((a, b) => {
    const priorityDiff = typePriority(a) - typePriority(b);
    if (priorityDiff !== 0) return priorityDiff;

    const updatedDiff = b.updatedAt.localeCompare(a.updatedAt);
    if (updatedDiff !== 0) return updatedDiff;

    return a.municipality.localeCompare(b.municipality, "ja");
  });
}
