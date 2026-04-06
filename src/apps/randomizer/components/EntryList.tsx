import type { Entry } from "@/apps/randomizer/types";
import React, { useState } from "react";

type EntryListProps = {
  entries: Entry[];
  onAdd: (label: string) => void;
  onRemove: (id: string) => void;
  onUpdate: (id: string, changes: Partial<Omit<Entry, "id">>) => void;
  onMove: (id: string, direction: "up" | "down") => void;
};

const EntryList: React.FC<EntryListProps> = ({ entries, onAdd, onRemove, onUpdate, onMove }) => {
  const [draft, setDraft] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  const submitDraft = () => {
    const lines = draft
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);
    for (const line of lines) onAdd(line);
    setDraft("");
  };

  const startEdit = (entry: Entry) => {
    setEditingId(entry.id);
    setEditValue(entry.label);
  };

  const submitEdit = (id: string) => {
    const trimmed = editValue.trim();
    if (trimmed) onUpdate(id, { label: trimmed });
    setEditingId(null);
  };

  return (
    <div className="flex flex-col gap-3">
      <ul className="flex flex-col gap-1">
        {entries.length === 0 && (
          <li className="py-2 text-body-md text-on-surface-variant">
            No entries yet — add some below.
          </li>
        )}
        {entries.map((entry, idx) => (
          <li
            key={entry.id}
            className="flex items-center gap-2 rounded-lg bg-surface-container px-3 py-2"
          >
            <div className="flex flex-col">
              <button
                type="button"
                aria-label="Move up"
                disabled={idx === 0}
                onClick={() => onMove(entry.id, "up")}
                className="text-label-sm leading-none text-on-surface-variant hover:text-on-surface disabled:opacity-20"
              >
                ▲
              </button>
              <button
                type="button"
                aria-label="Move down"
                disabled={idx === entries.length - 1}
                onClick={() => onMove(entry.id, "down")}
                className="text-label-sm leading-none text-on-surface-variant hover:text-on-surface disabled:opacity-20"
              >
                ▼
              </button>
            </div>

            {editingId === entry.id ? (
              <input
                autoFocus
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onBlur={() => submitEdit(entry.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") submitEdit(entry.id);
                  if (e.key === "Escape") setEditingId(null);
                }}
                className="flex-1 rounded border border-outline-variant/15 bg-surface-container-lowest px-2 py-0.5 text-body-md text-on-surface outline-none focus:shadow-glow-primary"
              />
            ) : (
              <span
                className="flex-1 cursor-pointer text-body-md text-on-surface"
                onClick={() => startEdit(entry)}
                onKeyDown={(e) => e.key === "Enter" && startEdit(entry)}
                role="button"
                tabIndex={0}
              >
                {entry.label}
              </span>
            )}

            <button
              type="button"
              aria-label="Remove entry"
              onClick={() => onRemove(entry.id)}
              className="ml-auto text-label-sm text-on-surface-variant transition-colors hover:text-red-400"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      <div className="flex gap-2">
        <textarea
          placeholder={"Add entries… (one per line)"}
          value={draft}
          rows={draft.includes("\n") ? 4 : 1}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              submitDraft();
            }
          }}
          className="flex-1 resize-none rounded-lg border border-outline-variant/15 bg-surface-container-lowest px-3 py-2 text-body-md text-on-surface placeholder:text-on-surface-variant/50 outline-none transition-shadow duration-150 focus:shadow-glow-primary"
        />
        <button
          type="button"
          onClick={submitDraft}
          disabled={!draft.trim()}
          className="rounded-lg border border-outline-variant/15 px-4 py-2 text-label-md text-primary transition-colors hover:bg-surface-container-high disabled:cursor-not-allowed disabled:opacity-40"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default EntryList;
