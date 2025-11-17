import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/lib/i18n/context";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: "up" | "down";
  icon: LucideIcon;
  iconColor?: string;
}

export function MetricCard({
  title,
  value,
  change,
  trend,
  icon: Icon,
  iconColor = "bg-purple-500",
}: MetricCardProps) {
  const { t } = useTranslation();

  return (
    <Card className="hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-bold text-gray-700 uppercase tracking-wide">{title}</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
            {change && (
              <p className="text-sm mt-2 flex items-center gap-1">
                <span
                  className={cn(
                    "font-bold px-2 py-0.5 rounded-full border-2 border-black",
                    trend === "up" ? "bg-green-400 text-black" : "bg-pink-500 text-white"
                  )}
                >
                  {change}
                </span>
                <span className="text-gray-600 font-medium">{t.dashboard.metrics.vsLastMonth}</span>
              </p>
            )}
          </div>
          <div
            className={cn(
              "w-14 h-14 rounded-2xl flex items-center justify-center border-2 border-black neo-shadow-sm",
              iconColor
            )}
          >
            <Icon className="w-7 h-7 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
