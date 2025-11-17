"use client";

import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, label, checked, ...props }, ref) => {
    return (
      <label className="inline-flex items-center gap-2.5 cursor-pointer group">
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
              "w-12 h-6 bg-gray-100 rounded-xl border-2 border-gray-300",
              "peer-checked:bg-purple-100 peer-checked:border-purple-500",
              "peer-focus:ring-2 peer-focus:ring-purple-300 peer-focus:ring-offset-1",
              "transition-all duration-200 ease-in-out",
              "peer-disabled:opacity-50 peer-disabled:cursor-not-allowed"
            )}
          />
          <div
            className={cn(
              "absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-lg",
              "shadow-[1px_1px_0px_0px_rgba(0,0,0,0.1)]",
              "transition-all duration-200 ease-in-out",
              "peer-checked:translate-x-6 peer-checked:border-2 peer-checked:border-purple-500 peer-checked:bg-purple-500"
            )}
          />
        </div>
        {label && <span className="text-sm text-gray-700 font-medium select-none">{label}</span>}
      </label>
    );
  }
);

Switch.displayName = "Switch";
