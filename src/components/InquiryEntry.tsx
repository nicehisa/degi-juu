import InquiryForm from "./InquiryForm";
import { inquiryKindLabels, type InquiryKind } from "@/lib/inquiry";

export default function InquiryEntry({ kind }: { kind: InquiryKind }) {
  if (process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL) {
    return <InquiryForm kind={kind} />;
  }
  const email = "info@fortitudejapan.com";
  return (
    <div className="rounded-xl border border-blue-200 bg-blue-50 p-5">
      <h2 className="text-lg text-navy">メールで受け付けています</h2>
      <p className="mt-3 text-base leading-7 text-gray-700">現在、{inquiryKindLabels[kind]}は下記メールアドレスへお送りください。お名前とご用件、掲載情報に関する場合は対象のページURLをお知らせください。</p>
      <a href={`mailto:${email}?subject=${encodeURIComponent(`【デジじゅう】${inquiryKindLabels[kind]}`)}`} className="mt-4 inline-flex min-h-11 items-center break-all text-base font-semibold text-blue-700 underline">{email}</a>
      <p className="mt-2 text-sm leading-6 text-gray-600">クリックするとメールアプリが開きます。開かない場合は、アドレスをコピーしてお送りください。</p>
    </div>
  );
}
