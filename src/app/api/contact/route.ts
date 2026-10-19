import { NextResponse, type NextRequest } from 'next/server';
import { getPayloadClient } from '@/lib/payload';

const RATE_LIMIT_WINDOW = 60_000; // 1 minute
const RATE_LIMIT_MAX = 5;
const submissions = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = submissions.get(ip);

  if (!entry || now > entry.resetAt) {
    submissions.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return false;
  }

  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

function checkOrigin(request: NextRequest): boolean {
  const origin = request.headers.get('origin');
  const host = request.headers.get('host');
  if (!origin) return true; // Allow non-browser clients (e.g. curl for testing)
  try {
    const originHost = new URL(origin).host;
    return originHost === host;
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  // CSRF check
  if (!checkOrigin(request)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  // Rate limiting
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const { name, email, subject, message } = body as {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
  };

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
  }

  // Input length validation
  if (typeof name !== 'string' || name.length > 200) {
    return NextResponse.json({ error: 'Name is too long' }, { status: 400 });
  }
  if (typeof email !== 'string' || email.length > 320) {
    return NextResponse.json({ error: 'Email is too long' }, { status: 400 });
  }
  if (typeof subject !== 'string' || subject.length > 500) {
    return NextResponse.json({ error: 'Subject is too long' }, { status: 400 });
  }
  if (typeof message !== 'string' || message.length > 5000) {
    return NextResponse.json({ error: 'Message is too long' }, { status: 400 });
  }

  // Email format validation
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
  }

  // Sent through Payload's email adapter (payload.config.ts). Without SMTP
  // configured there is nowhere for the message to go, so say so rather
  // than telling the visitor it was sent.
  if (!process.env.SMTP_HOST) {
    return NextResponse.json({ error: 'Email is not set up' }, { status: 503 });
  }

  const clean = (s: string) => s.replace(/[\r\n]+/g, ' ').trim();

  try {
    const payload = await getPayloadClient();
    await payload.sendEmail({
      to: process.env.CONTACT_TO || 'info@kindsisters.org.au',
      replyTo: email,
      subject: `Website enquiry: ${clean(subject)}`,
      text: `Name: ${clean(name)}\nEmail: ${email}\nSubject: ${clean(subject)}\n\n${message}`,
    });
  } catch {
    // No PII logged
    console.error('Contact form: email send failed');
    return NextResponse.json({ error: 'Could not send' }, { status: 502 });
  }

  return NextResponse.json({ success: true });
}
