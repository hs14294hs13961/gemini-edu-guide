import type { Metadata } from "next";
import Link from "next/link";
import SearchBox from "@/components/SearchBox";
import { buildSearchIndex } from "@/lib/searchIndex";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gemini 教育應用指南｜30 秒找到該用的功能",
  description:
    "為台灣國小教師與行政整理的 Gemini 學習網站：PARTS 提示詞、Gems、Canvas、Deep Research、NotebookLM、Workspace 與 GAS，附可複製提示詞與檢核提醒。",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const searchItems = buildSearchIndex();
  return (
    <html lang="zh-TW">
      <body className="font-sans">
        <nav className="sticky top-0 z-50 bg-black text-white/85">
          <div className="mx-auto flex h-12 max-w-[1400px] items-center justify-between gap-4 px-6">
            <Link href="/" className="shrink-0 text-[15px] font-semibold text-white">
              Gemini 教育應用指南
            </Link>
            <div className="hidden gap-7 text-[13px] sm:flex">
              <Link href="/path/" className="transition hover:text-white">學習路徑</Link>
              <Link href="/tasks/" className="transition hover:text-white">任務卡</Link>
              <Link href="/toolbox/" className="transition hover:text-white">工具箱</Link>
              <Link href="/passport/" className="transition hover:text-white">學習護照</Link>
            </div>
            <SearchBox items={searchItems} />
          </div>
        </nav>
        <main>{children}</main>
        <footer className="bg-tile-1 py-16 text-white/60">
          <div className="mx-auto max-w-[1400px] px-6 text-[13px] leading-relaxed">
            <p className="mb-2 text-white/85 font-semibold">Gemini 教育應用指南</p>
            <p>由《薇糖紹冰的教學日誌》整理而成，供教育用途學習參考。</p>
            <p>非 Google 官方出版品；Gemini 功能迭代快速，操作介面以官方最新版本為準。</p>
            <p className="mt-4">AI 會出錯——所有生成內容請以教師專業查證後再使用。</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
