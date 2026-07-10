"use client";
import { useState } from "react";

export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1600);
      }}
      className="rounded-full border border-primary px-4 py-1 text-[13px] font-semibold text-primary transition hover:bg-primary hover:text-white active:scale-95"
    >
      {copied ? "已複製 ✓" : "一鍵複製"}
    </button>
  );
}
