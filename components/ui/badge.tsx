import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "danger" | "info";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  const variants = {
    default: "bg-white text-black border-black neo-shadow-sm",
    success: "bg-green-400 text-black border-black neo-shadow-sm",
    warning: "bg-yellow-300 text-black border-black neo-shadow-sm",
    danger: "bg-pink-500 text-white border-black neo-shadow-pink",
    info: "bg-blue-400 text-white border-black neo-shadow-blue",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 text-xs font-bold uppercase border-2 rounded-full",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
