"use client";
import { useEffect, useState } from "react";
import { passport } from "@/lib/progress";

/** 卡片右上角的完成章 */
export default function DoneMark({ id }: { id: string }) {
  const [done, setDone] = useState(false);
  useEffect(() => { setDone(passport.isDone(id)); }, [id]);
  if (!done) return null;
  return (
    <span className="absolute right-4 top-4 inline-flex h-[26px] w-[26px] items-center justify-center rounded-full bg-primary text-[14px] font-bold text-white">
      ✓
    </span>
  );
}
