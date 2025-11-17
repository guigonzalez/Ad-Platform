"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Loader2,
  Check,
  Image as ImageIcon,
  Video,
  Type,
  Sparkles,
  Brain,
  Database,
  FileText,
  Calendar,
  Download,
  RefreshCw,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AIAsset {
  id: string;
  name: string;
  type: "image" | "video" | "copy";
  preview?: string;
  thumbnail?: string;
  content?: string;
  format: string;
  createdAt: string;
  aiModel: string;
  category: string;
  selected?: boolean;
}

interface SearchStep {
  id: string;
  name: string;
  status: "idle" | "working" | "completed";
}

interface AIAssetSearchProps {
  onImportComplete?: (assets: AIAsset[], metadata: any) => void;
}

export function AIAssetSearch({ onImportComplete }: AIAssetSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [searchCompleted, setSearchCompleted] = useState(false);
  const [importCompleted, setImportCompleted] = useState(false);
  const [foundAssets, setFoundAssets] = useState<AIAsset[]>([]);
  const [selectedAssets, setSelectedAssets] = useState<Set<string>>(new Set());

  const [searchSteps, setSearchSteps] = useState<SearchStep[]>([
    { id: "connect", name: "Connecting to AI Platform", status: "idle" },
    { id: "query", name: "Processing search query", status: "idle" },
    { id: "scan", name: "Scanning asset database", status: "idle" },
    { id: "results", name: "Loading asset previews", status: "idle" },
  ]);

  const [importSteps, setImportSteps] = useState<SearchStep[]>([
    { id: "analyze", name: "Analyzing asset content", status: "idle" },
    { id: "extract", name: "Extracting metadata", status: "idle" },
    { id: "generate", name: "Generating campaign parameters", status: "idle" },
    { id: "complete", name: "Finalizing import", status: "idle" },
  ]);

  const mockAssets: AIAsset[] = [
    {
      id: "ai-1",
      name: "summer-beach-lifestyle",
      type: "image",
      preview: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
      format: "banner",
      createdAt: "2024-01-20T10:30:00Z",
      aiModel: "DALL-E 3",
      category: "Lifestyle",
    },
    {
      id: "ai-2",
      name: "product-showcase-modern",
      type: "image",
      preview: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=600&fit=crop",
      format: "feed_image",
      createdAt: "2024-01-20T09:15:00Z",
      aiModel: "Midjourney",
      category: "Product",
    },
    {
      id: "ai-3",
      name: "tech-innovation-abstract",
      type: "video",
      thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop",
      format: "feed_video",
      createdAt: "2024-01-19T16:45:00Z",
      aiModel: "Runway Gen-2",
      category: "Technology",
    },
    {
      id: "ai-4",
      name: "vertical-story-fashion",
      type: "image",
      preview: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=1200&fit=crop",
      format: "story",
      createdAt: "2024-01-19T14:20:00Z",
      aiModel: "DALL-E 3",
      category: "Fashion",
    },
    {
      id: "ai-5",
      name: "food-photography-delicious",
      type: "image",
      preview: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop",
      format: "banner",
      createdAt: "2024-01-18T11:30:00Z",
      aiModel: "Midjourney",
      category: "Food",
    },
    {
      id: "ai-6",
      name: "engaging-product-headline",
      type: "copy",
      content: "Transform Your Summer with Premium Beach Essentials",
      format: "headline",
      createdAt: "2024-01-20T10:35:00Z",
      aiModel: "GPT-4",
      category: "Marketing Copy",
    },
    {
      id: "ai-7",
      name: "conversion-focused-description",
      type: "copy",
      content: "Discover the perfect blend of style and comfort. Free shipping on orders over $50. Shop now and elevate your lifestyle!",
      format: "description",
      createdAt: "2024-01-20T10:36:00Z",
      aiModel: "Claude 3.5",
      category: "Marketing Copy",
    },
    {
      id: "ai-8",
      name: "animated-product-demo",
      type: "video",
      thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop",
      format: "reel",
      createdAt: "2024-01-18T09:00:00Z",
      aiModel: "Pika Labs",
      category: "Product Demo",
    },
  ];

  const handleSearch = async () => {
    setIsSearching(true);
    setSearchCompleted(false);
    setFoundAssets([]);
    setSelectedAssets(new Set());

    // Simulate search steps
    for (let i = 0; i < searchSteps.length; i++) {
      setSearchSteps((prev) =>
        prev.map((step, idx) =>
          idx === i ? { ...step, status: "working" as const } : step
        )
      );

      await new Promise((resolve) => setTimeout(resolve, 800));

      setSearchSteps((prev) =>
        prev.map((step, idx) =>
          idx === i ? { ...step, status: "completed" as const } : step
        )
      );
    }

    // Filter and show results
    const filtered = searchQuery
      ? mockAssets.filter(
          (asset) =>
            asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            asset.category.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : mockAssets;

    setFoundAssets(filtered);
    setSearchCompleted(true);
    setIsSearching(false);
  };

  const toggleAssetSelection = (assetId: string) => {
    const newSelected = new Set(selectedAssets);
    if (newSelected.has(assetId)) {
      newSelected.delete(assetId);
    } else {
      newSelected.add(assetId);
    }
    setSelectedAssets(newSelected);
  };

  const handleImport = async () => {
    setIsImporting(true);
    setImportCompleted(false);

    // Reset import steps
    setImportSteps((prev) =>
      prev.map((step) => ({ ...step, status: "idle" as const }))
    );

    // Simulate import steps
    for (let i = 0; i < importSteps.length; i++) {
      setImportSteps((prev) =>
        prev.map((step, idx) =>
          idx === i ? { ...step, status: "working" as const } : step
        )
      );

      await new Promise((resolve) => setTimeout(resolve, 1200));

      setImportSteps((prev) =>
        prev.map((step, idx) =>
          idx === i ? { ...step, status: "completed" as const } : step
        )
      );
    }

    setImportCompleted(true);
    setIsImporting(false);

    // Call callback with imported assets
    if (onImportComplete) {
      const importedAssets = foundAssets.filter((a) =>
        selectedAssets.has(a.id)
      );

      // Simulate AI-generated metadata from assets
      const metadata = {
        suggestedName: "Summer Lifestyle Campaign",
        suggestedObjective: "TRAFFIC",
        suggestedBudget: 75,
        detectedCategories: [...new Set(importedAssets.map((a) => a.category))],
        targetAudience: {
          ageFrom: 25,
          ageTo: 45,
          interests: ["Lifestyle", "Fashion", "Travel", "Shopping"],
        },
      };

      onImportComplete(importedAssets, metadata);
    }
  };

  const handleReset = () => {
    setSearchCompleted(false);
    setImportCompleted(false);
    setFoundAssets([]);
    setSelectedAssets(new Set());
    setSearchSteps((prev) =>
      prev.map((step) => ({ ...step, status: "idle" as const }))
    );
    setImportSteps((prev) =>
      prev.map((step) => ({ ...step, status: "idle" as const }))
    );
  };

  const getAssetIcon = (type: string) => {
    switch (type) {
      case "image":
        return ImageIcon;
      case "video":
        return Video;
      case "copy":
        return Type;
      default:
        return FileText;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-br from-purple-50 to-pink-50">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 border-2 border-black neo-shadow-sm flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold uppercase">
                AI Asset Library
              </CardTitle>
              <p className="text-sm text-gray-600 font-medium mt-1">
                Search and import AI-generated assets from our internal platform
              </p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Search Form */}
      {!importCompleted && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-bold uppercase tracking-wide">
              Search Assets
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-purple-50 border-2 border-black rounded-xl p-4">
              <div className="flex items-start gap-3">
                <Database className="w-5 h-5 text-purple-600 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-black uppercase mb-1">
                    Internal AI Platform
                  </h4>
                  <p className="text-xs text-gray-600 font-medium">
                    Connected to your AI asset generation platform with 1000+ ready-to-use assets
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search by keyword, category, or leave empty for all..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  disabled={isSearching}
                  className="pl-10"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !isSearching) {
                      handleSearch();
                    }
                  }}
                />
              </div>
              <Button
                variant="primary"
                onClick={handleSearch}
                disabled={isSearching}
                className="flex items-center gap-2"
              >
                {isSearching ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    Search
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search Progress */}
      {isSearching && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-bold uppercase tracking-wide">
              Search Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {searchSteps.map((step) => (
              <div
                key={step.id}
                className={cn(
                  "p-4 rounded-2xl border-2 border-black transition-all",
                  step.status === "working" && "bg-gradient-to-br from-purple-50 to-pink-50 neo-shadow",
                  step.status === "completed" && "bg-white neo-shadow-sm",
                  step.status === "idle" && "bg-gray-50"
                )}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-xl border-2 border-black flex items-center justify-center flex-shrink-0 bg-purple-500",
                      step.status === "working" && "animate-pulse neo-shadow-sm"
                    )}
                  >
                    {step.status === "working" ? (
                      <Loader2 className="w-5 h-5 text-white animate-spin" />
                    ) : step.status === "completed" ? (
                      <Check className="w-5 h-5 text-white" />
                    ) : (
                      <Brain className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-black uppercase">{step.name}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Search Results */}
      {searchCompleted && !isImporting && !importCompleted && (
        <>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-bold uppercase tracking-wide">
                  Found {foundAssets.length} Assets
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Badge variant="info" className="text-sm">
                    {selectedAssets.size} selected
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleReset}
                    className="flex items-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    New Search
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {foundAssets.map((asset) => {
                  const Icon = getAssetIcon(asset.type);
                  const isSelected = selectedAssets.has(asset.id);

                  return (
                    <div
                      key={asset.id}
                      onClick={() => toggleAssetSelection(asset.id)}
                      className={cn(
                        "cursor-pointer rounded-2xl border-2 border-black overflow-hidden transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
                        isSelected && "bg-purple-50 neo-shadow"
                      )}
                    >
                      {/* Asset Preview */}
                      {asset.type !== "copy" && (
                        <div className="relative aspect-video bg-gray-100 border-b-2 border-black">
                          <img
                            src={asset.preview || asset.thumbnail}
                            alt={asset.name}
                            className="w-full h-full object-cover"
                          />
                          {asset.type === "video" && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-12 h-12 rounded-full bg-black/50 border-2 border-white flex items-center justify-center">
                                <Video className="w-6 h-6 text-white" />
                              </div>
                            </div>
                          )}
                          {isSelected && (
                            <div className="absolute top-2 right-2">
                              <div className="w-6 h-6 rounded-full bg-purple-500 border-2 border-white flex items-center justify-center">
                                <Check className="w-4 h-4 text-white" />
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Asset Info */}
                      <div className="p-4">
                        <div className="flex items-start gap-3 mb-3">
                          <div className="w-8 h-8 rounded-lg border-2 border-black bg-purple-500 flex items-center justify-center flex-shrink-0">
                            <Icon className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-bold text-black uppercase truncate">
                              {asset.name}
                            </h4>
                            <p className="text-xs text-gray-600 font-medium">
                              {asset.category}
                            </p>
                          </div>
                        </div>

                        {asset.type === "copy" && asset.content && (
                          <div className="mb-3 p-3 bg-gray-50 rounded-lg border-2 border-black">
                            <p className="text-xs text-gray-700 font-medium line-clamp-3">
                              "{asset.content}"
                            </p>
                          </div>
                        )}

                        <div className="flex items-center justify-between text-xs">
                          <Badge variant="default" className="text-xs">
                            {asset.aiModel}
                          </Badge>
                          <span className="text-gray-500 font-medium">
                            {new Date(asset.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {foundAssets.length === 0 && (
                <div className="text-center py-12">
                  <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 font-medium">No assets found</p>
                </div>
              )}
            </CardContent>
          </Card>

          {selectedAssets.size > 0 && (
            <div className="flex justify-end">
              <Button
                variant="primary"
                onClick={handleImport}
                className="flex items-center gap-2 text-lg px-8 py-6"
              >
                <Download className="w-5 h-5" />
                Import {selectedAssets.size} Asset{selectedAssets.size > 1 ? "s" : ""}
              </Button>
            </div>
          )}
        </>
      )}

      {/* Import Progress */}
      {isImporting && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-bold uppercase tracking-wide">
              Importing & Analyzing Assets
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {importSteps.map((step) => (
              <div
                key={step.id}
                className={cn(
                  "p-4 rounded-2xl border-2 border-black transition-all",
                  step.status === "working" && "bg-gradient-to-br from-purple-50 to-pink-50 neo-shadow",
                  step.status === "completed" && "bg-white neo-shadow-sm",
                  step.status === "idle" && "bg-gray-50"
                )}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-xl border-2 border-black flex items-center justify-center flex-shrink-0 bg-blue-500",
                      step.status === "working" && "animate-pulse neo-shadow-sm"
                    )}
                  >
                    {step.status === "working" ? (
                      <Loader2 className="w-5 h-5 text-white animate-spin" />
                    ) : step.status === "completed" ? (
                      <Check className="w-5 h-5 text-white" />
                    ) : (
                      <Brain className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-black uppercase">{step.name}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Import Success */}
      {importCompleted && (
        <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-2 border-black neo-shadow-lg">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-400 to-blue-400 border-2 border-black neo-shadow flex items-center justify-center">
              <Check className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-black mb-2">
              {selectedAssets.size} Assets Imported Successfully!
            </h3>
            <p className="text-gray-700 font-medium mb-6">
              AI is analyzing your assets and generating optimized campaign parameters...
            </p>
            <div className="flex gap-3 justify-center">
              <Button variant="primary" className="flex items-center gap-2">
                <Check className="w-4 h-4" />
                Continue to Campaign Setup
              </Button>
              <Button variant="ghost" onClick={handleReset} className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4" />
                Import More Assets
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
