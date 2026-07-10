import Link from "next/link";
import { getModules, getTasks } from "@/lib/content";

export default function Home() {
  const readyModules = getModules().filter((m) => m.status === "ready").length;
  const readyTasks = getTasks().filter((t) => t.status !== "coming-soon").length;

  const entries = [
    {
      href: "/path/",
      title: "學習路徑",
      desc: "從提示詞基本功到 GAS 自動化，七站照順序走。適合第一次接觸 Gemini 的你。",
      cta: `已上線 ${readyModules} 站・持續更新`,
    },
    {
      href: "/tasks/",
      title: "任務卡",
      desc: "已經有明確要做的事？依身分與難度篩選，直接跳到做法與提示詞。",
      cta: `可實作任務 ${readyTasks} 張・持續更新`,
    },
    {
      href: "/toolbox/",
      title: "工具箱",
      desc: "提示詞庫、課綱資料庫、Gems 與班級經營工具，點了就能直接用。",
      cta: "依標籤瀏覽全部工具",
    },
  ];

  return (
    <>
      <section className="bg-canvas px-6 py-24 text-center">
        <div className="mx-auto max-w-[820px]">
          <h1 className="mb-4 text-[44px] font-semibold leading-tight tracking-tight sm:text-[56px]">
            今天想讓 Gemini
            <br />
            幫你做什麼？
          </h1>
          <p className="mx-auto mb-9 max-w-2xl text-[19px] leading-relaxed text-ink-80">
            AI 功能太多不知道從哪開始？這裡把備課、班級經營與行政常用的
            Gemini 做法整理成路徑與任務卡，目標是讓你 30 秒找到該用的功能。
          </p>
          <div className="flex justify-center gap-3">
            <Link href="/path/" className="btn-primary">我是新手，照順序走</Link>
            <Link href="/tasks/" className="btn-secondary">我要直接找任務</Link>
          </div>
        </div>
      </section>

      <section className="bg-parchment px-6 py-20">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-5 md:grid-cols-3">
            {entries.map((e) => (
              <Link key={e.href} href={e.href} className="card block transition hover:border-primary active:scale-[0.98]">
                <p className="mb-2 text-[24px] font-semibold tracking-tight">{e.title}</p>
                <p className="mb-4 text-[15px] leading-relaxed text-ink-80">{e.desc}</p>
                <p className="text-[13px] text-primary">{e.cta} →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
