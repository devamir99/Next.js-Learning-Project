type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  align?: "start" | "center";
  className?: string;
};

export function SectionHeader({
  title,
  subtitle,
  align = "start",
  className = "",
}: SectionHeaderProps) {
  const alignClass = align === "center" ? "text-center items-center" : "text-start items-start";

  return (
    <div className={`flex flex-col gap-2 ${alignClass} ${className}`}>
      <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="max-w-2xl text-muted-foreground">{subtitle}</p>
      ) : null}
    </div>
  );
}
