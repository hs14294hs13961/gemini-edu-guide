import { TOOLS } from "@/data/tools";
import ToolboxExplorer from "@/components/ToolboxExplorer";

export const metadata = { title: "工具箱｜Gemini 教育應用指南" };

export default function ToolboxPage() {
  return (
    <section className="bg-parchment px-6 py-20 min-h-[70vh]">
      <div className="mx-auto max-w-[1400px]">
        <h1 className="mb-2 text-[38px] font-semibold tracking-tight">工具箱</h1>
        <p className="mb-10 text-[17px] text-ink-80">
          本站教「怎麼用」；要「直接用」的工具都在這裡。用標籤篩選，點了就能開工。
        </p>
        <ToolboxExplorer tools={TOOLS} />
      </div>
    </section>
  );
}
