import type { Group } from "@/apps/randomizer/types";
import React, { useState } from "react";

type GroupSelectorProps = {
  groups: Group[];
  activeGroupId: string;
  onSelect: (id: string) => void;
  onCreate: (name: string) => void;
  onRename: (id: string, name: string) => void;
  onDelete: (id: string) => void;
};

const GroupSelector: React.FC<GroupSelectorProps> = ({
  groups,
  activeGroupId,
  onSelect,
  onCreate,
  onRename,
  onDelete,
}) => {
  const [creating, setCreating] = useState(false);
  const [newName, setNewName] = useState("");
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");

  const submitCreate = () => {
    const trimmed = newName.trim();
    if (trimmed) onCreate(trimmed);
    setNewName("");
    setCreating(false);
  };

  const submitRename = (id: string) => {
    const trimmed = renameValue.trim();
    if (trimmed) onRename(id, trimmed);
    setRenamingId(null);
  };

  const startRename = (group: Group) => {
    setRenamingId(group.id);
    setRenameValue(group.name);
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      {groups.map((group) => (
        <div key={group.id} className="flex items-center gap-1">
          {renamingId === group.id ? (
            <input
              autoFocus
              value={renameValue}
              onChange={(e) => setRenameValue(e.target.value)}
              onBlur={() => submitRename(group.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter") submitRename(group.id);
                if (e.key === "Escape") setRenamingId(null);
              }}
              className="w-28 rounded border border-outline-variant/15 bg-surface-container-lowest px-2 py-0.5 text-label-md text-on-surface outline-none focus:shadow-glow-primary"
            />
          ) : (
            <button
              type="button"
              onClick={() => onSelect(group.id)}
              className={`rounded-full px-3 py-1 text-label-md uppercase tracking-widest transition-colors duration-150 ${
                activeGroupId === group.id
                  ? "bg-primary/20 text-primary"
                  : "bg-surface-container-high text-on-surface-variant hover:text-on-surface"
              }`}
            >
              {group.name}
            </button>
          )}

          {activeGroupId === group.id && renamingId !== group.id && (
            <div className="flex gap-1">
              <button
                type="button"
                aria-label="Rename group"
                onClick={() => startRename(group)}
                className="text-label-sm text-on-surface-variant hover:text-on-surface"
              >
                ✏️
              </button>
              {groups.length > 1 && (
                <button
                  type="button"
                  aria-label="Delete group"
                  onClick={() => onDelete(group.id)}
                  className="text-label-sm text-on-surface-variant hover:text-red-400"
                >
                  ✕
                </button>
              )}
            </div>
          )}
        </div>
      ))}

      {creating ? (
        <input
          autoFocus
          placeholder="Group name…"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onBlur={submitCreate}
          onKeyDown={(e) => {
            if (e.key === "Enter") submitCreate();
            if (e.key === "Escape") {
              setNewName("");
              setCreating(false);
            }
          }}
          className="w-32 rounded border border-outline-variant/15 bg-surface-container-lowest px-2 py-0.5 text-label-md text-on-surface outline-none focus:shadow-glow-primary"
        />
      ) : (
        <button
          type="button"
          onClick={() => setCreating(true)}
          className="rounded-full px-3 py-1 text-label-md text-on-surface-variant transition-colors hover:text-on-surface"
        >
          + New
        </button>
      )}
    </div>
  );
};

export default GroupSelector;
