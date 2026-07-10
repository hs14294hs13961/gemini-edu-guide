# Gemini 教育應用指南

為台灣國小教師與行政整理的 Gemini 學習網站——30 秒找到該用的功能與做法。

由《薇糖紹冰的教學日誌》整理，供教育用途學習參考。非 Google 官方出版品。

## 內容

- `site/` — 正式網站原始碼（Next.js 14 + TypeScript + Tailwind + MDX）
- `預覽/` — 免建置靜態預覽版
- `docs/` — 開發文檔、設計系統、難點與風險
- `CLAUDE.md` — AI 協作規範

## 本機開發

```bash
cd site
npm install
npm run dev   # http://localhost:3000
```

## 部署

推送到 main 分支後由 Netlify/Vercel 自動建置部署（建置目錄設為 `site/`）。
