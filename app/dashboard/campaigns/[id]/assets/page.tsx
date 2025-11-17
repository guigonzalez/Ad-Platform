import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { useTranslation } from "@/lib/i18n/context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dropdown } from "@/components/ui/dropdown";
import {
  ArrowLeft,
  Search,
  Image as ImageIcon,
  Video,
  FileText,
  TrendingUp,
  TrendingDown,
  Eye,
  MousePointer,
  DollarSign,
  Download,
  Filter,
  BarChart3,
} from "lucide-react";
import { formatCurrency, formatNumber, formatPercentage } from "@/lib/utils";
import type { CreativeAsset } from "@/lib/types/assets";

// Mock data for asset performance
interface AssetPerformance {
  assetId: string;
  impressions: number;
  clicks: number;
  ctr: number;
  conversions: number;
  spend: number;
  cpc: number;
  cpa: number;
  trend: "up" | "down" | "stable";
}

const mockAssetPerformance: AssetPerformance[] = [
  {
    assetId: "1",
    impressions: 45230,
    clicks: 1842,
    ctr: 4.07,
    conversions: 124,
    spend: 892.50,
    cpc: 0.48,
    cpa: 7.20,
    trend: "up",
  },
  {
    assetId: "2",
    impressions: 38120,
    clicks: 1243,
    ctr: 3.26,
    conversions: 89,
    spend: 756.30,
    cpc: 0.61,
    cpa: 8.50,
    trend: "down",
  },
  {
    assetId: "3",
    impressions: 52890,
    clicks: 2104,
    ctr: 3.98,
    conversions: 156,
    spend: 1024.80,
    cpc: 0.49,
    cpa: 6.57,
    trend: "up",
  },
];

const mockAssets: CreativeAsset[] = [
  {
    id: "1",
    name: "summer-promo-banner.jpg",
    format: "banner",
    type: "image",
    preview: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&h=400&fit=crop",
    size: 2456789,
    uploadedAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "2",
    name: "product-showcase-video.mp4",
    format: "feed_video",
    type: "video",
    preview: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=800&fit=crop",
    size: 15678900,
    uploadedAt: "2024-01-14T15:20:00Z",
  },
  {
    id: "3",
    name: "instagram-story-01.jpg",
    format: "story",
    type: "image",
    preview: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=600&h=1200&fit=crop",
    size: 1234567,
    uploadedAt: "2024-01-13T09:15:00Z",
  },
];

export function generateStaticParams() {
  // Generate static paths for the campaign IDs we have
  return [
    { id: "1" },
    { id: "2" },
    { id: "3" },
  ];
}

export default function CampaignAssetsPage() {
  const params = useParams();
  const router = useRouter();
  const { t } = useTranslation();
  const campaigns = useStore((state) => state.campaigns);

  const campaign = campaigns.find((c) => c.id === params.id);

  const [searchQuery, setSearchQuery] = useState("");
  const [formatFilter, setFormatFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("performance");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  if (!campaign) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-gray-500">Campaign not found</p>
      </div>
    );
  }

  const filteredAssets = mockAssets.filter((asset) => {
    const matchesSearch = asset.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFormat = formatFilter === "all" || asset.format === formatFilter;
    return matchesSearch && matchesFormat;
  });

  const getAssetPerformance = (assetId: string) => {
    return mockAssetPerformance.find((p) => p.assetId === assetId);
  };

  const getFormatIcon = (format: string) => {
    if (format.includes("video")) return Video;
    if (format.includes("image") || format === "story" || format === "banner") return ImageIcon;
    return FileText;
  };

  const getFormatLabel = (format: string) => {
    const labels: Record<string, string> = {
      feed_image: "Feed Image",
      feed_video: "Feed Video",
      story: "Story",
      reel: "Reel",
      banner: "Banner",
      carousel: "Carousel",
      display_ad: "Display Ad",
    };
    return labels[format] || format;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-4 flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Campaigns
        </Button>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Creative Assets</h1>
            <p className="text-gray-500 mt-1">{campaign.name}</p>
          </div>
          <Button variant="primary" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-gray-700 uppercase tracking-wide">Total Assets</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{mockAssets.length}</p>
              </div>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center border-2 border-black neo-shadow-sm bg-purple-500">
                <ImageIcon className="w-7 h-7 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-gray-700 uppercase tracking-wide">Avg CTR</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">3.77%</p>
              </div>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center border-2 border-black neo-shadow-sm bg-green-400">
                <MousePointer className="w-7 h-7 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-gray-700 uppercase tracking-wide">Total Spend</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{formatCurrency(2673.60)}</p>
              </div>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center border-2 border-black neo-shadow-sm bg-orange-400">
                <DollarSign className="w-7 h-7 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-gray-700 uppercase tracking-wide">Conversions</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">369</p>
              </div>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center border-2 border-black neo-shadow-sm bg-blue-400">
                <BarChart3 className="w-7 h-7 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search assets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Dropdown
              value={formatFilter}
              onChange={setFormatFilter}
              options={[
                { value: "all", label: "All Formats" },
                { value: "banner", label: "Banners" },
                { value: "story", label: "Stories" },
                { value: "feed_video", label: "Videos" },
              ]}
            />
            <Dropdown
              value={sortBy}
              onChange={setSortBy}
              options={[
                { value: "performance", label: "Best Performance" },
                { value: "recent", label: "Most Recent" },
                { value: "spend", label: "Highest Spend" },
                { value: "ctr", label: "Highest CTR" },
              ]}
            />
          </div>
        </CardContent>
      </Card>

      {/* Assets Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredAssets.map((asset) => {
          const performance = getAssetPerformance(asset.id);
          const Icon = getFormatIcon(asset.format);

          return (
            <Card key={asset.id} className="overflow-hidden hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
              {/* Asset Preview */}
              <div className="relative aspect-video bg-gray-100 border-b-2 border-black">
                {asset.type === "image" ? (
                  <img
                    src={asset.preview}
                    alt={asset.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-100 to-pink-100">
                    <Video className="w-16 h-16 text-purple-500" />
                  </div>
                )}
                <div className="absolute top-3 right-3">
                  <Badge variant="default" className="bg-white">
                    {getFormatLabel(asset.format)}
                  </Badge>
                </div>
              </div>

              {/* Asset Info */}
              <CardContent className="p-4">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl border-2 border-black bg-purple-500 flex items-center justify-center flex-shrink-0 neo-shadow-sm">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-gray-900 truncate uppercase">
                      {asset.name}
                    </h3>
                    <p className="text-xs text-gray-600 font-medium">
                      {(asset.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>

                {performance && (
                  <div className="space-y-3 border-t-2 border-black pt-4">
                    {/* Performance Metrics */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-gray-50 p-3 rounded-xl border-2 border-black">
                        <div className="flex items-center gap-2 mb-1">
                          <Eye className="w-4 h-4 text-purple-500" />
                          <p className="text-xs font-bold text-gray-700 uppercase">Impressions</p>
                        </div>
                        <p className="text-lg font-bold text-gray-900">
                          {formatNumber(performance.impressions)}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-xl border-2 border-black">
                        <div className="flex items-center gap-2 mb-1">
                          <MousePointer className="w-4 h-4 text-blue-500" />
                          <p className="text-xs font-bold text-gray-700 uppercase">Clicks</p>
                        </div>
                        <p className="text-lg font-bold text-gray-900">
                          {formatNumber(performance.clicks)}
                        </p>
                      </div>
                    </div>

                    {/* CTR and Trend */}
                    <div className="flex items-center justify-between bg-gradient-to-br from-purple-50 to-pink-50 p-3 rounded-xl border-2 border-black">
                      <div>
                        <p className="text-xs font-bold text-gray-700 uppercase mb-1">CTR</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {formatPercentage(performance.ctr)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {performance.trend === "up" ? (
                          <div className="flex items-center gap-1 bg-green-400 text-white px-3 py-1 rounded-full border-2 border-black font-bold text-sm">
                            <TrendingUp className="w-4 h-4" />
                            <span>+12%</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 bg-pink-500 text-white px-3 py-1 rounded-full border-2 border-black font-bold text-sm">
                            <TrendingDown className="w-4 h-4" />
                            <span>-8%</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Bottom Metrics */}
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div>
                        <p className="text-xs font-bold text-gray-600 uppercase">Spend</p>
                        <p className="text-sm font-bold text-gray-900">
                          {formatCurrency(performance.spend)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-600 uppercase">CPC</p>
                        <p className="text-sm font-bold text-gray-900">
                          {formatCurrency(performance.cpc)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-600 uppercase">Conv.</p>
                        <p className="text-sm font-bold text-gray-900">
                          {performance.conversions}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredAssets.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 font-medium">No assets found</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
