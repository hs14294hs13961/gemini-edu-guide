"use client";
import { useEffect, useState } from "react";
import { passport } from "@/lib/progress";

export default function StampButton({ id }: { id: string }) {
  const [done, setDone] = useState(false);
  const [date, setDate] = useState("");
  useEffect(() => { setDone(passport.isDone(id)); setDate(passport.doneDate(id)); }, [id]);
  return (
    <div className="my-8 text-center">
      <button
        onClick={() => {
          const v = !done;
          passport.setDone(id, v);
          setDone(v); setDate(passport.doneDate(id));
        }}
        className={`inline-flex items-center gap-2 rounded-full border border-primary px-6 py-2 text-[15px] font-semibold transition active:scale-95 ${done ? "bg-primary text-white" : "text-primary hover:bg-primary hover:text-white"}`}
      >
        {done ? `✓ 已完成，蓋章於 ${date}（點擊取消）` : "完成了嗎？點我蓋章"}
      </button>
    </div>
  );
}
