import React from "react";

type ButtonVariant = "primary" | "secondary" | "tertiary";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-primary to-primary-container text-surface rounded-lg px-4 py-2 font-medium transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50",
  secondary:
    "border border-outline-variant/15 text-primary rounded-lg px-4 py-2 font-medium transition-colors hover:bg-surface-container-high disabled:cursor-not-allowed disabled:opacity-50",
  tertiary:
    "text-label-md text-on-surface-variant underline decoration-transparent transition-colors hover:text-on-surface hover:decoration-on-surface-variant disabled:cursor-not-allowed disabled:opacity-50",
};

const Button: React.FC<ButtonProps> = ({
  variant = "secondary",
  className,
  children,
  ...props
}) => {
  const classes = [variantClasses[variant], className].filter(Boolean).join(" ");

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;
