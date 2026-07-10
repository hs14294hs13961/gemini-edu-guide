import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");

export type Audience = "teacher" | "admin" | "trainer";
export type Level = "入門" | "進階" | "挑戰";

export interface ModuleMeta {
  slug: string;
  order: number;
  title: string;
  subtitle: string;
  status: "ready" | "coming-soon";
  updated: string;
  sourceLinks: { label: string; url: string }[];
}

export interface TaskMeta {
  slug: string;
  title: string;
  summary: string;
  module: string;
  audience: Audience[];
  level: Level;
  time: number;
  prepare: string[];
  updated: string;
  status?: "ready" | "coming-soon";
}

function readDir(sub: string) {
  const dir = path.join(CONTENT_DIR, sub);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));
}

export function getModules(): (ModuleMeta & { body: string })[] {
  return readDir("modules")
    .map((file) => {
      const raw = fs.readFileSync(path.join(CONTENT_DIR, "modules", file), "utf8");
      const { data, content } = matter(raw);
      return { ...(data as ModuleMeta), slug: file.replace(/\.mdx$/, ""), body: content };
    })
    .sort((a, b) => a.order - b.order);
}

export function getModule(slug: string) {
  return getModules().find((m) => m.slug === slug);
}

export function getTasks(): (TaskMeta & { body: string })[] {
  return readDir("tasks").map((file) => {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, "tasks", file), "utf8");
    const { data, content } = matter(raw);
    return { ...(data as TaskMeta), slug: file.replace(/\.mdx$/, ""), body: content };
  });
}

export function getTask(slug: string) {
  return getTasks().find((t) => t.slug === slug);
}

export const AUDIENCE_LABEL: Record<Audience, string> = {
  teacher: "教師",
  admin: "行政",
  trainer: "講師",
};
