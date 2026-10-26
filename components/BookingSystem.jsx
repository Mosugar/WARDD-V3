"use client";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import bookingTranslations from "../data/bookingTranslations.json";

/*
  Booking flow: Pack → Date → Heure → Détails → Confirmation.
  Texts live in data/bookingTranslations.json (fr / en / ar / darija).
  Requests are emailed to BOOKING_EMAIL through FormSubmit (formsubmit.co,
  free, no account). The very first booking triggers an "Activate form" email
  to that address: open it and click Activate once. If sending fails, the
  visitor can send the same request by email or WhatsApp.
*/

const BOOKING_EMAIL = "warddstudio@gmail.com";
const FORMSUBMIT_URL = `https://formsubmit.co/ajax/${BOOKING_EMAIL}`;
const STUDIO_EMAIL = "contact@warddstudio.com";
const WHATSAPP = "212617869001";

const LANGS = [
  { code: "fr", label: "FR" },
  { code: "en", label: "EN" },
  { code: "darija", label: "الدارجة" },
  { code: "ar", label: "العربية" },
];

const PACK_IDS = ["pack-etudiant", "pack-professionnel", "pack-premium", "pack-personnalise"];
// /booking?pack=pro coming from the tickets on the home page
const QUERY_TO_PACK = { etudiant: "pack-etudiant", pro: "pack-professionnel", premium: "pack-premium", personnalise: "pack-personnalise" };

const SLOTS = {
  morning: ["09:00", "10:00", "11:00"],
  afternoon: ["14:00", "15:00", "16:00", "17:00"],
  evening: ["18:00", "19:00", "20:00"],
};

// Strings that are not in bookingTranslations.json
const UI = {
  fr: { label: "Réservation", summary: "Ta réservation", empty: "Choisis un pack pour commencer.", morning: "Matin", afternoon: "Après-midi", evening: "Soir", today: "Aujourd'hui", closed: "Fermé le dimanche", help: "Une question avant de réserver ?", required: "obligatoire", successCta: "Retour à l'accueil", again: "Nouvelle réservation", errorTitle: "L'envoi n'a pas abouti", errorText: "Pas de souci : envoie-nous la même demande par email ou WhatsApp, tout est déjà rempli.", byEmail: "Envoyer par email", byWhatsapp: "Envoyer sur WhatsApp", popular: "Populaire", choose: "Choisir", chosen: "Choisi", step: "Étape" },
  en: { label: "Booking", summary: "Your booking", empty: "Pick a package to start.", morning: "Morning", afternoon: "Afternoon", evening: "Evening", today: "Today", closed: "Closed on Sundays", help: "A question before booking?", required: "required", successCta: "Back to home", again: "New booking", errorTitle: "Sending failed", errorText: "No worries: send us the same request by email or WhatsApp, it's all filled in.", byEmail: "Send by email", byWhatsapp: "Send on WhatsApp", popular: "Popular", choose: "Choose", chosen: "Selected", step: "Step" },
  ar: { label: "الحجز", summary: "حجزك", empty: "اختر باقة للبدء.", morning: "صباحاً", afternoon: "بعد الظهر", evening: "مساءً", today: "اليوم", closed: "مغلق يوم الأحد", help: "لديك سؤال قبل الحجز؟", required: "إجباري", successCta: "العودة للرئيسية", again: "حجز جديد", errorTitle: "لم يتم الإرسال", errorText: "لا مشكلة: أرسل نفس الطلب عبر البريد أو واتساب، كل المعلومات جاهزة.", byEmail: "إرسال بالبريد", byWhatsapp: "إرسال عبر واتساب", popular: "الأكثر طلباً", choose: "اختيار", chosen: "تم الاختيار", step: "خطوة" },
  darija: { label: "الحجز", summary: "الحجز ديالك", empty: "ختار باقة باش تبدا.", morning: "الصباح", afternoon: "العشية", evening: "الليل", today: "اليوم", closed: "مسدود نهار الحد", help: "عندك شي سؤال قبل ما تحجز؟", required: "ضروري", successCta: "رجع للصفحة الرئيسية", again: "حجز جديد", errorTitle: "ماتسيفطش الطلب", errorText: "ماشي مشكل: صيفط نفس الطلب فالإيميل ولا الواتساب، كلشي معمر.", byEmail: "صيفط فالإيميل", byWhatsapp: "صيفط فالواتساب", popular: "الأكثر طلبا", choose: "ختار", chosen: "مختار", step: "مرحلة" },
};

const pad2 = (n) => String(n).padStart(2, "0");
// "PACK ÉTUDIANT" → "Pack Étudiant" (Arabic is left as is)
const nice = (s = "") => (/[A-ZÀ-Ý]{2}/.test(s) ? s.toLowerCase().replace(/(^|[\s(/-])([^\s(/-])/g, (m, a, c) => a + c.toUpperCase()).replace(/\bSmm\b/, "SMM") : s);
const toKey = (d) => `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;

const Icon = {
  check: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  arrow: (
    <svg width="16" height="12" viewBox="0 0 22 12" fill="none" aria-hidden="true" className="rtl:rotate-180">
      <path d="M1 6h19m0 0l-5-5m5 5l-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  back: (
    <svg width="16" height="12" viewBox="0 0 22 12" fill="none" aria-hidden="true" className="rotate-180 rtl:rotate-0">
      <path d="M1 6h19m0 0l-5-5m5 5l-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  chevron: (dir) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" className={dir === "prev" ? "rtl:rotate-180" : "rotate-180 rtl:rotate-0"}>
      <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

const inputCls =
  "w-full rounded-2xl border border-transparent bg-surface px-4 py-3.5 text-[15px] text-ink outline-none transition-colors placeholder:text-subtle focus:border-ink/30 focus:bg-paper";

const BookingSystem = () => {
  const router = useRouter();
  const [lang, setLang] = useState("fr");
  const [step, setStep] = useState(1); // 1..4, 5 = success
  const [pack, setPack] = useState("");
  const [extras, setExtras] = useState([]); // individual services for the custom pack
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [month, setMonth] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });
  const [form, setForm] = useState({ name: "", email: "", phone: "", artistName: "", projectType: "", specialRequests: "" });
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState(false);

  const t = bookingTranslations[lang];
  const ui = UI[lang];
  const rtl = lang === "ar" || lang === "darija";

  // Preselect the pack torn on the home page
  useEffect(() => {
    if (!router.isReady) return;
    const id = QUERY_TO_PACK[router.query.pack];
    if (id) {
      setPack(id);
      if (id !== "pack-personnalise") setStep(2);
    }
  }, [router.isReady, router.query.pack]);

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const locale = lang === "en" ? "en-GB" : rtl ? "ar-MA" : "fr-FR";
  const formatDate = (key) =>
    key ? new Date(`${key}T12:00:00`).toLocaleDateString(locale, { weekday: "long", day: "numeric", month: "long" }) : "";

  const packName = () => {
    if (!pack) return "";
    if (pack === "pack-personnalise") {
      const names = extras.map((id) => t.individualServices[id]?.name).filter(Boolean);
      return `${nice(t.services[pack].name)}${names.length ? ` (${names.map(nice).join(", ")})` : ""}`;
    }
    return nice(t.services[pack].name);
  };

  const stepDone = (n) => {
    if (n === 1) return pack && (pack !== "pack-personnalise" || extras.length > 0);
    if (n === 2) return !!date;
    if (n === 3) return !!time;
    if (n === 4) return form.name.trim() && form.email.trim() && form.phone.trim();
    return false;
  };
  const canOpen = (n) => n === 1 || [...Array(n - 1)].every((_, i) => stepDone(i + 1));

  const message = () =>
    [
      "NOUVELLE RÉSERVATION — WARDD STUDIO",
      `Langue : ${LANGS.find((l) => l.code === lang)?.label}`,
      "",
      `Pack : ${packName()}`,
      `Date : ${formatDate(date)}`,
      `Heure : ${time}`,
      "",
      `Nom : ${form.name}`,
      `Email : ${form.email}`,
      `Téléphone : ${form.phone}`,
      `Nom d'artiste : ${form.artistName || "—"}`,
      `Type de projet : ${form.projectType || "—"}`,
      "",
      `Demandes : ${form.specialRequests || "—"}`,
    ].join("\n");

  const submit = async () => {
    if (!stepDone(4) || sending) return;
    setSending(true);
    setFailed(false);
    try {
      const r = await fetch(FORMSUBMIT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `Nouvelle réservation — ${packName()} — ${formatDate(date)} à ${time}`,
          _replyto: form.email,
          _template: "table",
          _captcha: "false",
          Pack: packName(),
          Prix: t.services[pack]?.price || "",
          Date: formatDate(date),
          Heure: time,
          Nom: form.name,
          Email: form.email,
          Téléphone: form.phone,
          "Nom d'artiste": form.artistName || "—",
          "Type de projet": form.projectType || "—",
          "Demandes spéciales": form.specialRequests || "—",
          Langue: LANGS.find((l) => l.code === lang)?.label,
        }),
      });
      const data = await r.json().catch(() => ({}));
      if (!r.ok || String(data.success) !== "true") throw new Error(data.message || String(r.status));
      setStep(5);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e) {
      console.error("booking error", e);
      setFailed(true);
    }
    setSending(false);
  };

  const reset = () => {
    setStep(1);
    setPack("");
    setExtras([]);
    setDate("");
    setTime("");
    setFailed(false);
    setForm({ name: "", email: "", phone: "", artistName: "", projectType: "", specialRequests: "" });
  };

  const next = () => {
    if (stepDone(step) && step < 4) {
      setStep(step + 1);
      if (window.scrollY > 300) window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // ── Calendar ──────────────────────────────────────────────────────────
  const calendar = () => {
    const first = new Date(month.getFullYear(), month.getMonth(), 1);
    const days = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
    const offset = first.getDay(); // 0 = Sunday, matches t.calendar.days
    const cells = [];
    for (let i = 0; i < offset; i++) cells.push(<div key={`e${i}`} />);
    for (let d = 1; d <= days; d++) {
      const day = new Date(month.getFullYear(), month.getMonth(), d);
      const key = toKey(day);
      const sunday = day.getDay() === 0;
      const past = day < today;
      const off = sunday || past;
      const selected = date === key;
      const isToday = day.getTime() === today.getTime();
      cells.push(
        <button
          key={key}
          type="button"
          disabled={off}
          onClick={() => {
            setDate(key);
            setTime("");
          }}
          aria-pressed={selected}
          aria-label={formatDate(key)}
          className={`relative flex h-11 items-center justify-center rounded-2xl text-[15px] transition-all duration-200 sm:h-14 ${
            selected
              ? "bg-ink font-medium text-white"
              : off
              ? "cursor-not-allowed text-subtle/50"
              : "text-ink hover:bg-surface"
          }`}
        >
          {d}
          {isToday && !selected && <span className="absolute bottom-1.5 h-1 w-1 rounded-full bg-ink" />}
        </button>
      );
    }
    return cells;
  };

  const canGoPrevMonth = month > new Date(today.getFullYear(), today.getMonth(), 1);

  const slotTaken = (slot) => {
    // Past hours today are not bookable
    if (date !== toKey(today)) return false;
    const [h] = slot.split(":").map(Number);
    return h <= new Date().getHours();
  };

  const steps = [t.steps.pack, t.steps.date, t.steps.time, t.steps.details];
  const titles = [
    [t.step1.title, t.step1.subtitle],
    [t.step2.title, t.step2.subtitle],
    [t.step3.title, t.step3.subtitle],
    [t.step4.title, t.step4.subtitle],
  ];

  return (
    <div dir={rtl ? "rtl" : "ltr"} className="container-x min-h-screen pb-24 pt-28 sm:pt-36">
      {/* Heading */}
      <div className="mb-10 flex flex-col gap-6 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <span className="label">{ui.label}</span>
          <h1 className="mt-5 text-[clamp(2.4rem,5.4vw,4.6rem)] font-medium leading-[0.98] tracking-display text-ink">
            {step === 5 ? t.success.title : t.title}
          </h1>
          <p className="mt-4 max-w-[46ch] text-[15px] leading-relaxed sm:text-base">{step === 5 ? t.success.subtitle : t.subtitle}</p>
        </div>
        <div className="inline-flex w-fit rounded-full border border-line p-1" role="group" aria-label="Langue">
          {LANGS.map((l) => (
            <button
              key={l.code}
              type="button"
              onClick={() => setLang(l.code)}
              aria-pressed={lang === l.code}
              className={`rounded-full px-3.5 py-1.5 text-[13px] transition-colors ${lang === l.code ? "bg-ink text-white" : "text-muted hover:text-ink"}`}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>

      {step === 5 ? (
        /* ── Success ─────────────────────────────────────────────────── */
        <div className="booking-in mx-auto max-w-2xl rounded-[32px] bg-ink px-7 py-14 text-center text-white sm:px-14">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#0dff88] text-ink">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p className="mt-7 text-2xl font-medium tracking-heading">{t.success.thanks}</p>
          <div className="mx-auto mt-6 max-w-sm space-y-1 font-mono text-[13px] text-white/60">
            <p>{packName()}</p>
            <p>
              {formatDate(date)} · {time}
            </p>
          </div>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <a href="/" className="btn-pill !bg-white !text-ink">
              {ui.successCta}
            </a>
            <button type="button" onClick={reset} className="btn-ghost !border-white/25 !text-white hover:!bg-white/10">
              {ui.again}
            </button>
          </div>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-12">
          {/* ── Main column ───────────────────────────────────────────── */}
          <div>
            {/* Stepper */}
            <ol className="mb-10 grid grid-cols-4 gap-2">
              {steps.map((label, i) => {
                const n = i + 1;
                const active = step === n;
                const done = stepDone(n) && step > n;
                return (
                  <li key={label}>
                    <button
                      type="button"
                      disabled={!canOpen(n)}
                      onClick={() => setStep(n)}
                      className="group w-full text-start disabled:cursor-not-allowed"
                    >
                      <div className="h-[3px] overflow-hidden rounded-full bg-line">
                        <div className={`h-full rounded-full bg-ink transition-all duration-500 ${active || done ? "w-full" : "w-0"}`} />
                      </div>
                      <div className={`mt-3 flex items-center gap-2 text-[13px] sm:text-sm ${active ? "text-ink" : done ? "text-ink/70" : "text-subtle"}`}>
                        <span className="font-mono text-[11px]">{pad2(n)}</span>
                        <span className="truncate">{label}</span>
                        {done && <span className="hidden text-ink sm:inline">{Icon.check}</span>}
                      </div>
                    </button>
                  </li>
                );
              })}
            </ol>

            <div key={step} className="booking-in">
              <h2 className="text-[clamp(1.6rem,2.6vw,2.2rem)] font-medium leading-tight tracking-heading text-ink">{titles[step - 1][0]}</h2>
              <p className="mt-2 text-[15px]">{titles[step - 1][1]}</p>

              <div className="mt-8">
                {/* Step 1 — Pack */}
                {step === 1 && (
                  <>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {PACK_IDS.map((id) => {
                        const s = t.services[id];
                        const selected = pack === id;
                        const dark = id === "pack-professionnel";
                        return (
                          <button
                            key={id}
                            type="button"
                            onClick={() => {
                              setPack(id);
                              if (id !== "pack-personnalise") setExtras([]);
                            }}
                            aria-pressed={selected}
                            className={`group relative flex flex-col rounded-[26px] border p-6 text-start transition-all duration-300 hover:-translate-y-0.5 ${
                              dark ? "bg-ink text-white" : "bg-surface text-ink"
                            } ${selected ? "border-ink ring-2 ring-ink ring-offset-2 ring-offset-paper" : "border-transparent"}`}
                          >
                            <div className="flex items-center justify-between">
                              <span className={`font-mono text-[11px] uppercase tracking-[0.06em] ${dark ? "text-white/50" : "text-subtle"}`}>{s.duration}</span>
                              {dark ? (
                                <span className="rounded-full bg-[#0dff88] px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.06em] text-ink">{ui.popular}</span>
                              ) : null}
                            </div>
                            <h3 className={`mt-6 text-[1.6rem] font-medium leading-none tracking-heading ${dark ? "text-white" : "text-ink"}`}>{nice(s.name.replace(/^PACK\s+/i, "").replace(/\s+PACKAGE$/i, ""))}</h3>
                            <div className="mt-3 text-[1.25rem] font-medium tracking-heading">{s.price}</div>
                            <p className={`mt-4 text-[14px] leading-relaxed ${dark ? "!text-white/60" : ""}`}>{s.description}</p>
                            <span
                              className={`mt-6 inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-[13px] font-medium transition-colors ${
                                selected ? (dark ? "bg-white text-ink" : "bg-ink text-white") : dark ? "border border-white/25" : "border border-line"
                              }`}
                            >
                              {selected ? (
                                <>
                                  {Icon.check} {ui.chosen}
                                </>
                              ) : (
                                ui.choose
                              )}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {pack === "pack-personnalise" && (
                      <div className="booking-in mt-8 rounded-[26px] border border-line p-6">
                        <h3 className="text-lg font-medium tracking-heading text-ink">{t.step1.customizeTitle}</h3>
                        <p className="mt-1 text-[14px]">{t.step1.customizeSubtitle}</p>
                        <div className="mt-5 grid gap-3 sm:grid-cols-2">
                          {Object.entries(t.individualServices).map(([id, s]) => {
                            const on = extras.includes(id);
                            return (
                              <button
                                key={id}
                                type="button"
                                aria-pressed={on}
                                onClick={() => setExtras((x) => (on ? x.filter((v) => v !== id) : [...x, id]))}
                                className={`flex items-start gap-3 rounded-2xl border p-4 text-start transition-colors ${on ? "border-ink bg-ink text-white" : "border-line hover:border-ink/40"}`}
                              >
                                <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${on ? "border-white bg-white text-ink" : "border-line"}`}>
                                  {on && Icon.check}
                                </span>
                                <span>
                                  <span className="block text-[14px] font-medium">{nice(s.name)}</span>
                                  <span className={`mt-0.5 block text-[13px] leading-snug ${on ? "text-white/60" : "text-muted"}`}>{s.description}</span>
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </>
                )}

                {/* Step 2 — Date */}
                {step === 2 && (
                  <div className="rounded-[26px] border border-line p-5 sm:p-7">
                    <div className="mb-5 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => canGoPrevMonth && setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))}
                        disabled={!canGoPrevMonth}
                        aria-label="Mois précédent"
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-line transition-colors hover:border-ink disabled:opacity-30"
                      >
                        {Icon.chevron("prev")}
                      </button>
                      <div className="text-lg font-medium tracking-heading text-ink">
                        {t.calendar.months[month.getMonth()]} {month.getFullYear()}
                      </div>
                      <button
                        type="button"
                        onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))}
                        aria-label="Mois suivant"
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-line transition-colors hover:border-ink"
                      >
                        {Icon.chevron("next")}
                      </button>
                    </div>
                    <div className="grid grid-cols-7 gap-1 text-center font-mono text-[11px] uppercase tracking-[0.04em] text-subtle">
                      {t.calendar.days.map((d) => (
                        <div key={d} className="py-2">
                          {d}
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-1">{calendar()}</div>
                    <p className="mt-4 font-mono text-[11px] text-subtle">{ui.closed}</p>
                  </div>
                )}

                {/* Step 3 — Time */}
                {step === 3 && (
                  <div className="space-y-7">
                    {Object.entries(SLOTS).map(([part, slots]) => (
                      <div key={part}>
                        <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.06em] text-subtle">{ui[part]}</div>
                        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                          {slots.map((slot) => {
                            const taken = slotTaken(slot);
                            const on = time === slot;
                            return (
                              <button
                                key={slot}
                                type="button"
                                disabled={taken}
                                onClick={() => setTime(slot)}
                                aria-pressed={on}
                                className={`rounded-2xl border py-4 text-[15px] font-medium transition-all ${
                                  on ? "border-ink bg-ink text-white" : taken ? "cursor-not-allowed border-line text-subtle/50 line-through" : "border-line text-ink hover:border-ink"
                                }`}
                              >
                                {slot}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Step 4 — Details */}
                {step === 4 && (
                  <form
                    className="grid gap-4 sm:grid-cols-2"
                    onSubmit={(e) => {
                      e.preventDefault();
                      submit();
                    }}
                  >
                    {[
                      ["name", t.form.fullName, t.form.placeholders.fullName, "text", true, "name"],
                      ["email", t.form.email, t.form.placeholders.email, "email", true, "email"],
                      ["phone", t.form.phone, t.form.placeholders.phone, "tel", true, "tel"],
                      ["artistName", t.form.artistName, t.form.placeholders.artistName, "text", false, "off"],
                    ].map(([k, label, ph, type, req, ac]) => (
                      <label key={k} className="block">
                        <span className="mb-2 flex items-center gap-2 text-[13px] font-medium text-ink">
                          {label}
                          {req && <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-subtle">{ui.required}</span>}
                        </span>
                        <input
                          type={type}
                          required={req}
                          autoComplete={ac}
                          dir={type === "email" || type === "tel" ? "ltr" : "auto"}
                          value={form[k]}
                          placeholder={ph}
                          onChange={(e) => setForm({ ...form, [k]: e.target.value })}
                          className={inputCls}
                        />
                      </label>
                    ))}
                    <label className="block sm:col-span-2">
                      <span className="mb-2 block text-[13px] font-medium text-ink">{t.form.projectType}</span>
                      <div className="flex flex-wrap gap-2">
                        {["single", "ep", "album", "demo", "mixtape"].map((p) => {
                          const v = t.form.projectTypes[p];
                          const on = form.projectType === v;
                          return (
                            <button
                              key={p}
                              type="button"
                              onClick={() => setForm({ ...form, projectType: on ? "" : v })}
                              aria-pressed={on}
                              className={`rounded-full border px-4 py-2 text-[14px] transition-colors ${on ? "border-ink bg-ink text-white" : "border-line text-ink hover:border-ink"}`}
                            >
                              {v}
                            </button>
                          );
                        })}
                      </div>
                    </label>
                    <label className="block sm:col-span-2">
                      <span className="mb-2 block text-[13px] font-medium text-ink">{t.form.specialRequests}</span>
                      <textarea
                        rows={4}
                        dir="auto"
                        value={form.specialRequests}
                        placeholder={t.form.placeholders.specialRequests}
                        onChange={(e) => setForm({ ...form, specialRequests: e.target.value })}
                        className={`${inputCls} resize-none`}
                      />
                    </label>
                    <button type="submit" className="hidden" aria-hidden="true" tabIndex={-1} />
                  </form>
                )}

                {failed && step === 4 && (
                  <div className="booking-in mt-6 rounded-[22px] border border-line bg-surface p-5">
                    <p className="font-medium text-ink">{ui.errorTitle}</p>
                    <p className="mt-1 text-[14px]">{ui.errorText}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <a
                        href={`mailto:${BOOKING_EMAIL}?subject=${encodeURIComponent(`Réservation — ${packName()}`)}&body=${encodeURIComponent(message())}`}
                        className="btn-pill"
                      >
                        {ui.byEmail}
                      </a>
                      <a href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message())}`} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                        {ui.byWhatsapp}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Navigation */}
            <div className="mt-10 flex items-center justify-between gap-3 border-t border-line pt-6">
              <button
                type="button"
                onClick={() => (step > 1 ? setStep(step - 1) : router.push("/#package"))}
                className="inline-flex items-center gap-2 rounded-full px-4 py-3 text-[14px] text-muted transition-colors hover:text-ink"
              >
                {Icon.back} {t.buttons.back}
              </button>
              {step < 4 ? (
                <button type="button" onClick={next} disabled={!stepDone(step)} className="btn-pill disabled:pointer-events-none disabled:opacity-30">
                  {t.buttons.next} {Icon.arrow}
                </button>
              ) : (
                <button type="button" onClick={submit} disabled={!stepDone(4) || sending} className="btn-pill disabled:pointer-events-none disabled:opacity-30">
                  {sending ? t.buttons.sending : t.buttons.confirm} {!sending && Icon.arrow}
                </button>
              )}
            </div>
          </div>

          {/* ── Summary ───────────────────────────────────────────────── */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="relative overflow-hidden rounded-[30px] bg-ink p-7 text-white">
              <div
                className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full opacity-40 blur-3xl"
                style={{ background: "radial-gradient(circle, #0dff88 0%, rgba(13,255,136,0) 70%)" }}
              />
              <div className="relative">
                <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-white/50">{ui.summary}</div>
                {!pack ? (
                  <p className="mt-6 text-[15px] !text-white/60">{ui.empty}</p>
                ) : (
                  <dl className="mt-6 space-y-5">
                    {[
                      [t.step4.pack, packName(), 1],
                      [t.step4.date, formatDate(date), 2],
                      [t.step4.time, time, 3],
                    ].map(([k, v, n]) => (
                      <div key={k} className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
                        <dt className="text-[13px] text-white/50">{k.replace(/:$/, "")}</dt>
                        <dd className="text-end text-[15px] font-medium">
                          {v || (
                            <button type="button" disabled={!canOpen(n)} onClick={() => setStep(n)} className="text-white/35 underline-offset-4 enabled:hover:underline">
                              —
                            </button>
                          )}
                        </dd>
                      </div>
                    ))}
                    <div className="flex items-end justify-between gap-4 pt-1">
                      <dt className="text-[13px] text-white/50">{t.step4.price.replace(/:$/, "")}</dt>
                      <dd className="text-[1.9rem] font-medium leading-none tracking-heading">{t.services[pack].price}</dd>
                    </div>
                  </dl>
                )}
              </div>
            </div>

            <div className="mt-4 rounded-[24px] border border-line p-5">
              <p className="text-[14px] font-medium text-ink">{ui.help}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <a
                  href={`https://wa.me/${WHATSAPP}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-line px-4 py-2 text-[13px] text-ink transition-colors hover:border-ink"
                >
                  WhatsApp
                </a>
                <a href={`mailto:${STUDIO_EMAIL}`} dir="ltr" className="rounded-full border border-line px-4 py-2 text-[13px] text-ink transition-colors hover:border-ink">
                  {STUDIO_EMAIL}
                </a>
              </div>
            </div>
          </aside>
        </div>
      )}

      <style jsx global>{`
        .booking-in {
          animation: bookingIn 0.45s cubic-bezier(0.22, 1, 0.36, 1);
        }
        @keyframes bookingIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </div>
  );
};

export default BookingSystem;
