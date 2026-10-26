"use client";
import { useEffect, useRef } from "react";

/* ── Edit footer links here ─────────────────────────────────────────── */
const EMAIL = "contact@warddstudio.com";
const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/warddmusic_/" },
  { label: "YouTube", href: "https://www.youtube.com/@warddmusic" },
  { label: "Spotify", href: "https://open.spotify.com/user/314t6ingile3jrokd6pkp5rdjyjm" },
  { label: "Facebook", href: "https://www.facebook.com/warddmusic" },
];
const NAV = [
  { label: "Services", href: "#services" },
  { label: "Notre histoire", href: "#about" },
  { label: "Packs", href: "#package" },
  { label: "Réserver", href: "/booking" },
];

const Arrow = ({ size = 14, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden="true" className={className}>
    <path d="M3 11L11 3M11 3H4.5M11 3V9.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const linkCls =
  "cursor-target underline decoration-white/40 underline-offset-[5px] transition-colors hover:decoration-white";

const Footer = () => {
  const year = new Date().getFullYear();
  const boxRef = useRef(null);
  const textRef = useRef(null);

  // Make the wordmark fill the card width exactly, whatever font is loaded
  useEffect(() => {
    const box = boxRef.current;
    const text = textRef.current;
    if (!box || !text) return undefined;
    const fit = () => {
      text.style.fontSize = "100px";
      const w = text.offsetWidth;
      if (w > 0) text.style.fontSize = `${(box.clientWidth / w) * 100}px`;
    };
    fit();
    document.fonts?.ready?.then(fit);
    const ro = new ResizeObserver(fit);
    ro.observe(box);
    return () => ro.disconnect();
  }, []);

  return (
    <footer className="container-x pb-6 sm:pb-10">
      <div className="overflow-hidden rounded-[28px] bg-black px-6 pb-8 pt-16 text-white sm:rounded-[40px] sm:px-12 sm:pb-12 sm:pt-24 lg:px-20 lg:pt-32">
        {/* Wordmark */}
        <div ref={boxRef} className="text-center" aria-hidden="true">
          <div
            ref={textRef}
            className="inline-block select-none whitespace-nowrap text-[13vw] font-semibold leading-[0.82] tracking-[-0.065em]"
            style={{
              background: "linear-gradient(180deg, #2b2b2e 0%, #121214 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              WebkitTextFillColor: "transparent",
              paddingBottom: "0.06em",
              paddingRight: "0.08em",
              paddingLeft: "0.01em",
            }}
          >
            wardd studio
          </div>
        </div>

        <div className="mt-10 border-t border-white/30 sm:mt-14" />

        {/* Contact + links */}
        <div className="mt-10 flex flex-col gap-12 sm:mt-14 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-col gap-6">
            <a
              href={`mailto:${EMAIL}`}
              data-cursor-label="Email"
              className="cursor-target group flex items-center gap-4 text-[clamp(1.5rem,3.2vw,2.6rem)] leading-none tracking-heading"
            >
              <Arrow size={16} className="shrink-0 text-white/50 transition-colors group-hover:text-white" />
              {EMAIL}
            </a>
            <div className="flex items-center gap-4">
              <Arrow size={16} className="shrink-0 text-white/50" />
              <ul className="flex flex-wrap gap-x-10 gap-y-3 text-[15px]">
                {SOCIALS.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor-label={s.label}
                      className={linkCls}
                    >
                      {s.label.toLowerCase()}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <ul className="grid grid-cols-2 gap-x-12 gap-y-4 text-[15px] lg:pt-2 lg:text-right">
            {NAV.map((n) => (
              <li key={n.label}>
                <a href={n.href} data-cursor-label={n.label} className={linkCls}>
                  {n.label.toLowerCase()}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom line */}
        <div className="mt-16 flex flex-col gap-4 text-[13px] text-white/45 sm:mt-24 sm:flex-row sm:items-center sm:justify-between">
          <p className="!leading-relaxed !text-white/45">
            © {year} Wardd Studio. Tous droits réservés.
            <span className="mx-2 opacity-40">|</span>
            Développé par{" "}
            <a
              href="https://doodle.ma/"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-label="Doodle"
              className="cursor-target text-white underline underline-offset-4"
            >
              Doodle
            </a>
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            data-cursor-label="Haut"
            className="cursor-target inline-flex w-fit items-center gap-2 font-mono text-[11px] uppercase tracking-[0.06em] text-white/70 transition-colors hover:text-white"
          >
            Haut de page
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 20V5m0 0l-6 6m6-6l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
