import React, { useEffect, useState } from "react";

type ResultRevealProps = {
  resultKey: number;
  onRedo: () => void;
  children: React.ReactNode;
};

const ResultReveal: React.FC<ResultRevealProps> = ({ resultKey, onRedo, children }) => {
  const [visible, setVisible] = useState(false);

  // biome-ignore lint/correctness/useExhaustiveDependencies: resultKey is a prop used to trigger re-animation
  useEffect(() => {
    setVisible(false);
    const outer = requestAnimationFrame(() => {
      const inner = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(inner);
    });
    return () => cancelAnimationFrame(outer);
  }, [resultKey]);

  return (
    <div className="flex flex-col gap-3">
      <div
        className={`transition-all duration-300 ease-out ${
          visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
        }`}
      >
        {children}
      </div>
      <button
        type="button"
        onClick={onRedo}
        className="self-center text-label-md uppercase tracking-widest text-on-surface-variant transition-colors hover:text-on-surface"
      >
        ↺ Again
      </button>
    </div>
  );
};

export default ResultReveal;
