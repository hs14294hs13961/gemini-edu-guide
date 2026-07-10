# Gemini 教育應用指南 — 網站原始碼

Next.js 14 + TypeScript + Tailwind CSS + MDX。設計規範見 `../docs/設計系統.md`，專案規範見 `../CLAUDE.md`。

## 本機啟動（需先安裝 Node.js 18+）

```bash
cd site
npm install
npm run dev    # 打開 http://localhost:3000
npm run build  # 建置檢查
```

## 注意

- 2026-07-09：Cowork 沙盒無法連 npm 套件庫（網路政策 403），故尚未在沙盒內驗證建置。
  首次 `npm run build` 若有小錯誤，屬正常情況，交給 Claude 修正即可。
- `content/modules/`、`content/tasks/` 內新增 .mdx 檔即新增頁面。
- 靜態預覽版（免安裝）在 `../預覽/index.html`，樣式與本專案一致。
