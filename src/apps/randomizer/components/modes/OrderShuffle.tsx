import ResultReveal from "@/apps/randomizer/components/ResultReveal";
import type { Entry } from "@/apps/randomizer/types";
import React, { useState } from "react";

type OrderShuffleProps = {
  entries: Entry[];
};

function shuffle<T>(arr: T[]): T[] {
  const next = [...arr];
  for (let i = next.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

const OrderShuffle: React.FC<OrderShuffleProps> = ({ entries }) => {
  const [result, setResult] = useState<Entry[]>([]);
  const [rolling, setRolling] = useState(false);
  const [version, setVersion] = useState(0);

  const run = () => {
    if (entries.length === 0 || rolling) return;
    setRolling(true);
    setResult([]);
    setTimeout(() => {
      setResult(shuffle(entries));
      setVersion((v) => v + 1);
      setRolling(false);
    }, 500);
  };

  if (entries.length === 0) {
    return (
      <p className="text-body-md text-on-surface-variant">Add entries in the panel on the left.</p>
    );
  }

  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <button
        type="button"
        onClick={run}
        disabled={rolling}
        className="rounded-lg bg-gradient-to-r from-primary to-primary-container px-6 py-2.5 text-label-md font-medium uppercase tracking-widest text-surface transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {rolling ? "Shuffling…" : "Shuffle"}
      </button>

      {result.length > 0 && (
        <ResultReveal resultKey={version} onRedo={run}>
          <ol className="flex flex-col gap-2">
            {result.map((entry, idx) => (
              <li
                key={entry.id}
                className="flex items-center gap-3 rounded-lg bg-surface-container px-4 py-3"
              >
                <span className="w-6 text-right text-label-md text-on-surface-variant">
                  {idx + 1}.
                </span>
                <span className="text-body-md text-on-surface">{entry.label}</span>
              </li>
            ))}
          </ol>
        </ResultReveal>
      )}
    </div>
  );
};

export default OrderShuffle;
