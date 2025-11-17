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
        <div className="text-center max-w-4xl mx-auto">
          <Badge className="mb-6 bg-green-100 text-green-900 border-2 border-green-500">
            Recursos Exclusivos
          </Badge>
          <h1 className="text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight">
            Tecnologia que Vai Além da Automação
          </h1>
          <p className="text-xl text-gray-700 mb-12 leading-relaxed max-w-3xl mx-auto">
            Não apenas economize tempo - transforme workflows, cultura e resultados
          </p>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <FeatureCard
              icon={<Sparkles className="w-8 h-8" />}
              iconBg="bg-green-500"
              title="Orquestração Multi-IA"
              description="Combine múltiplos modelos de IA em um novo fluxo otimizado para máxima qualidade e eficiência"
            />
            <FeatureCard
              icon={<Shield className="w-8 h-8" />}
              iconBg="bg-green-500"
              title="QA Visual Automatizado"
              description="Garanta de qualidade e conformidade em todas as peças criativas com validação automática"
            />
            <FeatureCard
              icon={<TrendingUp className="w-8 h-8" />}
              iconBg="bg-green-500"
              title="Aprendizado Contínuo"
              description="IA que aprende com performance real e otimiza continuamente seus criativos"
            />
            <FeatureCard
              icon={<Zap className="w-8 h-8" />}
              iconBg="bg-green-500"
              title="Produção em Escala"
              description="Gere centenas de variações criativas em minutos, não em dias"
            />
            <FeatureCard
              icon={<Globe className="w-8 h-8" />}
              iconBg="bg-green-500"
              title="Integração Nativa"
              description="Conecte com Meta, Google, Figma, Adobe e outras ferramentas do seu fluxo"
            />
            <FeatureCard
              icon={<Users className="w-8 h-8" />}
              iconBg="bg-green-500"
              title="Human in the Loop"
              description="Controle criativo total com validação humana em cada etapa importante"
            />
          </div>
        </div>
      </section>

      {/* Multi-Dimensional Evaluation */}
      <section className="container mx-auto px-4 py-20 bg-gradient-to-br from-green-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-6 bg-green-100 text-green-900 border-2 border-green-500">
                Avaliação Inteligente
              </Badge>
              <h2 className="text-4xl font-black text-gray-900 mb-6">
                Avaliação Multi-Dimensional com IA
              </h2>
              <p className="text-lg text-gray-700 mb-8">
                Nossa plataforma analisa automaticamente seus criativos em múltiplas dimensões: competitividade, experiência do usuário e performance de conversão.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Avaliação de Competitividade</h3>
                    <p className="text-gray-600 text-sm">Compare seus criativos com os melhores do mercado automaticamente</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Análise de Experiência</h3>
                    <p className="text-gray-600 text-sm">Preveja como seu público reagirá antes mesmo de publicar</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Score de Performance</h3>
                    <p className="text-gray-600 text-sm">Receba scores preditivos em +30 KPIs de lançamento</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <Card className="bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between pb-4 border-b-2 border-gray-200">
                      <span className="font-bold text-gray-700">Avaliação Geral</span>
                      <Badge className="bg-green-500 text-white border-2 border-black">Excelente</Badge>
                    </div>

                    {[
                      { label: "Competitividade", score: 94, color: "bg-green-500" },
                      { label: "Experiência do Usuário", score: 88, color: "bg-blue-500" },
                      { label: "Performance Preditiva", score: 92, color: "bg-purple-500" },
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
                  <h3 className="text-2xl font-black mb-6">Insights em Tempo Real</h3>
                  <div className="space-y-4">
                    <div className="bg-white/10 border-2 border-white/30 rounded-xl p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <TrendingUp className="w-5 h-5" />
                        <span className="font-bold">+15% CTR</span>
                      </div>
                      <p className="text-sm text-white/80">Variante A está superando 23% acima da média</p>
                    </div>
                    <div className="bg-white/10 border-2 border-white/30 rounded-xl p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <Zap className="w-5 h-5" />
                        <span className="font-bold">Sugestão de IA</span>
                      </div>
                      <p className="text-sm text-white/80">Ajuste o CTA para aumentar conversões em 12%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="order-1 lg:order-2">
              <Badge className="mb-6 bg-green-100 text-green-900 border-2 border-green-500">
                Feedback Inteligente
              </Badge>
              <h2 className="text-4xl font-black text-gray-900 mb-6">
                Sistema de Feedback Contínuo
              </h2>
              <p className="text-lg text-gray-700 mb-8">
                Receba insights acionáveis em tempo real sobre cada criativo. Nossa IA aprende com seus resultados e sugere melhorias contínuas.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Dashboards Interativos</h3>
                    <p className="text-gray-600 text-sm">Visualize métricas de performance em tempo real</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Sugestões com IA</h3>
                    <p className="text-gray-600 text-sm">Recomendações automáticas baseadas em dados</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Melhoria Contínua</h3>
                    <p className="text-gray-600 text-sm">A plataforma aprende e evolui com seu uso</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Section */}
      <section className="container mx-auto px-4 py-20 bg-gradient-to-br from-green-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-6 bg-green-100 text-green-900 border-2 border-green-500">
            Resultados Comprovados
          </Badge>
          <h2 className="text-4xl font-black text-gray-900 mb-12">ROI que Impressiona</h2>

          <Card className="bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2">
                {/* Left Side - Cliente Real */}
                <div className="p-8 border-r-2 border-black">
                  <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
                    <Users className="w-6 h-6 text-green-600" />
                    Cenário Real de Cliente
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-3 border-b-2 border-gray-200">
                      <span className="text-gray-700">Tempo Manual (mês)</span>
                      <span className="font-black text-gray-900">240 horas</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b-2 border-gray-200">
                      <span className="text-gray-700">Tempo com IA (mês)</span>
                      <span className="font-black text-gray-900">38 horas</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b-2 border-gray-200">
                      <span className="text-gray-700">Economia Mensal</span>
                      <span className="font-black text-green-600">R$ 274.926</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Investimento Mensal</span>
                      <span className="font-black text-gray-900">R$ 12.500</span>
                    </div>
                  </div>
                </div>

                {/* Right Side - ROI */}
                <div className="p-8 bg-gradient-to-br from-green-50 to-white flex flex-col items-center justify-center">
                  <div className="text-7xl font-black text-green-600 mb-4">2.539%</div>
                  <div className="text-xl font-bold text-gray-900 mb-2">ROI no Primeiro Ano</div>
                  <p className="text-sm text-gray-600 mb-6">Payback em apenas 18 dias</p>
                  <Link href="/signup">
                    <Button variant="primary" size="lg" className="bg-green-500 hover:bg-green-600">
                      Calcular Seu ROI
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
              Pronto para Transformar sua Produção Criativa?
            </h2>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Junte-se às agências e empresas que já estão revolucionando seus workflows com IA
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button
                  variant="primary"
                  className="bg-green-500 hover:bg-green-600 border-2 border-black text-lg px-10 py-6 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                >
                  Agendar Demo Personalizada
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/signup">
                <Button
                  variant="default"
                  className="text-lg px-10 py-6 font-bold"
                >
                  Ver Planos e Preços
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
