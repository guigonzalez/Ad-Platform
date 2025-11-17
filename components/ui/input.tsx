import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          "w-full px-3 py-2 border-2 border-black text-sm font-medium bg-white rounded-xl neo-shadow-sm",
          "focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2",
          "disabled:bg-gray-100 disabled:cursor-not-allowed disabled:border-gray-400",
          "placeholder:text-gray-400 placeholder:font-normal",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
