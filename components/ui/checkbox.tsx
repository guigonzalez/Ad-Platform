import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <label className="flex items-center gap-2.5 cursor-pointer group">
        <input
          type="checkbox"
          ref={ref}
          className={cn(
            "w-5 h-5 rounded-md border-2 border-gray-300 bg-white appearance-none flex-shrink-0",
            "transition-all duration-150 ease-in-out",
            "checked:bg-purple-500 checked:border-purple-500",
            "hover:border-purple-400",
            "focus:outline-none focus:ring-2 focus:ring-purple-200 focus:ring-offset-1",
            "disabled:cursor-not-allowed disabled:opacity-50 disabled:border-gray-300",
            "relative cursor-pointer",
            "checked:after:content-['✓'] checked:after:absolute checked:after:text-white checked:after:font-bold checked:after:text-sm",
            "checked:after:left-1/2 checked:after:top-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2",
            "checked:after:leading-none",
            className
          )}
          {...props}
        />
        {label && (
          <span className="text-sm text-gray-700 font-medium select-none">
            {label}
          </span>
        )}
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";
