import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import {
  ButtonCategory,
  categoryClassMap,
  LightStreaksOverlay,
  AnimatedButton,
} from "@/components/ui/animated-button"

export type { ButtonCategory }
export { AnimatedButton }

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        animated: "fb-btn-animated text-white border-0",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  category?: ButtonCategory;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      category,
      rightIcon,
      asChild = false,
      children,
      ...props
    },
    ref
  ) => {
    // If category is provided, render animated button with streaks & split-icon support
    if (category) {
      if (asChild) {
        return (
          <Slot
            className={cn(
              "fb-btn-animated group inline-flex items-stretch justify-center text-white",
              categoryClassMap[category] || categoryClassMap.primary,
              buttonVariants({ size, className })
            )}
            ref={ref}
            {...props}
          >
            {children}
          </Slot>
        );
      }

      const hasRightIcon = Boolean(rightIcon);

      if (!hasRightIcon) {
        return (
          <button
            ref={ref}
            className={cn(
              "fb-btn-animated group text-white select-none cursor-pointer",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900",
              categoryClassMap[category] || categoryClassMap.primary,
              buttonVariants({ size, className })
            )}
            {...props}
          >
            {/* Continuous horizontal light streaks */}
            <LightStreaksOverlay />

            {/* Inner Content */}
            <span className="relative z-10 inline-flex items-center justify-center gap-2">
              {children}
            </span>
          </button>
        );
      }

      return (
        <button
          ref={ref}
          className={cn(
            "fb-btn-animated group inline-flex items-stretch justify-center text-white select-none cursor-pointer !p-0 overflow-hidden",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900",
            categoryClassMap[category] || categoryClassMap.primary,
            size === "sm" ? "h-9 text-xs" : size === "lg" ? "h-11 text-sm font-semibold" : "h-10 text-sm",
            className
          )}
          {...props}
        >
          {/* Continuous horizontal light streaks */}
          <LightStreaksOverlay />

          {/* Text Area */}
          <span
            className={cn(
              "relative z-10 flex-1 inline-flex items-center justify-center font-medium gap-2",
              size === "sm" ? "px-2.5 py-1" : size === "lg" ? "px-4 py-2" : "px-3 py-1.5"
            )}
          >
            {children}
          </span>

          {/* Distinct right icon block with subtle dividing border */}
          <span
            className={cn(
              "relative z-10 inline-flex items-center justify-center border-l border-white/20 bg-black/10 dark:bg-black/20 group-hover:bg-black/15 transition-colors shrink-0",
              size === "sm" ? "px-2" : size === "lg" ? "px-3" : "px-2.5"
            )}
            aria-hidden="true"
          >
            {rightIcon}
          </span>
        </button>
      );
    }

    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

