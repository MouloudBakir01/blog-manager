import type { Article } from "../types";

const KEY = "bm.articles.v1";

export function loadArticles(): Article[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Article[]) : [];
  } catch {
    return [];
  }
}

export function saveArticles(list: Article[]): void {
  localStorage.setItem(KEY, JSON.stringify(list));
}

export function uid(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`;
}
