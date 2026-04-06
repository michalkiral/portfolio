import EntryList from "@/apps/randomizer/components/EntryList";
import GroupSelector from "@/apps/randomizer/components/GroupSelector";
import CoinFlip from "@/apps/randomizer/components/modes/CoinFlip";
import { useGroups } from "@/apps/randomizer/hooks/useGroups";
import type { Mode } from "@/apps/randomizer/types";
import AppLayout from "@/shared/components/AppLayout";
import React, { useState } from "react";

const MODES: { id: Mode; label: string; icon: string }[] = [
  { id: "coin-flip", label: "Coin Flip", icon: "🪙" },
  { id: "number-generator", label: "Numbers", icon: "🔢" },
  { id: "order-shuffle", label: "Shuffle", icon: "🔀" },
  { id: "single-pick", label: "Pick One", icon: "👆" },
  { id: "dice-roller", label: "Dice", icon: "🎲" },
  { id: "pair-generator", label: "Pairs", icon: "🤝" },
  { id: "team-generator", label: "Teams", icon: "👥" },
  { id: "weighted-pick", label: "Weighted", icon: "⚖️" },
];

const MODES_WITHOUT_ENTRIES: Mode[] = ["coin-flip", "number-generator", "dice-roller"];

const RandomizerScreen: React.FC = () => {
  const [activeMode, setActiveMode] = useState<Mode>("coin-flip");
  const {
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
  } = useGroups();

  const showEntries = !MODES_WITHOUT_ENTRIES.includes(activeMode);

  return (
    <AppLayout title="Randomizer">
      <div className="flex h-full flex-col">
        <div className="border-b border-outline-variant/15 bg-surface-container-low">
          <div className="flex overflow-x-auto">
            {MODES.map((mode) => (
              <button
                key={mode.id}
                type="button"
                onClick={() => setActiveMode(mode.id)}
                className={`flex shrink-0 flex-col items-center gap-1 px-5 py-3 text-label-md uppercase tracking-widest transition-colors duration-150 ${
                  activeMode === mode.id
                    ? "border-b-2 border-primary text-primary"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                <span className="text-lg">{mode.icon}</span>
                {mode.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {showEntries && (
            <aside className="flex w-72 shrink-0 flex-col gap-4 overflow-y-auto border-r border-outline-variant/15 p-4">
              <GroupSelector
                groups={groups}
                activeGroupId={activeGroupId}
                onSelect={setActiveGroupId}
                onCreate={createGroup}
                onRename={renameGroup}
                onDelete={deleteGroup}
              />
              <EntryList
                entries={activeGroup.entries}
                onAdd={addEntry}
                onRemove={removeEntry}
                onUpdate={updateEntry}
                onMove={moveEntry}
              />
            </aside>
          )}

          <main className="flex flex-1 items-center justify-center overflow-y-auto p-8">
            {activeMode === "coin-flip" && <CoinFlip />}
            {activeMode !== "coin-flip" && (
              <p className="text-body-md text-on-surface-variant">
                {MODES.find((m) => m.id === activeMode)?.label} — coming soon.
              </p>
            )}
          </main>
        </div>
      </div>
    </AppLayout>
  );
};

export default RandomizerScreen;
