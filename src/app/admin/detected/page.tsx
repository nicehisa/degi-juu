import type { Metadata } from "next";
import Link from "next/link";
import LegalNoticeBox from "@/components/LegalNoticeBox";
import detectedMunicipalities from "@/data/detectedMunicipalities.json";

type DetectedMunicipality = {
  id: string;
  prefecture: string;
  municipality: string;
  programName: string;
  type: string;
  status: string;
  officialUrl: string;
  sourceTitle: string;
  sourceSnippet: string;
  detectedAt: string;
  confidence: "low" | "medium" | "high";
  riskFlags: string[];
  reviewStatus: string;
  reviewNotes: string;
  linkValid?: boolean;
  linkCheckedAt?: string;
  publishedSlug?: string;
};

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "自動検知候補｜デジじゅう",
  description: "デジじゅうの自動検知で見つかった未確認の自治体制度候補です。",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function DetectedMunicipalitiesPage() {
  let candidates = detectedMunicipalities as DetectedMunicipality[];
  let discovery: { completedAt?: string; result?: string; resultsCount?: number } = {};
  let publication: { completedAt?: string; added?: number; held?: number; publishedTotal?: number } = {};
  try {
    const [items, status, published] = await Promise.all([
      fetch("https://raw.githubusercontent.com/nicehisa/degi-juu/main/src/data/detectedMunicipalities.json", { cache: "no-store" }),
      fetch("https://raw.githubusercontent.com/nicehisa/degi-juu/main/public/data/discovery-status.json", { cache: "no-store" }),
      fetch("https://raw.githubusercontent.com/nicehisa/degi-juu/main/public/data/publication-status.json", { cache: "no-store" }),
    ]);
    if (items.ok) candidates = await items.json();
    if (status.ok) discovery = await status.json();
    if (published.ok) publication = await published.json();
  } catch { /* Keep the bundled candidates when GitHub is unavailable. */ }
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <nav className="mb-4 flex items-center gap-1.5 text-sm text-gray-500">
        <Link href="/" className="hover:text-blue-600">
          トップ
        </Link>
        <span>/</span>
        <span className="text-gray-700">自動検知候補</span>
      </nav>

      <div className="mb-6">
        <p className="text-sm font-semibold text-orange-700">管理者確認用</p>
        <h1 className="mt-1 text-2xl font-bold text-navy md:text-3xl">
          新しいデジタル住民制度の自動検知候補
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-gray-600">
          公式ページの実在と本文を検証し、新しい自治体の制度を自動掲載します。重複候補や検証を完了できない候補は、こちらで確認できます。
        </p>
      </div>

      <LegalNoticeBox
        className="mb-6"
        text="自動掲載は自治体公式の個別ページで制度名・自治体名を確認できたものが対象です。募集状況、費用、特典が未確定の場合は、公式ページでの確認を案内します。"
      />
      <div className="mb-6 border border-gray-200 bg-gray-50 p-4 text-sm">
        <p>検索最終実行: {discovery.completedAt || "未実施"}</p>
        <p>検索状況: {discovery.result === "ok" ? `成功（検索結果${discovery.resultsCount ?? 0}件）` : discovery.result === "failed" ? "失敗・実行ログを確認してください" : "未確認"}</p>
        <p>直近の自動掲載: {publication.added ?? 0}件 / 保留: {publication.held ?? 0}件 / 掲載総数: {publication.publishedTotal ?? "未確認"}</p>
        <a href="https://github.com/nicehisa/degi-juu/actions/workflows/detect-new-programs.yml" target="_blank" rel="noopener noreferrer" className="mt-2 block text-blue-700 underline">検索の実行ログを確認</a>
      </div>

      <section className="mb-6 rounded-xl border border-blue-100 bg-blue-50 p-5">
        <h2 className="text-base font-bold text-navy">掲載前チェック</h2>
        <div className="mt-3 grid gap-2 text-sm text-gray-700 md:grid-cols-2">
          <p>・自治体公式ページ、または制度運営主体の公式情報か</p>
          <p>・法律上の住民票や住民登録と誤認されないか</p>
          <p>・ふるさと納税や税控除の制度に見えないか</p>
          <p>・NFTの投資性、値上がり期待を煽っていないか</p>
          <p>・価格、販売状況、対象者、特典条件が確認できるか</p>
          <p>・公式ページへのリンクが制度個別ページになっているか</p>
        </div>
      </section>

      {candidates.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-white p-8 text-center">
          <p className="font-semibold text-gray-800">現在、新規候補はありません。</p>
          <p className="mt-2 text-sm text-gray-500">
            GitHub Actionsの日次実行、または `npm run detect:programs` で候補検知を実行できます。
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {candidates.map((candidate) => (
            <article
              key={candidate.id}
              className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="rounded-full bg-orange-100 px-2 py-1 font-semibold text-orange-800">
                      {candidate.reviewStatus}
                    </span>
                    <span className="rounded-full bg-gray-100 px-2 py-1 text-gray-700">
                      {candidate.type}
                    </span>
                    <span className="rounded-full bg-blue-50 px-2 py-1 text-blue-700">
                      信頼度: {candidate.confidence}
                    </span>
                  </div>
                  <h2 className="mt-3 text-lg font-bold text-navy">{candidate.programName}</h2>
                  <p className="mt-1 text-sm text-gray-600">
                    {candidate.prefecture} / {candidate.municipality} / 検知日:{" "}
                    {candidate.detectedAt}
                  </p>
                </div>
                {candidate.linkValid !== false ? <a
                  href={candidate.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-md bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
                >
                  公式ページを確認
                </a> : <span className="text-sm font-semibold text-red-700">リンク検証未完了・公開対象外</span>}
              </div>

              {candidate.publishedSlug && candidate.linkValid && <Link href={`/municipalities/${candidate.publishedSlug}`} className="mt-3 block text-sm text-blue-700 underline">デジじゅうの掲載ページを見る</Link>}
              {candidate.linkCheckedAt && <p className="mt-2 text-xs text-gray-500">リンク検証: {new Date(candidate.linkCheckedAt).toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" })}</p>}
              <p className="mt-4 text-sm leading-relaxed text-gray-700">
                {candidate.sourceSnippet || "説明文は取得できませんでした。リンク先で内容を確認してください。"}
              </p>

              {candidate.riskFlags.length > 0 && (
                <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900">
                  <span className="font-bold">要注意ワード:</span>{" "}
                  {candidate.riskFlags.join("、")}
                </div>
              )}

              <div className="mt-4 rounded-lg bg-gray-50 p-3 text-xs leading-relaxed text-gray-600">
                {candidate.reviewNotes}
              </div>

              <div className="mt-4 rounded-lg border border-gray-200 bg-gray-950 p-3 text-xs text-gray-100">
                <p className="mb-2 font-semibold text-gray-200">掲載用ドラフト生成</p>
                <code className="break-all">
                  npm run draft:program -- --id {candidate.id}
                </code>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
