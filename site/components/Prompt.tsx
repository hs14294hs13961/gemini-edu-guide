import CopyButton from "./CopyButton";

/** 提示詞範例框：可替換處用 [方括號] 標示，附一鍵複製 */
export default function Prompt({ children }: { children: string }) {
  const text = typeof children === "string" ? children.trim() : String(children);
  return (
    <div className="my-5 rounded-card border border-hairline bg-pearl p-6">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-[13px] font-semibold text-ink-48">提示詞範例（[方括號] 內請替換成你的內容）</span>
        <CopyButton text={text} />
      </div>
      <p className="whitespace-pre-wrap text-[15px] leading-relaxed text-ink">{text}</p>
    </div>
  );
}
