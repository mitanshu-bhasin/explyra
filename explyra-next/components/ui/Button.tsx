import React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "teal" | "amber";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading, children, ...props }, ref) => {
    
    const variants = {
      primary: "bg-[var(--blue)] text-white hover:brightness-110 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_color-mix(in_srgb,var(--blue)_35%,transparent)]",
      secondary: "bg-[var(--bg3)] text-[var(--ink)] border border-[var(--bdr2)] hover:border-[var(--blue)] hover:text-[var(--blue)]",
      outline: "bg-transparent border-[1.5px] border-[var(--blue-b)] text-[var(--blue)] hover:bg-[var(--blue-g)]",
      ghost: "bg-transparent text-[var(--ink2)] hover:bg-[var(--bg3)] hover:text-[var(--ink)]",
      teal: "bg-[var(--teal)] text-white hover:brightness-110 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_color-mix(in_srgb,var(--teal)_35%,transparent)]",
      amber: "bg-[var(--amber)] text-white hover:brightness-110 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_color-mix(in_srgb,var(--amber)_35%,transparent)]",
    };

    const sizes = {
      sm: "h-9 px-4 text-xs",
      md: "h-11 px-6 text-sm",
      lg: "h-14 px-8 text-base",
    };

    return (
      <button
        ref={ref}
        disabled={isLoading || props.disabled}
        className={cn(
          "inline-flex items-center justify-center rounded-[var(--r)] font-semibold whitespace-nowrap transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--blue)] disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {isLoading && (
          <span className="w-4 h-4 mr-2 border-2 border-current border-t-transparent rounded-full animate-spin" />
        )}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
