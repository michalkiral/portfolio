import type { AppManifest } from "@/registry/types";
import { useState } from "react";

export function useAppFilter(apps: AppManifest[], favorites: Set<string>) {
  const [filterMode, setFilterMode] = useState<"all" | "favorites">("all");
  const [query, setQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());

  const allTags = [...new Set(apps.flatMap((app) => app.tags))].sort();

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => {
      const next = new Set(prev);
      next.has(tag) ? next.delete(tag) : next.add(tag);
      return next;
    });
  };

  const filtered = apps.filter((app) => {
    if (filterMode === "favorites" && !favorites.has(app.id)) return false;
    if (query) {
      const q = query.toLowerCase();
      const matchesTitle = app.title.toLowerCase().includes(q);
      const matchesTag = app.tags.some((tag) => tag.toLowerCase().includes(q));
      if (!matchesTitle && !matchesTag) return false;
    }
    if (selectedTags.size > 0 && !app.tags.some((tag) => selectedTags.has(tag))) return false;
    return true;
  });

  return { filterMode, setFilterMode, query, setQuery, selectedTags, toggleTag, filtered, allTags };
}
