"use client";
import { useEffect, useRef, useState } from "react";
import { passport } from "@/lib/progress";

export default function NoteBox({ id }: { id: string }) {
  const [text, setText] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout>>();
  useEffect(() => { setText(passport.getNote(id)); }, [id]);
  return (
    <div className="my-5">
      <h2 className="mb-2 text-[26px] font-semibold tracking-tight">學習成果記錄</h2>
      <p className="mb-3 text-[14px] text-ink-48">
        記下你這次做出來的成果、遇到的問題或下次想試的做法（自動儲存在這台電腦的瀏覽器）。
      </p>
      <textarea
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          clearTimeout(timer.current);
          timer.current = setTimeout(() => passport.setNote(id, e.target.value), 400);
        }}
        placeholder="例如：完成了社會科 4-2 的兩節課教案，測驗題有兩題太難，下次請 AI 出題時要指定難度分布…"
        className="min-h-[110px] w-full resize-y rounded-capsule border border-hairline bg-canvas p-4 text-[15px] leading-relaxed text-ink outline-none transition focus:border-primary"
      />
      <p className="mt-1 text-[12px] text-ink-48">輸入後自動儲存 ✓</p>
    </div>
  );
}
