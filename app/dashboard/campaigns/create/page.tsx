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
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import type { Platform, CampaignObjective } from "@/lib/mock-data";
import type { CreativeAsset } from "@/lib/types/assets";
import { AssetUpload } from "@/components/campaign/asset-upload";
import { AIAssetGenerator } from "@/components/campaign/ai-asset-generator";

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
  assets: CreativeAsset[];
  destinationUrl: string;
  headline: string;
  description: string;
  cta: string;
  termsAccepted: boolean;
}

export default function CreateCampaignPage() {
  const { t } = useTranslation();
  const { showToast } = useToast();
  const router = useRouter();
  const createCampaign = useStore((state) => state.createCampaign);

  const [currentStep, setCurrentStep] = useState(1);
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
        return formData.name && formData.platform.length > 0 && formData.dailyBudget > 0;
      case 2:
        return formData.ageFrom >= 18 && formData.ageTo <= 65;
      case 3:
        // Assets are optional, can proceed without them
        return true;
      case 4:
        return formData.destinationUrl && formData.headline && formData.description;
      case 5:
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
        <h1 className="text-3xl font-bold text-gray-900">{t.wizard.title}</h1>
        <p className="text-gray-500 mt-1">
          {t.wizard.step} {currentStep} {t.wizard.of} 5
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-between">
        {[1, 2, 3, 4, 5].map((step) => (
          <div key={step} className="flex items-center flex-1">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                step < currentStep
                  ? "bg-blue-600 text-white"
                  : step === currentStep
                  ? "bg-blue-100 text-blue-600 ring-2 ring-blue-600"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {step < currentStep ? <Check className="w-5 h-5" /> : step}
            </div>
            {step < 4 && (
              <div
                className={`flex-1 h-1 mx-2 ${
                  step < currentStep ? "bg-blue-600" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Form Content */}
      <Card>
        <CardHeader>
          <CardTitle>
            {currentStep === 1 && t.wizard.step1.title}
            {currentStep === 2 && t.wizard.step2.title}
            {currentStep === 3 && "Creative Assets"}
            {currentStep === 4 && t.wizard.step3.title}
            {currentStep === 5 && t.wizard.step4.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Step 1: Basic Info */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.wizard.step1.campaignName}
                </label>
                <Input
                  value={formData.name}
                  onChange={(e) => updateForm({ name: e.target.value })}
                  placeholder={t.wizard.step1.campaignNamePlaceholder}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.wizard.step1.platform}
                </label>
                <div className="space-y-2">
                  <Checkbox
                    label={t.wizard.step1.google}
                    checked={formData.platform.includes("GOOGLE")}
                    onChange={() => handlePlatformToggle("GOOGLE")}
                  />
                  <Checkbox
                    label={t.wizard.step1.meta}
                    checked={formData.platform.includes("META")}
                    onChange={() => handlePlatformToggle("META")}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.wizard.step1.objective}
                </label>
                <Select
                  value={formData.objective}
                  onChange={(e) =>
                    updateForm({ objective: e.target.value as CampaignObjective })
                  }
                >
                  <option value="TRAFFIC">{t.wizard.step1.traffic}</option>
                  <option value="LEADS">{t.wizard.step1.leads}</option>
                  <option value="SALES">{t.wizard.step1.sales}</option>
                  <option value="AWARENESS">{t.wizard.step1.awareness}</option>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.wizard.step1.dailyBudget}
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

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.wizard.step1.startDate}
                  </label>
                  <Input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => updateForm({ startDate: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.wizard.step1.endDate}
                  </label>
                  <Input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => updateForm({ endDate: e.target.value })}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Targeting */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.wizard.step2.locations}
                </label>
                <Input
                  placeholder={t.wizard.step2.locationsPlaceholder}
                  defaultValue="United States, Brazil"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.wizard.step2.age}
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      {t.wizard.step2.ageFrom}
                    </label>
                    <Input
                      type="number"
                      value={formData.ageFrom}
                      onChange={(e) =>
                        updateForm({ ageFrom: parseInt(e.target.value) })
                      }
                      min="18"
                      max="65"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      {t.wizard.step2.ageTo}
                    </label>
                    <Input
                      type="number"
                      value={formData.ageTo}
                      onChange={(e) =>
                        updateForm({ ageTo: parseInt(e.target.value) })
                      }
                      min="18"
                      max="65"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.wizard.step2.gender}
                </label>
                <Select
                  value={formData.gender}
                  onChange={(e) =>
                    updateForm({ gender: e.target.value as typeof formData.gender })
                  }
                >
                  <option value="all">{t.wizard.step2.all}</option>
                  <option value="male">{t.wizard.step2.male}</option>
                  <option value="female">{t.wizard.step2.female}</option>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.wizard.step2.interests}
                </label>
                <Input placeholder={t.wizard.step2.interestsPlaceholder} />
              </div>
            </div>
          )}

          {/* Step 3: Creative Assets */}
          {currentStep === 3 && (
            <div className="space-y-6">
              {/* AI Asset Generator */}
              <AIAssetGenerator />

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t-2 border-black"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-gray-50 px-4 text-sm font-bold text-gray-700 uppercase">
                    Or Upload Manually
                  </span>
                </div>
              </div>

              {/* Manual Upload */}
              <div>
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 uppercase">Upload Creative Assets</h3>
                  <p className="text-sm text-gray-600">
                    Add images, videos, stories, and other creative assets for your campaign
                  </p>
                </div>

                <AssetUpload
                  platform={formData.platform.length === 1 ? formData.platform[0] : "BOTH"}
                  value={formData.assets}
                  onChange={(assets) => updateForm({ assets })}
                />
              </div>
            </div>
          )}

          {/* Step 4: Ad Copy & Creative */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.wizard.step3.destinationUrl}
                </label>
                <Input
                  type="url"
                  value={formData.destinationUrl}
                  onChange={(e) => updateForm({ destinationUrl: e.target.value })}
                  placeholder={t.wizard.step3.destinationUrlPlaceholder}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.wizard.step3.headline}
                </label>
                <Input
                  value={formData.headline}
                  onChange={(e) => updateForm({ headline: e.target.value })}
                  placeholder={t.wizard.step3.headlinePlaceholder}
                  maxLength={30}
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.headline.length}/30
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.wizard.step3.description}
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => updateForm({ description: e.target.value })}
                  placeholder={t.wizard.step3.descriptionPlaceholder}
                  maxLength={90}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.description.length}/90
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.wizard.step3.cta}
                </label>
                <Input
                  value={formData.cta}
                  onChange={(e) => updateForm({ cta: e.target.value })}
                  placeholder={t.wizard.step3.ctaPlaceholder}
                />
              </div>
            </div>
          )}

          {/* Step 5: Review */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {t.wizard.step4.basicInfo}
                  </h3>
                  <div className="space-y-1 text-sm">
                    <p>
                      <span className="text-gray-600">Name:</span>{" "}
                      <span className="font-medium">{formData.name}</span>
                    </p>
                    <p>
                      <span className="text-gray-600">Platform(s):</span>{" "}
                      <span className="font-medium">
                        {formData.platform.join(", ")}
                      </span>
                    </p>
                    <p>
                      <span className="text-gray-600">Objective:</span>{" "}
                      <span className="font-medium">{formData.objective}</span>
                    </p>
                    <p>
                      <span className="text-gray-600">Daily Budget:</span>{" "}
                      <span className="font-medium">${formData.dailyBudget}</span>
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {t.wizard.step4.targeting}
                  </h3>
                  <div className="space-y-1 text-sm">
                    <p>
                      <span className="text-gray-600">Age:</span>{" "}
                      <span className="font-medium">
                        {formData.ageFrom} - {formData.ageTo}
                      </span>
                    </p>
                    <p>
                      <span className="text-gray-600">Gender:</span>{" "}
                      <span className="font-medium">{formData.gender}</span>
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {t.wizard.step4.creative}
                  </h3>
                  <div className="space-y-1 text-sm">
                    <p>
                      <span className="text-gray-600">Headline:</span>{" "}
                      <span className="font-medium">{formData.headline}</span>
                    </p>
                    <p>
                      <span className="text-gray-600">URL:</span>{" "}
                      <span className="font-medium text-blue-600">
                        {formData.destinationUrl}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="border border-blue-200 bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">
                  {t.wizard.step4.estimatedReach}
                </h4>
                <p className="text-2xl font-bold text-blue-600">
                  {t.wizard.step4.estimatedReachValue}
                </p>
              </div>

              <Checkbox
                label={t.wizard.step4.terms}
                checked={formData.termsAccepted}
                onChange={(e) =>
                  updateForm({ termsAccepted: e.target.checked })
                }
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button
          variant="ghost"
          onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
          disabled={currentStep === 1}
        >
          {t.wizard.previous}
        </Button>

        {currentStep < 5 ? (
          <Button
            variant="primary"
            onClick={() => setCurrentStep((prev) => prev + 1)}
            disabled={!canProceed()}
            className="flex items-center gap-2"
          >
            {t.wizard.next}
            <ArrowRight className="w-4 h-4" />
          </Button>
        ) : (
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={!canProceed()}
            className="flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            {t.wizard.step4.launchCampaign}
          </Button>
        )}
      </div>
    </div>
  );
}
