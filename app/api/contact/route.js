import { NextResponse } from "next/server";
import { Resend } from "resend";

import { contact } from "@/data/portfolio";

/**
 * Contact form delivery.
 *
 * This runs on the server, so RESEND_API_KEY never reaches the browser. The
 * browser only ever sees whether the send succeeded — the form shows success
 * solely when the email service has accepted the message.
 *
 * Environment (see .env.example):
 *   RESEND_API_KEY       required; nothing is sent without it
 *   CONTACT_TO_EMAIL     optional; defaults to the address in data/portfolio.js
 *   CONTACT_FROM_EMAIL   optional; defaults to Resend's shared test sender
 */

export const runtime = "nodejs";
/** Every submission is handled live; nothing here may be cached. */
export const dynamic = "force-dynamic";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const LIMITS = { name: 100, email: 200, message: 4000 };

/** Best-effort throttle: 5 messages per IP per 10 minutes, per server instance. */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const recentByIp = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const recent = (recentByIp.get(ip) ?? []).filter((at) => now - at < WINDOW_MS);
  recent.push(now);
  recentByIp.set(ip, recent);

  // Keep the map from growing without bound on a long-lived instance.
  if (recentByIp.size > 500) {
    for (const [key, times] of recentByIp) {
      if (!times.some((at) => now - at < WINDOW_MS)) recentByIp.delete(key);
    }
  }

  return recent.length > MAX_PER_WINDOW;
}

const ESCAPES = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
const escapeHtml = (value) => value.replace(/[&<>"']/g, (char) => ESCAPES[char]);

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  const name = String(body?.name ?? "").trim().slice(0, LIMITS.name);
  const email = String(body?.email ?? "").trim().slice(0, LIMITS.email);
  const message = String(body?.message ?? "").trim().slice(0, LIMITS.message);

  // Hidden field no person can see or tab into: if it is filled, it was a bot.
  // Accept quietly so the bot does not learn to work around it.
  if (String(body?.company ?? "").trim()) {
    return NextResponse.json({ ok: true });
  }

  if (name.length < 2 || !EMAIL_PATTERN.test(email) || message.length < 10) {
    return NextResponse.json({ error: "invalid" }, { status: 422 });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  // Checked last, so a malformed or bot submission is turned away on its own
  // merits whether or not email happens to be configured.
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error(
      "Contact form: RESEND_API_KEY is not set — the message was NOT sent. Add it to .env.local (local) or the Vercel project settings.",
    );
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  const to = process.env.CONTACT_TO_EMAIL || contact.email;
  const from = process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>";

  try {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from,
      to,
      // Replying in the mail client answers the visitor, not the sender address.
      replyTo: email,
      subject: `New Portfolio Message from ${name}`,
      text: [
        "New message from your portfolio",
        "",
        `Name:  ${name}`,
        `Email: ${email}`,
        "",
        message,
      ].join("\n"),
      html: `
        <div style="font-family:ui-sans-serif,system-ui,sans-serif;max-width:560px;color:#09090b">
          <p style="font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#737373;margin:0 0 16px">
            New portfolio message
          </p>
          <table style="border-collapse:collapse;width:100%;margin-bottom:20px">
            <tr>
              <td style="padding:8px 0;color:#737373;width:80px">Name</td>
              <td style="padding:8px 0;font-weight:600">${escapeHtml(name)}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#737373">Email</td>
              <td style="padding:8px 0;font-weight:600">
                <a href="mailto:${escapeHtml(email)}" style="color:#0a66c2;text-decoration:none">${escapeHtml(email)}</a>
              </td>
            </tr>
          </table>
          <div style="border-top:1px solid #e5e5e5;padding-top:20px;white-space:pre-wrap;line-height:1.6">${escapeHtml(message)}</div>
        </div>
      `,
    });

    if (error) {
      console.error("Contact form: the email service rejected the message:", error);
      return NextResponse.json({ error: "send_failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true, id: data?.id ?? null });
  } catch (cause) {
    console.error("Contact form: could not reach the email service:", cause);
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }
}
