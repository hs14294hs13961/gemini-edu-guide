// 共用的分類定義（前後端皆可引用，不可 import fs）
export type Audience = "teacher" | "admin" | "trainer";
export type Level = "入門" | "進階" | "挑戰";

export const AUDIENCE_LABEL: Record<Audience, string> = {
  teacher: "教師",
  admin: "行政",
  trainer: "講師",
};
