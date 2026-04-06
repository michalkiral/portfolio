import type { Entry, Group } from "@/apps/randomizer/types";
import { useLocalStorage } from "@/shared/hooks/useLocalStorage";

const generateId = () => Math.random().toString(36).slice(2, 9);

const DEFAULT_GROUP: Group = {
  id: "default",
  name: "Default",
  entries: [],
};

export function useGroups() {
  const [groups, setGroups] = useLocalStorage<Group[]>("randomizer:groups", [DEFAULT_GROUP]);
  const [activeGroupId, setActiveGroupId] = useLocalStorage<string>(
    "randomizer:activeGroup",
    "default",
  );

  const activeGroup = groups.find((g) => g.id === activeGroupId) ?? groups[0];

  const updateGroup = (id: string, updater: (g: Group) => Group) => {
    setGroups((prev) => prev.map((g) => (g.id === id ? updater(g) : g)));
  };

  const createGroup = (name: string) => {
    const newGroup: Group = { id: generateId(), name, entries: [] };
    setGroups((prev) => [...prev, newGroup]);
    setActiveGroupId(newGroup.id);
  };

  const renameGroup = (id: string, name: string) => {
    updateGroup(id, (g) => ({ ...g, name }));
  };

  const deleteGroup = (id: string) => {
    setGroups((prev) => {
      const next = prev.filter((g) => g.id !== id);
      return next.length > 0 ? next : [DEFAULT_GROUP];
    });
    if (activeGroupId === id) {
      setActiveGroupId(groups.find((g) => g.id !== id)?.id ?? "default");
    }
  };

  const addEntry = (label: string) => {
    const entry: Entry = { id: generateId(), label: label.trim(), weight: 1 };
    updateGroup(activeGroup.id, (g) => ({ ...g, entries: [...g.entries, entry] }));
  };

  const removeEntry = (entryId: string) => {
    updateGroup(activeGroup.id, (g) => ({
      ...g,
      entries: g.entries.filter((e) => e.id !== entryId),
    }));
  };

  const updateEntry = (entryId: string, changes: Partial<Omit<Entry, "id">>) => {
    updateGroup(activeGroup.id, (g) => ({
      ...g,
      entries: g.entries.map((e) => (e.id === entryId ? { ...e, ...changes } : e)),
    }));
  };

  const moveEntry = (entryId: string, direction: "up" | "down") => {
    updateGroup(activeGroup.id, (g) => {
      const idx = g.entries.findIndex((e) => e.id === entryId);
      if (idx === -1) return g;
      const next = [...g.entries];
      const swapIdx = direction === "up" ? idx - 1 : idx + 1;
      if (swapIdx < 0 || swapIdx >= next.length) return g;
      [next[idx], next[swapIdx]] = [next[swapIdx], next[idx]];
      return { ...g, entries: next };
    });
  };

  return {
    groups,
    activeGroup,
    activeGroupId,
    setActiveGroupId,
    createGroup,
    renameGroup,
    deleteGroup,
    addEntry,
    removeEntry,
    updateEntry,
    moveEntry,
  };
}
