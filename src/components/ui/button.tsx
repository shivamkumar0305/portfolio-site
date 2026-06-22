import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "secondary";
  size?: "default" | "sm" | "lg";
}

export function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-stone-500 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] font-mono text-xs uppercase tracking-wider",
        {
          "bg-[#F5F5F4] text-[#0C0A09] hover:bg-[#E7E7E4]": variant === "default",
          "border border-stone-800 bg-[#0C0A09]/40 text-[#F5F5F4] hover:border-stone-700 hover:bg-stone-900": variant === "outline",
          "bg-stone-900 text-stone-100 hover:bg-stone-800": variant === "secondary",
          "text-stone-400 hover:bg-stone-900 hover:text-stone-100": variant === "ghost",
        },
        {
          "h-10 px-5 py-2": size === "default",
          "h-8 px-4 py-1.5": size === "sm",
          "h-12 px-8 text-sm": size === "lg",
        },
        className
      )}
      {...props}
    />
  );
}
