import ResultReveal from "@/apps/randomizer/components/ResultReveal";
import type { Entry } from "@/apps/randomizer/types";
import React, { useState } from "react";

type SinglePickProps = {
  entries: Entry[];
};

const SinglePick: React.FC<SinglePickProps> = ({ entries }) => {
  const [result, setResult] = useState<Entry | null>(null);
  const [rolling, setRolling] = useState(false);
  const [version, setVersion] = useState(0);

  const pick = () => {
    if (entries.length === 0 || rolling) return;
    setRolling(true);
    setResult(null);
    setTimeout(() => {
      setResult(entries[Math.floor(Math.random() * entries.length)]);
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
    <div className="flex w-full max-w-sm flex-col items-center gap-8">
      <button
        type="button"
        onClick={pick}
        disabled={rolling}
        className="rounded-lg bg-gradient-to-r from-primary to-primary-container px-6 py-2.5 text-label-md font-medium uppercase tracking-widest text-surface transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {rolling ? "Picking…" : "Pick One"}
      </button>

      <div className="flex min-h-24 w-full items-center justify-center rounded-xl bg-surface-container px-6 py-5">
        {rolling && (
          <p className="text-label-md uppercase tracking-widest text-on-surface-variant">
            Picking…
          </p>
        )}
        {!rolling && result && (
          <ResultReveal resultKey={version} onRedo={pick}>
            <p className="text-center text-headline-md font-bold text-on-surface">{result.label}</p>
          </ResultReveal>
        )}
        {!rolling && !result && (
          <p className="text-body-md text-on-surface-variant">Your pick will appear here.</p>
        )}
      </div>
    </div>
  );
};

export default SinglePick;
