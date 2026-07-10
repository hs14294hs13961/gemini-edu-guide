"use client";
import { useState } from "react";
import { TAG_ORDER, type Tool, type ToolTag } from "@/data/tools";

export default function ToolboxExplorer({ tools }: { tools: Tool[] }) {
  const [tag, setTag] = useState<ToolTag | "all">("all");
  const filtered = tag === "all" ? tools : tools.filter((t) => t.tags.includes(tag));

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2">
        <button onClick={() => setTag("all")} className={`chip transition active:scale-95 ${tag === "all" ? "chip-active" : ""}`}>
          全部
        </button>
        {TAG_ORDER.map((t) => (
          <button key={t} onClick={() => setTag(t)} className={`chip transition active:scale-95 ${tag === t ? "chip-active" : ""}`}>
            {t}
          </button>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((t) => (
          <a key={t.name} href={t.url} target="_blank" rel="noreferrer" className="card block transition hover:border-primary active:scale-[0.98]">
            <div className="mb-2 flex flex-wrap gap-1.5">
              {t.tags.map((g) => (
                <span key={g} className="inline-flex rounded-full bg-parchment px-2.5 py-0.5 text-[11px] font-semibold text-ink-48">
                  {g}
                </span>
              ))}
            </div>
            <p className="mb-1 font-semibold">{t.name}</p>
            <p className="mb-3 text-[14px] leading-relaxed text-ink-80">{t.desc}</p>
            <p className="text-[13px] text-primary">前往工具 ↗</p>
          </a>
        ))}
      </div>
    </div>
  );
}
