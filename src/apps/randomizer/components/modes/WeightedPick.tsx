import ResultReveal from "@/apps/randomizer/components/ResultReveal";
import type { Entry } from "@/apps/randomizer/types";
import React, { useState } from "react";

type WeightedPickProps = {
  entries: Entry[];
  onUpdate: (id: string, changes: Partial<Omit<Entry, "id">>) => void;
};

function weightedRandom(entries: Entry[]): Entry {
  const total = entries.reduce((s, e) => s + Math.max(0, e.weight), 0);
  let cursor = Math.random() * total;
  for (const entry of entries) {
    cursor -= Math.max(0, entry.weight);
    if (cursor <= 0) return entry;
  }
  return entries[entries.length - 1];
}

const WeightedPick: React.FC<WeightedPickProps> = ({ entries, onUpdate }) => {
  const [result, setResult] = useState<Entry | null>(null);
  const [rolling, setRolling] = useState(false);
  const [version, setVersion] = useState(0);

  const totalWeight = entries.reduce((s, e) => s + Math.max(0, e.weight), 0);

  const pick = () => {
    if (entries.length === 0 || totalWeight === 0 || rolling) return;
    setRolling(true);
    setResult(null);
    setTimeout(() => {
      setResult(weightedRandom(entries));
      setVersion((v) => v + 1);
      setRolling(false);
    }, 500);
  };

  const setWeight = (id: string, raw: string) => {
    const n = Math.max(0, Math.floor(Number(raw)));
    if (!Number.isNaN(n)) onUpdate(id, { weight: n });
  };

  if (entries.length === 0) {
    return (
      <p className="text-body-md text-on-surface-variant">Add entries in the panel on the left.</p>
    );
  }

  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <ul className="flex flex-col gap-2">
        {entries.map((entry) => {
          const pct =
            totalWeight > 0 ? Math.round((Math.max(0, entry.weight) / totalWeight) * 100) : 0;
          return (
            <li
              key={entry.id}
              className="flex flex-col gap-1.5 rounded-lg bg-surface-container px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <span className="flex-1 text-body-md text-on-surface">{entry.label}</span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setWeight(entry.id, String(entry.weight - 1))}
                    className="flex h-6 w-6 items-center justify-center rounded bg-surface-container-high text-label-sm text-on-surface-variant hover:text-on-surface"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    min="0"
                    value={entry.weight}
                    onChange={(e) => setWeight(entry.id, e.target.value)}
                    className="w-12 rounded border border-outline-variant/15 bg-surface-container-lowest px-2 py-0.5 text-center text-body-md text-on-surface outline-none focus:shadow-glow-primary"
                  />
                  <button
                    type="button"
                    onClick={() => setWeight(entry.id, String(entry.weight + 1))}
                    className="flex h-6 w-6 items-center justify-center rounded bg-surface-container-high text-label-sm text-on-surface-variant hover:text-on-surface"
                  >
                    +
                  </button>
                </div>
                <span className="w-10 text-right text-label-md text-on-surface-variant">
                  {pct}%
                </span>
              </div>
              <div className="h-1 overflow-hidden rounded-full bg-surface-container-high">
                <div
                  className="h-full rounded-full bg-primary/50 transition-all duration-300"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </li>
          );
        })}
      </ul>

      <button
        type="button"
        onClick={pick}
        disabled={rolling || totalWeight === 0}
        className="rounded-lg bg-gradient-to-r from-primary to-primary-container px-6 py-2.5 text-label-md font-medium uppercase tracking-widest text-surface transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {rolling ? "Picking…" : "Pick"}
      </button>

      {(result || rolling) && (
        <div className="flex min-h-16 w-full items-center justify-center rounded-xl bg-surface-container px-6 py-4">
          {rolling && (
            <p className="text-label-md uppercase tracking-widest text-on-surface-variant">
              Picking…
            </p>
          )}
          {!rolling && result && (
            <ResultReveal resultKey={version} onRedo={pick}>
              <p className="text-center text-headline-md font-bold text-on-surface">
                {result.label}
              </p>
            </ResultReveal>
          )}
        </div>
      )}
    </div>
  );
};

export default WeightedPick;
