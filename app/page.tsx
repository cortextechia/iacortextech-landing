'use client';

import { useState, useEffect } from 'react';

export default function IACortexTechLanding() {
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Falha no envio.');
      setSent(true);
    } catch {
      setError('Erro ao enviar. Tente novamente ou envie diretamente para api@iacortextech.com.br.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ color: '#f1f5f9' }}>

      {/* ── Navbar ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(8,13,25,0.9)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)' }}>
              <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              </svg>
            </div>
            <span className="font-bold text-lg text-white">IA Cortex Tech</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {['#sobre', '#produtos', '#contato'].map((href) => (
              <a key={href} href={href} className="text-sm transition-colors" style={{ color: '#94a3b8' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#f1f5f9')}
                onMouseLeave={e => (e.currentTarget.style.color = '#94a3b8')}>
                {href === '#sobre' ? 'Sobre' : href === '#produtos' ? 'Produtos' : 'Contato'}
              </a>
            ))}
          </div>

          <a href="#contato"
            className="text-sm font-medium px-4 py-2 rounded-lg text-white transition-all"
            style={{ background: '#3b82f6' }}
            onMouseEnter={e => (e.currentTarget.style.background = '#2563eb')}
            onMouseLeave={e => (e.currentTarget.style.background = '#3b82f6')}>
            Fale conosco
          </a>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `linear-gradient(rgba(59,130,246,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.15) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)' }} />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-24">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-8"
            style={{ background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.3)', color: '#93c5fd' }}>
            <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
            Tecnologia · IA · SaaS
          </div>

          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
            <span style={{ color: '#f1f5f9' }}>Tecnologia e IA para</span>
            <br />
            <span style={{ background: 'linear-gradient(135deg, #60a5fa, #3b82f6, #93c5fd)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              escalar negócios
            </span>
          </h1>

          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed" style={{ color: '#94a3b8' }}>
            Desenvolvemos produtos SaaS com inteligência artificial para ajudar
            empresas a tomar decisões melhores com seus dados.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#produtos"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-semibold text-white transition-all"
              style={{ background: 'linear-gradient(135deg, #3b82f6, #2563eb)', boxShadow: '0 0 30px rgba(59,130,246,0.4)' }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 0 40px rgba(59,130,246,0.6)')}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 0 30px rgba(59,130,246,0.4)')}>
              Ver produtos
            </a>
            <a href="#contato"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-medium transition-all"
              style={{ border: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8', background: 'rgba(255,255,255,0.03)' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = '#f1f5f9'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.color = '#94a3b8'; }}>
              Entre em contato
            </a>
          </div>
        </div>
      </section>

      {/* ── Sobre ── */}
      <section id="sobre" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest mb-4" style={{ color: '#3b82f6' }}>Sobre nós</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: '#f1f5f9' }}>
                Construímos o futuro com inteligência artificial
              </h2>
              <p className="text-base leading-relaxed mb-4" style={{ color: '#94a3b8' }}>
                A IA Cortex Tech é uma empresa de tecnologia especializada no desenvolvimento de produtos SaaS
                com inteligência artificial. Nossa missão é transformar dados em decisões inteligentes para
                negócios de todos os tamanhos.
              </p>
              <p className="text-base leading-relaxed" style={{ color: '#94a3b8' }}>
                Combinamos expertise em engenharia de software, análise de dados e IA generativa para criar
                ferramentas que realmente impactam resultados.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: '🎯', title: 'Missão', text: 'Tirar a operação da planilha — do marketing à produção.' },
                { icon: '🔭', title: 'Visão', text: 'Ser o sistema em que a PME brasileira confia para decidir.' },
                { icon: '⚡', title: 'Velocidade', text: 'Produtos construídos para escalar desde o primeiro dia.' },
                { icon: '🔒', title: 'Segurança', text: 'Dados protegidos com criptografia AES-256-GCM.' },
              ].map((item) => (
                <div key={item.title} className="p-5 rounded-2xl"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="text-2xl mb-3">{item.icon}</div>
                  <h3 className="text-sm font-semibold mb-1" style={{ color: '#f1f5f9' }}>{item.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: '#94a3b8' }}>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Produtos ── */}
      <section id="produtos" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-medium uppercase tracking-widest mb-4" style={{ color: '#3b82f6' }}>Nossos produtos</p>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: '#f1f5f9' }}>
              Soluções que geram resultado
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Cortex Growth — produto principal */}
            <div className="relative p-8 rounded-2xl overflow-hidden"
              style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.3)' }}>
              <div className="absolute top-4 right-4">
                <span className="px-2 py-1 rounded-full text-xs font-medium" style={{ background: 'rgba(74,222,128,0.15)', color: '#4ade80', border: '1px solid rgba(74,222,128,0.3)' }}>
                  Disponível
                </span>
              </div>
              <div className="h-12 w-12 rounded-xl flex items-center justify-center mb-5"
                style={{ background: 'rgba(59,130,246,0.2)' }}>
                <svg className="h-6 w-6" style={{ color: '#3b82f6' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ color: '#f1f5f9' }}>Cortex Growth</h3>
              <p className="text-sm leading-relaxed mb-6" style={{ color: '#94a3b8' }}>
                Une o investimento em anúncios ao que ele gerou de venda. Puxa as métricas de
                Meta Ads e Google Ads pelas APIs oficiais (impressões, cliques, custo e conversões),
                acompanha cada lead até o fechamento no CRM e mostra o ROAS real por campanha.
                Traz CRM próprio com WhatsApp do vendedor, diagnóstico de SEO e agentes de IA que
                apontam onde o dinheiro está sendo perdido — feito para PMEs brasileiras.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {['Meta Ads', 'Google Ads API', 'CRM + WhatsApp', 'SEO / AIO', 'Agentes de IA', 'ROAS real'].map((tag) => (
                  <span key={tag} className="px-2 py-1 rounded-md text-xs"
                    style={{ background: 'rgba(59,130,246,0.1)', color: '#93c5fd', border: '1px solid rgba(59,130,246,0.2)' }}>
                    {tag}
                  </span>
                ))}
              </div>
              <a href="https://cortexgrowth.com.br" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-white transition-all"
                style={{ background: '#3b82f6' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#2563eb')}
                onMouseLeave={e => (e.currentTarget.style.background = '#3b82f6')}>
                Acessar plataforma
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>
            </div>

            {/* Cortex Steel — ERP para armaduras de aço, em desenvolvimento */}
            <div className="relative p-8 rounded-2xl overflow-hidden"
              style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.25)' }}>
              <div className="absolute top-4 right-4">
                <span className="px-2 py-1 rounded-full text-xs font-medium" style={{ background: 'rgba(251,191,36,0.1)', color: '#fbbf24', border: '1px solid rgba(251,191,36,0.3)' }}>
                  Em desenvolvimento
                </span>
              </div>
              <div className="h-12 w-12 rounded-xl flex items-center justify-center mb-5"
                style={{ background: 'rgba(245,158,11,0.15)' }}>
                <svg className="h-6 w-6" style={{ color: '#f59e0b' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437L5.909 7.5" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ color: '#f1f5f9' }}>Cortex Steel</h3>
              <p className="text-sm leading-relaxed mb-6" style={{ color: '#94a3b8' }}>
                ERP para empresas de corte, dobra e montagem de armaduras de aço. Substitui a
                planilha e o WhatsApp entre Comercial, Técnico, Produção e Expedição: orçamento,
                projeto de armadura, ordem de produção e etiquetas de peça num único fluxo, com
                rastreio do que foi produzido e do que ainda falta.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {['Orçamento', 'Projeto de armadura', 'Ordem de produção', 'PPCP', 'NBR 7480'].map((tag) => (
                  <span key={tag} className="px-2 py-1 rounded-md text-xs"
                    style={{ background: 'rgba(245,158,11,0.08)', color: '#fcd34d', border: '1px solid rgba(245,158,11,0.2)' }}>
                    {tag}
                  </span>
                ))}
              </div>
              <a href="#contato"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all"
                style={{ border: '1px solid rgba(245,158,11,0.3)', color: '#fbbf24' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(245,158,11,0.1)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}>
                Falar sobre o Steel
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contato ── */}
      <section id="contato" className="py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-medium uppercase tracking-widest mb-4" style={{ color: '#3b82f6' }}>Contato</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#f1f5f9' }}>
              Vamos conversar
            </h2>
            <p className="text-base" style={{ color: '#94a3b8' }}>
              Tem uma ideia, parceria ou quer saber mais sobre nossos produtos?
            </p>
          </div>

          {sent ? (
            <div className="text-center p-8 rounded-2xl" style={{ background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.2)' }}>
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: '#f1f5f9' }}>Mensagem enviada!</h3>
              <p className="text-sm" style={{ color: '#94a3b8' }}>Recebemos seu contato e retornaremos em breve.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { label: 'Nome', key: 'name', type: 'text', placeholder: 'Seu nome completo' },
                { label: 'E-mail', key: 'email', type: 'email', placeholder: 'seu@email.com' },
              ].map((field) => (
                <div key={field.key}>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#94a3b8' }}>{field.label}</label>
                  <input
                    type={field.type}
                    required
                    placeholder={field.placeholder}
                    value={formData[field.key as keyof typeof formData]}
                    onChange={e => setFormData(prev => ({ ...prev, [field.key]: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      color: '#f1f5f9',
                    }}
                    onFocus={e => (e.currentTarget.style.border = '1px solid rgba(59,130,246,0.5)')}
                    onBlur={e => (e.currentTarget.style.border = '1px solid rgba(255,255,255,0.08)')}
                  />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#94a3b8' }}>Mensagem</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Como podemos ajudar?"
                  value={formData.message}
                  onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all resize-none"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: '#f1f5f9',
                  }}
                  onFocus={e => (e.currentTarget.style.border = '1px solid rgba(59,130,246,0.5)')}
                  onBlur={e => (e.currentTarget.style.border = '1px solid rgba(255,255,255,0.08)')}
                />
              </div>
              <button type="submit" disabled={sending}
                className="w-full py-4 rounded-xl text-sm font-semibold text-white transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ background: '#3b82f6' }}
                onMouseEnter={e => { if (!sending) e.currentTarget.style.background = '#2563eb'; }}
                onMouseLeave={e => (e.currentTarget.style.background = '#3b82f6')}>
                {sending ? 'Enviando…' : 'Enviar mensagem'}
              </button>
              {error && (
                <p className="text-xs text-center" style={{ color: '#f87171' }}>{error}</p>
              )}
              <p className="text-xs text-center" style={{ color: '#475569' }}>
                Ou e-mail direto:{' '}
                <a href="mailto:api@iacortextech.com.br" className="underline" style={{ color: '#3b82f6' }}>
                  api@iacortextech.com.br
                </a>
              </p>
            </form>
          )}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-10 px-6" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-md flex items-center justify-center" style={{ background: '#3b82f6' }}>
              <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              </svg>
            </div>
            <span className="text-sm font-semibold" style={{ color: '#f1f5f9' }}>IA Cortex Tech</span>
          </div>
          <p className="text-xs" style={{ color: '#475569' }}>
            © {new Date().getFullYear()} IA Cortex Tech. Todos os direitos reservados.
          </p>
          <a href="mailto:api@iacortextech.com.br" className="text-xs transition-colors" style={{ color: '#475569' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#94a3b8')}
            onMouseLeave={e => (e.currentTarget.style.color = '#475569')}>
            api@iacortextech.com.br
          </a>
        </div>
      </footer>
    </div>
  );
}