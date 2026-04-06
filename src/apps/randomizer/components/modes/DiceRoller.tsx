import React, { useState } from "react";

const DICE = [4, 6, 8, 10, 12, 20, 100] as const;
type Die = (typeof DICE)[number];

const DiceRoller: React.FC = () => {
  const [die, setDie] = useState<Die>(6);
  const [count, setCount] = useState(1);
  const [results, setResults] = useState<number[]>([]);
  const [rolling, setRolling] = useState(false);

  const roll = () => {
    if (rolling) return;
    setRolling(true);
    setResults([]);
    setTimeout(() => {
      setResults(Array.from({ length: count }, () => Math.floor(Math.random() * die) + 1));
      setRolling(false);
    }, 500);
  };

  const total = results.reduce((s, n) => s + n, 0);

  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <div className="flex flex-wrap gap-2">
        {DICE.map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => setDie(d)}
            className={`rounded-lg px-4 py-2 text-label-md uppercase tracking-widest transition-colors duration-150 ${
              die === d
                ? "bg-primary/20 text-primary"
                : "bg-surface-container-high text-on-surface-variant hover:text-on-surface"
            }`}
          >
            d{d}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <span className="text-label-md uppercase tracking-widest text-on-surface-variant">
          Count
        </span>
        <button
          type="button"
          onClick={() => setCount((c) => Math.max(1, c - 1))}
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-container-high text-on-surface-variant hover:text-on-surface"
        >
          −
        </button>
        <span className="w-6 text-center text-body-md text-on-surface">{count}</span>
        <button
          type="button"
          onClick={() => setCount((c) => Math.min(20, c + 1))}
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-container-high text-on-surface-variant hover:text-on-surface"
        >
          +
        </button>
      </div>

      <button
        type="button"
        onClick={roll}
        disabled={rolling}
        className="rounded-lg bg-gradient-to-r from-primary to-primary-container px-6 py-2.5 text-label-md font-medium uppercase tracking-widest text-surface transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {rolling ? "Rolling…" : `Roll ${count}d${die}`}
      </button>

      {results.length > 0 && (
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap gap-2">
            {results.map((n, i) => (
              <span
                key={i}
                className="rounded-lg bg-surface-container-high px-4 py-2 text-headline-sm font-bold text-on-surface"
              >
                {n}
              </span>
            ))}
          </div>
          {count > 1 && (
            <p className="text-label-md uppercase tracking-widest text-on-surface-variant">
              Total: <span className="text-on-surface font-bold">{total}</span>
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default DiceRoller;
