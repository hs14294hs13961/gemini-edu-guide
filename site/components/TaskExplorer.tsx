"use client";
import { useState } from "react";
import Link from "next/link";
import { AudienceBadge, LevelBadge } from "./TaskBadges";
import type { Audience, Level } from "@/lib/taxonomy";

export interface TaskCardMeta {
  slug: string;
  title: string;
  summary: string;
  audience: Audience[];
  level: Level;
  time: number;
  prepare: string[];
  status?: "ready" | "coming-soon";
}
import DoneMark from "./DoneMark";

const AUDIENCES: { key: Audience | "all"; label: string }[] = [
  { key: "all", label: "全部對象" },
  { key: "teacher", label: "教師" },
  { key: "admin", label: "行政" },
  { key: "trainer", label: "講師" },
];
const LEVELS: (Level | "all")[] = ["all", "入門", "進階", "挑戰"];

export default function TaskExplorer({ tasks }: { tasks: TaskCardMeta[] }) {
  const [audience, setAudience] = useState<Audience | "all">("all");
  const [level, setLevel] = useState<Level | "all">("all");

  const filtered = tasks.filter(
    (t) =>
      (audience === "all" || t.audience.includes(audience)) &&
      (level === "all" || t.level === level),
  );

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2">
        {AUDIENCES.map((a) => (
          <button
            key={a.key}
            onClick={() => setAudience(a.key)}
            className={`chip transition active:scale-95 ${audience === a.key ? "chip-active" : ""}`}
          >
            {a.label}
          </button>
        ))}
        <span className="mx-1 self-center text-hairline">｜</span>
        {LEVELS.map((l) => (
          <button
            key={l}
            onClick={() => setLevel(l)}
            className={`chip transition active:scale-95 ${level === l ? "chip-active" : ""}`}
          >
            {l === "all" ? "全部難度" : l}
          </button>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((t) =>
          t.status === "coming-soon" ? (
            <div key={t.slug} className="card opacity-55">
              <div className="mb-2 flex items-center gap-2">
                <LevelBadge level={t.level} />
                <AudienceBadge audience={t.audience} />
              </div>
              <p className="mb-1 font-semibold">{t.title}</p>
              <p className="mb-3 text-[14px] leading-relaxed text-ink-80">{t.summary}</p>
              <p className="text-[13px] text-ink-48">教材整理中，即將推出</p>
            </div>
          ) : (
            <Link key={t.slug} href={`/tasks/${t.slug}/`} className="card relative block transition hover:border-primary active:scale-[0.98]">
              <DoneMark id={`task-${t.slug}`} />
              <div className="mb-2 flex items-center gap-2">
                <LevelBadge level={t.level} />
                <AudienceBadge audience={t.audience} />
              </div>
              <p className="mb-1 font-semibold">{t.title}</p>
              <p className="mb-3 text-[14px] leading-relaxed text-ink-80">{t.summary}</p>
              <p className="text-[13px] text-primary">
                {t.prepare.length} 項準備資料・約 {t.time} 分鐘 →
              </p>
            </Link>
          ),
        )}
        {filtered.length === 0 && (
          <p className="col-span-full py-8 text-center text-ink-48">這個組合目前沒有任務卡，換個篩選條件試試。</p>
        )}
      </div>
    </div>
  );
}
