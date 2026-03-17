import { LucideIcon } from "lucide-react";

interface SectionHeaderProps {
  badge: string;
  badgeIcon?: LucideIcon;
  title: string;
  gradientWord: string;
  description?: string;
  badgeVariant?: "blue" | "muted";
}

export function SectionHeader({
  badge,
  badgeIcon: Icon,
  title,
  gradientWord,
  description,
  badgeVariant = "blue",
}: SectionHeaderProps) {
  const parts = title.split(gradientWord);
  const badgeClass =
    badgeVariant === "muted"
      ? "bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300"
      : "bg-[#2563EB]/10 dark:bg-blue-900/50 text-[#2563EB] dark:text-blue-400 border-0";
  return (
    <div className="text-center mb-12 lg:mb-16">
      <div
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-4 ${badgeClass}`}
      >
        {Icon && <Icon size={16} className={badgeVariant === "muted" ? "text-[#2563EB] dark:text-blue-400" : ""} />}
        {badge}
      </div>
      <h2 className="font-heading font-bold text-3xl sm:text-4xl text-slate-900 dark:text-slate-100">
        {parts[0]}
        <span
          className="bg-clip-text text-transparent"
          style={{ backgroundImage: "linear-gradient(135deg, #2563EB, #10B981)" }}
        >
          {gradientWord}
        </span>
        {parts[1]}
      </h2>
      {description && (
        <p className="mt-3 text-slate-500 dark:text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">{description}</p>
      )}
      <div
        className="mt-4 w-24 h-1 mx-auto rounded-full"
        style={{ background: "linear-gradient(90deg, #2563EB, #10B981)" }}
      />
    </div>
  );
}
