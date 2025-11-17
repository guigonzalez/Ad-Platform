"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, TrendingUp, Clock, DollarSign, Zap, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/ui/logo";
import { useTranslation } from "@/lib/i18n/context";
import { LanguageSwitcher } from "@/components/ui/language-switcher";

export default function ROICalculatorPage() {
  const { t } = useTranslation();
  // Input values
  const [monthlyCreatives, setMonthlyCreatives] = useState(300);
  const [hoursPerCreative, setHoursPerCreative] = useState(2);
  const [hourlyRate, setHourlyRate] = useState(150);
  const [teamSize, setTeamSize] = useState(3);

  // Calculations
  const manualHoursPerMonth = monthlyCreatives * hoursPerCreative;
  const aiHoursPerMonth = monthlyCreatives * 0.3; // 85% time reduction
  const hoursSaved = manualHoursPerMonth - aiHoursPerMonth;
  const monthlySavings = hoursSaved * hourlyRate;
  const platformCost = 12500; // Professional plan
  const netMonthlySavings = monthlySavings - platformCost;
  const annualROI = ((netMonthlySavings * 12) / (platformCost * 12)) * 100;
  const paybackDays = Math.ceil((platformCost / netMonthlySavings) * 30);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b-2 border-black bg-white sticky top-0 z-50 shadow-[0_4px_0px_0px_rgba(0,0,0,1)]">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Logo />
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/#recursos" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              {t.roiCalculator.nav.features}
            </Link>
            <Link href="/#roi" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              {t.roiCalculator.nav.roi}
            </Link>
            <Link href="/pricing" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              {t.roiCalculator.nav.plans}
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <Link href="/login">
              <Button variant="ghost" size="sm">
                {t.roiCalculator.nav.login}
              </Button>
            </Link>
            <Link href="/signup">
              <Button variant="primary" size="sm" className="bg-green-500 hover:bg-green-600">
                {t.roiCalculator.nav.getStarted}
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-4 py-16 text-center">
        <Badge className="mb-6 bg-green-100 text-green-900 border-2 border-green-500">
          <TrendingUp className="w-3 h-3 mr-1" />
          {t.roiCalculator.hero.badge}
        </Badge>
        <h1 className="text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight">
          {t.roiCalculator.hero.title}
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          {t.roiCalculator.hero.subtitle}
        </p>
      </section>

      {/* Calculator */}
      <section className="container mx-auto px-4 pb-20">
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Left Side - Inputs */}
          <Card className="bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <CardContent className="p-8">
              <h2 className="text-2xl font-black text-gray-900 mb-6">{t.roiCalculator.form.title}</h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    {t.roiCalculator.form.monthlyCreatives.label}
                  </label>
                  <Input
                    type="number"
                    value={monthlyCreatives}
                    onChange={(e) => setMonthlyCreatives(Number(e.target.value))}
                    className="text-lg"
                  />
                  <p className="text-xs text-gray-600 mt-1">{t.roiCalculator.form.monthlyCreatives.placeholder}</p>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    {t.roiCalculator.form.hoursPerCreative.label}
                  </label>
                  <Input
                    type="number"
                    step="0.5"
                    value={hoursPerCreative}
                    onChange={(e) => setHoursPerCreative(Number(e.target.value))}
                    className="text-lg"
                  />
                  <p className="text-xs text-gray-600 mt-1">{t.roiCalculator.form.hoursPerCreative.placeholder}</p>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    {t.roiCalculator.form.hourlyRate.label}
                  </label>
                  <Input
                    type="number"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(Number(e.target.value))}
                    className="text-lg"
                  />
                  <p className="text-xs text-gray-600 mt-1">{t.roiCalculator.form.hourlyRate.placeholder}</p>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    {t.roiCalculator.form.teamSize.label}
                  </label>
                  <Input
                    type="number"
                    value={teamSize}
                    onChange={(e) => setTeamSize(Number(e.target.value))}
                    className="text-lg"
                  />
                  <p className="text-xs text-gray-600 mt-1">{t.roiCalculator.form.teamSize.placeholder}</p>
                </div>
              </div>

              <div className="mt-8 p-4 bg-green-50 border-2 border-green-500 rounded-xl">
                <div className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-gray-900 mb-1">{t.roiCalculator.form.aiNote}</p>
                    <p className="text-xs text-gray-600">
                      {t.roiCalculator.form.aiDescription}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Right Side - Results */}
          <div className="space-y-6">
            {/* ROI Card */}
            <Card className="bg-gradient-to-br from-green-500 to-green-600 border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <CardContent className="p-8 text-white text-center">
                <Badge className="mb-4 bg-white text-green-700 border-2 border-black">
                  {t.roiCalculator.results.roi}
                </Badge>
                <div className="text-7xl font-black mb-2">
                  {annualROI > 0 ? `${Math.round(annualROI).toLocaleString('pt-BR')}%` : '0%'}
                </div>
                <p className="text-xl font-bold mb-1">{t.roiCalculator.results.firstYear}</p>
                <p className="text-sm text-white/80">
                  {paybackDays > 0 ? `${t.roiCalculator.results.paybackIn} ${paybackDays} ${t.roiCalculator.results.days}` : t.roiCalculator.results.adjustValues}
                </p>
              </CardContent>
            </Card>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-blue-500 border-2 border-black rounded-lg flex items-center justify-center">
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="text-3xl font-black text-gray-900 mb-1">
                    {Math.round(hoursSaved).toLocaleString('pt-BR')}h
                  </div>
                  <p className="text-sm text-gray-600">{t.roiCalculator.results.monthlySavings}</p>
                </CardContent>
              </Card>

              <Card className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-purple-500 border-2 border-black rounded-lg flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="text-3xl font-black text-gray-900 mb-1">
                    R$ {Math.round(monthlySavings / 1000).toLocaleString('pt-BR')}k
                  </div>
                  <p className="text-sm text-gray-600">{t.roiCalculator.results.grossSavings}</p>
                </CardContent>
              </Card>
            </div>

            {/* Breakdown */}
            <Card className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <CardContent className="p-6">
                <h3 className="text-lg font-black text-gray-900 mb-4">{t.roiCalculator.results.breakdown}</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-3 border-b-2 border-gray-200">
                    <span className="text-sm text-gray-700">{t.roiCalculator.results.manualTime}</span>
                    <span className="font-black text-gray-900">{Math.round(manualHoursPerMonth)} {t.roiCalculator.results.hours}</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b-2 border-gray-200">
                    <span className="text-sm text-gray-700">{t.roiCalculator.results.aiTime}</span>
                    <span className="font-black text-gray-900">{Math.round(aiHoursPerMonth)} {t.roiCalculator.results.hours}</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b-2 border-gray-200">
                    <span className="text-sm text-gray-700">{t.roiCalculator.results.monthlySavingsLabel}</span>
                    <span className="font-black text-green-600">R$ {Math.round(monthlySavings).toLocaleString('pt-BR')}</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b-2 border-gray-200">
                    <span className="text-sm text-gray-700">{t.roiCalculator.results.investment}</span>
                    <span className="font-black text-gray-900">R$ {platformCost.toLocaleString('pt-BR')}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-gray-900">{t.roiCalculator.results.netProfit}</span>
                    <span className="font-black text-green-600 text-lg">
                      R$ {Math.round(netMonthlySavings).toLocaleString('pt-BR')}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CTA */}
            <Card className="bg-gradient-to-br from-purple-500 to-pink-500 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <CardContent className="p-6 text-center text-white">
                <h3 className="text-xl font-black mb-2">{t.roiCalculator.cta.title}</h3>
                <p className="text-sm text-white/90 mb-4">
                  {t.roiCalculator.cta.subtitle}
                </p>
                <Link href="/signup">
                  <Button
                    variant="default"
                    className="w-full bg-white text-purple-600 hover:bg-gray-100 border-2 border-black font-bold"
                    size="lg"
                  >
                    {t.roiCalculator.cta.button}
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-20 bg-gradient-to-br from-green-50 to-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black text-gray-900 mb-12 text-center">{t.roiCalculator.howItWorks.title}</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-green-500 border-2 border-black rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-black text-gray-900 mb-2">{t.roiCalculator.howItWorks.feature1.title}</h3>
                <p className="text-sm text-gray-600">
                  {t.roiCalculator.howItWorks.feature1.description}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-500 border-2 border-black rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-black text-gray-900 mb-2">{t.roiCalculator.howItWorks.feature2.title}</h3>
                <p className="text-sm text-gray-600">
                  {t.roiCalculator.howItWorks.feature2.description}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-purple-500 border-2 border-black rounded-xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-black text-gray-900 mb-2">{t.roiCalculator.howItWorks.feature3.title}</h3>
                <p className="text-sm text-gray-600">
                  {t.roiCalculator.howItWorks.feature3.description}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-2 border-black bg-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600">{t.roiCalculator.footer}</p>
        </div>
      </footer>
    </div>
  );
}
