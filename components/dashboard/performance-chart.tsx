"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { mockDailyMetrics } from "@/lib/mock-data";
import { useTranslation } from "@/lib/i18n/context";

export function PerformanceChart() {
  const { t } = useTranslation();

  const data = mockDailyMetrics.map((metric) => ({
    date: new Date(metric.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    spend: metric.spend,
    clicks: metric.clicks,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.dashboard.performanceChart.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="date"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              yAxisId="left"
              stroke="#3b82f6"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="#10b981"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
              }}
              formatter={(value: number, name: string) => [
                name === "spend" ? `$${value}` : value,
                name === "spend" ? t.dashboard.performanceChart.spend : t.dashboard.performanceChart.clicks,
              ]}
            />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="spend"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={false}
              name={t.dashboard.performanceChart.spend}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="clicks"
              stroke="#10b981"
              strokeWidth={2}
              dot={false}
              name={t.dashboard.performanceChart.clicks}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
