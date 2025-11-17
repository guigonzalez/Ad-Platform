import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          ref={ref}
          className={cn(
            "w-5 h-5 border-2 border-black bg-white appearance-none checked:bg-blue-600",
            "focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50 disabled:border-gray-400",
            "checked:border-black relative",
            "checked:after:content-['✓'] checked:after:absolute checked:after:text-white checked:after:font-bold",
            "checked:after:left-1/2 checked:after:top-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2",
            className
          )}
          {...props}
        />
        {label && <span className="text-sm text-black font-medium">{label}</span>}
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";
