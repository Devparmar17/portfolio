/**
 * Synthesises the thank-you line with a hosted AI voice.
 *
 * Optional by design. With no provider key set this answers 503 and the
 * browser's own neural voice handles it, so the feature degrades to exactly
 * what it was rather than breaking.
 *
 * Environment:
 *   ELEVENLABS_API_KEY    preferred when present
 *   ELEVENLABS_VOICE_ID   optional; defaults to a standard ElevenLabs voice
 *   OPENAI_API_KEY        used when ElevenLabs is not configured
 *   OPENAI_TTS_VOICE      optional; defaults to "alloy"
 *
 * The key is read here, on the server, and never reaches the browser.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Keeps a stray loop from running up someone else's TTS bill. */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 10;
const hits = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const seen = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  seen.push(now);
  hits.set(ip, seen);

  // Stop the map growing without bound on a long-lived server.
  if (hits.size > 500) {
    for (const [key, times] of hits) {
      if (!times.some((t) => now - t < WINDOW_MS)) hits.delete(key);
    }
  }

  return seen.length > MAX_PER_WINDOW;
}

/** First name only, letters and marks, short enough to say. */
function cleanName(value) {
  return String(value ?? "")
    .trim()
    .split(/\s+/)[0]
    .replace(/[^\p{L}\p{M}'-]/gu, "")
    .slice(0, 24);
}

async function elevenLabs(line) {
  const voice = process.env.ELEVENLABS_VOICE_ID || "21m00Tcm4TlvDq8ikWAM";
  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voice}`,
    {
      method: "POST",
      headers: {
        "xi-api-key": process.env.ELEVENLABS_API_KEY,
        "Content-Type": "application/json",
        Accept: "audio/mpeg",
      },
      body: JSON.stringify({
        text: line,
        model_id: "eleven_turbo_v2_5",
        voice_settings: { stability: 0.5, similarity_boost: 0.75 },
      }),
    },
  );

  if (!response.ok) {
    throw new Error(`ElevenLabs ${response.status}`);
  }
  return response.arrayBuffer();
}

async function openAI(line) {
  const response = await fetch("https://api.openai.com/v1/audio/speech", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini-tts",
      voice: process.env.OPENAI_TTS_VOICE || "alloy",
      input: line,
      response_format: "mp3",
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI ${response.status}`);
  }
  return response.arrayBuffer();
}

export async function POST(request) {
  let payload;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "bad_request" }, { status: 400 });
  }

  const name = cleanName(payload?.name);

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (isRateLimited(ip)) {
    return Response.json({ error: "rate_limited" }, { status: 429 });
  }

  const hasEleven = Boolean(process.env.ELEVENLABS_API_KEY);
  const hasOpenAI = Boolean(process.env.OPENAI_API_KEY);
  if (!hasEleven && !hasOpenAI) {
    // Not an error: the browser voice takes over from here.
    return Response.json({ error: "not_configured" }, { status: 503 });
  }

  const line = name
    ? `Thank you for your message, ${name}.`
    : "Thank you for your message.";

  try {
    const audio = hasEleven ? await elevenLabs(line) : await openAI(line);

    return new Response(audio, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "no-store",
      },
    });
  } catch (cause) {
    console.error("Speak route:", cause);
    return Response.json({ error: "synthesis_failed" }, { status: 502 });
  }
}

export function GET() {
  return Response.json({ error: "method_not_allowed" }, { status: 405 });
}
