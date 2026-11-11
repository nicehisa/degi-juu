import type { Municipality } from "./municipalities";

export function isCurrentMunicipality(municipality: Municipality) {
  return municipality.status !== "終了";
}

export function partitionMunicipalities(municipalities: Municipality[]) {
  return {
    current: municipalities.filter(isCurrentMunicipality),
    archived: municipalities.filter(m => !isCurrentMunicipality(m)),
  };
}
