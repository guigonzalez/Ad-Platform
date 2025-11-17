"use client";

import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, label, checked, ...props }, ref) => {
    return (
      <label className="inline-flex items-center gap-3 cursor-pointer">
        <div className="relative">
          <input
            type="checkbox"
            ref={ref}
            checked={checked}
            className="sr-only peer"
            {...props}
          />
          <div
            className={cn(
              "w-14 h-7 bg-gray-200 border-2 border-black",
              "peer-checked:bg-blue-600",
              "peer-focus:ring-2 peer-focus:ring-black peer-focus:ring-offset-2",
              "transition-colors duration-0",
              "peer-disabled:opacity-50 peer-disabled:cursor-not-allowed"
            )}
          />
          <div
            className={cn(
              "absolute left-0.5 top-0.5 w-5 h-5 bg-white border-2 border-black brutalist-shadow-sm transition-transform duration-0",
              "peer-checked:translate-x-7"
            )}
          />
        </div>
        {label && <span className="text-sm text-black font-medium">{label}</span>}
      </label>
    );
  }
);

Switch.displayName = "Switch";
