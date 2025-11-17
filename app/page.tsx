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
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-black text-xl">AdsPlatform</span>
          </Link>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Sign in
              </Button>
            </Link>
            <Link href="/signup">
              <Button variant="primary" size="sm">
                Get Started
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge className="mb-6 bg-purple-100 text-purple-900 border-2 border-purple-500">
              <Sparkles className="w-3 h-3 mr-1" />
              AI-Powered Platform
            </Badge>
            <h1 className="text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight">
              {t.landing.title}
              <br />
              <span className="text-purple-600">{t.landing.titleLine2}</span>
            </h1>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              {t.landing.subtitle}
            </p>
            <Link href="/signup">
              <Button variant="primary" className="text-lg px-8 py-6 inline-flex">
                {t.landing.cta}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>

            {/* Trust badges */}
            <div className="mt-12 flex items-center gap-6 flex-wrap">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-gray-600">Free 14-day trial</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-gray-600">No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-gray-600">Cancel anytime</span>
              </div>
            </div>
          </div>

          {/* Hero Image / Stats */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl border-2 border-black mb-4 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-black text-gray-900 mb-1">70%</div>
                  <div className="text-sm font-medium text-gray-600">{t.landing.stats.timeSaved}</div>
                </CardContent>
              </Card>

              <Card className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all mt-8">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-green-500 rounded-xl border-2 border-black mb-4 flex items-center justify-center">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-black text-gray-900 mb-1">2</div>
                  <div className="text-sm font-medium text-gray-600">{t.landing.stats.platforms} in {t.landing.stats.oneDashboard}</div>
                </CardContent>
              </Card>

              <Card className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-purple-500 rounded-xl border-2 border-black mb-4 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-black text-gray-900 mb-1">24/7</div>
                  <div className="text-sm font-medium text-gray-600">{t.landing.stats.autoOptimization}</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500 to-pink-500 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all mt-8">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-white rounded-xl border-2 border-black mb-4 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="text-3xl font-black text-white mb-1">AI</div>
                  <div className="text-sm font-medium text-white/90">Powered</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-gray-900 mb-4">{t.landing.features.title}</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to run successful ad campaigns on Google and Meta
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <FeatureCard
            icon={<BarChart3 className="w-8 h-8" />}
            iconBg="bg-blue-500"
            title={t.landing.features.unifiedDashboard.title}
            description={t.landing.features.unifiedDashboard.description}
          />
          <FeatureCard
            icon={<Zap className="w-8 h-8" />}
            iconBg="bg-orange-500"
            title={t.landing.features.smartAutomation.title}
            description={t.landing.features.smartAutomation.description}
          />
          <FeatureCard
            icon={<Brain className="w-8 h-8" />}
            iconBg="bg-purple-500"
            title="AI Asset Generation"
            description="Generate campaign assets, copy, and creatives powered by AI"
          />
          <FeatureCard
            icon={<Target className="w-8 h-8" />}
            iconBg="bg-pink-500"
            title="Smart Targeting"
            description="AI-powered audience targeting based on your campaign goals"
          />
          <FeatureCard
            icon={<TrendingUp className="w-8 h-8" />}
            iconBg="bg-green-500"
            title={t.landing.features.teamManagement.title}
            description={t.landing.features.teamManagement.description}
          />
          <FeatureCard
            icon={<Shield className="w-8 h-8" />}
            iconBg="bg-cyan-500"
            title="Enterprise Security"
            description="Corporate billing, invoicing, and enterprise-grade security"
          />
        </div>
      </section>

      {/* How it works */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">How it works</h2>
            <p className="text-xl text-gray-600">
              Get started in minutes with our AI-powered workflow
            </p>
          </div>

          <div className="space-y-6">
            <StepCard
              number="1"
              title="Import AI-Generated Assets"
              description="Search and import campaign assets generated by our AI platform"
              color="purple"
            />
            <StepCard
              number="2"
              title="AI Analyzes & Configures"
              description="AI automatically generates campaign parameters based on your assets"
              color="pink"
            />
            <StepCard
              number="3"
              title="Review & Launch"
              description="Review AI suggestions, make adjustments, and launch across platforms"
              color="orange"
            />
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="container mx-auto px-4 py-20 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="text-center mb-16">
          <Badge className="mb-6 bg-purple-100 text-purple-900 border-2 border-purple-500">
            <Star className="w-3 h-3 mr-1" />
            Simple, Transparent Pricing
          </Badge>
          <h2 className="text-4xl font-black text-gray-900 mb-4">Choose your plan</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Start free and scale as you grow. All plans include 14-day free trial.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Free Plan */}
          <PricingCard
            name="Free"
            price="$0"
            period="forever"
            description="Perfect for testing and small projects"
            features={[
              "Up to 3 campaigns",
              "1 team member",
              "Basic analytics",
              "Email support",
              "2 platforms (Meta & Google)",
            ]}
            cta="Start Free"
            href="/signup"
            popular={false}
          />

          {/* Professional Plan */}
          <PricingCard
            name="Professional"
            price="$99"
            period="per month"
            description="For growing businesses and agencies"
            features={[
              "Unlimited campaigns",
              "Up to 5 team members",
              "Advanced analytics",
              "Priority support",
              "AI asset generation",
              "Automation rules",
              "Custom reporting",
            ]}
            cta="Start Free Trial"
            href="/signup"
            popular={true}
          />

          {/* Enterprise Plan */}
          <PricingCard
            name="Enterprise"
            price="Custom"
            period="contact us"
            description="For large teams and corporations"
            features={[
              "Everything in Professional",
              "Unlimited team members",
              "Dedicated account manager",
              "24/7 phone support",
              "Corporate billing & invoicing",
              "Custom integrations",
              "SLA guarantee",
            ]}
            cta="Contact Sales"
            href="/signup"
            popular={false}
          />
        </div>
      </section>

      {/* Social Proof */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-gray-900 mb-4">Trusted by marketing teams</h2>
          <p className="text-xl text-gray-600">
            Join hundreds of companies automating their ad campaigns
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <TestimonialCard
            quote="AdsPlatform cut our campaign management time by 70%. The AI suggestions are incredibly accurate."
            author="Sarah Johnson"
            role="Marketing Director"
            company="TechCorp"
          />
          <TestimonialCard
            quote="Finally, a platform that actually understands both Meta and Google Ads. Game changer for our agency."
            author="Michael Chen"
            role="CEO"
            company="Digital Agency Pro"
          />
          <TestimonialCard
            quote="The automation rules saved us thousands in wasted ad spend. ROI improved by 45% in the first month."
            author="Amanda Silva"
            role="Growth Manager"
            company="E-commerce Plus"
          />
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-20">
        <Card className="bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <CardContent className="p-12 text-center">
            <h2 className="text-4xl font-black text-white mb-4">
              {t.landing.cta2.title}
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              {t.landing.cta2.subtitle}
            </p>
            <Link href="/signup">
              <Button
                variant="default"
                className="bg-white text-purple-600 hover:bg-gray-100 border-2 border-black text-lg px-8 py-6 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
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
