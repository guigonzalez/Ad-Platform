"use client";

import Link from "next/link";
import { ArrowRight, Check, Star, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Logo } from "@/components/ui/logo";
import { useTranslation } from "@/lib/i18n/context";
import { LanguageSwitcher } from "@/components/ui/language-switcher";

export default function PricingPage() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b-2 border-black bg-white sticky top-0 z-50 shadow-[0_4px_0px_0px_rgba(0,0,0,1)]">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Logo />
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/#recursos" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              {t.pricing.nav.features}
            </Link>
            <Link href="/#roi" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              {t.pricing.nav.roi}
            </Link>
            <Link href="/pricing" className="text-gray-900 font-bold border-b-2 border-green-500">
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
              <Button variant="primary" size="sm" className="bg-green-500 hover:bg-green-600">
                {t.pricing.nav.getStarted}
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-4 py-20 text-center">
        <Badge className="mb-6 bg-green-100 text-green-900 border-2 border-green-500">
          <Star className="w-3 h-3 mr-1" />
          {t.pricing.hero.badge}
        </Badge>
        <h1 className="text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight">
          {t.pricing.hero.title}
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
          {t.pricing.hero.subtitle}
        </p>
      </section>

      {/* Pricing Cards */}
      <section className="container mx-auto px-4 pb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {/* Starter Plan */}
          <Card className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <Badge className="bg-blue-500 text-white border-2 border-black px-4 py-1">
                {t.pricing.plans.starter.badge}
              </Badge>
            </div>
            <CardContent className="p-6">
              <div className="mb-6">
                <h3 className="text-xl font-black text-gray-900 mb-4">{t.pricing.plans.starter.name}</h3>
                <div className="mb-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black text-gray-900">R$ 6.000</span>
                    <span className="text-gray-600">/{t.pricing.plans.starter.price}</span>
                  </div>
                  <div className="text-sm text-gray-700 mt-1 font-medium">
                    + {t.pricing.plans.starter.setup}: R$ 17.500
                  </div>
                </div>
                <p className="text-gray-600 text-xs mt-2">{t.pricing.plans.starter.description}</p>
              </div>

              <ul className="space-y-2 mb-6 text-sm">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{t.pricing.plans.starter.features.creatives}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{t.pricing.plans.starter.features.brands}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{t.pricing.plans.starter.features.orchestration}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{t.pricing.plans.starter.features.qa}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{t.pricing.plans.starter.features.templates}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{t.pricing.plans.starter.features.integrations}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{t.pricing.plans.starter.features.dashboard}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{t.pricing.plans.starter.features.support}</span>
                </li>
              </ul>

              <Link href="/signup">
                <Button variant="default" className="w-full" size="lg">
                  {t.pricing.plans.starter.cta}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Professional Plan - Popular */}
          <Card className="bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(34,197,94,1)] ring-4 ring-green-500 hover:translate-x-[2px] hover:translate-y-[2px] transition-all relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <Badge className="bg-green-500 text-white border-2 border-black px-4 py-1">
                <Star className="w-3 h-3 mr-1" />
                {t.pricing.plans.professional.badge}
              </Badge>
            </div>
            <CardContent className="p-6">
              <div className="mb-6">
                <h3 className="text-xl font-black text-gray-900 mb-4">{t.pricing.plans.professional.name}</h3>
                <div className="mb-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black text-gray-900">R$ 12.500</span>
                    <span className="text-gray-600">/{t.pricing.plans.professional.price}</span>
                  </div>
                  <div className="text-sm text-gray-700 mt-1 font-medium">
                    + {t.pricing.plans.professional.setup}: R$ 42.500
                  </div>
                </div>
                <p className="text-gray-600 text-xs mt-2">{t.pricing.plans.professional.description}</p>
              </div>

              <ul className="space-y-2 mb-6 text-sm">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{t.pricing.plans.professional.features.creatives}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{t.pricing.plans.professional.features.brands}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{t.pricing.plans.professional.features.includes}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{t.pricing.plans.professional.features.whiteLabel}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{t.pricing.plans.professional.features.aiTraining}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{t.pricing.plans.professional.features.integrations}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{t.pricing.plans.professional.features.workflows}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{t.pricing.plans.professional.features.support}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{t.pricing.plans.professional.features.training}</span>
                </li>
              </ul>

              <Link href="/signup">
                <Button variant="primary" className="w-full bg-green-500 hover:bg-green-600" size="lg">
                  {t.pricing.plans.professional.cta}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Agency Plan */}
          <Card className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
            <CardContent className="p-6">
              <div className="mb-6">
                <h3 className="text-xl font-black text-gray-900 mb-4">{t.pricing.plans.agency.name}</h3>
                <div className="mb-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black text-gray-900">R$ 25.000</span>
                    <span className="text-gray-600">/{t.pricing.plans.agency.price}</span>
                  </div>
                  <div className="text-sm text-gray-700 mt-1 font-medium">
                    + {t.pricing.plans.agency.setup}: R$ 85.000
                  </div>
                </div>
                <p className="text-gray-600 text-xs mt-2">{t.pricing.plans.agency.description}</p>
              </div>

              <ul className="space-y-2 mb-6 text-sm">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{t.pricing.plans.agency.features.creatives}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{t.pricing.plans.agency.features.brands}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{t.pricing.plans.agency.features.includes}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{t.pricing.plans.agency.features.manager}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{t.pricing.plans.agency.features.sla}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{t.pricing.plans.agency.features.support}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{t.pricing.plans.agency.features.consulting}</span>
                </li>
              </ul>

              <Link href="/signup">
                <Button variant="default" className="w-full" size="lg">
                  {t.pricing.plans.agency.cta}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Enterprise Plan */}
          <Card className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
            <CardContent className="p-6">
              <div className="mb-6">
                <h3 className="text-xl font-black text-gray-900 mb-4">{t.pricing.plans.enterprise.name}</h3>
                <div className="mb-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-gray-900">{t.pricing.plans.enterprise.price}</span>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    {t.pricing.plans.enterprise.setupCustom}
                  </div>
                </div>
                <p className="text-gray-600 text-xs mt-2">{t.pricing.plans.enterprise.description}</p>
              </div>

              <ul className="space-y-2 mb-6 text-sm">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{t.pricing.plans.enterprise.features.creatives}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{t.pricing.plans.enterprise.features.brands}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{t.pricing.plans.enterprise.features.includes}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{t.pricing.plans.enterprise.features.infrastructure}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{t.pricing.plans.enterprise.features.compliance}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{t.pricing.plans.enterprise.features.integrations}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{t.pricing.plans.enterprise.features.csm}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{t.pricing.plans.enterprise.features.roi}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{t.pricing.plans.enterprise.features.roadmap}</span>
                </li>
              </ul>

              <Link href="/signup">
                <Button variant="default" className="w-full" size="lg">
                  {t.pricing.plans.enterprise.cta}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* All Plans Include Section */}
      <section className="container mx-auto px-4 py-12 bg-gradient-to-br from-green-50 to-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-black text-gray-900 mb-8 text-center">{t.pricing.allPlansInclude.title}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-center">
              <CardContent className="p-6">
                <div className="text-5xl font-black text-green-600 mb-2">{t.pricing.allPlansInclude.metric1.value}</div>
                <p className="text-gray-700 font-medium">{t.pricing.allPlansInclude.metric1.label}</p>
              </CardContent>
            </Card>
            <Card className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-center">
              <CardContent className="p-6">
                <div className="text-5xl font-black text-blue-600 mb-2">{t.pricing.allPlansInclude.metric2.value}</div>
                <p className="text-gray-700 font-medium">{t.pricing.allPlansInclude.metric2.label}</p>
              </CardContent>
            </Card>
            <Card className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-center">
              <CardContent className="p-6">
                <div className="text-5xl font-black text-purple-600 mb-2">&lt;{t.pricing.allPlansInclude.metric3.value.replace('<', '')}</div>
                <p className="text-gray-700 font-medium">{t.pricing.allPlansInclude.metric3.label}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-gray-900 mb-4">{t.pricing.faq.title}</h2>
            <p className="text-gray-600">{t.pricing.faq.subtitle}</p>
          </div>

          <div className="space-y-4">
            <FAQItem
              question={t.pricing.faq.q1.question}
              answer={t.pricing.faq.q1.answer}
            />
            <FAQItem
              question={t.pricing.faq.q2.question}
              answer={t.pricing.faq.q2.answer}
            />
            <FAQItem
              question={t.pricing.faq.q3.question}
              answer={t.pricing.faq.q3.answer}
            />
            <FAQItem
              question={t.pricing.faq.q4.question}
              answer={t.pricing.faq.q4.answer}
            />
            <FAQItem
              question={t.pricing.faq.q5.question}
              answer={t.pricing.faq.q5.answer}
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 pb-20">
        <Card className="bg-gradient-to-br from-green-500 to-blue-500 border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <CardContent className="p-12 text-center">
            <h2 className="text-4xl font-black text-white mb-4">
              {t.pricing.cta.title}
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              {t.pricing.cta.subtitle}
            </p>
            <Link href="/signup">
              <Button
                variant="default"
                className="bg-white text-green-600 hover:bg-gray-100 border-2 border-black text-lg px-10 py-6 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                {t.pricing.cta.button}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t-2 border-black bg-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600">{t.pricing.footer}</p>
        </div>
      </footer>
    </div>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <Card className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <CardContent className="p-6">
        <h3 className="font-bold text-gray-900 mb-2">{question}</h3>
        <p className="text-gray-600">{answer}</p>
      </CardContent>
    </Card>
  );
}
