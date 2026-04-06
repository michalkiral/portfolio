import React, { useState } from "react";

type ToggleProps = {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
};

const Toggle: React.FC<ToggleProps> = ({ label, value, onChange }) => (
  <button
    type="button"
    onClick={() => onChange(!value)}
    className={`rounded-full px-3 py-1 text-label-md uppercase tracking-widest transition-colors duration-150 ${
      value
        ? "bg-primary/20 text-primary"
        : "bg-surface-container-high text-on-surface-variant hover:text-on-surface"
    }`}
  >
    {label}
  </button>
);

const inputClass =
  "w-full rounded-lg border border-outline-variant/15 bg-surface-container-lowest px-3 py-2 text-body-md text-on-surface outline-none transition-shadow duration-150 focus:shadow-glow-primary";

const NumberGenerator: React.FC = () => {
  const [min, setMin] = useState("1");
  const [max, setMax] = useState("100");
  const [count, setCount] = useState("1");
  const [decimals, setDecimals] = useState(false);
  const [unique, setUnique] = useState(false);
  const [results, setResults] = useState<number[]>([]);
  const [error, setError] = useState("");

  const generate = () => {
    const rawMin = Number(min);
    const rawMax = Number(max);
    const countVal = Math.max(1, Math.min(100, Math.floor(Number(count))));

    if (Number.isNaN(rawMin) || Number.isNaN(rawMax)) {
      setError("Min and max must be valid numbers.");
      return;
    }
    if (rawMin >= rawMax) {
      setError("Min must be less than max.");
      return;
    }

    setError("");

    if (decimals) {
      setResults(
        Array.from(
          { length: countVal },
          () => Math.round((Math.random() * (rawMax - rawMin) + rawMin) * 100) / 100,
        ),
      );
      return;
    }

    const minVal = Math.ceil(rawMin);
    const maxVal = Math.floor(rawMax);

    if (minVal > maxVal) {
      setError("No integers exist in that range.");
      return;
    }
    if (unique && countVal > maxVal - minVal + 1) {
      setError(`Can't generate ${countVal} unique integers in [${minVal}, ${maxVal}].`);
      return;
    }

    if (unique) {
      const pool = Array.from({ length: maxVal - minVal + 1 }, (_, i) => i + minVal);
      for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
      }
      setResults(pool.slice(0, countVal));
    } else {
      setResults(
        Array.from(
          { length: countVal },
          () => Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal,
        ),
      );
    }
  };

  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <div className="flex gap-3">
        <div className="flex flex-1 flex-col gap-1.5">
          <label className="text-label-md uppercase tracking-widest text-on-surface-variant">
            Min
          </label>
          <input
            type="number"
            value={min}
            onChange={(e) => setMin(e.target.value)}
            className={inputClass}
          />
        </div>
        <div className="flex flex-1 flex-col gap-1.5">
          <label className="text-label-md uppercase tracking-widest text-on-surface-variant">
            Max
          </label>
          <input
            type="number"
            value={max}
            onChange={(e) => setMax(e.target.value)}
            className={inputClass}
          />
        </div>
        <div className="flex w-20 flex-col gap-1.5">
          <label className="text-label-md uppercase tracking-widest text-on-surface-variant">
            Count
          </label>
          <input
            type="number"
            min="1"
            max="100"
            value={count}
            onChange={(e) => setCount(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div className="flex gap-2">
        <Toggle label="Decimals" value={decimals} onChange={setDecimals} />
        <Toggle
          label="Unique"
          value={unique}
          onChange={(v) => {
            setUnique(v);
            if (v) setDecimals(false);
          }}
        />
      </div>

      {error && <p className="text-label-md text-red-400">{error}</p>}

      <button
        type="button"
        onClick={generate}
        className="rounded-lg bg-gradient-to-r from-primary to-primary-container px-6 py-2.5 text-label-md font-medium uppercase tracking-widest text-surface transition-opacity hover:opacity-90"
      >
        Generate
      </button>

      {results.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {results.map((n, i) => (
            <span
              key={`${i}-${n}`}
              className="rounded-lg bg-surface-container-high px-4 py-2 text-headline-sm font-bold text-on-surface"
            >
              {n}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default NumberGenerator;
