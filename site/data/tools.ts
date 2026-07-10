// 工具箱資料——新增工具只要在這裡加一個物件（GAS 類排最前面）
export type ToolTag = "GAS" | "Gem" | "提示詞" | "Canvas 作品" | "Drive 資源";

export interface Tool {
  name: string;
  desc: string;
  url: string;
  tags: ToolTag[];
}

export const TOOLS: Tool[] = [
  {
    name: "研習提示詞庫",
    desc: "備課、簡報、測驗等情境提示詞，分類查找、一鍵複製",
    url: "https://script.google.com/macros/s/AKfycbxONvJkGInuIZo-evVJ6EIqAE7yJBgRfthjE7iU5bknE0dM3S4EpFBmguyh3S_U2f6Fcw/exec",
    tags: ["GAS", "提示詞"],
  },
  {
    name: "十二年課綱課程計畫資料庫",
    desc: "總綱、領綱學習表現、議題融入，一鍵複製",
    url: "https://script.google.com/macros/s/AKfycbzqNkdEh7xv7PGkXEnulS9CpApb0oMkMu74x1s3Z9iHtDIxuBKk-XqoFZ8Un1jzeXzDqg/exec",
    tags: ["GAS"],
  },
  {
    name: "薇糖紹冰的教學日誌",
    desc: "班級經營、AI 工具、圖片生成作品總入口",
    url: "https://script.google.com/macros/s/AKfycbxEK3hZwPVPvRgPgf1a5Vl6BGB6bNu5sJTn0GPNwaTA8EYTmkVtbaHwEHkEW-RRqVwx/exec",
    tags: ["GAS"],
  },
  {
    name: "PARTS 提示詞機器人",
    desc: "三步驟產出結構化提示詞，一鍵複製",
    url: "https://sites.google.com/view/ailiteracy-partspromptword",
    tags: ["提示詞"],
  },
  {
    name: "CRAFT 提示詞產生器",
    desc: "可保存在 Gemini 的提示詞合併與優化工具",
    url: "https://gemini.google.com/share/1de2b7a21af9",
    tags: ["提示詞", "Canvas 作品"],
  },
  {
    name: "海報圖生成大師 Gem",
    desc: "提供內容與想法，三步驟生成教學海報",
    url: "https://gemini.google.com/gem/119RwSHHz3Q0chz478cyIuetg-pcz8DfD",
    tags: ["Gem"],
  },
  {
    name: "公文小幫手 Gem",
    desc: "擬辦單與簽案草稿的行政好夥伴",
    url: "https://gemini.google.com/gem/1FWh70Ae6JX_4CZmrGh3dWk2R2_UCG-6I",
    tags: ["Gem"],
  },
  {
    name: "聖誕小遊戲",
    desc: "Canvas 製作的注音介面班級互動遊戲範例",
    url: "https://gemini.google.com/share/98ff1a97e01e",
    tags: ["Canvas 作品"],
  },
  {
    name: "教師聯絡簿、考試專用投影系統",
    desc: "考程表、聯絡簿投影、時鐘廣播的班級經營工具",
    url: "https://drive.google.com/drive/folders/1N2M9RqCtSIKXJrm3l3Dm0RRV5v-bd21z",
    tags: ["Drive 資源", "Canvas 作品"],
  },
  {
    name: "PDF 拆分合併小工具",
    desc: "通用版 PDF 處理工具，離線可用",
    url: "https://drive.google.com/drive/folders/1Kkm36z2DWdjNZ7ZNU226uL__yU3pAKFq",
    tags: ["Drive 資源"],
  },
];

// 標籤順序：GAS permanently 最前
export const TAG_ORDER: ToolTag[] = ["GAS", "Gem", "提示詞", "Canvas 作品", "Drive 資源"];
