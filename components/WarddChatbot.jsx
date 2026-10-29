"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { STUDIO } from "@/data/assistantKnowledge";
import { fallbackReply } from "@/lib/assistantFallback";
import { useLang } from "@/lib/i18n";

/*
  Wardd assistant — AI chat (pages/api/chat.js) with an offline fallback.
  Same export name as before, so pages keep working.
*/

const STORAGE_KEY = "wardd-assistant-v2";

const WELCOME = {
  id: "welcome",
  role: "assistant",
  content:
    "Salut 👋 Je suis l'assistant de **Wardd Studio**. Pose-moi tes questions sur les packs, le studio, les instrus ou la réservation.\nJe parle français, English, الدارجة et العربية.",
  actions: [],
};

const WELCOME_AR =
  "مرحباً 👋 أنا مساعد **Wardd Studio**. اسألني عن الباقات أو الاستوديو أو الإيقاعات أو الحجز.\nأتحدث العربية والدارجة والفرنسية والإنجليزية.";

const SUGGESTIONS = ["Quels sont vos packs ?", "Vous faites des instrus ?", "Où est le studio ?", "Je veux réserver"];
const SUGGESTIONS_AR = ["ما هي باقاتكم؟", "هل تصنعون الإيقاعات؟", "أين يقع الاستوديو؟", "أريد الحجز"];

const ACTION_LABELS_AR = { booking: "احجز", whatsapp: "واتساب", map: "الاتجاهات", packs: "شاهد الباقات", studio: "شاهد الاستوديو" };

const ACTIONS = {
  booking: { label: "Réserver", href: STUDIO.bookingUrl },
  whatsapp: {
    label: "WhatsApp",
    href: `https://wa.me/${STUDIO.whatsapp}?text=${encodeURIComponent("Salut Wardd Studio ! J'aimerais avoir plus d'infos.")}`,
    external: true,
  },
  map: { label: "Itinéraire", href: STUDIO.mapsUrl, external: true },
  packs: { label: "Voir les packs", href: "/#package" },
  studio: { label: "Voir le studio", href: "/#studio" },
};

// Pull "[[booking]] [[whatsapp]]" tokens out of a reply
const splitActions = (text) => {
  const actions = [];
  const content = text
    .replace(/\[\[(\w+)\]\]/g, (_, a) => {
      if (ACTIONS[a] && !actions.includes(a)) actions.push(a);
      return "";
    })
    .trim();
  return { content, actions: actions.slice(0, 2) };
};

// Tiny safe renderer: **bold**, [text](url), line breaks, "•"/"-" bullets
const renderInline = (line, keyBase) => {
  const out = [];
  const re = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)\s]+)\)/g;
  let last = 0;
  let m;
  let k = 0;
  while ((m = re.exec(line))) {
    if (m.index > last) out.push(line.slice(last, m.index));
    if (m[1]) out.push(<strong key={`${keyBase}-${k++}`} className="font-semibold">{m[1]}</strong>);
    else {
      const href = m[3];
      const safe = /^(https?:\/\/|\/|#|mailto:|tel:)/.test(href);
      out.push(
        safe ? (
          <a key={`${keyBase}-${k++}`} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="underline underline-offset-2">
            {m[2]}
          </a>
        ) : (
          m[2]
        )
      );
    }
    last = re.lastIndex;
  }
  if (last < line.length) out.push(line.slice(last));
  return out;
};

const Rich = ({ text }) => (
  <>
    {text.split("\n").map((line, i) => {
      const bullet = /^\s*[•\-*]\s+/.test(line);
      const body = line.replace(/^\s*[•\-*]\s+/, "");
      if (!body.trim()) return <div key={i} className="h-2" />;
      return bullet ? (
        <div key={i} className="flex gap-2 ps-1">
          <span className="text-subtle">•</span>
          <span>{renderInline(body, i)}</span>
        </div>
      ) : (
        <p key={i}>{renderInline(body, i)}</p>
      );
    })}
  </>
);

const Dot = () => (
  <span className="relative flex h-2 w-2">
    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#0dff88] opacity-70" />
    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#0dff88]" />
  </span>
);

const WarddChatbot = () => {
  const { tr, isAr } = useLang();
  const actionLabel = (a) => (isAr ? ACTION_LABELS_AR[a] : ACTIONS[a].label);
  // Internal links keep the visitor in their language
  const actionHref = (a) => (isAr && ACTIONS[a].href.startsWith("/") ? `/ar${ACTIONS[a].href}` : ACTIONS[a].href);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const aiDown = useRef(false);
  const listRef = useRef(null);
  const inputRef = useRef(null);

  // Restore / save the conversation for this browser tab
  useEffect(() => {
    try {
      const saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "null");
      if (Array.isArray(saved) && saved.length) setMessages(saved);
    } catch {}
  }, []);
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-30)));
    } catch {}
  }, [messages]);

  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, busy, open]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 250);
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const send = useCallback(
    async (raw) => {
      const text = (raw ?? input).trim();
      if (!text || busy) return;
      setInput("");
      const userMsg = { id: `u${Date.now()}`, role: "user", content: text, actions: [] };
      const history = [...messages, userMsg];
      setMessages(history);
      setBusy(true);

      let reply = null;
      if (!aiDown.current) {
        try {
          const ctrl = new AbortController();
          const timer = setTimeout(() => ctrl.abort(), 20000);
          const r = await fetch("/api/chat", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
              messages: history.filter((m) => m.id !== "welcome").map((m) => ({ role: m.role, content: m.content })),
            }),
            signal: ctrl.signal,
          });
          clearTimeout(timer);
          if (r.ok) {
            const data = await r.json();
            if (data.reply) reply = splitActions(data.reply);
          } else if (r.status === 503 || r.status === 404) {
            aiDown.current = true; // not configured: stop trying this session
          }
        } catch {}
      }
      if (!reply) {
        await new Promise((res) => setTimeout(res, 550)); // feels less robotic
        reply = fallbackReply(text);
      }
      setMessages((m) => [...m, { id: `a${Date.now()}`, role: "assistant", ...reply }]);
      setBusy(false);
    },
    [input, busy, messages]
  );

  const reset = () => {
    setMessages([WELCOME]);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {}
  };

  const onlyWelcome = messages.length === 1;

  return (
    <>
      {/* Launcher */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? tr("Fermer l'assistant", "إغلاق المساعد") : tr("Ouvrir l'assistant Wardd", "فتح مساعد Wardd")}
        data-cursor-label="Assistant"
        className={`cursor-target fixed bottom-4 right-4 z-[90] inline-flex items-center gap-3 rounded-full bg-ink py-2 pl-2 pr-5 text-[14px] font-medium text-white shadow-[0_12px_40px_rgba(10,10,10,0.28)] transition-all duration-300 hover:scale-[1.03] sm:bottom-6 sm:right-6 ${
          open ? "pointer-events-none translate-y-3 opacity-0" : "opacity-100"
        }`}
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 12h2m3-5v10m3-13v16m3-12v8m3-5v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </span>
        <span className="flex items-center gap-2">
          {tr("Assistant Wardd", "مساعد Wardd")} <Dot />
        </span>
      </button>

      {/* Panel */}
      <div
        role="dialog"
        aria-label={tr("Assistant Wardd Studio", "مساعد Wardd Studio")}
        className={`fixed bottom-3 right-3 z-[95] flex h-[min(640px,calc(100svh-24px))] w-[min(410px,calc(100vw-24px))] origin-bottom-right flex-col overflow-hidden rounded-[28px] border border-line bg-paper shadow-[0_30px_90px_rgba(10,10,10,0.25)] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] sm:bottom-6 sm:right-6 ${
          open ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
        }`}
      >
        {/* Header */}
        <div className="relative overflow-hidden bg-ink px-5 pb-5 pt-5 text-white">
          <div
            className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full opacity-60 blur-2xl"
            style={{ background: "radial-gradient(circle, #0dff88 0%, rgba(13,255,136,0) 70%)" }}
          />
          <div className="relative flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-white/60">
                <Dot /> {tr("En ligne", "متصل")}
              </div>
              <div className="mt-2 text-xl font-medium tracking-heading">{tr("Assistant Wardd", "مساعد Wardd")}</div>
              <div className="text-[13px] text-white/60">{tr("Réponse en quelques secondes", "رد خلال ثوانٍ")}</div>
            </div>
            <div className="flex gap-1.5">
              <button type="button" onClick={reset} aria-label={tr("Nouvelle conversation", "محادثة جديدة")} title={tr("Nouvelle conversation", "محادثة جديدة")} className="flex h-9 w-9 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M4 12a8 8 0 1 0 2.3-5.6M4 4v4h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button type="button" onClick={() => setOpen(false)} aria-label={tr("Fermer", "إغلاق")} className="flex h-9 w-9 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-5" aria-live="polite">
          {messages.map((m) => (
            <div key={m.id} className={`assistant-msg flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}>
              <div
                dir="auto"
                className={`max-w-[85%] space-y-1 rounded-[20px] px-4 py-3 text-[14.5px] leading-relaxed ${
                  m.role === "user" ? "rounded-br-md bg-ink text-white" : "rounded-bl-md bg-surface text-ink"
                }`}
              >
                <Rich text={m.id === "welcome" && isAr ? WELCOME_AR : m.content} />
              </div>
              {m.actions?.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {m.actions.map((a) => (
                    <a
                      key={a}
                      href={actionHref(a)}
                      target={ACTIONS[a].external ? "_blank" : undefined}
                      rel={ACTIONS[a].external ? "noopener noreferrer" : undefined}
                      onClick={() => !ACTIONS[a].external && setOpen(false)}
                      className="inline-flex items-center gap-1.5 rounded-full border border-line bg-paper px-3.5 py-1.5 text-[13px] font-medium text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white"
                    >
                      {actionLabel(a)}
                      <svg width="10" height="10" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="rtl-flip">
                        <path d="M3 11L11 3M11 3H4.5M11 3V9.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}

          {busy && (
            <div className="flex items-center gap-1.5 rounded-[20px] rounded-bl-md bg-surface px-4 py-4" style={{ width: "fit-content" }} aria-label={tr("L'assistant écrit", "المساعد يكتب")}>
              {[0, 1, 2].map((i) => (
                <span key={i} className="assistant-typing h-1.5 w-1.5 rounded-full bg-muted" style={{ animationDelay: `${i * 0.15}s` }} />
              ))}
            </div>
          )}

          {onlyWelcome && !busy && (
            <div className="flex flex-wrap gap-2 pt-1">
              {(isAr ? SUGGESTIONS_AR : SUGGESTIONS).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => send(s)}
                  className="rounded-full border border-line px-3.5 py-1.5 text-[13px] text-ink transition-colors hover:border-ink"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Composer */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send();
          }}
          className="border-t border-line p-3"
        >
          <div className="flex items-end gap-2 rounded-[22px] bg-surface p-1.5 pl-4 focus-within:ring-1 focus-within:ring-ink/20">
            <textarea
              ref={inputRef}
              rows={1}
              dir="auto"
              value={input}
              maxLength={1000}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              placeholder={tr("Écris ton message…", "اكتب رسالتك…")}
              className="max-h-28 min-h-[40px] flex-1 resize-none bg-transparent py-2.5 text-[14.5px] text-ink outline-none placeholder:text-subtle"
            />
            <button
              type="submit"
              disabled={!input.trim() || busy}
              aria-label={tr("Envoyer", "إرسال")}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink text-white transition-opacity disabled:opacity-30"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 19V5m0 0l-6 6m6-6l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          <p className="mt-2 text-center text-[11px] !text-subtle">
            {tr("Assistant IA · pour une date précise, écris-nous sur WhatsApp", "مساعد ذكي · لموعد محدد، راسلنا على واتساب")}
          </p>
        </form>
      </div>

      <style jsx global>{`
        .assistant-msg {
          animation: assistantIn 0.35s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .assistant-typing {
          animation: assistantDot 1s infinite ease-in-out;
        }
        @keyframes assistantIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }
        @keyframes assistantDot {
          0%,
          80%,
          100% {
            opacity: 0.25;
            transform: translateY(0);
          }
          40% {
            opacity: 1;
            transform: translateY(-3px);
          }
        }
      `}</style>
    </>
  );
};

export default WarddChatbot;
