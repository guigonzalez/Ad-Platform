"use client";

import Link from "next/link";
import { ArrowRight, Check, Star, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b-2 border-black bg-white sticky top-0 z-50 shadow-[0_4px_0px_0px_rgba(0,0,0,1)]">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-black text-xl">AdsPlatform</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Entrar
              </Button>
            </Link>
            <Link href="/signup">
              <Button variant="primary" size="sm" className="bg-green-500 hover:bg-green-600">
                Começar Agora
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
          Preços Simples e Transparentes
        </Badge>
        <h1 className="text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight">
          Escolha o Plano Ideal
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
          Comece gratuitamente e escale conforme seu crescimento. Todos os planos incluem 14 dias de teste grátis.
        </p>
      </section>

      {/* Pricing Cards */}
      <section className="container mx-auto px-4 pb-20">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Starter Plan */}
          <Card className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
            <CardContent className="p-8">
              <div className="mb-6">
                <h3 className="text-2xl font-black text-gray-900 mb-2">Starter</h3>
                <div className="mb-2">
                  <span className="text-5xl font-black text-gray-900">R$ 0</span>
                  <span className="text-gray-600 ml-2">/mês</span>
                </div>
                <p className="text-gray-600 text-sm">Perfeito para testar e pequenos projetos</p>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Até 3 campanhas ativas</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">1 usuário</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Análises básicas</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Suporte por email</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">2 plataformas (Meta & Google)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Geração básica de IA</span>
                </li>
              </ul>

              <Link href="/signup">
                <Button variant="default" className="w-full" size="lg">
                  Começar Grátis
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
                Mais Popular
              </Badge>
            </div>
            <CardContent className="p-8">
              <div className="mb-6">
                <h3 className="text-2xl font-black text-gray-900 mb-2">Professional</h3>
                <div className="mb-2">
                  <span className="text-5xl font-black text-gray-900">R$ 497</span>
                  <span className="text-gray-600 ml-2">/mês</span>
                </div>
                <p className="text-gray-600 text-sm">Para empresas em crescimento e agências</p>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Campanhas ilimitadas</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Até 5 usuários</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Análises avançadas</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Suporte prioritário</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Geração avançada de IA</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Regras de automação</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Relatórios personalizados</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">QA Visual automatizado</span>
                </li>
              </ul>

              <Link href="/signup">
                <Button variant="primary" className="w-full bg-green-500 hover:bg-green-600" size="lg">
                  Iniciar Teste Grátis
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Enterprise Plan */}
          <Card className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
            <CardContent className="p-8">
              <div className="mb-6">
                <h3 className="text-2xl font-black text-gray-900 mb-2">Enterprise</h3>
                <div className="mb-2">
                  <span className="text-5xl font-black text-gray-900">Custom</span>
                </div>
                <p className="text-gray-600 text-sm">Para grandes equipes e corporações</p>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Tudo do Professional</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Usuários ilimitados</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Account manager dedicado</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Suporte 24/7 por telefone</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Faturamento corporativo</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Integrações customizadas</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">SLA garantido</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Treinamento personalizado</span>
                </li>
              </ul>

              <Link href="/signup">
                <Button variant="default" className="w-full" size="lg">
                  Falar com Vendas
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-gray-900 mb-4">Perguntas Frequentes</h2>
            <p className="text-gray-600">Tudo que você precisa saber sobre nossos planos</p>
          </div>

          <div className="space-y-4">
            <FAQItem
              question="Posso mudar de plano a qualquer momento?"
              answer="Sim! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento. As alterações entram em vigor imediatamente."
            />
            <FAQItem
              question="Como funciona o teste grátis de 14 dias?"
              answer="Você pode testar todos os recursos do plano Professional gratuitamente por 14 dias. Não é necessário cartão de crédito para começar."
            />
            <FAQItem
              question="Quais formas de pagamento vocês aceitam?"
              answer="Aceitamos cartão de crédito, PIX e faturamento corporativo (apenas para planos Enterprise)."
            />
            <FAQItem
              question="Posso cancelar a qualquer momento?"
              answer="Sim, você pode cancelar seu plano a qualquer momento sem multas ou taxas adicionais."
            />
            <FAQItem
              question="Há desconto para pagamento anual?"
              answer="Sim! Oferecemos 20% de desconto para pagamentos anuais em todos os planos pagos."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 pb-20">
        <Card className="bg-gradient-to-br from-green-500 to-blue-500 border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <CardContent className="p-12 text-center">
            <h2 className="text-4xl font-black text-white mb-4">
              Pronto para Começar?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Junte-se a centenas de empresas que já estão transformando sua produção criativa com IA
            </p>
            <Link href="/signup">
              <Button
                variant="default"
                className="bg-white text-green-600 hover:bg-gray-100 border-2 border-black text-lg px-10 py-6 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                Começar Teste Grátis de 14 Dias
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t-2 border-black bg-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600">© 2025 AdsPlatform. Todos os direitos reservados.</p>
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
