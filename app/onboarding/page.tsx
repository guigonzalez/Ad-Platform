"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/auth-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  Building2,
  CreditCard,
  Check,
  ArrowRight,
  Loader2,
  FileText,
} from "lucide-react";

export default function OnboardingPage() {
  const router = useRouter();
  const {
    user,
    isOnboarding,
    onboardingStep,
    createOrganization,
    setupBilling,
    completeOnboarding,
    setOnboardingStep,
  } = useAuthStore();

  const [isLoading, setIsLoading] = useState(false);

  // Step 1: Organization
  const [orgName, setOrgName] = useState("");
  const [orgSlug, setOrgSlug] = useState("");
  const [plan, setPlan] = useState<"professional" | "enterprise">("professional");

  // Step 2: Billing
  const [billingType, setBillingType] = useState<"card" | "invoice">("invoice");
  const [taxId, setTaxId] = useState("");
  const [invoiceEmail, setInvoiceEmail] = useState(user?.email || "");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("Brazil");

  useEffect(() => {
    if (!isOnboarding) {
      router.push("/dashboard");
    }
  }, [isOnboarding, router]);

  // Auto-generate slug from org name
  useEffect(() => {
    if (orgName && onboardingStep === 1) {
      const slug = orgName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
      setOrgSlug(slug);
    }
  }, [orgName, onboardingStep]);

  const handleStep1Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 800));

    createOrganization({
      name: orgName,
      slug: orgSlug,
      plan,
    });

    setIsLoading(false);
  };

  const handleStep2Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setupBilling({
      billingType,
      taxId: billingType === "invoice" ? taxId : undefined,
      invoiceEmail: billingType === "invoice" ? invoiceEmail : undefined,
      address:
        billingType === "invoice"
          ? {
              street,
              city,
              state,
              zipCode,
              country,
            }
          : undefined,
    });

    setIsLoading(false);
  };

  const handleComplete = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    completeOnboarding();
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-black text-gray-900">AdsPlatform</h1>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome, {user?.name}!</h2>
          <p className="text-gray-600">Let's set up your account in just a few steps</p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-4">
            {[
              { num: 1, label: "Organization", icon: Building2 },
              { num: 2, label: "Billing", icon: CreditCard },
              { num: 3, label: "Complete", icon: Check },
            ].map((step, idx) => (
              <div key={step.num} className="flex items-center gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center font-bold transition-all ${
                      onboardingStep > step.num
                        ? "bg-green-500 border-green-600 text-white"
                        : onboardingStep === step.num
                        ? "bg-purple-500 border-purple-600 text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)]"
                        : "bg-gray-100 border-gray-300 text-gray-400"
                    }`}
                  >
                    {onboardingStep > step.num ? (
                      <Check className="w-6 h-6" />
                    ) : (
                      <step.icon className="w-6 h-6" />
                    )}
                  </div>
                  <p
                    className={`text-xs font-medium mt-2 ${
                      onboardingStep >= step.num ? "text-gray-900" : "text-gray-400"
                    }`}
                  >
                    {step.label}
                  </p>
                </div>
                {idx < 2 && (
                  <div
                    className={`w-16 h-1 rounded-full transition-all ${
                      onboardingStep > step.num ? "bg-green-500" : "bg-gray-300"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Organization */}
        {onboardingStep === 1 && (
          <Card>
            <CardContent className="p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Create your organization
              </h3>
              <p className="text-gray-600 mb-6">
                Your organization will be the workspace for all your campaigns
              </p>

              <form onSubmit={handleStep1Submit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Organization Name
                  </label>
                  <Input
                    type="text"
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    placeholder="Acme Inc."
                    required
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    URL Slug
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">adsplatform.com/</span>
                    <Input
                      type="text"
                      value={orgSlug}
                      onChange={(e) => setOrgSlug(e.target.value)}
                      placeholder="acme-inc"
                      required
                      disabled={isLoading}
                      pattern="[a-z0-9-]+"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Choose a Plan
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setPlan("professional")}
                      disabled={isLoading}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        plan === "professional"
                          ? "border-purple-500 bg-purple-50 shadow-[2px_2px_0px_0px_rgba(147,51,234,0.3)]"
                          : "border-gray-300 bg-white hover:border-gray-400"
                      }`}
                    >
                      <div className="font-bold text-gray-900 mb-1">Professional</div>
                      <div className="text-2xl font-black text-gray-900 mb-2">
                        $99<span className="text-sm font-normal text-gray-600">/mo</span>
                      </div>
                      <ul className="text-xs text-gray-600 space-y-1">
                        <li>• Up to 50 campaigns</li>
                        <li>• AI asset generation</li>
                        <li>• Basic automation</li>
                      </ul>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPlan("enterprise")}
                      disabled={isLoading}
                      className={`p-4 rounded-xl border-2 text-left transition-all relative ${
                        plan === "enterprise"
                          ? "border-purple-500 bg-purple-50 shadow-[2px_2px_0px_0px_rgba(147,51,234,0.3)]"
                          : "border-gray-300 bg-white hover:border-gray-400"
                      }`}
                    >
                      <Badge className="absolute -top-2 -right-2 bg-orange-500 text-white border-2 border-black">
                        Popular
                      </Badge>
                      <div className="font-bold text-gray-900 mb-1">Enterprise</div>
                      <div className="text-2xl font-black text-gray-900 mb-2">
                        $299<span className="text-sm font-normal text-gray-600">/mo</span>
                      </div>
                      <ul className="text-xs text-gray-600 space-y-1">
                        <li>• Unlimited campaigns</li>
                        <li>• Advanced AI features</li>
                        <li>• Priority support</li>
                      </ul>
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  className="w-full"
                  disabled={isLoading || !orgName || !orgSlug}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Creating organization...
                    </>
                  ) : (
                    <>
                      Continue
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Billing */}
        {onboardingStep === 2 && (
          <Card>
            <CardContent className="p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Set up billing</h3>
              <p className="text-gray-600 mb-6">
                Choose your payment method. Enterprise customers can use invoice billing.
              </p>

              <form onSubmit={handleStep2Submit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Billing Method
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setBillingType("card")}
                      disabled={isLoading}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        billingType === "card"
                          ? "border-purple-500 bg-purple-50"
                          : "border-gray-300 bg-white hover:border-gray-400"
                      }`}
                    >
                      <CreditCard className="w-6 h-6 text-gray-700 mb-2" />
                      <div className="font-bold text-gray-900">Credit Card</div>
                      <p className="text-xs text-gray-600 mt-1">Pay monthly with card</p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setBillingType("invoice")}
                      disabled={isLoading}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        billingType === "invoice"
                          ? "border-purple-500 bg-purple-50"
                          : "border-gray-300 bg-white hover:border-gray-400"
                      }`}
                    >
                      <FileText className="w-6 h-6 text-gray-700 mb-2" />
                      <div className="font-bold text-gray-900">Invoice</div>
                      <p className="text-xs text-gray-600 mt-1">Corporate billing</p>
                    </button>
                  </div>
                </div>

                {billingType === "invoice" && (
                  <>
                    <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
                      <p className="text-sm text-blue-900 font-medium mb-1">
                        Corporate Billing
                      </p>
                      <p className="text-xs text-blue-700">
                        You'll receive monthly invoices via email with 30-day payment terms.
                        Perfect for companies that need formal invoicing and accounting processes.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Tax ID (CNPJ/CPF)
                        </label>
                        <Input
                          type="text"
                          value={taxId}
                          onChange={(e) => setTaxId(e.target.value)}
                          placeholder="00.000.000/0000-00"
                          required
                          disabled={isLoading}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Invoice Email
                        </label>
                        <Input
                          type="email"
                          value={invoiceEmail}
                          onChange={(e) => setInvoiceEmail(e.target.value)}
                          placeholder="billing@company.com"
                          required
                          disabled={isLoading}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Street Address
                      </label>
                      <Input
                        type="text"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        placeholder="123 Main Street"
                        required
                        disabled={isLoading}
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          City
                        </label>
                        <Input
                          type="text"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="São Paulo"
                          required
                          disabled={isLoading}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          State
                        </label>
                        <Input
                          type="text"
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                          placeholder="SP"
                          required
                          disabled={isLoading}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          ZIP Code
                        </label>
                        <Input
                          type="text"
                          value={zipCode}
                          onChange={(e) => setZipCode(e.target.value)}
                          placeholder="01234-567"
                          required
                          disabled={isLoading}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Country
                      </label>
                      <Select
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                        disabled={isLoading}
                      >
                        <option value="Brazil">Brazil</option>
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Other">Other</option>
                      </Select>
                    </div>
                  </>
                )}

                {billingType === "card" && (
                  <div className="p-4 bg-gray-50 border-2 border-gray-200 rounded-lg text-center">
                    <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">
                      Card payment integration coming soon
                    </p>
                  </div>
                )}

                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setOnboardingStep(1)}
                    disabled={isLoading}
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    className="flex-1"
                    disabled={
                      isLoading ||
                      (billingType === "invoice" &&
                        (!taxId || !invoiceEmail || !street || !city || !state || !zipCode))
                    }
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Saving billing info...
                      </>
                    ) : (
                      <>
                        Continue
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Complete */}
        {onboardingStep === 3 && (
          <Card>
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 bg-green-500 rounded-full border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-white" strokeWidth={3} />
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                You're all set!
              </h3>
              <p className="text-gray-600 mb-8">
                Your organization has been created and billing is configured. Let's start creating campaigns!
              </p>

              <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-6 mb-8 text-left">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500 mb-1">Organization</p>
                    <p className="font-semibold text-gray-900">{useAuthStore.getState().organization?.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1">Plan</p>
                    <p className="font-semibold text-gray-900 capitalize">
                      {useAuthStore.getState().organization?.plan}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1">Billing</p>
                    <p className="font-semibold text-gray-900">
                      {billingType === "invoice" ? "Monthly Invoice" : "Credit Card"}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1">Status</p>
                    <Badge variant="warning">Pending Setup</Badge>
                  </div>
                </div>
              </div>

              <Button
                variant="primary"
                className="w-full"
                onClick={handleComplete}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Setting up your dashboard...
                  </>
                ) : (
                  <>
                    Go to Dashboard
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
