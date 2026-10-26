"use client";
import dynamic from "next/dynamic";
import BlurText from "@/components/ui/BlurText";
import Magnet from "@/components/ui/Magnet";

// WebGL canvas: client-only, so it never blocks server rendering.
const Threads = dynamic(() => import("@/components/ui/Threads"), { ssr: false });

/* ── Edit contact details here ─────────────────────────────────────────── */
const EMAIL = "contact@warddstudio.com";
const PHONE_DISPLAY = "+212 617 869 001";
const PHONE_LINK = "+212617869001";
const WHATSAPP_URL = "https://wa.me/212617869001";
const SOCIALS = [
  {
    label: "Spotify",
    href: "https://open.spotify.com/user/314t6ingile3jrokd6pkp5rdjyjm?si=4da048657bb14825",
  },
  { label: "Instagram", href: "https://www.instagram.com/warddmusic_/" },
  { label: "YouTube", href: "https://www.youtube.com/@warddmusic" },
  { label: "Facebook", href: "https://www.facebook.com/warddmusic" },
];

const ArrowUpRight = ({ size = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M3 11L11 3M11 3H4.5M11 3V9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Contact = () => {
  return (
    <section id="contact" className="container-x pb-6 pt-6 sm:pb-10">
      <div className="relative isolate overflow-hidden rounded-[28px] bg-[#111112] text-white sm:rounded-[36px]">
        {/* Light flowing lines on black, fading out toward the text */}
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-90"
          style={{
            maskImage: "linear-gradient(to right, transparent 8%, #000 62%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 8%, #000 62%)",
          }}
          aria-hidden="true"
        >
          <Threads
            color="#e7edf4"
            accentColor="#6f87a3"
            amplitude={1.5}
            distance={0.45}
            lineCount={70}
            thickness={0.8}
            softness={1.4}
            speed={0.5}
            angle={-14}
            parting={0.5}
            brightness={1.1}
            fade={0.12}
            enableMouseInteraction
          />
        </div>

        <div className="flex min-h-[600px] flex-col justify-between gap-12 p-7 sm:min-h-[640px] sm:p-12 lg:p-16">
          {/* Top: pitch */}
          <div>
            <span className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.08em] text-white/80 sm:text-xs">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
              </span>
              Idée → Réalité
            </span>

            <h2 className="mt-8 max-w-[15em] text-[clamp(2.4rem,5.4vw,5rem)] leading-[0.98] tracking-display text-white">
              <BlurText
                text="Nous pouvons tirer le meilleur parti de ton potentiel."
                delay={70}
                stepDuration={0.35}
                direction="bottom"
                blur={10}
                distance={28}
                color="#ffffff"
              />
            </h2>

            <p className="mt-6 max-w-[44ch] text-[15px] leading-relaxed !text-white/65 sm:text-base">
              Nous sommes déterminés à t&apos;offrir un résultat exceptionnel
              avec une qualité irréprochable.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Magnet padding={80} magnetStrength={3}>
                <a
                  href="/booking"
                  data-cursor-label="Réserver"
                  className="btn-pill cursor-target !bg-white !text-ink hover:!bg-[#e9ecef]"
                >
                  Réserver maintenant
                  <ArrowUpRight size={14} />
                </a>
              </Magnet>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-label="WhatsApp"
                className="btn-ghost cursor-target !border-white/25 !text-white hover:!border-white/60 hover:!bg-white/10"
              >
                Écrire sur WhatsApp
              </a>
            </div>

            <div className="mt-8 flex flex-col gap-2 font-mono text-[11px] uppercase tracking-[0.06em] text-white/55 sm:flex-row sm:gap-8 sm:text-xs">
              <a href={`mailto:${EMAIL}`} className="cursor-target transition-colors hover:text-white">
                {EMAIL}
              </a>
              <a href={`tel:${PHONE_LINK}`} className="cursor-target transition-colors hover:text-white">
                {PHONE_DISPLAY}
              </a>
            </div>
          </div>

          {/* Bottom: socials */}
          <div className="border-t border-white/15 pt-7">
            <ul className="grid grid-cols-2 gap-x-6 gap-y-5 sm:flex sm:items-center sm:justify-between">
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor-label={s.label}
                    className="cursor-target inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.06em] text-white/75 transition-colors hover:text-white sm:text-xs"
                  >
                    {s.label}
                    <ArrowUpRight size={11} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
