import { fetchResearchPage, parseResearchHtml, normalizeText } from "./research-http.mjs";

export function findEndSignals(text) {
  const normalized = normalizeText(text);
  const pattern = /受付(?:を)?終了|販売(?:を)?終了|募集(?:を)?終了|終了しました/g;
  const signals = [];
  for (const match of normalized.matchAll(pattern)) {
    const after = normalized.slice(match.index + match[0].length, match.index + match[0].length + 18);
    if (/^(?:していません|しておりません|ではありません|が近い|が遅い|順)/.test(after)) continue;
    signals.push(normalized.slice(Math.max(0, match.index - 35), match.index + match[0].length + 45).trim());
  }
  return [...new Set(signals)].slice(0, 30);
}

export async function checkMunicipality(record, old, options = {}, fetcher = fetchResearchPage) {
  const previous = old?.sourceUrl === record.officialUrl ? old : undefined;
  const attemptedAt = new Date().toISOString();
  const base = { sourceUrl: record.officialUrl, municipality: record.municipality, registeredStatus: record.status, attemptedAt,
    lastSucceededAt: previous?.lastSucceededAt || null, baselineSignals: previous?.baselineSignals || null };
  try {
    const response = await fetcher(record.officialUrl, options);
    const result = { ...base, finalUrl: response.url, httpStatus: response.status, redirects: response.redirects, warnings: [], signals: [], newSignals: [], alert: false, analysis: "未解析" };
    if (response.status !== 200) { result.warnings.push(`HTTP ${response.status}`); result.alert = true; return result; }
    if (/html/i.test(response.contentType)) {
      const page = parseResearchHtml(response.text);
      result.title = page.title;
      if (page.missing || !page.text) { result.warnings.push("HTTP 200ですがエラーページ・空本文を検出"); result.alert = true; return result; }
      result.signals = findEndSignals(page.text);
      result.analysis = "HTML本文確認";
      result.initialBaseline = !Array.isArray(previous?.baselineSignals);
      result.newSignals = result.initialBaseline ? [] : result.signals.filter(signal => !previous.baselineSignals.includes(signal));
      result.baselineSignals = result.signals;
      if (record.status !== "終了" && result.signals.length) {
        result.warnings.push(`${result.initialBaseline ? "初回取得で終了表現あり" : result.newSignals.length ? "新しい終了表現あり" : "終了表現あり"}（掲載は${record.status}・要目視確認）`);
        result.alert = result.initialBaseline || result.newSignals.length > 0;
      }
    } else if (/pdf/i.test(response.contentType)) {
      result.analysis = "PDF本文未解析";
      result.warnings.push("PDF到達確認のみ。終了表現は手動確認が必要");
    } else { result.warnings.push(`本文解析できないContent-Type: ${response.contentType || "不明"}`); result.alert = true; }
    result.lastSucceededAt = attemptedAt;
    return result;
  } catch (error) {
    return { ...base, httpStatus: null, finalUrl: null, warnings: [`取得失敗: ${error.message}`], signals: [], newSignals: [], alert: true, analysis: "未解析" };
  }
}
