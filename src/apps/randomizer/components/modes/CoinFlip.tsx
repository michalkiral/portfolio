import ResultReveal from "@/apps/randomizer/components/ResultReveal";
import React, { useState } from "react";

type Side = "heads" | "tails";

const CoinFlip: React.FC = () => {
  const [result, setResult] = useState<Side | null>(null);
  const [flipping, setFlipping] = useState(false);
  const [version, setVersion] = useState(0);

  const flip = () => {
    if (flipping) return;
    setFlipping(true);
    setResult(null);
    setTimeout(() => {
      setResult(Math.random() < 0.5 ? "heads" : "tails");
      setVersion((v) => v + 1);
      setFlipping(false);
    }, 600);
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <button
        type="button"
        onClick={flip}
        disabled={flipping}
        aria-label="Flip coin"
        className={`flex h-36 w-36 items-center justify-center rounded-full border-4 text-6xl shadow-ambient transition-all duration-150 select-none ${
          flipping
            ? "animate-spin border-outline-variant/30 bg-surface-container"
            : "border-primary/30 bg-surface-container-high hover:border-primary/60 hover:bg-surface-container-highest active:scale-95"
        }`}
      >
        🪙
      </button>

      <div className="flex h-12 items-center justify-center">
        {flipping && (
          <p className="text-label-md uppercase tracking-widest text-on-surface-variant">
            Flipping…
          </p>
        )}
        {!flipping && result && (
          <ResultReveal resultKey={version} onRedo={flip}>
            <p className="text-headline-lg font-bold capitalize text-on-surface">{result}</p>
          </ResultReveal>
        )}
        {!flipping && !result && (
          <p className="text-body-md text-on-surface-variant">Tap the coin to flip</p>
        )}
      </div>
    </div>
  );
};

export default CoinFlip;
