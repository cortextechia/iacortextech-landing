import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Campos obrigatórios ausentes.' }, { status: 400 });
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

  await transporter.sendMail({
    from: `"IA Cortex Tech Site" <${process.env.ZOHO_USER}>`,
    to: 'api@iacortextech.com.br',
    replyTo: email,
    subject: `Contato via iacortextech.com.br — ${name}`,
    text: `Nome: ${name}\nEmail: ${email}\n\n${message}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px">
        <h2 style="color:#3b82f6">Novo contato via iacortextech.com.br</h2>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <hr/>
        <p style="white-space:pre-wrap">${message}</p>
      </div>
    `,
  });

  return NextResponse.json({ success: true });
}