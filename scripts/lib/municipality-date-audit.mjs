export function isDateOnly(value) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

export function auditInformationDates(records, today) {
  if (!isDateOnly(today)) throw new Error("Audit date must be YYYY-MM-DD");
  const errors = [];
  const warnings = [];
  const distribution = new Map();
  for (const record of records) {
    const id = record.id ?? record.slug ?? record.municipality;
    const fields = ["lastChecked", "verifiedAt", "checkedAt"].filter(key => key === "lastChecked" || Object.hasOwn(record, key));
    for (const field of fields) {
      const value = record[field];
      if (!isDateOnly(value)) errors.push(`${id}: ${field} が実在する YYYY-MM-DD ではありません (${String(value)})`);
      else if (value > today) errors.push(`${id}: ${field} が未来日です (${value})`);
      else if (isDateOnly(record.createdAt) && value < record.createdAt) warnings.push(`${id}: ${field} が掲載作成日より前です。掲載前の調査記録か確認してください (${value})`);
    }
    if (isDateOnly(record.lastChecked)) distribution.set(record.lastChecked, (distribution.get(record.lastChecked) ?? 0) + 1);
  }
  return { total: records.length, errors, warnings, distribution: [...distribution].sort(([a], [b]) => a.localeCompare(b)) };
}
