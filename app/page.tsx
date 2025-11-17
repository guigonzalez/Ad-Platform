"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Zap,
  Brain,
  Target,
  TrendingUp,
  Check,
  BarChart3,
  Globe,
  Shield,
  Users,
  Star,
  X,
} from "lucide-react";
import { useTranslation } from "@/lib/i18n/context";
import { useAuthStore } from "@/lib/auth-store";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Logo } from "@/components/ui/logo";

export default function Home() {
  const { t } = useTranslation();
  const router = useRouter();
  const { isAuthenticated, isOnboarding } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated && isOnboarding) {
      router.push("/onboarding");
    } else if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, isOnboarding, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      {/* Header */}
      <header className="border-b-2 border-black bg-white sticky top-0 z-50 shadow-[0_4px_0px_0px_rgba(0,0,0,1)]">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Logo />
          <nav className="hidden md:flex items-center gap-6">
            <a href="#recursos" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              {t.pricing.nav.features}
            </a>
            <a href="#roi" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              {t.pricing.nav.roi}
            </a>
            <Link href="/pricing" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              {t.pricing.nav.plans}
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <Link href="/login">
              <Button variant="ghost" size="sm">
                {t.pricing.nav.login}
              </Button>
            </Link>
            <Link href="/signup">
              <Button variant="primary" size="sm">
                {t.pricing.nav.getStarted}
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <Badge className="mb-6 bg-green-100 text-green-900 border-2 border-green-500">
              {t.landing.hero.badge}
            </Badge>
            <h1 className="text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight">
              {t.landing.hero.title}
            </h1>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              {t.landing.hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/signup">
                <Button variant="primary" className="bg-green-500 hover:bg-green-600 text-lg px-8 py-6 inline-flex">
                  {t.landing.hero.ctaPrimary}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/pricing">
                <Button variant="default" className="text-lg px-8 py-6 inline-flex">
                  {t.landing.hero.ctaSecondary}
                </Button>
              </Link>
            </div>

            {/* Trust badges */}
            <div className="mt-8 flex items-center gap-6 flex-wrap">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-gray-600">{t.landing.hero.trustBadges.freeTrial}</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-gray-600">{t.landing.hero.trustBadges.noCard}</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-gray-600">{t.landing.hero.trustBadges.cancelAnytime}</span>
              </div>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative">
            <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <CardContent className="p-8">
                <div className="space-y-6">
                  {/* Mock Dashboard Preview */}
                  <div className="bg-white border-2 border-black rounded-xl p-4">
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-bold text-gray-900">Performance Overview</span>
                      <Badge className="bg-green-500 text-white border-2 border-black">Live</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-gradient-to-br from-green-100 to-green-50 border-2 border-green-500 rounded-lg p-3">
                        <div className="text-2xl font-black text-green-700">+247%</div>
                        <div className="text-xs font-medium text-green-600">ROI Increase</div>
                      </div>
                      <div className="bg-gradient-to-br from-blue-100 to-blue-50 border-2 border-blue-500 rounded-lg p-3">
                        <div className="text-2xl font-black text-blue-700">84%</div>
                        <div className="text-xs font-medium text-blue-600">Time Saved</div>
                      </div>
                    </div>
                  </div>

                  {/* Mock AI Suggestion */}
                  <div className="bg-white border-2 border-black rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-purple-500 border-2 border-black rounded-lg flex items-center justify-center flex-shrink-0">
                        <Sparkles className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-gray-900 mb-1">AI Recommendation</div>
                        <p className="text-sm text-gray-600">Optimize creative #3 to increase CTR by 18%</p>
                        <div className="mt-3 flex gap-2">
                          <div className="px-3 py-1 bg-green-500 border-2 border-black rounded-lg text-xs font-bold text-white">Apply</div>
                          <div className="px-3 py-1 bg-gray-100 border-2 border-gray-300 rounded-lg text-xs font-bold text-gray-700">Dismiss</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Floating Stats */}
            <div className="absolute -bottom-6 -left-6 hidden lg:block">
              <Card className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-500 border-2 border-black rounded-lg flex items-center justify-center">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-xl font-black text-gray-900">1.2K+</div>
                    <div className="text-xs text-gray-600">Creatives/Month</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div id="recursos" className="text-center mb-12 scroll-mt-24">
          <h2 className="text-3xl font-black text-gray-900 mb-3">{t.landing.features2.title}</h2>
          <p className="text-gray-600">{t.landing.features2.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <FeatureCard
            icon={<Sparkles className="w-8 h-8" />}
            iconBg="bg-green-500"
            title={t.landing.features2.feature1.title}
            description={t.landing.features2.feature1.description}
          />
          <FeatureCard
            icon={<Shield className="w-8 h-8" />}
            iconBg="bg-green-500"
            title={t.landing.features2.feature2.title}
            description={t.landing.features2.feature2.description}
          />
          <FeatureCard
            icon={<TrendingUp className="w-8 h-8" />}
            iconBg="bg-green-500"
            title={t.landing.features2.feature3.title}
            description={t.landing.features2.feature3.description}
          />
          <FeatureCard
            icon={<Zap className="w-8 h-8" />}
            iconBg="bg-green-500"
            title={t.landing.features2.feature4.title}
            description={t.landing.features2.feature4.description}
          />
          <FeatureCard
            icon={<Globe className="w-8 h-8" />}
            iconBg="bg-green-500"
            title={t.landing.features2.feature5.title}
            description={t.landing.features2.feature5.description}
          />
          <FeatureCard
            icon={<Users className="w-8 h-8" />}
            iconBg="bg-green-500"
            title={t.landing.features2.feature6.title}
            description={t.landing.features2.feature6.description}
          />
        </div>
      </section>

      {/* Multi-Dimensional Evaluation */}
      <section className="container mx-auto px-4 py-20 bg-gradient-to-br from-green-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-6 bg-green-100 text-green-900 border-2 border-green-500">
                {t.landing.evaluation.badge}
              </Badge>
              <h2 className="text-4xl font-black text-gray-900 mb-6">
                {t.landing.evaluation.title}
              </h2>
              <p className="text-lg text-gray-700 mb-8">
                {t.landing.evaluation.subtitle}
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{t.landing.evaluation.feature1.title}</h3>
                    <p className="text-gray-600 text-sm">{t.landing.evaluation.feature1.description}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{t.landing.evaluation.feature2.title}</h3>
                    <p className="text-gray-600 text-sm">{t.landing.evaluation.feature2.description}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{t.landing.evaluation.feature3.title}</h3>
                    <p className="text-gray-600 text-sm">{t.landing.evaluation.feature3.description}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <Card className="bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between pb-4 border-b-2 border-gray-200">
                      <span className="font-bold text-gray-700">{t.landing.evaluation.card.title}</span>
                      <Badge className="bg-green-500 text-white border-2 border-black">{t.landing.evaluation.card.badge}</Badge>
                    </div>

                    {[
                      { label: t.landing.evaluation.card.competitiveness, score: 94, color: "bg-green-500" },
                      { label: t.landing.evaluation.card.userExperience, score: 88, color: "bg-blue-500" },
                      { label: t.landing.evaluation.card.predictivePerformance, score: 92, color: "bg-purple-500" },
                    ].map((metric, idx) => (
                      <div key={idx}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">{metric.label}</span>
                          <span className="text-sm font-black text-gray-900">{metric.score}%</span>
                        </div>
                        <div className="h-3 bg-gray-200 rounded-full border-2 border-black overflow-hidden">
                          <div
                            className={`h-full ${metric.color} border-r-2 border-black`}
                            style={{ width: `${metric.score}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Continuous Feedback System */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <Card className="bg-gradient-to-br from-purple-500 to-pink-500 border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <CardContent className="p-8 text-white">
                  <h3 className="text-2xl font-black mb-6">{t.landing.feedback.card.title}</h3>
                  <div className="space-y-4">
                    <div className="bg-white/10 border-2 border-white/30 rounded-xl p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <TrendingUp className="w-5 h-5" />
                        <span className="font-bold">{t.landing.feedback.card.insight1.label}</span>
                      </div>
                      <p className="text-sm text-white/80">{t.landing.feedback.card.insight1.description}</p>
                    </div>
                    <div className="bg-white/10 border-2 border-white/30 rounded-xl p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <Zap className="w-5 h-5" />
                        <span className="font-bold">{t.landing.feedback.card.insight2.label}</span>
                      </div>
                      <p className="text-sm text-white/80">{t.landing.feedback.card.insight2.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="order-1 lg:order-2">
              <Badge className="mb-6 bg-green-100 text-green-900 border-2 border-green-500">
                {t.landing.feedback.badge}
              </Badge>
              <h2 className="text-4xl font-black text-gray-900 mb-6">
                {t.landing.feedback.title}
              </h2>
              <p className="text-lg text-gray-700 mb-8">
                {t.landing.feedback.subtitle}
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{t.landing.feedback.feature1.title}</h3>
                    <p className="text-gray-600 text-sm">{t.landing.feedback.feature1.description}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{t.landing.feedback.feature2.title}</h3>
                    <p className="text-gray-600 text-sm">{t.landing.feedback.feature2.description}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{t.landing.feedback.feature3.title}</h3>
                    <p className="text-gray-600 text-sm">{t.landing.feedback.feature3.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Section */}
      <section id="roi" className="container mx-auto px-4 py-20 bg-gradient-to-br from-green-50 to-white scroll-mt-24">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-6 bg-green-100 text-green-900 border-2 border-green-500">
            {t.landing.roi.badge}
          </Badge>
          <h2 className="text-4xl font-black text-gray-900 mb-12">{t.landing.roi.title}</h2>

          <Card className="bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2">
                {/* Left Side - Cliente Real */}
                <div className="p-8 border-r-2 border-black">
                  <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
                    <Users className="w-6 h-6 text-green-600" />
                    {t.landing.roi.realClient}
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-3 border-b-2 border-gray-200">
                      <span className="text-gray-700">{t.landing.roi.manualTime}</span>
                      <span className="font-black text-gray-900">240 {t.landing.roi.stats.hours}</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b-2 border-gray-200">
                      <span className="text-gray-700">{t.landing.roi.aiTime}</span>
                      <span className="font-black text-gray-900">38 {t.landing.roi.stats.hours}</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b-2 border-gray-200">
                      <span className="text-gray-700">{t.landing.roi.monthlySavings}</span>
                      <span className="font-black text-green-600">R$ 274.926</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">{t.landing.roi.monthlyInvestment}</span>
                      <span className="font-black text-gray-900">R$ 12.500</span>
                    </div>
                  </div>
                </div>

                {/* Right Side - ROI */}
                <div className="p-8 bg-gradient-to-br from-green-50 to-white flex flex-col items-center justify-center">
                  <div className="text-7xl font-black text-green-600 mb-4">2.539%</div>
                  <div className="text-xl font-bold text-gray-900 mb-2">{t.landing.roi.roi}</div>
                  <p className="text-sm text-gray-600 mb-6">{t.landing.roi.payback}</p>
                  <Link href="/roi-calculator">
                    <Button variant="primary" size="lg" className="bg-green-500 hover:bg-green-600">
                      {t.landing.roi.cta}
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-20">
        <Card className="bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <CardContent className="p-16 text-center">
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4">
              {t.landing.cta.title}
            </h2>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              {t.landing.cta.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button
                  variant="primary"
                  className="bg-green-500 hover:bg-green-600 border-2 border-black text-lg px-10 py-6 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                >
                  {t.landing.cta.ctaPrimary}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/signup">
                <Button
                  variant="default"
                  className="text-lg px-10 py-6 font-bold"
                >
                  {t.landing.cta.ctaSecondary}
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t-2 border-black bg-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600">{t.landing.footer}</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  iconBg,
  title,
  description,
}: {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  description: string;
}) {
  return (
    <Card className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all h-full">
      <CardContent className="p-6">
        <div
          className={`w-14 h-14 ${iconBg} rounded-xl border-2 border-black mb-4 flex items-center justify-center text-white`}
        >
          {icon}
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
}

function StepCard({
  number,
  title,
  description,
  color,
}: {
  number: string;
  title: string;
  description: string;
  color: "purple" | "pink" | "orange";
}) {
  const colorClasses = {
    purple: "bg-purple-500",
    pink: "bg-pink-500",
    orange: "bg-orange-500",
  };

  return (
    <Card className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <CardContent className="p-6 flex items-start gap-4">
        <div
          className={`w-12 h-12 ${colorClasses[color]} rounded-xl border-2 border-black flex items-center justify-center text-white text-xl font-black flex-shrink-0`}
        >
          {number}
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function PricingCard({
  name,
  price,
  period,
  description,
  features,
  cta,
  href,
  popular,
}: {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  href: string;
  popular: boolean;
}) {
  return (
    <Card
      className={`bg-white border-2 border-black ${
        popular
          ? "shadow-[8px_8px_0px_0px_rgba(139,92,246,1)] ring-4 ring-purple-500"
          : "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
      } hover:translate-x-[2px] hover:translate-y-[2px] transition-all relative`}
    >
      {popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <Badge className="bg-purple-500 text-white border-2 border-black px-4 py-1">
            <Star className="w-3 h-3 mr-1" />
            Most Popular
          </Badge>
        </div>
      )}
      <CardContent className="p-8">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-black text-gray-900 mb-2">{name}</h3>
          <div className="mb-2">
            <span className="text-5xl font-black text-gray-900">{price}</span>
            {price !== "Custom" && <span className="text-gray-600 ml-2">/{period}</span>}
            {price === "Custom" && <span className="text-gray-600 text-xl ml-2">{period}</span>}
          </div>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>

        <ul className="space-y-3 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>

        <Link href={href}>
          <Button
            variant={popular ? "primary" : "default"}
            className="w-full"
            size="lg"
          >
            {cta}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

function TestimonialCard({
  quote,
  author,
  role,
  company,
}: {
  quote: string;
  author: string;
  role: string;
  company: string;
}) {
  return (
    <Card className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
      <CardContent className="p-6">
        <div className="flex gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
        <p className="text-gray-700 mb-6 leading-relaxed italic">"{quote}"</p>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full border-2 border-black flex items-center justify-center text-white font-bold">
            {author.split(" ").map((n) => n[0]).join("")}
          </div>
          <div>
            <p className="font-bold text-gray-900">{author}</p>
            <p className="text-sm text-gray-600">{role} at {company}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
