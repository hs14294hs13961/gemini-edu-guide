"use client";
import { useMemo, useRef, useState } from "react";
import Link from "next/link";

export interface SearchItem {
  title: string;
  desc: string;
  href: string;
  kind: string; // 教材 | 任務 | 工具
  external?: boolean;
}

export default function SearchBox({ items }: { items: SearchItem[] }) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return [];
    return items
      .filter((i) => (i.title + i.desc + i.kind).toLowerCase().includes(query))
      .slice(0, 8);
  }, [q, items]);

  return (
    <div ref={boxRef} className="relative">
      <input
        value={q}
        onChange={(e) => { setQ(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        placeholder="搜尋教材、任務、工具…"
        className="h-8 w-44 rounded-full border border-white/25 bg-white/10 px-4 text-[13px] text-white placeholder:text-white/50 outline-none transition focus:w-64 focus:border-white/60 sm:w-56"
      />
      {open && q.trim() && (
        <div className="absolute right-0 top-10 w-80 rounded-card border border-hairline bg-canvas p-2">
          {results.length === 0 && <p className="px-3 py-2 text-[13px] text-ink-48">找不到符合的內容</p>}
          {results.map((r) =>
            r.external ? (
              <a key={r.href + r.title} href={r.href} target="_blank" rel="noreferrer" className="block rounded-utility px-3 py-2 transition hover:bg-parchment">
                <span className="mr-2 inline-flex rounded-full bg-parchment px-2 py-0.5 text-[11px] font-semibold text-ink-48">{r.kind}</span>
                <span className="text-[14px] font-semibold text-ink">{r.title} ↗</span>
                <p className="mt-0.5 text-[12px] text-ink-48">{r.desc}</p>
              </a>
            ) : (
              <Link key={r.href + r.title} href={r.href} className="block rounded-utility px-3 py-2 transition hover:bg-parchment">
                <span className="mr-2 inline-flex rounded-full bg-parchment px-2 py-0.5 text-[11px] font-semibold text-ink-48">{r.kind}</span>
                <span className="text-[14px] font-semibold text-ink">{r.title}</span>
                <p className="mt-0.5 text-[12px] text-ink-48">{r.desc}</p>
              </Link>
            ),
          )}
        </div>
      )}
    </div>
  );
}
