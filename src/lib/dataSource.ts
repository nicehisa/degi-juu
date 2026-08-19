import {
  municipalities,
  type Municipality,
  type MunicipalityStatus,
  type MunicipalityType,
} from "@/data/municipalities";

export type DataSourceStatus = {
  activeSource: "static" | "google-sheets" | "supabase";
  configured: {
    googleSheets: boolean;
    supabase: boolean;
  };
};

export function getDataSourceStatus(): DataSourceStatus {
  const googleSheets = Boolean(process.env.GOOGLE_SHEETS_CSV_URL);
  const supabase = Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY);

  return {
    activeSource: supabase ? "supabase" : googleSheets ? "google-sheets" : "static",
    configured: {
      googleSheets,
      supabase,
    },
  };
}

export async function getMunicipalities(): Promise<Municipality[]> {
  const status = getDataSourceStatus();

  if (status.activeSource === "supabase") {
    const data = await fetchMunicipalitiesFromSupabase();
    if (data.length > 0) return data;
  }

  if (status.activeSource === "google-sheets") {
    const data = await fetchMunicipalitiesFromGoogleSheets();
    if (data.length > 0) return data;
  }

  return municipalities;
}

async function fetchMunicipalitiesFromSupabase(): Promise<Municipality[]> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;
  if (!url || !key) return [];

  const response = await fetch(`${url.replace(/\/$/, "")}/rest/v1/municipalities?select=*`, {
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
    },
    next: { revalidate: 3600 },
  });

  if (!response.ok) return [];
  return normalizeMunicipalities(await response.json());
}

async function fetchMunicipalitiesFromGoogleSheets(): Promise<Municipality[]> {
  const csvUrl = process.env.GOOGLE_SHEETS_CSV_URL;
  if (!csvUrl) return [];

  const response = await fetch(csvUrl, { next: { revalidate: 3600 } });
  if (!response.ok) return [];

  return normalizeMunicipalities(parseCsv(await response.text()));
}

function normalizeMunicipalities(rows: unknown): Municipality[] {
  if (!Array.isArray(rows)) return [];

  return rows
    .map((row) => normalizeMunicipality(row))
    .filter((row): row is Municipality => Boolean(row));
}

function normalizeMunicipality(row: unknown): Municipality | null {
  if (!row || typeof row !== "object") return null;
  const item = row as Partial<Municipality> & Record<string, unknown>;
  if (!item.id || !item.slug || !item.prefecture || !item.municipality || !item.programName) return null;

  return {
    id: String(item.id),
    slug: String(item.slug),
    region: String(item.region || ""),
    prefecture: String(item.prefecture),
    municipality: String(item.municipality),
    programName: String(item.programName),
    type: normalizeType(item.type),
    summary: String(item.summary || ""),
    price: String(item.price || "要確認"),
    priceNumber: typeof item.priceNumber === "number" ? item.priceNumber : undefined,
    status: normalizeStatus(item.status),
    target: String(item.target || ""),
    benefits: toStringArray(item.benefits),
    benefitCategories: toStringArray(item.benefitCategories),
    benefitConditions: String(item.benefitConditions || "公式ページをご確認ください。"),
    applicationMethod: String(item.applicationMethod || "公式ページよりご確認ください。"),
    officialUrl: String(item.officialUrl || ""),
    relatedUrl: typeof item.relatedUrl === "string" ? item.relatedUrl : undefined,
    imageUrl: typeof item.imageUrl === "string" ? item.imageUrl : undefined,
    lastChecked: String(item.lastChecked || ""),
    notes: String(item.notes || ""),
    isOfficialInfo: Boolean(item.isOfficialInfo),
    isFeatured: Boolean(item.isFeatured),
    createdAt: String(item.createdAt || ""),
    updatedAt: String(item.updatedAt || ""),
  };
}

function toStringArray(value: unknown): string[] {
  if (Array.isArray(value)) return value.map(String).filter(Boolean);
  if (typeof value === "string") return value.split(/[,\n]/).map((item) => item.trim()).filter(Boolean);
  return [];
}

function normalizeType(value: unknown): MunicipalityType {
  const types: MunicipalityType[] = [
    "デジタル住民票",
    "デジタル住民票NFT",
    "デジタル住民NFT",
    "デジタル住民証",
    "デジタル会員証",
    "アプリ型",
    "その他",
  ];
  return types.includes(value as MunicipalityType) ? (value as MunicipalityType) : "その他";
}

function normalizeStatus(value: unknown): MunicipalityStatus {
  const statuses: MunicipalityStatus[] = ["販売中", "受付中", "終了", "要確認"];
  return statuses.includes(value as MunicipalityStatus) ? (value as MunicipalityStatus) : "要確認";
}

function parseCsv(csv: string): Record<string, string>[] {
  const rows: string[][] = [];
  let current = "";
  let row: string[] = [];
  let inQuotes = false;

  for (let i = 0; i < csv.length; i += 1) {
    const char = csv[i];
    const next = csv[i + 1];

    if (char === '"' && next === '"') {
      current += '"';
      i += 1;
    } else if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      row.push(current);
      current = "";
    } else if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && next === "\n") i += 1;
      row.push(current);
      rows.push(row);
      row = [];
      current = "";
    } else {
      current += char;
    }
  }

  if (current || row.length > 0) {
    row.push(current);
    rows.push(row);
  }

  const [headers, ...body] = rows.filter((items) => items.some(Boolean));
  if (!headers) return [];

  return body.map((items) =>
    Object.fromEntries(headers.map((header, index) => [header.trim(), (items[index] || "").trim()]))
  );
}
