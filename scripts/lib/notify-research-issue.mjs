import { shouldCreateIssue } from "./research-report.mjs";

export function issueBody(markdown, date, previous = "", runUrl = "") {
  const marker = `<!-- digijuu-weekly-research:${date} -->`;
  const footer = `\n\n完全なレポートと詳細JSONはActionsのArtifactに保存しています。${runUrl ? `\n実行結果: ${runUrl}` : ""}`;
  const sections = markdown.split(/(?=^## )/m);
  const budget = Math.floor((59000 - Buffer.byteLength(marker + footer)) / sections.length);
  const checked = new Set(previous.split("\n").filter(line => /^- \[[xX]\] /.test(line)).map(line => line.replace(/^- \[[xX]\] /, "- [ ] ")));
  const chunks = sections.map(section => {
    if (Buffer.byteLength(section) <= budget) return section;
    const lines = [];
    let used = 0;
    for (const line of section.split("\n")) {
      const size = Buffer.byteLength(line + "\n");
      if (used + size > budget - 200) break;
      lines.push(line); used += size;
    }
    return lines.join("\n") + "\n\n一部を省略しました。完全版はArtifactをご確認ください。\n\n";
  });
  return `${marker}\n${chunks.join("")}${footer}`.split("\n").map(line => checked.has(line) ? line.replace("- [ ] ", "- [x] ") : line).join("\n");
}

export async function notifyResearchIssue({ github, context, core, summary, markdown }) {
  if (!shouldCreateIssue(summary, context.eventName)) { core.info("異常・未掲載候補ともに0件のためIssue作成を省略しました。"); return null; }
  const { owner, repo } = context.repo;
  const label = "automated-report";
  try { await github.rest.issues.getLabel({ owner, repo, name: label }); }
  catch (error) {
    if (error.status !== 404) throw error;
    try { await github.rest.issues.createLabel({ owner, repo, name: label, color: "1D76DB", description: "自治体データの定期巡回レポート" }); }
    catch (createError) { if (createError.status !== 422) throw createError; }
  }
  const marker = `<!-- digijuu-weekly-research:${summary.date} -->`;
  const issues = await github.paginate(github.rest.issues.listForRepo, { owner, repo, labels: label, state: "all", per_page: 100 });
  const existing = issues.find(issue => !issue.pull_request && issue.user?.type === "Bot" && issue.body?.startsWith(marker));
  const title = `【定期巡回レポート】デジタル住民票 URLチェック＆新規候補（${summary.date}）`;
  const runUrl = `${process.env.GITHUB_SERVER_URL || "https://github.com"}/${owner}/${repo}/actions/runs/${context.runId}`;
  const body = issueBody(markdown, summary.date, existing?.body, runUrl);
  const { data: issue } = existing
    ? await github.rest.issues.update({ owner, repo, issue_number: existing.number, title, body })
    : await github.rest.issues.create({ owner, repo, title, body, labels: [label] });
  core.info(`巡回レポートIssue: ${issue.html_url}`);
  core.setOutput("issue-url", issue.html_url);
  return issue;
}
