import test from "node:test";
import assert from "node:assert/strict";
import { collectResearch, createResearchReport, japanDate, municipalityHints, shouldCreateIssue } from "../lib/research-report.mjs";
import { issueBody, notifyResearchIssue } from "../lib/notify-research-issue.mjs";

const normal = { municipality: "テスト町", sourceUrl: "https://example.com/program", finalUrl: "https://example.com/program", registeredStatus: "受付中", httpStatus: 200, analysis: "HTML本文確認", warnings: [], signals: [] };
const report = checks => ({ total: checks.length, checks: Object.fromEntries(checks.map((check, index) => [index, check])) });
const discovery = (candidates = [], failures = []) => ({ candidates, report: { failures, firstSeenCandidates: 0 } });
const result = checks => createResearchReport({ checkReport: report(checks), discovery: discovery(), now: new Date("2026-11-11T16:00:00Z") });

test("all-clear report counts genuine HTML checks and skips scheduled issues, but not manual tests", () => {
  const { summary, markdown } = result([normal]);
  assert.equal(summary.date, "2026-11-12");
  assert.equal(japanDate(new Date("2026-11-11T14:59:00Z")), "2026-11-11");
  assert.equal(summary.normalCount, 1);
  assert.equal(summary.reviewCount, 0);
  assert.equal(summary.errorCount, 0);
  assert.equal(summary.shouldNotify, false);
  assert.equal(shouldCreateIssue(summary, "schedule"), false);
  assert.equal(shouldCreateIssue(summary, "workflow_dispatch"), true);
  for (const title of ["🚨 要確認", "✨ 新規候補", "✅ 正常確認済み件数"]) assert.ok(markdown.includes(title));
});

test("timeouts, HTTP errors, end signals and unparsed PDFs/JS are not counted as normal", () => {
  const checks = [normal,
    { ...normal, httpStatus: 404, warnings: ["HTTP 404"], analysis: "未解析" },
    { ...normal, httpStatus: null, warnings: ["取得失敗: timeout"], analysis: "未解析" },
    { ...normal, warnings: ["終了表現あり"], signals: ["募集を終了しました"] },
    { ...normal, warnings: ["本文未解析"], analysis: "PDF本文未解析" },
    { ...normal, warnings: ["本文未解析"], analysis: "JavaScript本文未解析" }];
  const { summary, markdown } = result(checks);
  assert.equal(summary.normalCount, 1);
  assert.equal(summary.reviewCount, 5);
  assert.equal(summary.errorCount, 2);
  assert.equal(summary.shouldNotify, true);
  assert.ok(markdown.includes("募集を終了しました"));
  assert.ok(markdown.includes("https://example.com/program"));
});

test("candidate count includes pending unpublished articles and distinguishes first-seen count", () => {
  const candidate = { title: "北海道 上士幌町とデジタル住民票", articleUrl: "https://example.com/news" };
  const found = discovery([candidate]);
  found.report.firstSeenCandidates = 1;
  const { summary, markdown } = createResearchReport({ checkReport: report([normal]), discovery: found });
  assert.equal(summary.newCandidateCount, 1);
  assert.equal(summary.firstSeenCandidateCount, 1);
  assert.equal(summary.shouldNotify, true);
  assert.ok(markdown.includes("自治体名候補: 上士幌町"));
});

test("municipality hints remain provisional and do not turn digital citizen education into a place", () => {
  assert.deepEqual(municipalityHints({ title: "長野県 飯綱町 ふるさと住民" }), ["飯綱町"]);
  assert.deepEqual(municipalityHints({ title: "新潟県長岡市山古志のデジタル村民" }), ["長岡市"]);
  assert.deepEqual(municipalityHints({ title: "【上小阿仁村】デジタル村民" }), ["上小阿仁村"]);
  assert.deepEqual(municipalityHints({ title: "デジタル市民教育と全国の市町村" }), []);
  assert.deepEqual(municipalityHints({ municipality: "確定町", title: "別町" }), ["確定町"]);
});

test("partial RSS failures and missing phases produce reviewable errors, not an all-clear", async () => {
  let discoveryRan = false;
  const collected = await collectResearch(async () => { throw new Error("bad baseline"); }, async () => { discoveryRan = true; return discovery([], [{ keyword: "住民票", error: "timeout" }]); });
  assert.equal(discoveryRan, true);
  const { summary, markdown } = createResearchReport(collected);
  assert.equal(summary.checksCompleted, false);
  assert.equal(summary.discoveryCompleted, false);
  assert.equal(summary.normalCount, 0);
  assert.equal(summary.errorCount, 2);
  assert.equal(shouldCreateIssue(summary, "schedule"), true);
  assert.ok(markdown.includes("正常とは判定できません"));
  assert.ok(markdown.includes("RSS取得失敗"));
  const failedDiscovery = await collectResearch(async () => report([normal]), async () => { throw new Error("bad candidates"); });
  assert.equal(createResearchReport(failedDiscovery).summary.normalCount, 1);
});

test("external Markdown, HTML, mentions and unsafe URLs cannot inject report content", () => {
  const title = '<script>@team</script>\n## fake [x](javascript:alert(1))';
  const { markdown } = createResearchReport({ discovery: discovery([{ title, articleUrl: "javascript:alert(1)", municipality: "@admin" }]) });
  assert.ok(!markdown.includes("<script>"));
  assert.ok(!markdown.includes("@team"));
  assert.ok(!markdown.includes("\n## fake"));
  assert.ok(!markdown.includes("](javascript:"));
  assert.ok(markdown.includes("URL不正"));
  const safe = createResearchReport({ discovery: discovery([{ title: "記事", articleUrl: "https://example.com/a(b)" }]) }).markdown;
  assert.ok(safe.includes("https://example.com/a%28b%29"));
});

test("large issue bodies retain all three headings, fit UTF-8 budget and preserve checked items", () => {
  const { markdown } = result([normal]);
  const huge = markdown.replace("## ✨", ("- [ ] 候補 " + "あ".repeat(300) + "\n").repeat(1000) + "## ✨");
  const limited = issueBody(huge, "2026-11-12");
  assert.ok(Buffer.byteLength(limited) < 60000);
  for (const title of ["🚨 要確認", "✨ 新規候補", "✅ 正常確認済み件数"]) assert.ok(limited.includes(title));
  assert.ok(limited.includes("省略"));
  const previous = "- [x] 同一項目\n- [x] 過去の項目";
  assert.ok(issueBody("- [ ] 同一項目\n- [ ] 新規項目", "2026-11-12", previous).includes("- [x] 同一項目\n- [ ] 新規項目"));
});

function mockGithub(existing = []) {
  const calls = [];
  const issues = {
    getLabel: async () => { const error = new Error("not found"); error.status = 404; throw error; },
    createLabel: async args => { calls.push(["label", args]); },
    listForRepo: () => {},
    create: async args => { calls.push(["create", args]); return { data: { html_url: "https://github.com/o/r/issues/1" } }; },
    update: async args => { calls.push(["update", args]); return { data: { html_url: "https://github.com/o/r/issues/1" } }; },
  };
  return { calls, github: { rest: { issues }, paginate: async () => existing } };
}
const context = { repo: { owner: "o", repo: "r" }, eventName: "schedule", runId: 123 };
const core = { info() {}, setOutput() {} };

test("notification skips scheduled all-clear without even creating a label", async () => {
  const mock = mockGithub();
  const { summary, markdown } = result([normal]);
  assert.equal(await notifyResearchIssue({ github: mock.github, context, core, summary, markdown }), null);
  assert.equal(mock.calls.length, 0);
});

test("manual all-clear creates a labeled dated issue", async () => {
  const mock = mockGithub();
  const { summary, markdown } = result([normal]);
  await notifyResearchIssue({ github: mock.github, context: { ...context, eventName: "workflow_dispatch" }, core, summary, markdown });
  assert.equal(mock.calls[0][0], "label");
  assert.equal(mock.calls[1][0], "create");
  assert.ok(mock.calls[1][1].title.includes("（2026-11-12）"));
  assert.deepEqual(mock.calls[1][1].labels, ["automated-report"]);
});

test("same-day bot issue is updated even if closed, but never reopened or replaced by a human issue", async () => {
  const { summary, markdown } = result([{ ...normal, warnings: ["終了表現あり"] }]);
  const body = "<!-- digijuu-weekly-research:2026-11-12 -->\n- [x] 保存する項目";
  const mock = mockGithub([{ number: 2, user: { type: "User" }, body }, { number: 3, state: "closed", user: { type: "Bot" }, body }]);
  await notifyResearchIssue({ github: mock.github, context, core, summary, markdown });
  assert.equal(mock.calls[1][0], "update");
  assert.equal(mock.calls[1][1].issue_number, 3);
  assert.equal(mock.calls[1][1].state, undefined);
});

test("GitHub API permission failures remain visible rather than silently suppressing alerts", async () => {
  const mock = mockGithub();
  mock.github.rest.issues.getLabel = async () => { const error = new Error("Forbidden"); error.status = 403; throw error; };
  const { summary, markdown } = result([{ ...normal, warnings: ["要確認"] }]);
  await assert.rejects(notifyResearchIssue({ github: mock.github, context, core, summary, markdown }), /Forbidden/);
});
