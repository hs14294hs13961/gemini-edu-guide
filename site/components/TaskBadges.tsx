import { AUDIENCE_LABEL, type Audience, type Level } from "@/lib/content";

export function LevelBadge({ level }: { level: Level }) {
  // 單一強調色原則：難度用藍色深淺與外框區分，不引入第二色
  const style =
    level === "入門"
      ? "bg-primary text-white"
      : level === "進階"
        ? "border border-primary text-primary"
        : "border border-ink text-ink";
  return <span className={`inline-flex rounded-full px-3 py-0.5 text-[12px] font-semibold ${style}`}>{level}</span>;
}

export function AudienceBadge({ audience }: { audience: Audience[] }) {
  return (
    <span className="text-[12px] text-ink-48">
      {audience.map((a) => AUDIENCE_LABEL[a]).join("・")}
    </span>
  );
}
