"use client";

import { MetricCard } from "@/components/dashboard/metric-card";
import { PerformanceChart } from "@/components/dashboard/performance-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";
import { formatCurrency, formatNumber, formatPercentage } from "@/lib/utils";
import { useTranslation } from "@/lib/i18n/context";
import { DollarSign, MousePointerClick, Target, TrendingUp, Pause, Play } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const campaigns = useStore((state) => state.campaigns);
  const pauseCampaign = useStore((state) => state.pauseCampaign);
  const resumeCampaign = useStore((state) => state.resumeCampaign);
  const { t } = useTranslation();

  // Calculate aggregate metrics
  const totalSpend = campaigns.reduce((sum, c) => sum + c.spent, 0);
  const totalClicks = campaigns.reduce((sum, c) => sum + c.clicks, 0);
  const totalConversions = campaigns.reduce((sum, c) => sum + c.conversions, 0);
  const avgCtr = campaigns.reduce((sum, c) => sum + c.ctr, 0) / campaigns.length;

  // Get top 5 performing campaigns by CTR
  const topCampaigns = [...campaigns]
    .filter((c) => c.status === "ACTIVE")
    .sort((a, b) => b.ctr - a.ctr)
    .slice(0, 5);

  // Platform comparison
  const googleCampaigns = campaigns.filter((c) => c.platform === "GOOGLE");
  const metaCampaigns = campaigns.filter((c) => c.platform === "META");

  const googleSpend = googleCampaigns.reduce((sum, c) => sum + c.spent, 0);
  const metaSpend = metaCampaigns.reduce((sum, c) => sum + c.spent, 0);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{t.dashboard.title}</h1>
        <p className="text-gray-500 mt-1">{t.dashboard.subtitle}</p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title={t.dashboard.metrics.totalSpend}
          value={formatCurrency(totalSpend)}
          change="+12.5%"
          trend="up"
          icon={DollarSign}
          iconColor="bg-blue-500"
        />
        <MetricCard
          title={t.dashboard.metrics.totalClicks}
          value={formatNumber(totalClicks)}
          change="+8.2%"
          trend="up"
          icon={MousePointerClick}
          iconColor="bg-green-500"
        />
        <MetricCard
          title={t.dashboard.metrics.avgCtr}
          value={formatPercentage(avgCtr)}
          change="+0.3%"
          trend="up"
          icon={Target}
          iconColor="bg-purple-500"
        />
        <MetricCard
          title={t.dashboard.metrics.conversions}
          value={formatNumber(totalConversions)}
          change="+15.1%"
          trend="up"
          icon={TrendingUp}
          iconColor="bg-orange-500"
        />
      </div>

      {/* Performance Chart */}
      <PerformanceChart />

      {/* Platform Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              {t.dashboard.platformComparison.googleAds}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">{t.dashboard.platformComparison.totalSpend}</span>
              <span className="text-lg font-bold">{formatCurrency(googleSpend)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">{t.dashboard.platformComparison.activeCampaigns}</span>
              <span className="text-lg font-bold">
                {googleCampaigns.filter((c) => c.status === "ACTIVE").length}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">{t.dashboard.platformComparison.avgCtr}</span>
              <span className="text-lg font-bold">
                {formatPercentage(
                  googleCampaigns.reduce((sum, c) => sum + c.ctr, 0) / googleCampaigns.length
                )}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-500" />
              {t.dashboard.platformComparison.metaAds}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">{t.dashboard.platformComparison.totalSpend}</span>
              <span className="text-lg font-bold">{formatCurrency(metaSpend)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">{t.dashboard.platformComparison.activeCampaigns}</span>
              <span className="text-lg font-bold">
                {metaCampaigns.filter((c) => c.status === "ACTIVE").length}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">{t.dashboard.platformComparison.avgCtr}</span>
              <span className="text-lg font-bold">
                {formatPercentage(
                  metaCampaigns.reduce((sum, c) => sum + c.ctr, 0) / metaCampaigns.length
                )}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Performing Campaigns */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{t.dashboard.topCampaigns.title}</CardTitle>
          <Link href="/dashboard/campaigns">
            <Button variant="ghost" size="sm">
              {t.common.viewAll}
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topCampaigns.map((campaign) => (
              <div
                key={campaign.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-gray-900">{campaign.name}</h4>
                    <Badge
                      variant={campaign.platform === "GOOGLE" ? "info" : "default"}
                      className={
                        campaign.platform === "GOOGLE"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-purple-100 text-purple-800"
                      }
                    >
                      {campaign.platform}
                    </Badge>
                  </div>
                  <div className="flex gap-6 mt-2 text-sm text-gray-600">
                    <span>{t.dashboard.topCampaigns.ctr}: {formatPercentage(campaign.ctr)}</span>
                    <span>{t.dashboard.topCampaigns.spend}: {formatCurrency(campaign.spent)}</span>
                    <span>{t.dashboard.topCampaigns.conversions}: {campaign.conversions}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {campaign.status === "ACTIVE" ? (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => pauseCampaign(campaign.id)}
                    >
                      <Pause className="w-4 h-4" />
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => resumeCampaign(campaign.id)}
                    >
                      <Play className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
