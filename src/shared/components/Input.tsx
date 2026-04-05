import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

const Input: React.FC<InputProps> = ({ label, error, className, id, ...props }) => {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-label-md text-on-surface-variant uppercase">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={[
          "rounded-lg bg-surface-container-lowest px-4 py-2.5 text-body-md text-on-surface",
          "placeholder:text-on-surface-variant/50",
          "border border-outline-variant/15",
          "outline-none transition-shadow duration-150",
          "focus:shadow-glow-primary",
          "disabled:cursor-not-allowed disabled:opacity-50",
          error ? "border-red-400/50" : "",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      />
      {error && <p className="text-label-md text-red-400">{error}</p>}
    </div>
  );
};

export default Input;
