export function japanDate(date = new Date()) {
  return new Intl.DateTimeFormat("sv-SE", { timeZone: "Asia/Tokyo", year: "numeric", month: "2-digit", day: "2-digit" }).format(date);
}

export function markdownText(value) {
  return String(value ?? "").replace(/[\u0000-\u001f\u007f]/g, " ").replace(/\s+/g, " ").trim()
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/@/g, "&#64;")
    .replace(/[\\`*_{}\[\]()!|#~]/g, "\\$&");
}

function link(label, value) {
  try {
    const url = new URL(value);
    if (!/^https?:$/.test(url.protocol) || url.username || url.password) throw new Error("invalid URL");
    const target = url.href.replace(/[()<>\s\\]/g, character => `%${character.charCodeAt(0).toString(16).toUpperCase()}`).replace(/@/g, "%40");
    return `[${markdownText(label)}](${target})`;
  } catch { return `${markdownText(label)}（URL不正・要確認）`; }
}

// Titles are not authoritative municipality identities. Prefer explicit prefecture/name boundaries.
export function municipalityHints(candidate) {
  if (candidate.municipality) return [candidate.municipality];
  const text = `${candidate.title || ""} ${candidate.snippet || ""}`.normalize("NFKC");
  const names = new Set();
  const pattern = /(?:^|[\s【「『（(・、。]|(?:北海道|東京都|京都府|大阪府|[一-龯]{2,3}県)\s*)([一-龯々ヶケ]{1,10}?[市区町村])(?=$|[\s、。・」』】):：がはのとをにへで]|山古志)/gu;
  for (const match of text.matchAll(pattern)) {
    const name = match[1].replace(/^(?:北海道|東京都|京都府|大阪府|[一-龯]{2,3}県)/, "");
    if (name.length > 1 && !/^(?:本市|本町|本村|市区町村|市町村|自治体|全国|都市|地方|各市|各町|各村|農村)$/.test(name)) names.add(name);
  }
  return [...names].slice(0, 10);
}

export async function collectResearch(runChecks, runDiscovery) {
  let checkReport = null, discovery = null;
  const failures = [];
  try { checkReport = await runChecks(); }
  catch (error) { failures.push({ phase: "既存URLチェック", error: error.message }); }
  try { discovery = await runDiscovery(); }
  catch (error) { failures.push({ phase: "新規候補探索", error: error.message }); }
  return { checkReport, discovery, failures };
}

export function createResearchReport({ checkReport = null, discovery = null, failures = [], now = new Date() }) {
  const checks = Object.values(checkReport?.checks || {});
  const reviews = checks.filter(check => check.warnings.length > 0 || check.httpStatus !== 200 || check.analysis !== "HTML本文確認");
  const normalCount = checks.length - reviews.length;
  const candidates = discovery?.candidates || [];
  const searchFailures = discovery?.report.failures || [];
  const errorCount = checks.filter(check => check.httpStatus !== 200 || check.analysis === "未解析").length + searchFailures.length + failures.length;
  const summary = {
    version: 1, date: japanDate(now), completedAt: now.toISOString(),
    checkedCount: checks.length, normalCount, reviewCount: reviews.length, errorCount,
    newCandidateCount: candidates.length, firstSeenCandidateCount: discovery?.report.firstSeenCandidates || 0,
    searchFailureCount: searchFailures.length,
    checksCompleted: checkReport !== null, discoveryCompleted: discovery !== null && searchFailures.length === 0,
    failures, searchFailures,
  };
  summary.shouldNotify = summary.reviewCount > 0 || summary.newCandidateCount > 0 || summary.errorCount > 0;
  const lines = [
    `# デジタル住民票 URLチェック＆新規候補（${summary.date}）`, "",
    `実行完了: ${summary.completedAt} / 日付は日本時間`, "",
    "自動検知の結果です。リンク切れ・募集終了を断定するものではありません。公開データ・情報確認日は変更していません。", "",
    "## 🚨 要確認：リンク切れ・受付終了の可能性がある掲載制度", "",
    `掲載制度の要確認: ${reviews.length}件 / 調査エラー: ${errorCount}件（重複あり）`, "",
  ];
  for (const check of reviews) {
    lines.push(`- [ ] ${link(check.municipality, check.sourceUrl)} / HTTP ${check.httpStatus ?? "取得失敗"} / 掲載状況: ${markdownText(check.registeredStatus)} / ${markdownText(check.warnings.join(" / ") || check.analysis)}`);
    if (check.signals?.length) lines.push(`  - 検知例: ${markdownText(check.signals[0])}`);
    if (check.finalUrl && check.finalUrl !== check.sourceUrl) lines.push(`  - 遷移先: ${link("取得先URL", check.finalUrl)}`);
  }
  if (!reviews.length) lines.push(checkReport ? "掲載URLに要確認項目はありません。" : "既存URLチェックは完了していません。正常とは判定できません。");
  for (const failure of failures) lines.push(`- [ ] 処理失敗: ${markdownText(failure.phase)} / ${markdownText(failure.error)}`);
  for (const failure of searchFailures) lines.push(`- [ ] RSS取得失敗: ${markdownText(failure.keyword)} / ${markdownText(failure.error)}`);
  lines.push("", "PDF・JavaScript描画などの本文未確認も要確認に含みます。終了表現が別年度・別プランを指す場合があるため、公式ページを目視確認してください。", "",
    "## ✨ 新規候補：未掲載のデジタル住民票・自治体NFT関連記事", "",
    `未掲載候補記事: ${candidates.length}件（今回初検出: ${summary.firstSeenCandidateCount}件）`, "",
    "既存キューに残る未掲載候補も再掲します。件数は自治体数ではありません。自治体名候補は記事表記からの仮抽出であり、公式URL・自治体との同一性は要照合です。", "");
  for (const candidate of candidates) {
    const hints = municipalityHints(candidate);
    lines.push(`- [ ] ${link(candidate.title, candidate.articleUrl)} / 自治体名候補: ${markdownText(hints.join("・") || "抽出できず（要目視確認）")}${candidate.prefecture ? ` / ${markdownText(candidate.prefecture)}` : ""}`);
  }
  if (!candidates.length) lines.push(discovery && !searchFailures.length ? "未掲載候補はありません。" : "探索が未完了または一部失敗しています。候補なしとは断定できません。");
  lines.push("", "## ✅ 正常確認済み件数", "",
    `- 対象掲載制度: ${checkReport ? checkReport.total : "未取得"}件`,
    `- チェック実施: ${checks.length}件`,
    `- HTTP200・HTML本文解析済み・警告なし: **${normalCount}件**`,
    `- 要確認: ${reviews.length}件`,
    `- RSS取得失敗: ${searchFailures.length}検索`, "",
    "正常確認はURLと本文の機械チェックについてのみです。受付中・特典・費用の正確性や、制度への参加可否を保証しません。", "");
  return { summary, markdown: lines.join("\n") };
}

export function shouldCreateIssue(summary, eventName) {
  return eventName === "workflow_dispatch" || summary.reviewCount > 0 || summary.newCandidateCount > 0 || summary.errorCount > 0;
}
