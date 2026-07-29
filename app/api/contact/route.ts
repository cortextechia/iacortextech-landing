import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Escapa também aspas: os valores entram em atributo HTML (href do mailto),
// onde escapar só &, < e > deixa fechar o atributo e injetar outros.
const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Campos obrigatórios ausentes.' }, { status: 400 });
  }

  if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string') {
    return NextResponse.json({ error: 'Campos inválidos.' }, { status: 400 });
  }

  // Vai para o replyTo além do corpo — barra quebra de linha e header injection.
  if (!/^[^\s@"'<>]+@[^\s@"'<>]+\.[^\s@"'<>]+$/.test(email)) {
    return NextResponse.json({ error: 'E-mail inválido.' }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.ZOHO_USER,
      pass: process.env.ZOHO_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: `"IA Cortex Tech Site" <${process.env.ZOHO_USER}>`,
      to: 'api@iacortextech.com.br',
      replyTo: email,
      subject: `Contato via iacortextech.com.br — ${name.replace(/[\r\n]/g, ' ')}`,
      text: `Nome: ${name}\nEmail: ${email}\n\n${message}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px">
          <h2 style="color:#3b82f6">Novo contato via iacortextech.com.br</h2>
          <p><strong>Nome:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
          <hr/>
          <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
        </div>
      `,
    });
  } catch {
    return NextResponse.json({ error: 'Falha ao enviar e-mail.' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}