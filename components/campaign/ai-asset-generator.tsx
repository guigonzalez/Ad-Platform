"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  Download,
  Image as ImageIcon,
  Video,
  Zap,
  Check,
  Loader2,
  Brain,
  Palette,
  Type,
  Layout,
  RefreshCw,
  ExternalLink,
  Database,
  CloudDownload,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ImportStep {
  id: string;
  name: string;
  icon: any;
  color: string;
  status: "idle" | "working" | "completed";
  task: string;
  count?: number;
}

export function AIAssetGenerator() {
  const [isImporting, setIsImporting] = useState(false);
  const [campaignId, setCampaignId] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [importedCount, setImportedCount] = useState(0);

  const [steps, setSteps] = useState<ImportStep[]>([
    {
      id: "connect",
      name: "Connect to Platform",
      icon: Database,
      color: "bg-purple-500",
      status: "idle",
      task: "Connecting to external AI platform",
      count: 0,
    },
    {
      id: "fetch",
      name: "Fetch Assets",
      icon: CloudDownload,
      color: "bg-blue-500",
      status: "idle",
      task: "Retrieving AI-generated assets",
      count: 0,
    },
    {
      id: "images",
      name: "Import Images",
      icon: ImageIcon,
      color: "bg-orange-400",
      status: "idle",
      task: "Importing banner images and graphics",
      count: 0,
    },
    {
      id: "videos",
      name: "Import Videos",
      icon: Video,
      color: "bg-green-400",
      status: "idle",
      task: "Importing video ads and animations",
      count: 0,
    },
    {
      id: "copy",
      name: "Import Copy Variations",
      icon: Type,
      color: "bg-pink-500",
      status: "idle",
      task: "Importing ad copy and headlines",
      count: 0,
    },
    {
      id: "optimize",
      name: "Sync Metadata",
      icon: Zap,
      color: "bg-yellow-300",
      status: "idle",
      task: "Syncing performance data and tags",
      count: 0,
    },
  ]);

  const handleImport = async () => {
    setIsImporting(true);
    setImportedCount(0);

    // Simulate import steps
    for (let i = 0; i < steps.length; i++) {
      // Update step to working
      setSteps((prev) =>
        prev.map((step, idx) =>
          idx === i ? { ...step, status: "working" as const } : step
        )
      );

      // Simulate import time
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Complete step with random count
      const count = Math.floor(Math.random() * 30) + 15;
      setSteps((prev) =>
        prev.map((step, idx) =>
          idx === i ? { ...step, status: "completed" as const, count } : step
        )
      );

      setImportedCount((prev) => prev + count);
    }

    setIsImporting(false);
  };

  const handleReset = () => {
    setSteps((prev) =>
      prev.map((step) => ({ ...step, status: "idle" as const, count: 0 }))
    );
    setImportedCount(0);
  };

  const allCompleted = steps.every((step) => step.status === "completed");

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-br from-purple-50 to-pink-50">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 border-2 border-black neo-shadow-sm flex items-center justify-center">
              <Download className="w-6 h-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold uppercase">
                Import AI-Generated Assets
              </CardTitle>
              <p className="text-sm text-gray-600 font-medium mt-1">
                Import hundreds of AI-created assets from external platform
              </p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Input Form */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-bold uppercase tracking-wide">
            Platform Connection
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-50 border-2 border-black rounded-xl p-4">
            <div className="flex items-start gap-3">
              <ExternalLink className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-black uppercase mb-1">External AI Platform</h4>
                <p className="text-xs text-gray-600 font-medium">
                  Connect to your AI asset generation platform to import pre-generated creatives
                </p>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wide">
              Campaign ID
            </label>
            <Input
              placeholder="e.g., camp_abc123xyz456..."
              value={campaignId}
              onChange={(e) => setCampaignId(e.target.value)}
              disabled={isImporting}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wide">
              API Key
            </label>
            <Input
              type="password"
              placeholder="sk-..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              disabled={isImporting}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              variant="primary"
              onClick={handleImport}
              disabled={isImporting || !campaignId || !apiKey}
              className="flex items-center gap-2 flex-1"
            >
              {isImporting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Importing...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  Import Assets
                </>
              )}
            </Button>
            {allCompleted && (
              <Button variant="ghost" onClick={handleReset} className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4" />
                Reset
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Import Progress */}
      {(isImporting || allCompleted) && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-bold uppercase tracking-wide">
                Import Progress
              </CardTitle>
              {allCompleted && (
                <Badge variant="success" className="text-sm">
                  <Check className="w-4 h-4 mr-1" />
                  Completed
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
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
                    {/* Step Icon */}
                    <div
                      className={cn(
                        "w-12 h-12 rounded-xl border-2 border-black flex items-center justify-center flex-shrink-0",
                        step.color,
                        step.status === "working" && "animate-pulse neo-shadow-sm"
                      )}
                    >
                      {step.status === "working" ? (
                        <Loader2 className="w-6 h-6 text-white animate-spin" />
                      ) : step.status === "completed" ? (
                        <Check className="w-6 h-6 text-white" />
                      ) : (
                        <Icon className="w-6 h-6 text-white" />
                      )}
                    </div>

                    {/* Step Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-sm font-bold text-black uppercase">{step.name}</h4>
                        {step.status === "working" && (
                          <Badge variant="info" className="text-xs">
                            Importing...
                          </Badge>
                        )}
                        {step.status === "completed" && step.count && (
                          <Badge variant="success" className="text-xs">
                            {step.count} items
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-gray-600 font-medium">{step.task}</p>
                    </div>

                    {/* Progress Indicator */}
                    {step.status === "working" && (
                      <div className="w-24 h-2 bg-gray-200 rounded-full border-2 border-black overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}

      {/* Import Summary */}
      {allCompleted && (
        <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-2 border-black neo-shadow-lg">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-400 to-blue-400 border-2 border-black neo-shadow flex items-center justify-center">
              <Check className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-black mb-2">{importedCount} Assets Imported!</h3>
            <p className="text-gray-700 font-medium mb-6">
              Successfully imported AI-generated creatives from external platform
            </p>
            <div className="flex gap-3 justify-center">
              <Button variant="primary" className="flex items-center gap-2">
                <Check className="w-4 h-4" />
                Use Imported Assets
              </Button>
              <Button variant="ghost" onClick={handleReset} className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4" />
                Import Again
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Feature Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
          <CardContent className="p-6 text-center">
            <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-purple-500 border-2 border-black neo-shadow-sm flex items-center justify-center">
              <Database className="w-7 h-7 text-white" />
            </div>
            <h4 className="text-sm font-bold text-black uppercase mb-2">External Platform</h4>
            <p className="text-xs text-gray-600 font-medium">
              Connect to any AI asset generation platform
            </p>
          </CardContent>
        </Card>

        <Card className="hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
          <CardContent className="p-6 text-center">
            <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-orange-400 border-2 border-black neo-shadow-sm flex items-center justify-center">
              <CloudDownload className="w-7 h-7 text-white" />
            </div>
            <h4 className="text-sm font-bold text-black uppercase mb-2">Bulk Import</h4>
            <p className="text-xs text-gray-600 font-medium">
              Import hundreds of assets in seconds
            </p>
          </CardContent>
        </Card>

        <Card className="hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
          <CardContent className="p-6 text-center">
            <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-pink-500 border-2 border-black neo-shadow-sm flex items-center justify-center">
              <Zap className="w-7 h-7 text-white" />
            </div>
            <h4 className="text-sm font-bold text-black uppercase mb-2">Ready to Use</h4>
            <p className="text-xs text-gray-600 font-medium">
              Pre-optimized creatives with metadata
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
