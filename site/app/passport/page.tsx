import PassportView from "@/components/PassportView";

export const metadata = { title: "學習護照｜Gemini 教育應用指南" };

export default function PassportPage() {
  return (
    <section className="min-h-[70vh] bg-parchment px-6 py-20">
      <div className="mx-auto max-w-[1400px]">
        <h1 className="mb-2 text-[38px] font-semibold tracking-tight">學習護照</h1>
        <p className="mb-10 text-[17px] text-ink-80">
          你的學習足跡都在這裡：完成的站點、任務蓋章與成果記錄。資料儲存在這台電腦的瀏覽器，不會上傳。
        </p>
        <PassportView />
      </div>
    </section>
  );
}
