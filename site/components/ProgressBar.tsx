"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { PASSPORT_ITEMS, PASSPORT_TOTALS, passport } from "@/lib/progress";

export default function ProgressBar({ scope }: { scope: "path" | "tasks" }) {
  const [done, setDone] = useState(0);
  const total = PASSPORT_TOTALS[scope];
  const kind = scope === "path" ? "學習路徑" : "任務卡";
  useEffect(() => {
    setDone(PASSPORT_ITEMS.filter((i) => i.kind === kind && passport.isDone(i.id)).length);
  }, [kind]);
  return (
    <div className="mb-7 flex flex-wrap items-center gap-5 rounded-card border border-hairline bg-canvas px-6 py-5">
      <span className="shrink-0 text-[15px] font-semibold">我的進度</span>
      <div className="h-2 min-w-[200px] flex-1 overflow-hidden rounded-full bg-divider-soft">
        <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${total.online ? (done / total.online) * 100 : 0}%` }} />
      </div>
      <span className="shrink-0 text-[13px] text-ink-48">
        已完成 {done} / 已上線 {total.online}（全部 {total.all} {scope === "path" ? "站" : "張"}規劃中）
      </span>
      <Link href="/passport/" className="text-[13px] text-primary hover:underline">查看學習護照 →</Link>
    </div>
  );
}
