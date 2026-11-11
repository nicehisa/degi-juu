"use client";

import { useEffect, useState } from "react";
import type { ProgramCheckReport } from "@/lib/programChecks";

let pending: Promise<ProgramCheckReport> | undefined;
let expiresAt = 0;
export default function ProgramCheckDate({ id, officialUrl, informationDate }: { id: string; officialUrl: string; informationDate: string }) {
  const [report, setReport] = useState<ProgramCheckReport>();
  useEffect(() => {
    let active = true;
    if (Date.now() > expiresAt) pending = undefined;
    expiresAt = Date.now() + 60000;
    pending ??= fetch("/api/program-checks").then(r => {
      if (!r.ok) throw new Error("Check report unavailable");
      return r.json();
    }).catch(error => { pending = undefined; throw error; });
    pending.then(data => { if (active) setReport(data); }).catch(() => {});
    return () => { active = false; };
  }, []);
  const check = report?.checks[id];
  const matched = check?.sourceUrl === officialUrl ? check : undefined;
  const stale = matched?.checkedDate && Date.now() - Date.parse(`${matched.checkedDate}T00:00:00+09:00`) > 48 * 3600000;
  return (
    <span className="block text-xs leading-6 text-gray-600">
      <span className="block">情報確認日: {informationDate}</span>
      <span className="block">公式ページ自動調査日: {matched?.checkedDate || "未実施"}</span>
      {(matched?.result === "failed" || matched?.changed || stale) && (
        <span className="block font-medium text-amber-800">{matched?.result === "failed" ? "直近の自動取得に失敗しました" : matched?.changed ? "公式ページに変更あり・内容確認中" : "自動調査の更新が遅れています"}</span>
      )}
    </span>
  );
}
