import { getTasks } from "@/lib/content";
import TaskExplorer from "@/components/TaskExplorer";
import ProgressBar from "@/components/ProgressBar";

export const metadata = { title: "任務卡｜Gemini 教育應用指南" };

export default function TasksPage() {
  const tasks = getTasks().map(({ body, ...meta }) => meta);
  return (
    <section className="bg-canvas px-6 py-20 min-h-[70vh]">
      <div className="mx-auto max-w-[1400px]">
        <h1 className="mb-2 text-[38px] font-semibold tracking-tight">任務卡</h1>
        <p className="mb-10 text-[17px] text-ink-80">
          已經有明確要做的事？依你的身分和熟悉度篩選，直接跳到做法與提示詞。
        </p>
        <ProgressBar scope="tasks" />
        <TaskExplorer tasks={tasks} />
      </div>
    </section>
  );
}
