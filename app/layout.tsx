import type { Metadata } from 'next';
import { Inter, Manrope, Geist_Mono } from 'next/font/google';
import './globals.css';

// Fontes do design system Cromalex: Manrope nos títulos, Inter no texto, Geist Mono nos rótulos.
const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const manrope = Manrope({ subsets: ['latin'], weight: ['600', '700', '800'], variable: '--font-display' });
const mono = Geist_Mono({ subsets: ['latin'], weight: ['500'], variable: '--font-mono' });

const TITULO = 'Cromalex — Sistemas que tiram a operação da planilha';
const DESCRICAO =
  'A Cromalex desenvolve software para empresas brasileiras: o Growth liga anúncio a venda com CRM e WhatsApp, o Steel organiza o corte e a dobra de aço e o Line gerencia a fábrica de vigotas treliçadas.';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.iacortextech.com.br'),
  title: TITULO,
  description: DESCRICAO,
  alternates: {
    canonical: 'https://www.iacortextech.com.br',
  },
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: TITULO,
    description: DESCRICAO,
    url: 'https://www.iacortextech.com.br',
    siteName: 'Cromalex',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: TITULO,
    description: DESCRICAO,
  },
};

// Roda antes da pintura para não piscar o tema errado: escolha salva, senão a do aparelho.
// Sem acesso ao localStorage (aba privada bloqueada) vale a preferência do aparelho.
const temaInicial = `(function(){var t=null;try{t=localStorage.getItem('tema')}catch(e){}
if(t!=='light'&&t!=='dark')t=matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';
document.documentElement.dataset.theme=t})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: temaInicial }} />
      </head>
      <body className={`${inter.variable} ${manrope.variable} ${mono.variable} ${inter.className}`}>{children}</body>
    </html>
  );
}
