"use client";

import Link from "next/link";
import { ArrowRight, BarChart3, Zap, Users, TrendingUp } from "lucide-react";
import { useTranslation } from "@/lib/i18n/context";
import { LanguageSwitcher } from "@/components/ui/language-switcher";

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl">Ads Platform</span>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <Link
              href="/dashboard"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {t.landing.viewDemo}
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {t.landing.title}
          <br />
          {t.landing.titleLine2}
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          {t.landing.subtitle}
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/dashboard"
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 text-lg"
          >
            {t.landing.cta}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div>
            <div className="text-4xl font-bold text-blue-600">70%</div>
            <div className="text-gray-600 mt-2">{t.landing.stats.timeSaved}</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-blue-600">2 {t.landing.stats.platforms}</div>
            <div className="text-gray-600 mt-2">{t.landing.stats.oneDashboard}</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-blue-600">24/7</div>
            <div className="text-gray-600 mt-2">{t.landing.stats.autoOptimization}</div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">{t.landing.features.title}</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <FeatureCard
            icon={<BarChart3 className="w-10 h-10 text-blue-600" />}
            title={t.landing.features.unifiedDashboard.title}
            description={t.landing.features.unifiedDashboard.description}
          />
          <FeatureCard
            icon={<Zap className="w-10 h-10 text-blue-600" />}
            title={t.landing.features.smartAutomation.title}
            description={t.landing.features.smartAutomation.description}
          />
          <FeatureCard
            icon={<Users className="w-10 h-10 text-blue-600" />}
            title={t.landing.features.teamManagement.title}
            description={t.landing.features.teamManagement.description}
          />
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">{t.landing.cta2.title}</h2>
          <p className="text-xl mb-8 opacity-90">
            {t.landing.cta2.subtitle}
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors text-lg font-semibold"
          >
            {t.landing.viewDemo}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 text-center text-gray-600">
        <p>{t.landing.footer}</p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
