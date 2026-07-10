"use client";
import { useEffect, useState } from "react";
import { passport } from "@/lib/progress";

export default function SelfCheck({ id, items }: { id: string; items: string[] }) {
  const [checks, setChecks] = useState<Record<number, boolean>>({});
  useEffect(() => { setChecks(passport.getChecks(id)); }, [id]);
  return (
    <div className="my-5">
      <h2 className="mb-3 text-[26px] font-semibold tracking-tight">自我檢核（點一下打勾，自動儲存）</h2>
      <div className="rounded-card border border-hairline bg-canvas px-6 py-2">
        {items.map((item, i) => (
          <label key={i} className="flex cursor-pointer items-start gap-3 border-b border-divider-soft py-3 last:border-none">
            <input
              type="checkbox"
              checked={!!checks[i]}
              onChange={(e) => {
                passport.setCheck(id, i, e.target.checked);
                setChecks({ ...checks, [i]: e.target.checked });
              }}
              className="mt-1 h-[18px] w-[18px] cursor-pointer accent-[#0066cc]"
            />
            <span className={`text-[16px] leading-relaxed ${checks[i] ? "text-ink-48 line-through" : "text-ink-80"}`}>{item}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
