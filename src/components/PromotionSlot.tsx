import Link from "next/link";
import type { Promotion } from "@/data/promotions";

type Props = {
  promotion: Promotion;
};

export default function PromotionSlot({ promotion }: Props) {
  return (
    <aside className="rounded-xl border border-orange-200 bg-orange-50 p-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="mb-1 inline-flex rounded-full bg-white px-2 py-0.5 text-xs font-semibold text-orange-700">
            {promotion.label}
          </p>
          <h2 className="text-base font-bold text-navy">{promotion.title}</h2>
          <p className="mt-1 text-sm leading-relaxed text-gray-700">{promotion.description}</p>
        </div>
        <Link
          href={promotion.href}
          className="inline-flex shrink-0 items-center justify-center rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
        >
          相談する
        </Link>
      </div>
    </aside>
  );
}
