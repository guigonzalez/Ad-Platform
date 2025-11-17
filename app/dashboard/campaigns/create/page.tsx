"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { useTranslation } from "@/lib/i18n/context";
import { useToast } from "@/components/ui/toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Sparkles,
  Brain,
  TrendingUp,
  Users,
  Target,
  DollarSign,
  Calendar,
  MapPin,
  Zap,
  Type,
  Video,
} from "lucide-react";
import type { Platform, CampaignObjective } from "@/lib/mock-data";
import type { CreativeAsset } from "@/lib/types/assets";
import { AIAssetSearch } from "@/components/campaign/ai-asset-search";
import { cn, formatNumber } from "@/lib/utils";

interface AIMetadata {
  suggestedName: string;
  suggestedObjective: CampaignObjective;
  suggestedBudget: number;
  detectedCategories: string[];
  targetAudience: {
    ageFrom: number;
    ageTo: number;
    interests: string[];
  };
}

interface FormData {
  name: string;
  platform: Platform[];
  objective: CampaignObjective;
  dailyBudget: number;
  startDate: string;
  endDate: string;
  locations: string[];
  ageFrom: number;
  ageTo: number;
  gender: "all" | "male" | "female";
  interests: string[];
  assets: any[];
  destinationUrl: string;
  headline: string;
  description: string;
  cta: string;
  termsAccepted: boolean;
  aiGenerated: boolean;
}

export default function CreateCampaignPage() {
  const { t } = useTranslation();
  const { showToast } = useToast();
  const router = useRouter();
  const createCampaign = useStore((state) => state.createCampaign);

  const [currentStep, setCurrentStep] = useState(1);
  const [aiMetadata, setAiMetadata] = useState<AIMetadata | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    platform: [],
    objective: "TRAFFIC",
    dailyBudget: 50,
    startDate: new Date().toISOString().split("T")[0],
    endDate: "",
    locations: [],
    ageFrom: 18,
    ageTo: 65,
    gender: "all",
    interests: [],
    assets: [],
    destinationUrl: "",
    headline: "",
    description: "",
    cta: "",
    termsAccepted: false,
    aiGenerated: false,
  });

  const updateForm = (updates: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const handlePlatformToggle = (platform: Platform) => {
    const platforms = formData.platform.includes(platform)
      ? formData.platform.filter((p) => p !== platform)
      : [...formData.platform, platform];
    updateForm({ platform: platforms });
  };

  const handleImportComplete = (assets: any[], metadata: AIMetadata) => {
    // Store AI metadata
    setAiMetadata(metadata);

    // Update form with AI-generated data
    updateForm({
      assets,
      name: metadata.suggestedName,
      objective: metadata.suggestedObjective,
      dailyBudget: metadata.suggestedBudget,
      ageFrom: metadata.targetAudience.ageFrom,
      ageTo: metadata.targetAudience.ageTo,
      interests: metadata.targetAudience.interests,
      platform: ["META", "GOOGLE"],
      aiGenerated: true,
      // Extract headline and description from copy assets if available
      headline: assets.find((a) => a.type === "copy" && a.format === "headline")?.content || "",
      description: assets.find((a) => a.type === "copy" && a.format === "description")?.content || "",
    });

    // Move to next step
    setCurrentStep(2);
  };

  const handleSubmit = () => {
    // Create campaign for each platform
    formData.platform.forEach((platform) => {
      createCampaign({
        name: formData.name,
        platform,
        status: "ACTIVE",
        objective: formData.objective,
        budget: formData.dailyBudget * 30,
        dailyBudget: formData.dailyBudget,
        spent: 0,
        impressions: 0,
        clicks: 0,
        conversions: 0,
        ctr: 0,
        cpc: 0,
        startDate: formData.startDate,
        endDate: formData.endDate || undefined,
      });
    });

    const platformCount = formData.platform.length;
    showToast(
      `Campaign "${formData.name}" created successfully on ${platformCount} platform${platformCount > 1 ? 's' : ''}`,
      "success"
    );

    // Redirect to campaigns page
    router.push("/dashboard/campaigns");
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        // Step 1: Need imported assets
        return formData.assets.length > 0 && formData.aiGenerated;
      case 2:
        // Step 2: AI-generated params, can proceed if all filled
        return formData.name && formData.platform.length > 0 && formData.dailyBudget > 0;
      case 3:
        // Step 3: Review and launch
        return formData.termsAccepted;
      default:
        return false;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          {t.common.backToDashboard}
        </Button>
      </div>

      <div>
        <h1 className="text-3xl font-bold text-gray-900 uppercase">AI-Powered Campaign Builder</h1>
        <p className="text-gray-500 mt-1 font-medium">
          Step {currentStep} of 3 • {formData.aiGenerated && "✨ AI-Optimized"}
        </p>
      </div>

      {/* Progress Steps */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { num: 1, label: "Import AI Assets", icon: Sparkles },
          { num: 2, label: "Review & Customize", icon: Brain },
          { num: 3, label: "Launch Campaign", icon: Zap },
        ].map((step) => {
          const Icon = step.icon;
          return (
            <div
              key={step.num}
              className={cn(
                "p-4 rounded-2xl border-2 border-black transition-all",
                step.num < currentStep && "bg-gradient-to-br from-green-50 to-blue-50 neo-shadow-sm",
                step.num === currentStep && "bg-gradient-to-br from-purple-50 to-pink-50 neo-shadow",
                step.num > currentStep && "bg-gray-50"
              )}
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center border-2 border-black font-bold text-lg",
                    step.num < currentStep && "bg-green-400 text-white",
                    step.num === currentStep && "bg-purple-500 text-white",
                    step.num > currentStep && "bg-gray-200 text-gray-500"
                  )}
                >
                  {step.num < currentStep ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                </div>
                <div>
                  <p
                    className={cn(
                      "text-xs font-bold uppercase tracking-wide",
                      step.num <= currentStep ? "text-black" : "text-gray-500"
                    )}
                  >
                    Step {step.num}
                  </p>
                  <p
                    className={cn(
                      "text-sm font-bold",
                      step.num <= currentStep ? "text-black" : "text-gray-400"
                    )}
                  >
                    {step.label}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Form Content */}
      {currentStep === 1 && (
        <div>
          <AIAssetSearch onImportComplete={handleImportComplete} />
        </div>
      )}

      {currentStep === 2 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold uppercase">
                AI-Generated Campaign Parameters
              </CardTitle>
              {formData.aiGenerated && (
                <Badge variant="success" className="flex items-center gap-1">
                  <Sparkles className="w-4 h-4" />
                  AI-Optimized
                </Badge>
              )}
            </div>
            <p className="text-sm text-gray-600 font-medium mt-2">
              Review and customize the AI-generated campaign settings based on your imported assets
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* AI Insights Card */}
            {aiMetadata && (
              <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-black">
                <CardHeader>
                  <CardTitle className="text-sm font-bold uppercase tracking-wide flex items-center gap-2">
                    <Brain className="w-5 h-5 text-purple-500" />
                    AI Analysis Insights
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-3 rounded-xl border-2 border-black">
                      <p className="text-xs font-bold text-gray-600 uppercase mb-1">
                        Detected Categories
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {aiMetadata.detectedCategories.map((cat) => (
                          <Badge key={cat} variant="default" className="text-xs">
                            {cat}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="bg-white p-3 rounded-xl border-2 border-black">
                      <p className="text-xs font-bold text-gray-600 uppercase mb-1">
                        Suggested Interests
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {aiMetadata.targetAudience.interests.slice(0, 3).map((interest) => (
                          <Badge key={interest} variant="info" className="text-xs">
                            {interest}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="space-y-6">
              {/* Campaign Name & Platforms */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wide">
                    Campaign Name
                  </label>
                  <Input
                    value={formData.name}
                    onChange={(e) => updateForm({ name: e.target.value })}
                    placeholder="Enter campaign name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wide">
                    Objective
                  </label>
                  <Select
                    value={formData.objective}
                    onChange={(e) =>
                      updateForm({ objective: e.target.value as CampaignObjective })
                    }
                  >
                    <option value="TRAFFIC">Website Traffic</option>
                    <option value="LEADS">Lead Generation</option>
                    <option value="SALES">Sales & Conversions</option>
                    <option value="AWARENESS">Brand Awareness</option>
                  </Select>
                </div>
              </div>

              {/* Platforms */}
              <div>
                <label className="block text-sm font-bold text-black mb-3 uppercase tracking-wide">
                  Advertising Platforms
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div
                    onClick={() => handlePlatformToggle("GOOGLE")}
                    className={cn(
                      "p-4 rounded-2xl border-2 border-black cursor-pointer transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
                      formData.platform.includes("GOOGLE")
                        ? "bg-blue-50 neo-shadow"
                        : "bg-white"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-500 border-2 border-black flex items-center justify-center">
                          <span className="text-white font-bold text-lg">G</span>
                        </div>
                        <span className="font-bold text-black uppercase">Google Ads</span>
                      </div>
                      {formData.platform.includes("GOOGLE") && (
                        <Check className="w-5 h-5 text-blue-600" />
                      )}
                    </div>
                  </div>
                  <div
                    onClick={() => handlePlatformToggle("META")}
                    className={cn(
                      "p-4 rounded-2xl border-2 border-black cursor-pointer transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
                      formData.platform.includes("META")
                        ? "bg-purple-50 neo-shadow"
                        : "bg-white"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-purple-500 border-2 border-black flex items-center justify-center">
                          <span className="text-white font-bold text-lg">M</span>
                        </div>
                        <span className="font-bold text-black uppercase">Meta Ads</span>
                      </div>
                      {formData.platform.includes("META") && (
                        <Check className="w-5 h-5 text-purple-600" />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Budget & Dates */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wide flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-green-600" />
                    Daily Budget
                  </label>
                  <Input
                    type="number"
                    value={formData.dailyBudget}
                    onChange={(e) =>
                      updateForm({ dailyBudget: parseFloat(e.target.value) })
                    }
                    min="1"
                    step="1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wide flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    Start Date
                  </label>
                  <Input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => updateForm({ startDate: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wide flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    End Date (Optional)
                  </label>
                  <Input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => updateForm({ endDate: e.target.value })}
                  />
                </div>
              </div>

              {/* Audience Targeting */}
              <Card className="bg-gray-50 border-2 border-black">
                <CardHeader>
                  <CardTitle className="text-sm font-bold uppercase tracking-wide flex items-center gap-2">
                    <Users className="w-5 h-5 text-purple-500" />
                    Target Audience
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wide">
                      Age Range
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Input
                          type="number"
                          value={formData.ageFrom}
                          onChange={(e) =>
                            updateForm({ ageFrom: parseInt(e.target.value) })
                          }
                          min="18"
                          max="65"
                          placeholder="From"
                        />
                      </div>
                      <div>
                        <Input
                          type="number"
                          value={formData.ageTo}
                          onChange={(e) =>
                            updateForm({ ageTo: parseInt(e.target.value) })
                          }
                          min="18"
                          max="65"
                          placeholder="To"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wide">
                      Gender
                    </label>
                    <Select
                      value={formData.gender}
                      onChange={(e) =>
                        updateForm({ gender: e.target.value as typeof formData.gender })
                      }
                    >
                      <option value="all">All Genders</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wide">
                      Locations
                    </label>
                    <Input placeholder="e.g., United States, Brazil, United Kingdom" />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wide">
                      Interests (AI-Suggested)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {formData.interests.map((interest) => (
                        <Badge key={interest} variant="info">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Ad Copy */}
              {(formData.headline || formData.description) && (
                <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-2 border-black">
                  <CardHeader>
                    <CardTitle className="text-sm font-bold uppercase tracking-wide flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-green-600" />
                      AI-Generated Ad Copy
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {formData.headline && (
                      <div>
                        <label className="block text-xs font-bold text-gray-600 uppercase mb-1">
                          Headline
                        </label>
                        <Input
                          value={formData.headline}
                          onChange={(e) => updateForm({ headline: e.target.value })}
                        />
                      </div>
                    )}
                    {formData.description && (
                      <div>
                        <label className="block text-xs font-bold text-gray-600 uppercase mb-1">
                          Description
                        </label>
                        <textarea
                          value={formData.description}
                          onChange={(e) => updateForm({ description: e.target.value })}
                          rows={3}
                          className="w-full px-3 py-2 border-2 border-black rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                    )}
                    <div>
                      <label className="block text-xs font-bold text-gray-600 uppercase mb-1">
                        Destination URL
                      </label>
                      <Input
                        type="url"
                        value={formData.destinationUrl}
                        onChange={(e) => updateForm({ destinationUrl: e.target.value })}
                        placeholder="https://example.com"
                      />
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Review & Launch */}
      {currentStep === 3 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold uppercase">
                Review & Launch Campaign
              </CardTitle>
              <Badge variant="success" className="flex items-center gap-1">
                <Check className="w-4 h-4" />
                Ready to Launch
              </Badge>
            </div>
            <p className="text-sm text-gray-600 font-medium mt-2">
              Review your AI-optimized campaign before launching
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Campaign Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-black">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Target className="w-5 h-5 text-purple-600" />
                    <p className="text-xs font-bold text-gray-600 uppercase">Campaign</p>
                  </div>
                  <p className="text-lg font-bold text-black">{formData.name}</p>
                  <p className="text-sm text-gray-600 font-medium mt-1">{formData.objective}</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-2 border-black">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <DollarSign className="w-5 h-5 text-green-600" />
                    <p className="text-xs font-bold text-gray-600 uppercase">Daily Budget</p>
                  </div>
                  <p className="text-lg font-bold text-black">${formData.dailyBudget}</p>
                  <p className="text-sm text-gray-600 font-medium mt-1">
                    ~${formData.dailyBudget * 30} /month
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-50 to-yellow-50 border-2 border-black">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Users className="w-5 h-5 text-orange-600" />
                    <p className="text-xs font-bold text-gray-600 uppercase">Target Audience</p>
                  </div>
                  <p className="text-lg font-bold text-black">
                    {formData.ageFrom}-{formData.ageTo} years
                  </p>
                  <p className="text-sm text-gray-600 font-medium mt-1 capitalize">
                    {formData.gender === "all" ? "All genders" : formData.gender}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Platforms */}
            <div>
              <h3 className="text-sm font-bold text-black uppercase tracking-wide mb-3">
                Active Platforms
              </h3>
              <div className="flex gap-3">
                {formData.platform.map((platform) => (
                  <Badge
                    key={platform}
                    variant={platform === "GOOGLE" ? "info" : "default"}
                    className="text-sm px-4 py-2"
                  >
                    {platform}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Assets Preview */}
            <div>
              <h3 className="text-sm font-bold text-black uppercase tracking-wide mb-3">
                Imported Assets ({formData.assets.length})
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {formData.assets.slice(0, 4).map((asset: any) => (
                  <div
                    key={asset.id}
                    className="aspect-square rounded-xl border-2 border-black overflow-hidden bg-gray-100"
                  >
                    {asset.type === "image" && asset.preview && (
                      <img
                        src={asset.preview}
                        alt={asset.name}
                        className="w-full h-full object-cover"
                      />
                    )}
                    {asset.type === "video" && asset.thumbnail && (
                      <div className="relative w-full h-full">
                        <img
                          src={asset.thumbnail}
                          alt={asset.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-8 h-8 rounded-full bg-black/50 border-2 border-white flex items-center justify-center">
                            <Video className="w-4 h-4 text-white" />
                          </div>
                        </div>
                      </div>
                    )}
                    {asset.type === "copy" && (
                      <div className="w-full h-full flex items-center justify-center p-4 bg-gradient-to-br from-purple-50 to-pink-50">
                        <Type className="w-8 h-8 text-purple-500" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Estimate */}
            <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-black">
              <CardHeader>
                <CardTitle className="text-sm font-bold uppercase tracking-wide flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  AI-Estimated Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-xs font-bold text-gray-600 uppercase mb-1">
                      Est. Reach
                    </p>
                    <p className="text-2xl font-bold text-black">
                      {formatNumber(formData.dailyBudget * 1000)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-600 uppercase mb-1">Est. Clicks</p>
                    <p className="text-2xl font-bold text-black">
                      {formatNumber(Math.floor(formData.dailyBudget * 35))}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-600 uppercase mb-1">
                      Est. CTR
                    </p>
                    <p className="text-2xl font-bold text-black">3.5%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Terms & Conditions */}
            <div className="bg-yellow-50 border-2 border-black rounded-2xl p-6">
              <Checkbox
                label="I agree to the terms and conditions and confirm that this campaign complies with advertising policies"
                checked={formData.termsAccepted}
                onChange={(e) =>
                  updateForm({ termsAccepted: e.target.checked })
                }
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button
          variant="ghost"
          onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
          disabled={currentStep === 1}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Previous
        </Button>

        {currentStep < 3 ? (
          <Button
            variant="primary"
            onClick={() => setCurrentStep((prev) => prev + 1)}
            disabled={!canProceed()}
            className="flex items-center gap-2"
          >
            Continue
            <ArrowRight className="w-4 h-4" />
          </Button>
        ) : (
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={!canProceed()}
            className="flex items-center gap-2 text-lg px-8 py-6"
          >
            <Zap className="w-5 h-5" />
            Launch Campaign
          </Button>
        )}
      </div>
    </div>
  );
}

