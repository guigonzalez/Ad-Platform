import { cn } from "@/lib/utils";
import { SelectHTMLAttributes, forwardRef } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={cn(
          "w-full px-3 py-2 border-2 border-black text-sm font-medium bg-white rounded-xl neo-shadow-sm",
          "focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2",
          "disabled:bg-gray-100 disabled:cursor-not-allowed disabled:border-gray-400",
          className
        )}
        {...props}
      >
        {children}
      </select>
    );
  }
);

Select.displayName = "Select";
