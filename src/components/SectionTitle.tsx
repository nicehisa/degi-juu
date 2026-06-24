type Props = {
  title: string;
  subtitle?: string;
  className?: string;
};

export default function SectionTitle({ title, subtitle, className = "" }: Props) {
  return (
    <div className={`mb-8 ${className}`}>
      <h2 className="text-2xl md:text-3xl font-bold text-navy border-l-4 border-blue-600 pl-4">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-gray-600 text-sm md:text-base pl-4">{subtitle}</p>
      )}
    </div>
  );
}
