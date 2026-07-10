import { getModules, getTasks } from "./content";
import { TOOLS } from "@/data/tools";
import type { SearchItem } from "@/components/SearchBox";

export function buildSearchIndex(): SearchItem[] {
  const modules: SearchItem[] = getModules()
    .filter((m) => m.status === "ready")
    .map((m) => ({ title: m.title, desc: m.subtitle, href: `/learn/${m.slug}/`, kind: "教材" }));
  const tasks: SearchItem[] = getTasks()
    .filter((t) => t.status !== "coming-soon")
    .map((t) => ({ title: t.title, desc: t.summary, href: `/tasks/${t.slug}/`, kind: "任務" }));
  const tools: SearchItem[] = TOOLS.map((t) => ({
    title: t.name, desc: t.desc, href: t.url, kind: "工具", external: true,
  }));
  return [...modules, ...tasks, ...tools];
}
