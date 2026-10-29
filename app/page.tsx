'use client';

// Landing da Cromalex (antiga IA Cortex Tech), no design system Cromalex.
//
// A marca-mãe é grafite + cromo, sem cor própria: o limão do sistema é do
// Growth, o Steel ficou com o laranja-brasa e o Line com o azul aço que ele já
// usa. Cada produto aparece com a cor dele e desenhado no vernáculo do próprio
// ofício (ver ./ProdutoArte); o resto da página fica neutro para os três não
// brigarem.
//
// Todo recurso citado aqui existe no código de cada produto (conferido em
// 29/10/2026). O que ainda está em teste diz "em teste".

import { useEffect, useRef, useState } from 'react';
import { ArteGrowth, ArteLine, ArteSteel } from './ProdutoArte';

const EMAIL = 'api@iacortextech.com.br';

type Produto = {
  id: string;
  nome: string;
  tag: string;
  cor: string;
  ink: string;
  tint: string;
  tintInk: string;
  spot: string;
  estado: string;
  noAr: boolean;
  resumo: string;
  specs: [string, string][];
  nota?: string;
  cta: { texto: string; href: string; externo: boolean };
  arte: React.ReactNode;
  para: string;
  recursos: [string, string, string][];
};

const PRODUTOS: Produto[] = [
  {
    id: 'growth',
    nome: 'Growth',
    tag: 'MARKETING E VENDAS',
    cor: 'var(--growth)',
    ink: 'var(--growth-ink)',
    tint: 'var(--growth-tint)',
    tintInk: 'var(--growth-tint-ink)',
    spot: 'var(--growth-spot)',
    estado: 'Em produção',
    noAr: true,
    resumo:
      'Une o quanto você investe em anúncio ao que aquilo virou venda. Todo lead que chega no WhatsApp entra no CRM já com o anúncio de origem, e quando a venda fecha você vê quanto cada campanha faturou.',
    specs: [
      ['Anúncios', 'Meta · Google'],
      ['CRM', 'próprio, com WhatsApp'],
      ['IA', 'relatórios e alertas'],
      ['Plano', 'a partir de R$ 99/mês*'],
    ],
    nota: '*Plano CRM, preço equivalente por mês no plano anual.',
    cta: { texto: 'Conhecer o Growth', href: 'https://www.cortexgrowth.com.br', externo: true },
    arte: <ArteGrowth />,
    para: 'Para empresa que anuncia na Meta ou no Google e vende pelo WhatsApp.',
    recursos: [
      ['RASTREIO POR ANÚNCIO', 'Cada lead com o anúncio de origem', 'O card nasce no CRM com anúncio, conjunto e campanha. Sem formulário e sem código no site.'],
      ['WHATSAPP DA EQUIPE', 'Cada vendedor no próprio número', 'Conecta por QR code, como no WhatsApp Web. Fotos, áudios e localização aparecem no card.'],
      ['FUNIL E PRODUTOS', 'Kanban com as suas etapas', 'Tarefas, follow-up, motivo de perda e a venda montada por produto, quantidade e desconto.'],
      ['AUTOMAÇÕES', 'Boas-vindas e cobrança no automático', 'Mensagem para todo lead novo, lembrete para quem sumiu e rodízio entre vendedores.'],
      ['PAINEL META + GOOGLE', 'CPL por lead, ROAS por venda', 'O gasto das duas plataformas lado a lado com o que o CRM vendeu de verdade.'],
      ['IA E ALERTAS', 'Um analista que lê tudo por você', 'Relatório que cruza marketing e vendas, entregue no WhatsApp ou Telegram, e alerta quando o gasto sobe sem lead.'],
    ],
  },
  {
    id: 'steel',
    nome: 'Steel',
    tag: 'CORTE E DOBRA DE AÇO',
    cor: 'var(--steel)',
    ink: 'var(--steel-ink)',
    tint: 'var(--steel-tint)',
    tintInk: 'var(--steel-tint-ink)',
    spot: 'var(--steel-spot)',
    estado: 'Em desenvolvimento',
    noAr: false,
    resumo:
      'ERP para quem corta, dobra e monta armadura de aço. Tira do WhatsApp e da planilha o caminho entre orçamento, projeto e produção, e mostra o que já foi produzido e o que falta.',
    specs: [
      ['Comercial', 'orçamento e cotação'],
      ['Técnico', 'projeto de armadura'],
      ['Produção', 'ordem e etiqueta'],
      ['Norma', 'NBR 7480 / 6118'],
    ],
    cta: { texto: 'Falar sobre o Steel', href: '#contato', externo: false },
    arte: <ArteSteel />,
    para: 'Para central de corte e dobra que atende obra com armadura sob medida.',
    recursos: [
      ['COMERCIAL', 'Orçamento e cotação em PDF', 'O vendedor monta no sistema, e o orçamento e a cotação saem em PDF, prontos para mandar ao cliente.'],
      ['COMPRA DE AÇO', 'O aço que entra, registrado', 'Cada compra de aço lançada item a item, sem depender de planilha paralela.'],
      ['TÉCNICO', 'Projeto de armadura por nível', 'Os elementos de cada pavimento da obra, com bitola, quantidade e comprimento de cada peça.'],
      ['ETIQUETAS', 'Etiqueta com o desenho da peça', 'Cada feixe sai identificado com a obra e o desenho de dobra, como na prancha.'],
      ['PPCP', 'Fila de montagem sob controle', 'Autorizar, pausar e retomar ordem de produção, com indicadores do que já saiu.'],
      ['EM TESTE', 'Leitura da prancha de armação', 'Lê o arquivo do Eberick, do TQS ou do AutoCAD (DXF, DWG e PDF) e monta o plano de armação.'],
    ],
  },
  {
    id: 'line',
    nome: 'Line',
    tag: 'PRÉ-MOLDADOS',
    cor: 'var(--line-brand)',
    ink: 'var(--line-brand-ink)',
    tint: 'var(--line-brand-tint)',
    tintInk: 'var(--line-brand-tint-ink)',
    spot: 'var(--line-brand-spot)',
    estado: 'Em produção',
    noAr: true,
    resumo:
      'Gestão da fábrica de vigotas treliçadas, do pedido à expedição. Planeja o corte da treliça, guia a betoneira, acompanha o laudo de cada lote e mostra quanto custa cada traço.',
    specs: [
      ['Produção', 'em metros lineares'],
      ['Corte', 'barra de 12 m planejada'],
      ['Qualidade', 'CPs de 1, 3, 7 e 28 dias'],
      ['Dosagem', 'método ABCP'],
    ],
    cta: { texto: 'Falar sobre o Line', href: '#contato', externo: false },
    arte: <ArteLine />,
    para: 'Para fábrica de vigotas treliçadas e lajes pré-moldadas.',
    recursos: [
      ['CENTRAL DE CORTE', 'A folha de corte montada pelo sistema', 'Planeja a barra de 12 m por fôrma e por dia, junta pedido, prioridade e estoque, e deixa mudar linhas de dia.'],
      ['PRODUÇÃO DIÁRIA', 'Concretagem ligada à folha', 'O lote nasce da folha do dia com o traço usado, e a produção parcial volta para o dia escolhido.'],
      ['CONTROLE TECNOLÓGICO', 'O laudo libera a expedição', 'Corpos de prova de 1, 3, 7 e 28 dias, com alerta de laudo atrasado do laboratório.'],
      ['BETONEIRA HOJE', 'A receita certa no celular do operador', 'Receita de 1 saco com a água já corrigida pela umidade de cada agregado, medida no turno.'],
      ['ESTUDO DE DOSAGEM', 'Traço pelo método ABCP', 'Os 6 passos com as contas abertas, a partir dos laudos dos agregados, e o traço novo já preenchido.'],
      ['CUSTOS E ROMANEIO', 'Custo por traço e carga documentada', 'Oscilação de preço de insumo, fechamento do mês e romaneio de carga, em PDF e Word.'],
    ],
  },
];

const PASSOS = [
  ['1 · NA OPERAÇÃO', 'Começamos onde o controle escapa', 'A folha de corte, o grupo de WhatsApp, a planilha que ninguém confia. O sistema nasce do que acontece no chão, não de um modelo pronto.'],
  ['2 · COM O DIA REAL', 'Testamos com o que já aconteceu', 'Antes de entregar, o sistema refaz dias reais da operação e tem de chegar ao mesmo resultado que a equipe chegou à mão.'],
  ['3 · NO AR', 'Entregamos e seguimos junto', 'O que entra em produção é usado todo dia por quem paga por ele, e cada ajuste vem de quem está usando.'],
];

const PRINCIPIOS = [
  ['MISSÃO', 'Tirar a operação da planilha, do marketing à produção.'],
  ['VISÃO', 'Ser o sistema em que a empresa brasileira confia para decidir.'],
  ['NA PRÁTICA', 'O que entra em produção é usado por cliente pagante.'],
  ['SEGURANÇA', 'Cada empresa vê só os próprios dados; chaves de acesso guardadas criptografadas.'],
];

const DUVIDAS = [
  ['Posso usar só um dos sistemas?', 'Sim. Growth, Steel e Line são sistemas separados, cada um com o próprio acesso. Você usa o que resolve a sua operação.'],
  ['Quanto custa?', 'O Growth tem preço público: o CRM sai a partir de R$ 99/mês no plano anual, e o Growth + CRM a partir de R$ 237,60/mês. Para o Steel e o Line, fale com a gente.'],
  ['Onde entra a inteligência artificial?', 'Onde ela decide algo. No Growth, um relatório que cruza anúncio e venda e aponta o gargalo. No Steel, a leitura da prancha de armação, ainda em teste. No Line, a conta é de engenharia e fica com o sistema, sem IA.'],
  ['Meus dados ficam seguros?', 'Cada empresa vê só os próprios dados, todo acesso exige login, e as chaves das suas contas externas (Meta, Google) ficam guardadas criptografadas.'],
  ['O Steel já pode ser usado?', 'Ainda está em desenvolvimento. Os módulos comercial, técnico e de produção já funcionam; se a sua central de corte e dobra quer participar, fale com a gente.'],
];

const semMovimento = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Brilho que segue o mouse (CSS .spot lê --mx/--my); com data-tilt o card inclina um pouco.
// Escreve direto no style para não re-renderizar a cada pixel.
function mover(e: React.MouseEvent<HTMLElement>) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty('--mx', `${e.clientX - r.left}px`);
  el.style.setProperty('--my', `${e.clientY - r.top}px`);
  if (el.dataset.tilt !== undefined && !semMovimento()) {
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg) translateY(-3px)`;
  }
}
function largar(e: React.MouseEvent<HTMLElement>) { e.currentTarget.style.transform = ''; }
const spot = { onMouseMove: mover, onMouseLeave: largar };

/** Símbolo da Cromalex: o "C" cromado. Na marca-mãe o encaixe é tinta, não limão (limão = Growth). */
function Logo({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
      <defs>
        <linearGradient id="cromalex-logo" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: 'var(--chrome-1)' }} />
          <stop offset="0.45" style={{ stopColor: 'var(--chrome-2)' }} />
          <stop offset="0.6" style={{ stopColor: 'var(--chrome-3)' }} />
          <stop offset="1" style={{ stopColor: 'var(--chrome-4)' }} />
        </linearGradient>
      </defs>
      <path d="M31 11 A14 14 0 1 0 31 29" fill="none" stroke="url(#cromalex-logo)" strokeWidth="7" strokeLinecap="round" />
      <rect x="27" y="16.5" width="9" height="7" rx="2" style={{ fill: 'var(--ink)' }} />
    </svg>
  );
}

function Marca() {
  return (
    <span className="flex items-center gap-2.5">
      <Logo />
      <span className="display" style={{ fontSize: 19, letterSpacing: '-0.02em' }}>Cromalex</span>
    </span>
  );
}

function BotaoTema() {
  const alternar = () => {
    const html = document.documentElement;
    const novo = html.dataset.theme === 'light' ? 'dark' : 'light';
    html.dataset.theme = novo;
    try { localStorage.setItem('tema', novo); } catch { /* sem storage o tema vale só nesta visita */ }
  };
  return (
    <button type="button" onClick={alternar} aria-label="Alternar entre tema claro e escuro" title="Tema claro ou escuro"
      className="btn-linha inline-flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-xl bg-transparent">
      <svg className="ico-sol h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </svg>
      <svg className="ico-lua h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
      </svg>
    </button>
  );
}

function Rotulo({ children }: { children: React.ReactNode }) {
  return <p className="mono m-0" style={{ fontSize: 13, color: 'var(--ink-3)' }}>{children}</p>;
}

function Titulo({ children, cromo = false }: { children: React.ReactNode; cromo?: boolean }) {
  return (
    <h2 className={`display m-0 ${cromo ? 'cromo' : ''}`}
      style={{ fontSize: 'clamp(32px, 4vw, 52px)', lineHeight: 1.05, letterSpacing: '-0.035em' }}>
      {children}
    </h2>
  );
}

// Número que conta de 0 até o alvo quando entra na tela. Escreve direto no DOM: o
// servidor já entrega o valor final, e sem JS (ou com movimento reduzido) ele fica.
function Contador({ alvo, sufixo = '' }: { alvo: number; sufixo?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || semMovimento()) return;
    el.textContent = `0${sufixo}`;
    let raf = 0;
    const obs = new IntersectionObserver(([e]) => {
      if (!e?.isIntersecting) return;
      obs.disconnect();
      const inicio = performance.now();
      const passo = (t: number) => {
        const p = Math.min((t - inicio) / 1400, 1);
        el.textContent = `${Math.round(alvo * (1 - Math.pow(1 - p, 3)))}${sufixo}`;
        if (p < 1) raf = requestAnimationFrame(passo);
      };
      raf = requestAnimationFrame(passo);
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => { obs.disconnect(); cancelAnimationFrame(raf); el.textContent = `${alvo}${sufixo}`; };
  }, [alvo, sufixo]);
  return <span ref={ref}>{alvo}{sufixo}</span>;
}

// O card do hero: um pedaço de cada produto, como aparece na tela de cada um.
function CartaoHero() {
  const cartao = useRef<HTMLDivElement>(null);
  const inclinar = (e: React.MouseEvent<HTMLDivElement>) => {
    const c = cartao.current;
    if (!c || semMovimento()) return;
    const r = c.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    c.style.transform = `perspective(1200px) rotateY(${x * 10}deg) rotateX(${-y * 8}deg)`;
  };
  const soltar = () => { if (cartao.current) cartao.current.style.transform = 'perspective(1200px) rotateY(-6deg) rotateX(3deg)'; };
  const bloco = { background: 'var(--bg)', border: '1px solid var(--border)' };
  const selo = (cor: string, texto: string) => (
    <span className="shrink-0 rounded-md px-2 py-1 text-[11px] font-bold" style={{ background: cor, color: 'var(--on-produto)' }}>{texto}</span>
  );

  return (
    <div onMouseMove={inclinar} onMouseLeave={soltar} className="min-w-0">
      <div ref={cartao} className="tilt flex flex-col gap-3 rounded-[22px] p-[18px]"
        style={{
          background: 'linear-gradient(180deg, var(--raised-top), var(--raised-bottom))',
          border: '1px solid var(--border-strong)',
          boxShadow: 'var(--shadow-raised)',
          transform: 'perspective(1200px) rotateY(-6deg) rotateX(3deg)',
        }}>

        {/* Growth */}
        <div className="flex flex-col gap-2 rounded-2xl p-3.5" style={bloco}>
          <div className="flex items-center justify-between gap-2">
            <span className="mono truncate" style={{ fontSize: 11, color: 'var(--ink-3)' }}>GROWTH · NOVO LEAD</span>
            {selo('var(--growth)', 'VEIO DO ANÚNCIO')}
          </div>
          <span className="text-[15px] font-semibold">Lead novo</span>
          <span className="text-xs" style={{ color: 'var(--ink-3)' }}>Anúncio “Vídeo do produto” · campanha Engajamento</span>
        </div>

        {/* Steel */}
        <div className="flex flex-col gap-2 rounded-2xl p-3.5" style={bloco}>
          <div className="flex items-center justify-between gap-2">
            <span className="mono truncate" style={{ fontSize: 11, color: 'var(--ink-3)' }}>STEEL · ORDEM DE PRODUÇÃO</span>
            {selo('var(--steel)', 'DOBRA')}
          </div>
          <span className="text-[15px] font-semibold">Estribo Ø 8,0 mm · 25 × 15 cm</span>
          <div className="h-2 overflow-hidden rounded-full" style={{ background: 'var(--border)' }}>
            <div className="h-full rounded-full" style={{ width: '60%', background: 'var(--steel)' }} />
          </div>
        </div>

        {/* Line */}
        <div className="flex flex-col gap-2 rounded-2xl p-3.5" style={bloco}>
          <div className="flex items-center justify-between gap-2">
            <span className="mono truncate" style={{ fontSize: 11, color: 'var(--ink-3)' }}>LINE · CONTROLE TECNOLÓGICO</span>
            {selo('var(--line-brand)', 'LIBERADO')}
          </div>
          <span className="text-[15px] font-semibold">Laudo de 1 dia recebido</span>
          <span className="text-xs" style={{ color: 'var(--ink-3)' }}>Lote de vigotas TR 12 · pronto para expedição</span>
        </div>

        <span className="self-end text-[11px]" style={{ color: 'var(--ink-3)' }}>Exemplo ilustrativo</span>
      </div>
    </div>
  );
}

// Abas com o detalhe de cada sistema. A aba ativa ganha a cor do produto.
function PorDentro() {
  const [atual, setAtual] = useState(0);
  const p = PRODUTOS[atual]!;
  return (
    <div className="flex flex-col gap-8">
      <div role="tablist" aria-label="Sistemas" className="flex flex-wrap gap-1 self-start rounded-[14px] p-1"
        style={{ background: 'var(--surface)', border: '1px solid var(--border-strong)' }}>
        {PRODUTOS.map((q, i) => {
          const ativo = i === atual;
          return (
            <button key={q.id} type="button" role="tab" aria-selected={ativo} aria-controls="por-dentro-painel" onClick={() => setAtual(i)}
              className="min-h-11 cursor-pointer rounded-[10px] border-0 px-[18px] py-2.5 text-sm font-semibold transition-colors"
              style={ativo ? { background: q.cor, color: 'var(--on-produto)' } : { background: 'transparent', color: 'var(--ink-2)' }}>
              {q.nome}
            </button>
          );
        })}
      </div>

      <div id="por-dentro-painel" role="tabpanel" key={p.id} className="pop flex flex-col gap-6">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <p className="m-0 text-[17px] leading-relaxed" style={{ color: 'var(--ink-2)' }}>{p.para}</p>
          <span className="mono" style={{ fontSize: 12, color: p.ink }}>{p.estado.toUpperCase()}</span>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {p.recursos.map(([tag, t, d]) => (
            <div key={tag} {...spot} data-tilt className="spot flex flex-col gap-2.5 rounded-[20px] p-7"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)', '--spot': p.spot } as React.CSSProperties}>
              <span className="mono" style={{ fontSize: 12, color: tag === 'EM TESTE' ? p.tintInk : p.ink }}>
                {tag === 'EM TESTE'
                  ? <span className="rounded-full px-2 py-0.5" style={{ background: p.tint }}>EM TESTE</span>
                  : tag}
              </span>
              <h3 className="m-0 text-xl font-bold">{t}</h3>
              <p className="m-0 text-[15px] leading-relaxed" style={{ color: 'var(--ink-2)' }}>{d}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CromalexLanding() {
  const raiz = useRef<HTMLDivElement>(null);
  const progresso = useRef<HTMLDivElement>(null);
  const produtosRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  // Seções entram suaves ao rolar. A classe de esconder só liga depois do JS, então sem JS
  // (ou com movimento reduzido) tudo aparece normal.
  useEffect(() => {
    const el = raiz.current;
    if (!el || semMovimento()) return;
    el.dataset.anim = 'on';
    const obs = new IntersectionObserver((entradas) => {
      for (const e of entradas) if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); }
    }, { threshold: 0.12 });
    el.querySelectorAll('.reveal').forEach((n) => obs.observe(n));
    return () => obs.disconnect();
  }, []);

  // Traça os desenhos quando os cards entram na tela — eles nascem abaixo da dobra.
  useEffect(() => {
    const alvo = produtosRef.current;
    if (!alvo) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e?.isIntersecting) { alvo.classList.add('is-drawn'); obs.disconnect(); }
    }, { threshold: 0.25 });
    obs.observe(alvo);
    return () => obs.disconnect();
  }, []);

  // Barra fina no topo mostra quanto da página já foi lida.
  useEffect(() => {
    const atualizar = () => {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      if (progresso.current) progresso.current.style.transform = `scaleX(${total > 0 ? h.scrollTop / total : 0})`;
    };
    atualizar();
    window.addEventListener('scroll', atualizar, { passive: true });
    return () => window.removeEventListener('scroll', atualizar);
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
      setError(`Não conseguimos enviar. Tente de novo ou escreva para ${EMAIL}.`);
    } finally {
      setSending(false);
    }
  };

  const caixa = 'mx-auto box-border max-w-[1200px] px-4 sm:px-6';
  const textoSec = { color: 'var(--ink-2)' };
  const campo = { background: 'var(--bg)', border: '1px solid var(--border-strong)', color: 'var(--ink)' };
  const subtitulo = { fontSize: 'clamp(30px, 3.6vw, 46px)', lineHeight: 1.08, letterSpacing: '-0.03em' };

  return (
    <div ref={raiz} className="min-h-screen overflow-x-hidden">

      {/* ── Navegação ── */}
      <nav className="sticky top-0 z-50" style={{ background: 'var(--nav)', backdropFilter: 'blur(14px)', borderBottom: '1px solid var(--line)' }}>
        <div ref={progresso} aria-hidden className="absolute -bottom-px left-0 h-0.5 w-full origin-left" style={{ background: 'var(--ink)', transform: 'scaleX(0)' }} />
        <div className={`${caixa} flex items-center justify-between gap-4 py-3`}>
          <a href="#" className="no-underline" style={{ color: 'var(--ink)' }}><Marca /></a>
          <div className="hidden items-center gap-6 text-sm lg:flex">
            <a href="#produtos" className="link no-underline">Produtos</a>
            <a href="#por-dentro" className="link no-underline">Recursos</a>
            <a href="#como" className="link no-underline">Como trabalhamos</a>
            <a href="#duvidas" className="link no-underline">Dúvidas</a>
          </div>
          <div className="flex items-center gap-2">
            <BotaoTema />
            <a href="#contato" className="btn-cromo rounded-xl px-[18px] py-2.5 text-sm font-bold no-underline">Fale conosco</a>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute right-[-10%] top-[10%] h-[90%] w-[60%] rounded-full" aria-hidden
          style={{ background: 'radial-gradient(closest-side, var(--glow), transparent)' }} />
        <div className={`${caixa} relative grid items-center gap-12 pb-24 pt-16 md:grid-cols-2 md:pt-24`}>
          <div className="flex flex-col gap-6">
            <p className="mono m-0 inline-flex items-center gap-2 self-start rounded-full px-3 py-1.5"
              style={{ fontSize: 12, border: '1px solid var(--border-strong)', color: 'var(--ink-2)' }}>
              {PRODUTOS.map((p) => <span key={p.id} className="h-[7px] w-[7px] rounded-full" style={{ background: p.cor }} />)}
              SOFTWARE BRASILEIRO · TRÊS SISTEMAS
            </p>
            <h1 className="display cromo m-0" style={{ fontSize: 'clamp(44px, 6vw, 80px)', lineHeight: 1, letterSpacing: '-0.045em' }}>
              Sistemas que tiram a operação da planilha.
            </h1>
            <p className="m-0 max-w-[560px] text-[19px] leading-relaxed" style={textoSec}>
              Construímos software para empresas que cresceram e viram o controle escapar entre
              abas, grupos de WhatsApp e planilhas em que ninguém confia. Do anúncio que traz o
              cliente à peça que sai da fábrica.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#produtos" className="btn-cromo rounded-[14px] px-6 py-[15px] text-base font-bold no-underline">Ver os produtos</a>
              <a href="#contato" className="btn-linha rounded-[14px] px-6 py-[15px] text-base font-semibold no-underline">Falar com a gente</a>
            </div>
          </div>
          <CartaoHero />
        </div>
      </section>

      {/* ── Onde atuamos ── */}
      <div style={{ borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div className={`${caixa} mono flex flex-wrap items-center justify-center gap-x-10 gap-y-3.5 py-6`} style={{ fontSize: 14, color: 'var(--ink-3)' }}>
          <span>FEITO PARA</span>
          {PRODUTOS.map((p) => (
            <span key={p.id} className="inline-flex items-center gap-2" style={{ color: 'var(--ink)' }}>
              <span className="h-2 w-2 rounded-full" style={{ background: p.cor }} />{p.tag}
            </span>
          ))}
        </div>
      </div>

      {/* ── Produtos ── */}
      <section id="produtos" className="scroll-mt-20">
        <div className={`${caixa} reveal flex flex-col gap-10 py-28`}>
          <div className="flex max-w-[760px] flex-col gap-3.5">
            <Rotulo>PRODUTOS</Rotulo>
            <Titulo>Três negócios diferentes, três sistemas próprios.</Titulo>
            <p className="m-0 text-[17px] leading-relaxed" style={textoSec}>
              Cada sistema nasceu dentro de uma operação real e fala a língua dela: campanha e lead,
              bitola e dobra, traço e laudo.
            </p>
          </div>

          <div ref={produtosRef} className="grid gap-5 lg:grid-cols-3">
            {PRODUTOS.map((p) => (
              <article key={p.id} {...spot} className="spot flex flex-col overflow-hidden rounded-3xl"
                style={{ background: 'var(--surface)', border: '1px solid var(--border-strong)', '--spot': p.spot } as React.CSSProperties}>

                {/* o desenho do ofício, na cor do produto */}
                <div className="px-7 pb-2 pt-7">{p.arte}</div>

                <div className="flex flex-1 flex-col gap-5 px-7 pb-7 pt-3">
                  <div className="flex flex-col gap-2">
                    <span className="mono" style={{ fontSize: 12, color: p.ink }}>{p.tag}</span>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                      <h3 className="display m-0 text-[26px]" style={{ letterSpacing: '-0.02em' }}>
                        Cromalex <span style={{ fontWeight: 600, color: 'var(--ink-3)' }}>{p.nome}</span>
                      </h3>
                      <span className="mono rounded-full px-2.5 py-1" style={{
                        fontSize: 12,
                        ...(p.noAr
                          ? { background: p.cor, color: 'var(--on-produto)' }
                          : { background: p.tint, color: p.tintInk }),
                      }}>
                        {p.estado}
                      </span>
                    </div>
                  </div>

                  <p className="m-0 text-[15px] leading-relaxed" style={textoSec}>{p.resumo}</p>

                  {/* ficha técnica — mono porque é dado, não texto de venda */}
                  <dl className="m-0 text-sm" style={{ borderTop: '1px solid var(--border)' }}>
                    {p.specs.map(([rotulo, valor]) => (
                      <div key={rotulo} className="flex justify-between gap-4 py-2.5" style={{ borderBottom: '1px solid var(--border)' }}>
                        <dt className="mono shrink-0" style={{ fontSize: 12, color: 'var(--ink-3)' }}>{rotulo.toUpperCase()}</dt>
                        <dd className="m-0 text-right font-semibold" style={{ color: 'var(--ink-2)' }}>{valor}</dd>
                      </div>
                    ))}
                  </dl>
                  {p.nota && <p className="m-0 -mt-2 text-xs" style={{ color: 'var(--ink-3)' }}>{p.nota}</p>}

                  <a href={p.cta.href}
                    {...(p.cta.externo ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="btn-produto mt-auto rounded-[14px] p-3.5 text-center text-base font-bold no-underline"
                    style={{ background: p.cor }}>
                    {p.cta.texto}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Por dentro de cada sistema ── */}
      <section id="por-dentro" className="scroll-mt-20">
        <div className={`${caixa} reveal flex flex-col gap-10 pb-28`}>
          <div className="flex max-w-[760px] flex-col gap-3.5">
            <Rotulo>RECURSOS</Rotulo>
            <Titulo cromo>Por dentro de cada sistema.</Titulo>
          </div>
          <PorDentro />
        </div>
      </section>

      {/* ── Na prática ── */}
      <section style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className={`${caixa} reveal flex flex-col gap-10 py-24`}>
          <div className="flex max-w-[760px] flex-col gap-3.5">
            <Rotulo>NA PRÁTICA</Rotulo>
            <h2 className="display m-0" style={subtitulo}>Medido na operação, não na apresentação.</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              { n: 99, suf: '%', txt: 'dos leads da Meta chegaram ao CRM com o anúncio identificado (206 de 208)', fonte: 'Growth · Galpão Ferriaço, 90 dias até 27/10/2026', cor: 'var(--growth)' },
              { n: 718, suf: '', txt: 'contatos organizados no CRM, cada um com a conversa e a origem', fonte: 'Growth · Galpão Ferriaço, 90 dias até 27/10/2026', cor: 'var(--growth)' },
              { n: 7, suf: '', txt: 'dias reais de produção refeitos pelo planejador de corte, conferidos contra a folha feita à mão', fonte: 'Line · testes com dias de outubro de 2026', cor: 'var(--line-brand)' },
            ].map((s) => (
              <div key={s.txt} {...spot} data-tilt className="spot flex min-w-0 flex-col gap-2 rounded-[20px] p-7"
                style={{ background: 'var(--bg)', border: '1px solid var(--border-strong)' }}>
                <span className="h-1.5 w-10 rounded-full" style={{ background: s.cor }} />
                <span className="display cromo" style={{ fontSize: 'clamp(44px, 5vw, 60px)', letterSpacing: '-0.04em', lineHeight: 1.05 }}>
                  <Contador alvo={s.n} sufixo={s.suf} />
                </span>
                <span className="text-[15px] leading-normal" style={textoSec}>{s.txt}</span>
                <span className="mt-auto pt-2 text-xs" style={{ color: 'var(--ink-3)' }}>{s.fonte}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Como trabalhamos ── */}
      <section id="como" className="scroll-mt-20">
        <div className={`${caixa} reveal flex flex-col gap-10 py-28`}>
          <div className="flex max-w-[760px] flex-col gap-3.5">
            <Rotulo>COMO TRABALHAMOS</Rotulo>
            <Titulo>Software feito por quem opera junto.</Titulo>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {PASSOS.map(([tag, t, d], i) => (
              <div key={tag} {...spot} data-tilt className="spot flex flex-col gap-2.5 rounded-[20px] p-7"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                <span className="display" style={{ fontSize: 40, color: 'var(--ink-dim)' }}>0{i + 1}</span>
                <span className="mono" style={{ fontSize: 12, color: 'var(--ink-3)' }}>{tag}</span>
                <h3 className="m-0 text-[19px] font-bold">{t}</h3>
                <p className="m-0 text-[15px] leading-relaxed" style={textoSec}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sobre ── */}
      <section id="sobre" className="scroll-mt-20" style={{ borderTop: '1px solid var(--line)' }}>
        <div className={`${caixa} reveal grid items-start gap-12 py-24 md:grid-cols-2`}>
          <div className="flex flex-col gap-4">
            <Rotulo>SOBRE</Rotulo>
            <h2 className="display m-0" style={subtitulo}>A Cromalex.</h2>
            <p className="m-0 text-base leading-relaxed" style={textoSec}>
              A Cromalex desenvolve sistemas para empresas brasileiras de porte médio. Cada produto
              nasceu dentro de uma operação real, resolvendo um problema que custava dinheiro todo mês.
            </p>
            <p className="m-0 text-base leading-relaxed" style={textoSec}>
              Usamos IA onde ela decide algo — apontar a campanha que está queimando verba, ler uma
              prancha de armadura — e não como enfeite de tela. Onde a conta é de engenharia, como
              o traço do concreto, quem decide é a norma.
            </p>
          </div>

          <dl className="m-0 grid gap-4 sm:grid-cols-2">
            {PRINCIPIOS.map(([titulo, texto]) => (
              <div key={titulo} {...spot} data-tilt className="spot flex flex-col gap-2.5 rounded-[20px] p-6"
                style={{ background: 'var(--surface)', border: '1px solid var(--border-strong)' }}>
                <dt className="mono" style={{ fontSize: 12, color: 'var(--ink-3)' }}>{titulo}</dt>
                <dd className="m-0 text-[15px] leading-relaxed" style={{ color: 'var(--ink)' }}>{texto}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── Dúvidas ── */}
      <section id="duvidas" className="reveal mx-auto box-border flex max-w-[900px] scroll-mt-20 flex-col gap-6 px-4 pb-28 pt-10 sm:px-6">
        <h2 className="display m-0" style={subtitulo}>Dúvidas frequentes</h2>
        <div className="flex flex-col" style={{ borderTop: '1px solid var(--border)' }}>
          {DUVIDAS.map(([q, a], i) => (
            <details key={q} open={i === 0} className="faq" style={{ borderBottom: '1px solid var(--border)' }}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-[22px] text-lg font-bold transition-colors">
                {q}
                <span aria-hidden className="faq-ico inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xl font-normal" style={{ border: '1px solid var(--border-control)' }}>+</span>
              </summary>
              <p className="pop m-0 pb-[22px] pr-12 text-[15px] leading-relaxed" style={textoSec}>{a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ── Contato ── */}
      <section id="contato" className={`${caixa} scroll-mt-20 pb-24`}>
        <div className="reveal grid items-start gap-10 rounded-[28px] p-6 sm:p-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:p-14"
          style={{ background: 'linear-gradient(160deg, var(--raised-top), var(--surface) 70%)', border: '1px solid var(--border-strong)' }}>
          <div className="flex flex-col gap-4">
            <Rotulo>CONTATO</Rotulo>
            <h2 className="display cromo m-0" style={{ fontSize: 'clamp(34px, 4.4vw, 56px)', lineHeight: 1.02, letterSpacing: '-0.04em' }}>
              Vamos conversar.
            </h2>
            <p className="m-0 text-[17px] leading-relaxed" style={textoSec}>
              Conte o que está travando na sua operação. Respondemos em até um dia útil.
            </p>
            <p className="m-0 text-sm" style={{ color: 'var(--ink-3)' }}>
              Ou escreva direto para{' '}
              <a href={`mailto:${EMAIL}`} className="link font-semibold">{EMAIL}</a>
            </p>
          </div>

          {sent ? (
            <div className="flex flex-col gap-2 rounded-[20px] p-8" style={{ background: 'var(--bg)', border: '1px solid var(--border-strong)' }} role="status">
              <h3 className="m-0 text-lg font-bold">✓ Mensagem recebida</h3>
              <p className="m-0 text-[15px]" style={textoSec}>Retornamos para o e-mail que você informou, em até um dia útil.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {[
                { label: 'NOME', key: 'name', type: 'text', placeholder: 'Como podemos te chamar' },
                { label: 'E-MAIL', key: 'email', type: 'email', placeholder: 'Para onde respondemos' },
              ].map((field) => (
                <div key={field.key} className="flex flex-col gap-2">
                  <label htmlFor={field.key} className="mono" style={{ fontSize: 12, color: 'var(--ink-3)' }}>{field.label}</label>
                  <input
                    id={field.key}
                    type={field.type}
                    required
                    placeholder={field.placeholder}
                    value={formData[field.key as keyof typeof formData]}
                    onChange={e => setFormData(prev => ({ ...prev, [field.key]: e.target.value }))}
                    className="w-full rounded-xl px-4 py-3 text-[15px] outline-none"
                    style={campo}
                  />
                </div>
              ))}
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="mono" style={{ fontSize: 12, color: 'var(--ink-3)' }}>MENSAGEM</label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  placeholder="O que está travando hoje? Se for sobre um sistema, diga qual."
                  value={formData.message}
                  onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full resize-none rounded-xl px-4 py-3 text-[15px] outline-none"
                  style={campo}
                />
              </div>
              <button type="submit" disabled={sending} className="btn-cromo cursor-pointer rounded-[14px] border-0 p-4 text-base font-bold">
                {sending ? 'Enviando…' : 'Enviar mensagem'}
              </button>
              {error && <p className="m-0 text-center text-sm" role="alert" style={{ color: 'var(--danger)' }}>✕ {error}</p>}
            </form>
          )}
        </div>
      </section>

      {/* ── Rodapé ── */}
      <footer style={{ borderTop: '1px solid var(--line)' }}>
        <div className={`${caixa} grid gap-8 py-12 text-sm sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]`} style={{ color: 'var(--ink-3)' }}>
          <div className="flex flex-col gap-3">
            <span style={{ color: 'var(--ink)' }}><Marca /></span>
            <span className="max-w-[340px] leading-relaxed">Sistemas que tiram a operação da planilha, do marketing à produção.</span>
          </div>
          <div className="flex flex-col gap-2.5">
            <span className="mono" style={{ fontSize: 12 }}>PRODUTOS</span>
            {PRODUTOS.map((p) => (
              <a key={p.id} href={p.cta.externo ? p.cta.href : '#por-dentro'} {...(p.cta.externo ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="link inline-flex items-center gap-2 no-underline">
                <span className="h-2 w-2 rounded-full" style={{ background: p.cor }} />Cromalex {p.nome}
              </a>
            ))}
          </div>
          <div className="flex flex-col gap-2.5">
            <span className="mono" style={{ fontSize: 12 }}>CONTATO</span>
            <a href={`mailto:${EMAIL}`} className="link no-underline">{EMAIL}</a>
            <a href="#contato" className="link no-underline">Formulário</a>
          </div>
        </div>
        <div className={`${caixa} pb-8 text-[13px]`} style={{ color: 'var(--ink-3)' }}>
          © {new Date().getFullYear()} Cromalex · CNPJ 52.722.681/0001-03
        </div>
      </footer>
    </div>
  );
}
