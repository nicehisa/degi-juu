import type { Municipality } from "@/data/municipalities";
import { partitionMunicipalities } from "@/data/municipalityVisibility";
import MunicipalityCard from "./MunicipalityCard";

type Props = {
  municipalities: Municipality[];
  archivedOnly?: boolean;
};

function Grid({ items }: { items: Municipality[] }) {
  return <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
    {items.map(m => <MunicipalityCard key={m.id} municipality={m} />)}
  </div>;
}

export default function MunicipalityResults({ municipalities, archivedOnly = false }: Props) {
  const { current, archived } = partitionMunicipalities(municipalities);
  if (archivedOnly) return <Grid items={archived} />;
  return <>
    {current.length > 0 ? <Grid items={current} /> : <p role="status" className="my-5 border-l-4 border-blue-500 bg-blue-50 px-4 py-4 text-sm leading-relaxed text-gray-700">
      {archived.length > 0
        ? `現在受付中の掲載制度はありませんが、同じ条件で過去に実施された制度が${archived.length}件あります。`
        : "現在、この条件で受付終了を除く掲載制度はありません。"}
    </p>}
    {archived.length > 0 && <details open={current.length === 0} className="mt-10 border-t border-gray-200 pt-4">
      <summary className="cursor-pointer py-3 text-base font-semibold text-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600">
        過去に実施した自治体を見る（{archived.length}件）
      </summary>
      <p className="mb-5 text-sm leading-relaxed text-gray-600">以下は掲載している募集の受付が終了した制度です。再募集や二次取引の状況は公式ページをご確認ください。</p>
      <Grid items={archived} />
    </details>}
  </>;
}
