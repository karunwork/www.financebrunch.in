import * as React from "react";
import { cn } from "@/lib/utils";

export type ButtonCategory =
  | "primary"
  | "investment"
  | "calculator"
  | "insurance"
  | "secondary"
  | "success"
  | "warning"
  | "destructive";

export interface AnimatedButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  category?: ButtonCategory;
  rightIcon?: React.ReactNode;
  size?: "sm" | "default" | "lg";
}

export const categoryClassMap: Record<ButtonCategory, string> = {
  primary: "fb-btn-primary",
  investment: "fb-btn-investment",
  calculator: "fb-btn-calculator",
  insurance: "fb-btn-insurance",
  secondary: "fb-btn-secondary",
  success: "fb-btn-success",
  warning: "fb-btn-warning",
  destructive: "fb-btn-destructive",
};

export const sizeClasses = {
  sm: {
    btn: "h-9 text-xs",
    text: "px-3.5 py-1.5",
    icon: "px-2.5",
  },
  default: {
    btn: "h-10 text-sm",
    text: "px-4 py-2",
    icon: "px-3",
  },
  lg: {
    btn: "h-12 text-base",
    text: "px-6 py-2.5",
    icon: "px-4",
  },
};

export function LightStreaksOverlay() {
  return (
    <span className="fb-btn-streaks-container" aria-hidden="true">
      <span className="fb-btn-streak fb-btn-streak-1" />
      <span className="fb-btn-streak fb-btn-streak-2" />
      <span className="fb-btn-streak fb-btn-streak-3" />
      <span className="fb-btn-streak-glow" />
    </span>
  );
}

export const AnimatedButton = React.forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  (
    {
      className,
      category = "primary",
      rightIcon,
      size = "default",
      children,
      disabled,
      type = "button",
      ...props
    },
    ref
  ) => {
    const sizeStyle = sizeClasses[size] || sizeClasses.default;

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        className={cn(
          "fb-btn-animated group inline-flex items-stretch justify-center text-white select-none cursor-pointer",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900",
          categoryClassMap[category] || categoryClassMap.primary,
          sizeStyle.btn,
          className
        )}
        {...props}
      >
        {/* Continuous horizontal light streaks */}
        <LightStreaksOverlay />

        {/* Text Area */}
        <span
          className={cn(
            "relative z-10 flex-1 inline-flex items-center justify-center font-semibold tracking-wide gap-2",
            sizeStyle.text
          )}
        >
          {children}
        </span>

        {/* Optional compact right icon block with divider */}
        {rightIcon && (
          <span
            className={cn(
              "relative z-10 inline-flex items-center justify-center border-l border-white/20 bg-black/10 dark:bg-black/20 group-hover:bg-black/15 transition-colors shrink-0",
              sizeStyle.icon
            )}
            aria-hidden="true"
          >
            {rightIcon}
          </span>
        )}
      </button>
    );
  }
);

AnimatedButton.displayName = "AnimatedButton";

export default AnimatedButton;
