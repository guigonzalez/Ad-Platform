"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  Wand2,
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
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AIAgent {
  id: string;
  name: string;
  icon: any;
  color: string;
  status: "idle" | "working" | "completed";
  task: string;
  output?: number;
}

export function AIAssetGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [productDescription, setProductDescription] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [brandGuidelines, setBrandGuidelines] = useState("");
  const [generatedCount, setGeneratedCount] = useState(0);

  const [agents, setAgents] = useState<AIAgent[]>([
    {
      id: "concept",
      name: "Concept Agent",
      icon: Brain,
      color: "bg-purple-500",
      status: "idle",
      task: "Generating creative concepts and themes",
      output: 0,
    },
    {
      id: "copy",
      name: "Copywriting Agent",
      icon: Type,
      color: "bg-blue-500",
      status: "idle",
      task: "Writing persuasive ad copy variations",
      output: 0,
    },
    {
      id: "design",
      name: "Design Agent",
      icon: Palette,
      color: "bg-pink-500",
      status: "idle",
      task: "Creating visual compositions and layouts",
      output: 0,
    },
    {
      id: "image",
      name: "Image Generation Agent",
      icon: ImageIcon,
      color: "bg-orange-400",
      status: "idle",
      task: "Generating banner images and graphics",
      output: 0,
    },
    {
      id: "video",
      name: "Video Agent",
      icon: Video,
      color: "bg-green-400",
      status: "idle",
      task: "Creating video ads and animations",
      output: 0,
    },
    {
      id: "optimizer",
      name: "Optimization Agent",
      icon: Zap,
      color: "bg-yellow-300",
      status: "idle",
      task: "A/B testing and performance optimization",
      output: 0,
    },
  ]);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setGeneratedCount(0);

    // Simulate AI agents working in sequence
    for (let i = 0; i < agents.length; i++) {
      // Update agent to working
      setAgents((prev) =>
        prev.map((agent, idx) =>
          idx === i ? { ...agent, status: "working" as const } : agent
        )
      );

      // Simulate work time
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Complete agent work with random output
      const output = Math.floor(Math.random() * 20) + 10;
      setAgents((prev) =>
        prev.map((agent, idx) =>
          idx === i ? { ...agent, status: "completed" as const, output } : agent
        )
      );

      setGeneratedCount((prev) => prev + output);
    }

    setIsGenerating(false);
  };

  const handleReset = () => {
    setAgents((prev) =>
      prev.map((agent) => ({ ...agent, status: "idle" as const, output: 0 }))
    );
    setGeneratedCount(0);
  };

  const allCompleted = agents.every((agent) => agent.status === "completed");

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
                AI Asset Generator
              </CardTitle>
              <p className="text-sm text-gray-600 font-medium mt-1">
                Generate hundreds of optimized ad creatives automatically
              </p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Input Form */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-bold uppercase tracking-wide">
            Campaign Parameters
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wide">
              Product Description
            </label>
            <Input
              placeholder="e.g., Premium wireless headphones with noise cancellation..."
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              disabled={isGenerating}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wide">
              Target Audience
            </label>
            <Input
              placeholder="e.g., Tech-savvy millennials, music enthusiasts, remote workers..."
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              disabled={isGenerating}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wide">
              Brand Guidelines (Optional)
            </label>
            <Input
              placeholder="e.g., Colors: #FF6B6B, #4ECDC4 | Tone: Professional yet friendly..."
              value={brandGuidelines}
              onChange={(e) => setBrandGuidelines(e.target.value)}
              disabled={isGenerating}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              variant="primary"
              onClick={handleGenerate}
              disabled={isGenerating || !productDescription || !targetAudience}
              className="flex items-center gap-2 flex-1"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4" />
                  Generate Assets
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

      {/* AI Agents Status */}
      {(isGenerating || allCompleted) && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-bold uppercase tracking-wide">
                Multi-Agent AI Pipeline
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
            {agents.map((agent) => {
              const Icon = agent.icon;
              return (
                <div
                  key={agent.id}
                  className={cn(
                    "p-4 rounded-2xl border-2 border-black transition-all",
                    agent.status === "working" && "bg-gradient-to-br from-purple-50 to-pink-50 neo-shadow",
                    agent.status === "completed" && "bg-white neo-shadow-sm",
                    agent.status === "idle" && "bg-gray-50"
                  )}
                >
                  <div className="flex items-center gap-4">
                    {/* Agent Icon */}
                    <div
                      className={cn(
                        "w-12 h-12 rounded-xl border-2 border-black flex items-center justify-center flex-shrink-0",
                        agent.color,
                        agent.status === "working" && "animate-pulse neo-shadow-sm"
                      )}
                    >
                      {agent.status === "working" ? (
                        <Loader2 className="w-6 h-6 text-white animate-spin" />
                      ) : agent.status === "completed" ? (
                        <Check className="w-6 h-6 text-white" />
                      ) : (
                        <Icon className="w-6 h-6 text-white" />
                      )}
                    </div>

                    {/* Agent Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-sm font-bold text-black uppercase">{agent.name}</h4>
                        {agent.status === "working" && (
                          <Badge variant="info" className="text-xs">
                            Working...
                          </Badge>
                        )}
                        {agent.status === "completed" && agent.output && (
                          <Badge variant="success" className="text-xs">
                            {agent.output} assets
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-gray-600 font-medium">{agent.task}</p>
                    </div>

                    {/* Progress Indicator */}
                    {agent.status === "working" && (
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

      {/* Generated Assets Summary */}
      {allCompleted && (
        <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-2 border-black neo-shadow-lg">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-400 to-blue-400 border-2 border-black neo-shadow flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-black mb-2">{generatedCount} Assets Generated!</h3>
            <p className="text-gray-700 font-medium mb-6">
              Your AI-powered campaign is ready with optimized creatives across all formats
            </p>
            <div className="flex gap-3 justify-center">
              <Button variant="primary" className="flex items-center gap-2">
                <Check className="w-4 h-4" />
                Review & Import
              </Button>
              <Button variant="ghost" onClick={handleReset} className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4" />
                Generate More
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
              <Layout className="w-7 h-7 text-white" />
            </div>
            <h4 className="text-sm font-bold text-black uppercase mb-2">Multiple Formats</h4>
            <p className="text-xs text-gray-600 font-medium">
              Banners, Stories, Reels, Videos, Display Ads
            </p>
          </CardContent>
        </Card>

        <Card className="hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
          <CardContent className="p-6 text-center">
            <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-orange-400 border-2 border-black neo-shadow-sm flex items-center justify-center">
              <Zap className="w-7 h-7 text-white" />
            </div>
            <h4 className="text-sm font-bold text-black uppercase mb-2">Auto-Optimized</h4>
            <p className="text-xs text-gray-600 font-medium">
              AI-powered A/B testing and performance optimization
            </p>
          </CardContent>
        </Card>

        <Card className="hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
          <CardContent className="p-6 text-center">
            <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-pink-500 border-2 border-black neo-shadow-sm flex items-center justify-center">
              <Brain className="w-7 h-7 text-white" />
            </div>
            <h4 className="text-sm font-bold text-black uppercase mb-2">Brand Consistent</h4>
            <p className="text-xs text-gray-600 font-medium">
              Follows your brand guidelines and visual identity
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
