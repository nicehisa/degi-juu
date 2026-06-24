type Props = {
  text?: string;
  className?: string;
};

const DEFAULT_TEXT =
  "掲載情報は確認日時点の内容です。販売状況、価格、特典は変更される場合があります。最新情報は公式ページをご確認ください。";

export default function LegalNoticeBox({ text = DEFAULT_TEXT, className = "" }: Props) {
  return (
    <div
      className={`bg-amber-50 border border-amber-300 rounded-lg px-4 py-3 text-xs text-amber-900 leading-relaxed ${className}`}
    >
      <span className="font-bold mr-1">⚠ ご注意：</span>
      {text}
    </div>
  );
}
