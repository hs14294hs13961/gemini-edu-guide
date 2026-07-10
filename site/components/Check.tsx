/** 人工查證提醒框——每篇教材必備 */
export default function Check({ children }: { children: React.ReactNode }) {
  const content = children ?? (
    <>AI 生成的內容可能出錯。請以你的教學專業查證教材事實、檢查是否符合班級程度，再實際使用。</>
  );
  return (
    <div className="my-5 rounded-card border border-primary/30 bg-primary/5 p-6">
      <p className="mb-1 text-[13px] font-semibold text-primary">人工查證提醒</p>
      <div className="text-[15px] leading-relaxed text-ink-80">{content}</div>
    </div>
  );
}
