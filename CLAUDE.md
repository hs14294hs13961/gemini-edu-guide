# CLAUDE.md — Gemini 教育應用指南網站

## 專案是什麼

給台灣國小教師與行政的 Gemini 教育應用學習網站。整合 Shao-Chun 老師的工作坊教材（PARTS 提示詞、Gems、Canvas、Deep Research、NotebookLM、Workspace、GAS），目標是「30 秒找到該用的功能與做法」。詳細規格見 `docs/開發文檔.md`，已知難點見 `docs/難點與風險.md`。

## 技術棧

- Next.js（App Router）+ TypeScript + Tailwind CSS
- 設計系統：Apple 風格配色（單一藍強調 #0066cc、白/parchment 交替背景、卡片無陰影），token 與規則見 `docs/設計系統.md`，元件一律遵守
- 內容：MDX + frontmatter，放 `content/`，schema 見開發文檔第 8 節
- 部署：GitHub → Vercel 自動部署
- 原始教材素材（PDF、pptx、mp4）放 `materials/`，不進 git（列入 .gitignore，檔案太大）

## 資訊架構鐵則

- 首頁雙軸並行：「學習路徑」（初學者照順序）＋「任務卡」（老手篩選跳關）
- 任務卡三標籤缺一不可：受眾（teacher/admin/trainer）、難度（入門/進階/挑戰）、預估時間
- 內容策略：站內摘要＋外連原文。站內只放情境、步驟、提示詞、檢核；完整圖文外連 Notion
- 所有外部連結集中在 `data/links.ts` 管理，不散落在 MDX 內文硬編碼

## 寫作規範

- 繁體中文（台灣用語）：影片不是視頻、品質不是質量、資料不是數據（data 語境）
- 語氣：親切、面向非技術背景老師，先講「你遇到什麼困難」再講功能
- 提示詞範例需可一鍵複製，可替換處用 [方括號] 標示
- 每篇教材必含「人工查證提醒」——AI 會出錯是本站核心素養觀
- Gemini 功能迭代快：內容註明 `updated` 日期；描述功能時避免寫死 UI 細節（按鈕位置等），改寫操作意圖

## 版權紅線

- gemini-edu-handbook.vercel.app 與 claude-edu-handbook.vercel.app 為他人作品：架構概念可借鏡，**文案、程式碼、配色 token、視覺素材一律不可複製**
- 教科書內容（課本頁面截圖等）不放進網站
- Shao-Chun 自己的 Notion 筆記與簡報可自由改寫使用

## 常用指令

```bash
npm run dev      # 本機預覽 http://localhost:3000
npm run build    # 建置檢查（合併前必跑）
npm run lint     # 程式碼檢查
```

## 新增教材流程

讀 `materials/` 內新素材 → 依 schema 產 MDX 草稿 → 過品質檢核（開發文檔第 9 節四條）→ 本機預覽 → 推 GitHub。

## 版本控管（過渡方案）

- 此雲端同步資料夾不允許 git 鎖定檔操作，git repo 放沙盒（GIT_DIR 外置），每次 commit 後輸出 `版本備份/gemini-edu-guide.bundle`（單一檔案，`git clone gemini-edu-guide.bundle` 可還