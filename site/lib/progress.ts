"use client";
// 學習護照——記錄存在瀏覽器 localStorage（不上傳）
const KEY = "gemini-edu-passport";

interface Store {
  done?: Record<string, { at: string }>;
  checks?: Record<string, Record<number, boolean>>;
  notes?: Record<string, string>;
}

function load(): Store {
  if (typeof window === "undefined") return {};
  try { return JSON.parse(localStorage.getItem(KEY) || "{}"); } catch { return {}; }
}
function save(d: Store) { localStorage.setItem(KEY, JSON.stringify(d)); }

export const passport = {
  isDone: (id: string) => !!load().done?.[id],
  doneDate: (id: string) => load().done?.[id]?.at ?? "",
  setDone(id: string, v: boolean) {
    const d = load(); d.done = d.done || {};
    if (v) d.done[id] = { at: new Date().toLocaleDateString("zh-TW") };
    else delete d.done[id];
    save(d);
  },
  getChecks: (id: string) => load().checks?.[id] ?? {},
  setCheck(id: string, i: number, v: boolean) {
    const d = load(); d.checks = d.checks || {}; d.checks[id] = d.checks[id] || {};
    d.checks[id][i] = v; save(d);
  },
  getNote: (id: string) => load().notes?.[id] ?? "",
  setNote(id: string, t: string) {
    const d = load(); d.notes = d.notes || {};
    if (t.trim()) d.notes[id] = t; else delete d.notes[id];
    save(d);
  },
  clear: () => localStorage.removeItem(KEY),
};

// 護照登錄表——新增可蓋章的內容時在這裡加一筆
export interface PassportItem { id: string; kind: "學習路徑" | "任務卡"; title: string; href: string }
export const PASSPORT_ITEMS: PassportItem[] = [
  { id: "module-parts", kind: "學習路徑", title: "PARTS 提示詞架構", href: "/learn/parts/" },
  { id: "task-parts-first-lesson-plan", kind: "任務卡", title: "用 PARTS 寫出第一個教案提示詞", href: "/tasks/parts-first-lesson-plan/" },
];
export const PASSPORT_TOTALS = { path: { online: 1, all: 7 }, tasks: { online: 1, all: 4 } };
