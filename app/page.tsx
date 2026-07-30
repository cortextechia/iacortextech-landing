'use client';

// Landing da IA Cortex Tech.
//
// Direção: os dois produtos vêm de mundos opostos — Growth é tela e número,
// Steel é chão de fábrica e desenho cotado. Em vez de nivelar os dois num card
// genérico, cada um é desenhado no vernáculo do próprio ofício (ver
// ./ProdutoArte). O resto da página fica deliberadamente quieto:
// fio de 1px, muito respiro, mono só onde há dado. A ousadia mora nos desenhos.

import { useState, useEffect, useRef } from 'react';
import { ArteGrowth, ArteSteel } from './ProdutoArte';

const PRODUTOS = [
  {
    id: 'growth',
    nome: 'Cortex Growth',
    cor: 'var(--growth)',
    estado: 'Em produção',
    estadoTom: 'rgba(74,222,128,1)',
    resumo:
      'Une o quanto você investe em anúncio ao que aquilo virou venda. Puxa Meta Ads e Google Ads pelas APIs oficiais, acompanha cada lead até o fechamento e mostra o ROAS real por campanha.',
    specs: [
      ['Anúncios', 'Meta · Google'],
      ['CRM', 'próprio, com WhatsApp'],
      ['IA', 'insights e criativos'],
      ['Extra', 'diagnóstico de SEO'],
    ],
    cta: { texto: 'Acessar a plataforma', href: 'https://cortexgrowth.com.br', externo: true },
    arte: <ArteGrowth />,
  },
  {
    id: 'steel',
    nome: 'Cortex Steel',
    cor: 'var(--steel)',
    estado: 'Em desenvolvimento',
    estadoTom: 'rgba(251,191,36,1)',
    resumo:
      'ERP para quem corta, dobra e monta armadura de aço. Tira do WhatsApp e da planilha o caminho entre orçamento, projeto, produção e expedição — e mostra o que já foi produzido e o que falta.',
    specs: [
      ['Comercial', 'orçamento e cotação'],
      ['Técnico', 'projeto de armadura'],
      ['Produção', 'ordem e etiqueta'],
      ['Norma', 'NBR 7480 / 6118'],
    ],
    cta: { texto: 'Falar sobre o Steel', href: '#contato', externo: false },
    arte: <ArteSteel />,
  },
];

export default function IACortexTechLanding() {
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const produtosRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Traça os desenhos quando a seção entra na tela. Animar no mount não serviria:
  // os cards nascem abaixo da dobra e o momento passaria sem ninguém ver.
  useEffect(() => {
    const alvo = produtosRef.current;
    if (!alvo) return;
    const obs = new IntersectionObserver(
      ([entrada]) => {
        if (entrada?.isIntersecting) {
          alvo.classList.add('is-drawn');
          obs.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    obs.observe(alvo);
    return () => obs.disconnect();
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
      setError('Não conseguimos enviar. Tente de novo ou escreva para api@iacortextech.com.br.');
    } finally {
      setSending(false);
    }
  };

  const campo = {
    background: 'var(--bg-sunken)',
    border: '1px solid var(--line-bright)',
    color: 'var(--text-primary)',
  };

  return (
    <div className="min-h-screen">

      {/* ── Navegação ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(5,8,15,0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: `1px solid ${scrolled ? 'var(--line)' : 'transparent'}`,
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5">
            <Marca />
            <span className="font-semibold tracking-tight">IA Cortex Tech</span>
          </a>

          <div className="hidden md:flex items-center gap-8 mono text-xs uppercase tracking-widest">
            {[['#produtos', 'Produtos'], ['#sobre', 'Sobre'], ['#contato', 'Contato']].map(([href, texto]) => (
              <a key={href} href={href} className="transition-colors hover:text-[var(--text-primary)]"
                style={{ color: 'var(--text-secondary)' }}>
                {texto}
              </a>
            ))}
          </div>

          <a href="#contato"
            className="text-sm font-medium px-4 py-2 rounded-lg transition-colors"
            style={{ border: '1px solid var(--line-bright)', color: 'var(--text-primary)' }}>
            Fale conosco
          </a>
        </div>
      </nav>

      {/* ── Herói ──
          A tese: são dois sistemas que já rodam, não um portfólio de promessas. */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="blueprint absolute inset-0 opacity-[0.55]" aria-hidden />
        <div className="absolute inset-0" aria-hidden style={{
          background: 'radial-gradient(120% 80% at 50% 0%, transparent 30%, var(--bg-base) 78%)',
        }} />

        <div className="relative z-10 max-w-6xl mx-auto px-6 w-full pt-24">
          <p className="mono text-xs uppercase tracking-[0.25em] mb-6" style={{ color: 'var(--text-muted)' }}>
            Software brasileiro · dois sistemas em operação
          </p>

          <h1 className="text-[2.75rem] leading-[1.05] md:text-7xl font-bold tracking-[-0.03em] max-w-4xl">
            Sistemas que tiram a<br />
            <span style={{ color: 'var(--growth)' }}>operação</span> da planilha
          </h1>

          <p className="mt-7 text-lg max-w-xl leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Construímos software para empresas que cresceram e viram o controle escapar
            entre abas, grupos de WhatsApp e planilhas que ninguém confia.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <a href="#produtos"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: 'var(--growth)' }}>
              Ver os dois produtos
            </a>
            <a href="#contato"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-medium transition-colors"
              style={{ border: '1px solid var(--line-bright)', color: 'var(--text-secondary)' }}>
              Falar com a gente
            </a>
          </div>
        </div>
      </section>

      {/* ── Produtos: onde mora a identidade de cada um ── */}
      <section id="produtos" ref={produtosRef} className="py-24 px-6" style={{ background: 'var(--bg-sunken)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-14">
            <p className="mono text-xs uppercase tracking-[0.25em] mb-4" style={{ color: 'var(--text-muted)' }}>
              Produtos
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight max-w-lg">
              Dois negócios diferentes, dois sistemas próprios
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-5">
            {PRODUTOS.map((p) => (
              <article key={p.id}
                className="rounded-2xl overflow-hidden flex flex-col"
                style={{ background: 'var(--bg-surface)', border: '1px solid var(--line)' }}>

                {/* o desenho do ofício */}
                <div className="px-7 pt-7 pb-2">{p.arte}</div>

                <div className="px-7 pb-7 pt-4 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-xl font-bold tracking-tight">{p.nome}</h3>
                    <span className="mono text-[10px] uppercase tracking-wider px-2 py-1 rounded-full"
                      style={{ color: p.estadoTom, border: `1px solid ${p.estadoTom.replace('1)', '0.3)')}` }}>
                      {p.estado}
                    </span>
                  </div>

                  <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
                    {p.resumo}
                  </p>

                  {/* ficha técnica — mono porque é dado, não texto de venda */}
                  <dl className="mono text-xs mb-7" style={{ borderTop: '1px solid var(--line)' }}>
                    {p.specs.map(([rotulo, valor]) => (
                      <div key={rotulo} className="flex justify-between gap-4 py-2.5"
                        style={{ borderBottom: '1px solid var(--line)' }}>
                        <dt style={{ color: 'var(--text-muted)' }}>{rotulo}</dt>
                        <dd className="text-right" style={{ color: 'var(--text-secondary)' }}>{valor}</dd>
                      </div>
                    ))}
                  </dl>

                  <a href={p.cta.href}
                    {...(p.cta.externo ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="mt-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-opacity hover:opacity-85"
                    style={{ background: p.cor, color: '#05080f' }}>
                    {p.cta.texto}
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sobre ── */}
      <section id="sobre" className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-start">
          <div>
            <p className="mono text-xs uppercase tracking-[0.25em] mb-4" style={{ color: 'var(--text-muted)' }}>
              Sobre
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              Software feito por quem opera junto
            </h2>
            <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
              A IA Cortex Tech desenvolve sistemas para empresas brasileiras de porte médio.
              Cada produto nasceu dentro de uma operação real, resolvendo um problema que
              custava dinheiro todo mês.
            </p>
            <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Usamos IA onde ela decide algo — apontar a campanha que está queimando verba,
              ler uma prancha de armadura — e não como enfeite de tela.
            </p>
          </div>

          <dl className="grid sm:grid-cols-2 gap-px rounded-2xl overflow-hidden"
            style={{ background: 'var(--line)', border: '1px solid var(--line)' }}>
            {[
              ['Missão', 'Tirar a operação da planilha, do marketing à produção.'],
              ['Visão', 'Ser o sistema em que a PME brasileira confia para decidir.'],
              ['Velocidade', 'O que entra em produção é usado por cliente pagante.'],
              ['Segurança', 'Credenciais cifradas em AES-256-GCM, isolamento por empresa.'],
            ].map(([titulo, texto]) => (
              <div key={titulo} className="p-6" style={{ background: 'var(--bg-surface)' }}>
                <dt className="mono text-[10px] uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>
                  {titulo}
                </dt>
                <dd className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{texto}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── Contato ── */}
      <section id="contato" className="py-24 px-6" style={{ background: 'var(--bg-sunken)' }}>
        <div className="max-w-xl mx-auto">
          <div className="mb-10">
            <p className="mono text-xs uppercase tracking-[0.25em] mb-4" style={{ color: 'var(--text-muted)' }}>
              Contato
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Vamos conversar</h2>
            <p className="text-base" style={{ color: 'var(--text-secondary)' }}>
              Conte o que está travando na sua operação. Respondemos em até um dia útil.
            </p>
          </div>

          {sent ? (
            <div className="p-8 rounded-2xl" style={{ background: 'var(--bg-surface)', border: '1px solid rgba(74,222,128,0.25)' }}>
              <h3 className="text-lg font-semibold mb-2">Mensagem recebida</h3>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Retornamos para o e-mail que você informou, em até um dia útil.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { label: 'Nome', key: 'name', type: 'text', placeholder: 'Como podemos te chamar' },
                { label: 'E-mail', key: 'email', type: 'email', placeholder: 'para onde respondemos' },
              ].map((field) => (
                <div key={field.key}>
                  <label htmlFor={field.key} className="mono block text-[10px] uppercase tracking-widest mb-2"
                    style={{ color: 'var(--text-muted)' }}>
                    {field.label}
                  </label>
                  <input
                    id={field.key}
                    type={field.type}
                    required
                    placeholder={field.placeholder}
                    value={formData[field.key as keyof typeof formData]}
                    onChange={e => setFormData(prev => ({ ...prev, [field.key]: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                    style={campo}
                  />
                </div>
              ))}
              <div>
                <label htmlFor="message" className="mono block text-[10px] uppercase tracking-widest mb-2"
                  style={{ color: 'var(--text-muted)' }}>
                  Mensagem
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  placeholder="O que está travando hoje?"
                  value={formData.message}
                  onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                  style={campo}
                />
              </div>
              <button type="submit" disabled={sending}
                className="w-full py-4 rounded-xl text-sm font-semibold transition-opacity hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ background: 'var(--growth)', color: '#fff' }}>
                {sending ? 'Enviando…' : 'Enviar mensagem'}
              </button>
              {error && <p className="text-xs text-center" style={{ color: '#f87171' }}>{error}</p>}
              <p className="mono text-xs text-center pt-2" style={{ color: 'var(--text-muted)' }}>
                ou{' '}
                <a href="mailto:api@iacortextech.com.br" className="underline" style={{ color: 'var(--text-secondary)' }}>
                  api@iacortextech.com.br
                </a>
              </p>
            </form>
          )}
        </div>
      </section>

      {/* ── Rodapé ── */}
      <footer className="py-10 px-6" style={{ borderTop: '1px solid var(--line)' }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <Marca pequena />
            <span className="text-sm font-semibold">IA Cortex Tech</span>
          </div>
          <p className="mono text-xs" style={{ color: 'var(--text-muted)' }}>
            © {new Date().getFullYear()} · CNPJ 52.722.681/0001-03
          </p>
          <a href="mailto:api@iacortextech.com.br" className="mono text-xs transition-colors hover:text-[var(--text-secondary)]"
            style={{ color: 'var(--text-muted)' }}>
            api@iacortextech.com.br
          </a>
        </div>
      </footer>
    </div>
  );
}

/** Marca: um córtex reduzido a nós e conexões — a forma de onde vem o nome. */
function Marca({ pequena = false }: { pequena?: boolean }) {
  const t = pequena ? 'h-6 w-6' : 'h-8 w-8';
  return (
    <span className={`${t} rounded-lg flex items-center justify-center shrink-0`}
      style={{ background: 'var(--bg-surface)', border: '1px solid var(--line-bright)' }}>
      <svg viewBox="0 0 24 24" className={pequena ? 'h-3.5 w-3.5' : 'h-4.5 w-4.5'} fill="none" aria-hidden>
        <path d="M7 6.5 L12 4 L17 6.5 M7 6.5 L7 12 M17 6.5 L17 12 M7 12 L12 15 L17 12 M12 15 L12 20"
          stroke="var(--growth)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="4" r="1.6" fill="var(--growth)" />
        <circle cx="7" cy="12" r="1.4" fill="var(--steel)" />
        <circle cx="17" cy="12" r="1.4" fill="var(--steel)" />
      </svg>
    </span>
  );
}
