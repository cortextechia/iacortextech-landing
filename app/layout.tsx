import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'IA Cortex Tech — Tecnologia e IA para escalar negócios',
  description: 'Desenvolvemos produtos SaaS com inteligência artificial para ajudar empresas a crescer com dados.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>{children}</body>
    </html>
  );
}