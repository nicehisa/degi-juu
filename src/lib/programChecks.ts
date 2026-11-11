import fallback from "../../public/data/program-checks.json";

export type ProgramCheck = {
  sourceUrl: string;
  attemptedAt: string;
  checkedDate?: string;
  result: "ok" | "failed";
  changed?: boolean;
  error?: string | null;
};
export type ProgramCheckReport = { completedAt: string | null; checks: Record<string, ProgramCheck> };
export async function getProgramChecks(fresh = false): Promise<ProgramCheckReport> {
  try {
    const response = await fetch("https://raw.githubusercontent.com/nicehisa/degi-juu/main/public/data/program-checks.json", {
      ...(fresh ? { cache: "no-store" as const } : { next: { revalidate: 3600, tags: ["program-checks"] } }),
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const report = await response.json();
    if (!report.checks || (report.completedAt !== null && Number.isNaN(Date.parse(report.completedAt)))) throw new Error("Invalid report");
    return report;
  } catch {
    return fallback as ProgramCheckReport;
  }
}
