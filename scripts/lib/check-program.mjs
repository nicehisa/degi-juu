import { createHash } from "node:crypto";

export function japanDate(date = new Date()) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Tokyo" }).format(date);
}

export async function checkProgram(program, previous, fetcher = fetch) {
  const attemptedAt = new Date().toISOString();
  const base = { ...previous, sourceUrl: program.officialUrl, attemptedAt };
  try {
    const response = await fetcher(program.officialUrl, {
      signal: AbortSignal.timeout(25000),
      headers: { "User-Agent": "Degijuu-LinkCheck/1.0 (+https://degi-juu.vercel.app/contact)" },
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const type = response.headers.get("content-type") || "";
    const reader = response.body.getReader();
    const chunks = [];
    let size = 0;
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.length;
      if (size > 8 * 1024 * 1024) {
        await reader.cancel();
        throw new Error("Response exceeds 8 MB");
      }
      chunks.push(value);
    }
    const bytes = Buffer.concat(chunks);
    let content = bytes;
    if (type.includes("html")) {
      const html = new TextDecoder(/charset=shift[_-]?jis/i.test(type) ? "shift_jis" : "utf-8").decode(bytes);
      const text = html.replace(/<(script|style|nav|header|footer)\b[^>]*>[\s\S]*?<\/\1>/gi, " ")
        .replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
      if (/captcha|Just a moment|Access Denied|ページが見つかりません|お探しのページは/i.test(text)) {
        throw new Error("Blocked or missing page");
      }
      if (!/デジタル|住民|NFT|町民|村民/i.test(text)) throw new Error("Program content not found");
      content = text;
    } else if (!type.includes("pdf")) {
      throw new Error("Unsupported content type");
    }
    if (!content.length) throw new Error("Empty response");
    const fingerprint = createHash("sha256").update(content).digest("hex");
    const baseline = previous?.sourceUrl === program.officialUrl ? previous.baselineFingerprint : undefined;
    return { ...base, lastSucceededAt: attemptedAt, checkedDate: japanDate(),
      result: "ok", fingerprint, baselineFingerprint: baseline || fingerprint,
      changed: Boolean(baseline && baseline !== fingerprint), error: null };
  } catch (error) {
    // A failed attempt must never advance the last successful check date.
    return { ...base, result: "failed", error: error instanceof Error ? error.message : "Fetch failed" };
  }
}
