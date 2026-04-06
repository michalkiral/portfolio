import ResultReveal from "@/apps/randomizer/components/ResultReveal";
import type { Entry } from "@/apps/randomizer/types";
import React, { useState } from "react";

type PairGeneratorProps = {
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

function makePairs(entries: Entry[]): Entry[][] {
  const shuffled = shuffle(entries);
  const pairs: Entry[][] = [];
  for (let i = 0; i < shuffled.length; i += 2) {
    if (i + 1 < shuffled.length) {
      pairs.push([shuffled[i], shuffled[i + 1]]);
    } else {
      pairs[pairs.length - 1].push(shuffled[i]);
    }
  }
  return pairs;
}

const PairGenerator: React.FC<PairGeneratorProps> = ({ entries }) => {
  const [pairs, setPairs] = useState<Entry[][]>([]);
  const [rolling, setRolling] = useState(false);
  const [version, setVersion] = useState(0);

  const generate = () => {
    if (entries.length < 2 || rolling) return;
    setRolling(true);
    setPairs([]);
    setTimeout(() => {
      setPairs(makePairs(entries));
      setVersion((v) => v + 1);
      setRolling(false);
    }, 500);
  };

  if (entries.length < 2) {
    return (
      <p className="text-body-md text-on-surface-variant">
        Add at least 2 entries to generate pairs.
      </p>
    );
  }

  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <button
        type="button"
        onClick={generate}
        disabled={rolling}
        className="rounded-lg bg-gradient-to-r from-primary to-primary-container px-6 py-2.5 text-label-md font-medium uppercase tracking-widest text-surface transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {rolling ? "Pairing…" : "Generate Pairs"}
      </button>

      {pairs.length > 0 && (
        <ResultReveal resultKey={version} onRedo={generate}>
          <ol className="flex flex-col gap-2">
            {pairs.map((pair, idx) => (
              <li
                key={idx}
                className="flex items-center gap-2 rounded-lg bg-surface-container px-4 py-3"
              >
                <span className="w-5 shrink-0 text-right text-label-md text-on-surface-variant">
                  {idx + 1}.
                </span>
                <div className="flex flex-1 flex-wrap items-center gap-2">
                  {pair.map((entry, eIdx) => (
                    <React.Fragment key={entry.id}>
                      {eIdx > 0 && <span className="text-label-md text-on-surface-variant">×</span>}
                      <span className="rounded-md bg-surface-container-high px-2 py-0.5 text-body-md text-on-surface">
                        {entry.label}
                      </span>
                    </React.Fragment>
                  ))}
                  {pair.length === 3 && (
                    <span className="ml-auto text-label-sm text-on-surface-variant">(trio)</span>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </ResultReveal>
      )}
    </div>
  );
};

export default PairGenerator;
