import type { Municipality } from "@/data/municipalities";

export function getComparisonSelection(items: Municipality[], ids: string | string[] | undefined) {
  const requested = [...new Set((Array.isArray(ids) ? ids : [ids ?? ""])
    .flatMap(value => value.split(",")).map(value => value.trim()).filter(Boolean))];
  const bySlug = new Map(items.map(item => [item.slug, item]));
  const selected = requested.flatMap(slug => {
    const item = bySlug.get(slug);
    return item ? [item] : [];
  });
  const selectedSlugs = selected.map(item => item.slug);
  return {
    selected,
    selectedSlugs,
    hasUnknownIds: requested.some(slug => !bySlug.has(slug)),
    ordered: [...selected, ...items.filter(item => !selectedSlugs.includes(item.slug))],
  };
}
