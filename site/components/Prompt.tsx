import CopyButton from "./CopyButton";

/** 從 React 節點樹抽出純文字（MDX 內容可能是巢狀元素） */
function toText(node: React.ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(toText).join("");
  if (typeof node === "object" && "props" in node) {
    return toText((node as React.ReactElement<{ children?: React.ReactNode }>).props.children);
  }
  return "";
}

/** 提示詞範例框：可替換處用 [方括號] 標示，附一鍵複製 */
export default function Prompt({ children }: { children: React.ReactNode }) {
  const text = toText(children).trim();
  return (
    <div className="my-5 rounded-card border border-hairline bg-pearl p-6">
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="text-[13px] font-semibold text-ink-48">提示詞範例（[方括號] 內請替換成你的內容）</span>
        <CopyButton text={text} />
      </div>
      <p className="whitespace-pre-wrap text-[15px] leading-relaxed text-ink">{text}</p>
    </div>
  );
}
