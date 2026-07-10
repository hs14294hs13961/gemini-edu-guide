"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { PASSPORT_ITEMS, PASSPORT_TOTALS, passport } from "@/lib/progress";

export default function PassportView() {
  const [tick, setTick] = useState(0);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const path = PASSPORT_ITEMS.filter((i) => i.kind === "學習路徑");
  const tasks = PASSPORT_ITEMS.filter((i) => i.kind === "任務卡");
  const dp = path.filter((i) => passport.isDone(i.id)).length;
  const dt = tasks.filter((i) => passport.isDone(i.id)).length;
  const stamps = PASSPORT_ITEMS.filter((i) => passport.isDone(i.id));
  const notes = PASSPORT_ITEMS.map((i) => ({ i, n: passport.getNote(i.id) })).filter((x) => x.n);

  const Bar = ({ done, online }: { done: number; online: number }) => (
    <div className="my-4 h-2 overflow-hidden rounded-full bg-divider-soft">
      <div className="h-full rounded-full bg-primary" style={{ width: `${online ? (done / online) * 100 : 0}%` }} />
    </div>
  );

  return (
    <div key={tick}>
      <div className="mb-10 grid gap-5 md:grid-cols-2">
        <div className="card">
          <p className="text-[19px] font-semibold">學習路徑進度</p>
          <Bar done={dp} online={PASSPORT_TOTALS.path.online} />
          <p className="text-[14px] text-ink-80">已完成 {dp} / 已上線 {PASSPORT_TOTALS.path.online}（全部 {PASSPORT_TOTALS.path.all} 站規劃中）</p>
        </div>
        <div className="card">
          <p className="text-[19px] font-semibold">任務卡進度</p>
          <Bar done={dt} online={PASSPORT_TOTALS.tasks.online} />
          <p className="text-[14px] text-ink-80">已完成 {dt} / 已上線 {PASSPORT_TOTALS.tasks.online}（全部 {PASSPORT_TOTALS.tasks.all} 張規劃中）</p>
        </div>
      </div>

      <div className="card mb-10">
        <p className="mb-2 text-[19px] font-semibold">我的蓋章</p>
        {stamps.length === 0 && <p className="py-3 text-[15px] text-ink-48">還沒有蓋章。到「學習路徑」或「任務卡」完成第一個項目吧！</p>}
        {stamps.map((i) => (
          <div key={i.id} className="flex items-center gap-3.5 border-b border-divider-soft py-3.5 last:border-none">
            <span className="inline-flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full bg-primary text-[14px] font-bold text-white">✓</span>
            <span className="shrink-0 rounded-full bg-parchment px-2.5 py-0.5 text-[11px] font-semibold text-ink-48">{i.kind}</span>
            <Link href={i.href} className="text-[15px] font-semibold text-primary hover:underline">{i.title}</Link>
            <span className="ml-auto shrink-0 text-[12px] text-ink-48">{passport.doneDate(i.id)}</span>
          </div>
        ))}
      </div>

      <div className="card mb-10">
        <p className="mb-2 text-[19px] font-semibold">我的學習成果記錄</p>
        {notes.length === 0 && <p className="py-3 text-[15px] text-ink-48">還沒有記錄。完成任務時順手寫下成果與心得，之後研習分享超好用。</p>}
        {notes.map((x) => (
          <div key={x.i.id} className="mb-4 last:mb-0">
            <Link href={x.i.href} className="text-[15px] font-semibold text-primary hover:underline">{x.i.title}</Link>
            <p className="mt-2 whitespace-pre-wrap rounded-capsule border border-hairline bg-pearl p-3.5 text-[14px] leading-relaxed text-ink-80">{x.n}</p>
          </div>
        ))}
      </div>

      <div className="text-right">
        <button
          onClick={() => {
            if (confirm("確定要清除所有蓋章、檢核與成果記錄嗎？此動作無法復原。")) {
              passport.clear(); setTick((t) => t + 1);
            }
          }}
          className="rounded-full border border-hairline px-4 py-1.5 text-[13px] text-ink-48 transition hover:border-red-700 hover:text-red-700"
        >
          清除所有記錄
        </button>
      </div>
    </div>
  );
}
