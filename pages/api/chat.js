import { buildSystemPrompt } from "@/data/assistantKnowledge";

/*
  POST /api/chat  { messages: [{ role: "user" | "assistant", content: string }] }
  → { reply: string }

  Needs ANTHROPIC_API_KEY in the environment (Vercel → Settings → Environment Variables).
  Without it, answers 503 and the chat widget uses its built-in fallback.
*/

const MODEL = process.env.ASSISTANT_MODEL || "claude-haiku-5-5";
const MAX_TURNS = 12;
const MAX_CHARS = 1000;

// Very small per-IP rate limit (per server instance)
const hits = new Map();
const LIMIT = 20; // requests
const WINDOW = 60_000; // per minute
function limited(ip) {
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < WINDOW);
  list.push(now);
  hits.set(ip, list);
  if (hits.size > 5000) hits.clear();
  return list.length > LIMIT;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "method_not_allowed" });
  }

  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return res.status(503).json({ error: "not_configured" });

  const ip = (req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "?").toString().split(",")[0].trim();
  if (limited(ip)) return res.status(429).json({ error: "rate_limited" });

  const raw = Array.isArray(req.body?.messages) ? req.body.messages : [];
  const messages = raw
    .filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string" && m.content.trim())
    .slice(-MAX_TURNS)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS) }));
  // The API needs the conversation to start with the user
  while (messages.length && messages[0].role !== "user") messages.shift();
  if (!messages.length || messages[messages.length - 1].role !== "user") {
    return res.status(400).json({ error: "bad_request" });
  }

  try {
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": key,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 450,
        system: buildSystemPrompt(),
        messages,
      }),
    });
    if (!r.ok) {
      console.error("assistant upstream error", r.status, await r.text().catch(() => ""));
      return res.status(502).json({ error: "upstream" });
    }
    const data = await r.json();
    const reply = (data.content || [])
      .filter((b) => b.type === "text")
      .map((b) => b.text)
      .join("")
      .trim();
    return res.status(200).json({ reply });
  } catch (e) {
    console.error("assistant error", e);
    return res.status(502).json({ error: "upstream" });
  }
}
