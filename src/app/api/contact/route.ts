import { NextResponse } from "next/server";

interface ContactPayload {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export async function POST(request: Request) {
  let body: ContactPayload;

  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, email, subject, message } = body;

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: "All fields are required." }, { status: 422 });
  }

  // In production, wire this up to an email provider (Resend, Postmark, etc.)
  // or persist the message via Drizzle. Logging keeps this demo dependency-free.
  console.log("New contact form submission:", { name, email, subject, message });

  return NextResponse.json({ ok: true });
}
