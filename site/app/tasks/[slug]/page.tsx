import Link from "next/link";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import { getTask, getTasks } from "@/lib/content";
import { AudienceBadge, LevelBadge } from "@/components/TaskBadges";
import Prompt from "@/components/Prompt";
import Check from "@/components/Check";
import StampButton from "@/components/StampButton";
import SelfCheck from "@/components/SelfCheck";
import NoteBox from "@/components/NoteBox";

export function generateStaticParams() {
  return getTasks()
    .filter((t) => t.status !== "coming-soon")
    .map((t) => ({ slug: t.slug }));
}

export default async function TaskPage({ params }: { params: { slug: string } }) {
  const task = getTask(params.slug);
  if (!task || task.status === "coming-soon") notFound();

  const { content } = await compileMDX({
    source: task.body,
    components: { Prompt, Check },
  });

  return (
    <article>
      <header className="bg-parchment px-5 py-16">
        <div className="mx-auto max-w-[860px]">
          <Link href="/tasks/" className="text-[13px] text-primary">← 回任務卡</Link>
          <div className="mt-3 flex items-center gap-2">
            <LevelBadge level={task.level} />
            <AudienceBadge audience={task.audience} />
            <span className="text-[12px] text-ink-48">約 {task.time} 分鐘</span>
          </div>
          <h1 className="mt-3 text-[34px] font-semibold tracking-tight sm:text-[40px]">{task.title}</h1>
          <p className="mt-2 text-[19px] text-ink-80">{task.summary}</p>
          <div className="mt-6 rounded-card border border-hairline bg-canvas p-6">
            <p className="mb-2 text-[13px] font-semibold text-ink-48">開始前請準備</p>
            <ul className="list-disc space-y-1 pl-5 text-[15px] text-ink-80">
              {(task.prepare ?? []).map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
        </div>
      </header>
      <div className="prose-edu mx-auto max-w-[860px] px-5 py-14">{content}
        {(task.selfcheck ?? []).length > 0 && <SelfCheck id={`task-${task.slug}`} items={task.selfcheck ?? []} />}
        <NoteBox id={`task-${task.slug}`} />
        <StampButton id={`task-${task.slug}`} />
      </div>
    </article>
  );
}
