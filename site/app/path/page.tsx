import Link from "next/link";
import { getModules } from "@/lib/content";
import ProgressBar from "@/components/ProgressBar";
import DoneMark from "@/components/DoneMark";

export const metadata = { title: "學習路徑｜Gemini 教育應用指南" };

export default function PathPage() {
  const modules = getModules();
  return (
    <section className="bg-parchment px-6 py-20 min-h-[70vh]">
      <div className="mx-auto max-w-[1400px]">
        <h1 className="mb-2 text-[38px] font-semibold tracking-tight">學習路徑</h1>
        <p className="mb-10 text-[17px] text-ink-80">
          從提示詞基本功開始，一步步往進階工具走。初學者建議照順序，每一步都有完整教材與可複製的提示詞。
        </p>
        <ProgressBar scope="path" />
        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {modules.map((m, i) => (
            <li key={m.slug}>
              {m.status === "ready" ? (
                <Link href={`/learn/${m.slug}/`} className="card relative block h-full transition hover:border-primary active:scale-[0.98]">
                  <DoneMark id={`module-${m.slug}`} />
                  <p className="mb-1 text-[13px] font-semibold text-primary">第 {i + 1} 站</p>
                  <p className="mb-1 text-[19px] font-semibold">{m.title}</p>
                  <p className="text-[14px] leading-relaxed text-ink-80">{m.subtitle}</p>
                  <p className="mt-3 text-[13px] text-primary">開始學習 →</p>
                </Link>
              ) : (
                <div className="card h-full opacity-55">
                  <p className="mb-1 text-[13px] font-semibold text-ink-48">第 {i + 1} 站</p>
                  <p className="mb-1 text-[19px] font-semibold">{m.title}</p>
                  <p className="text-[14px] leading-relaxed text-ink-80">{m.subtitle}</p>
                  <p className="mt-3 text-[13px] text-ink-48">教材整理中，即將推出</p>
                </div>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
