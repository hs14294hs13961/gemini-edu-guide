import Link from "next/link";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import { getModule, getModules } from "@/lib/content";
import Prompt from "@/components/Prompt";
import Check from "@/components/Check";
import StampButton from "@/components/StampButton";

export function generateStaticParams() {
  return getModules().map((m) => ({ slug: m.slug }));
}

export default async function ModulePage({ params }: { params: { slug: string } }) {
  const mod = getModule(params.slug);
  if (!mod) notFound();

  const { content } = await compileMDX({
    source: mod.body,
    components: { Prompt, Check },
  });

  return (
    <article>
      <header className="bg-parchment px-5 py-16">
        <div className="mx-auto max-w-[860px]">
          <Link href="/path/" className="text-[13px] text-primary">← 回學習路徑</Link>
          <h1 className="mt-3 text-[34px] font-semibold tracking-tight sm:text-[40px]">{mod.title}</h1>
          <p className="mt-2 text-[19px] text-ink-80">{mod.subtitle}</p>
          <p className="mt-4 text-[13px] text-ink-48">更新日期：{mod.updated}</p>
        </div>
      </header>
      <div className="prose-edu mx-auto max-w-[860px] px-5 py-14">{content}
        <StampButton id={`module-${mod.slug}`} />
      </div>
      {mod.sourceLinks.length > 0 && (
        <div className="mx-auto max-w-[860px] px-5 pb-16">
          <div className="card">
            <p className="mb-3 font-semibold">完整圖文教學</p>
            <ul className="space-y-2">
              {mod.sourceLinks.map((l) => (
                <li key={l.url}>
                  <a href={l.url} target="_blank" rel="noreferrer" className="text-[15px] text-primary hover:underline">
                    {l.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </article>
  );
}
