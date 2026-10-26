"use client";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import BlurText from "@/components/ui/BlurText";

/* ── Edit photos and captions here (files live in /public/studio) ────── */
const PHOTOS = [
  { src: "/studio/regie.jpg", label: "La régie", text: "Le cœur du studio : écoute précise, lumière chaude.", alt: "Régie du studio Wardd : bureau, écrans, enceintes et éclairage chaud" },
  { src: "/studio/monitoring.jpg", label: "Monitoring", text: "Des enceintes ADAM Audio pour entendre chaque détail.", alt: "Enceinte de monitoring ADAM Audio" },
  { src: "/studio/cabine.jpg", label: "Cabine vocale", text: "Une prise de voix propre, sans bruit parasite.", alt: "Micro de studio avec filtre anti-pop et panneau acoustique" },
  { src: "/studio/poste.jpg", label: "Poste de production", text: "Clavier, interface et casque, prêts pour la session.", alt: "Clavier maître, interface audio et casque sur le bureau" },
  { src: "/studio/regie-3.jpg", label: "Vue d'ensemble", text: "Un espace traité du sol au plafond, pensé pour créer.", alt: "Régie vue depuis l'entrée du studio" },
  { src: "/studio/lounge.jpg", label: "Le lounge", text: "Un espace pour souffler entre deux prises.", alt: "Coin lounge avec fauteuil et logo Wardd en néon" },
];

const pad = (n) => String(n).padStart(2, "0");
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

const Studio = () => {
  const [open, setOpen] = useState(-1); // photo in the viewer, -1 = closed
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState(true); // false when reduced motion
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const barRef = useRef(null);
  const cardRefs = useRef([]);
  const imgRefs = useRef([]);

  const close = useCallback(() => setOpen(-1), []);
  const step = useCallback((d) => setOpen((i) => (i + d + PHOTOS.length) % PHOTOS.length), []);

  // Scroll-driven horizontal tour
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPinned(false);
      return undefined;
    }
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return undefined;

    let distance = 0;
    let raf = 0;
    let lastActive = -1;

    const measure = () => {
      distance = Math.max(0, track.scrollWidth - window.innerWidth);
      // vertical scroll needed = horizontal distance (+ a short hold at both ends)
      section.style.height = `${window.innerHeight + distance + window.innerHeight * 0.35}px`;
    };

    const update = () => {
      raf = 0;
      const rect = section.getBoundingClientRect();
      const total = section.offsetHeight - window.innerHeight;
      const hold = window.innerHeight * 0.15;
      const p = clamp((-rect.top - hold) / Math.max(1, total - hold * 2), 0, 1);
      track.style.transform = `translate3d(${-p * distance}px,0,0)`;
      if (barRef.current) barRef.current.style.transform = `scaleX(${Math.max(p, 0.02)})`;

      const vw = window.innerWidth;
      let best = 0;
      let bestD = Infinity;
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const r = card.getBoundingClientRect();
        const center = r.left + r.width / 2;
        const d = (center - vw / 2) / vw; // -1 … 1 around the screen centre
        if (Math.abs(d) < bestD) {
          bestD = Math.abs(d);
          best = i;
        }
        const img = imgRefs.current[i];
        if (img) {
          // light parallax only (no colour change)
          const s = 1.08; // portrait crop is already tight; small margin for the parallax
          img.style.transform = `translate3d(${clamp(d, -1, 1) * -2.5}%,0,0) scale(${s})`;
        }
      });
      if (best !== lastActive) {
        lastActive = best;
        setActive(best);
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const onResize = () => {
      measure();
      onScroll();
    };

    measure();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      section.style.height = "";
    };
  }, []);

  // Keyboard + scroll lock while the viewer is open
  useEffect(() => {
    if (open < 0) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close, step]);

  return (
    <section id="studio" ref={sectionRef} className="relative">
      <div className={pinned ? "sticky top-0 flex h-svh flex-col justify-center overflow-hidden" : "section-y"}>
        {/* Heading */}
        <div className="container-x mb-8 flex flex-col gap-5 pt-20 sm:mb-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="label">Le studio</span>
            <h2 className="mt-4 text-[clamp(2.2rem,4.6vw,4.4rem)] leading-[0.98] tracking-display">
              <BlurText
                text="Un lieu pensé pour le son"
                delay={90}
                stepDuration={0.35}
                direction="bottom"
                blur={10}
                distance={28}
                color="#0a0a0a"
              />
            </h2>
          </div>
          <div className="flex items-end gap-6 lg:flex-col lg:items-end lg:gap-3">
            <div className="font-mono text-xs text-muted">
              <span className="text-ink">{pad(active + 1)}</span> / {pad(PHOTOS.length)}
            </div>
            <p key={active} className="studio-caption max-w-[34ch] text-[15px] leading-relaxed sm:text-base lg:text-right">
              <span className="font-medium text-ink">{PHOTOS[active].label}.</span> {PHOTOS[active].text}
            </p>
          </div>
        </div>

        {/* Track */}
        <div className={pinned ? "" : "overflow-x-auto"}>
          <div
            ref={trackRef}
            className="studio-track flex w-max gap-4 will-change-transform sm:gap-6"
          >
            {PHOTOS.map((p, i) => (
              <button
                key={p.src}
                ref={(el) => (cardRefs.current[i] = el)}
                type="button"
                onClick={() => setOpen(i)}
                data-cursor-label="Agrandir"
                className="cursor-target group relative block shrink-0 text-left [--card-vw:70vw] md:[--card-vw:38vw] lg:[--card-vw:28vw]"
                style={{ width: "min(calc((100svh - 330px) * 0.8), 460px, var(--card-vw))" }}
              >
                <div className="relative aspect-[1080/1350] overflow-hidden rounded-media bg-[#1a1410]">
                  <div ref={(el) => (imgRefs.current[i] = el)} className="absolute inset-0 will-change-transform">
                    <Image
                      src={p.src}
                      alt={p.alt}
                      fill
                      sizes="(max-width: 768px) 70vw, (max-width: 1024px) 38vw, 460px"
                      quality={90}
                      className="object-cover"
                      priority={i < 2}
                    />
                  </div>
                  <span
                    className={`absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-[13px] font-medium text-ink backdrop-blur transition-all duration-500 ${
                      i === active ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                    }`}
                  >
                    <span className="font-mono text-[11px] text-subtle">{pad(i + 1)}</span>
                    {p.label}
                  </span>
                  <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M8.5 1.5h4v4M5.5 12.5h-4v-4M12.5 1.5L8 6M1.5 12.5L6 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Progress */}
        <div className="container-x mt-8 flex items-center gap-5">
          <span className="font-mono text-xs text-muted">Faites défiler</span>
          <div className="h-[2px] flex-1 overflow-hidden rounded-full bg-line">
            <div ref={barRef} className="h-full w-full origin-left rounded-full bg-ink" style={{ transform: "scaleX(0.02)" }} />
          </div>
          <button type="button" onClick={() => setOpen(0)} data-cursor-label="Visiter" className="cursor-target font-mono text-xs text-ink underline underline-offset-4">
            Voir en plein écran
          </button>
        </div>
      </div>

      {/* Viewer */}
      {open >= 0 && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photos du studio"
          className="studio-viewer fixed inset-0 z-[100] flex flex-col bg-black/95 text-white"
          onClick={close}
        >
          <div className="flex items-center justify-between px-5 py-4 sm:px-8" onClick={(e) => e.stopPropagation()}>
            <span className="font-mono text-xs text-white/60">
              {pad(open + 1)} / {pad(PHOTOS.length)} · {PHOTOS[open].label}
            </span>
            <button type="button" onClick={close} aria-label="Fermer" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition-colors hover:bg-white/10">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div className="relative flex-1">
            <Image
              key={PHOTOS[open].src}
              src={PHOTOS[open].src}
              alt={PHOTOS[open].alt}
              fill
              sizes="100vw"
              quality={92}
              className="studio-viewer-img object-contain px-4 sm:px-20"
              onClick={(e) => e.stopPropagation()}
            />
            {[-1, 1].map((d) => (
              <button
                key={d}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  step(d);
                }}
                aria-label={d < 0 ? "Photo précédente" : "Photo suivante"}
                className={`absolute top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 backdrop-blur transition-colors hover:bg-white/25 ${
                  d < 0 ? "left-3 sm:left-6" : "right-3 sm:right-6"
                }`}
              >
                <svg width="18" height="12" viewBox="0 0 22 12" fill="none" aria-hidden="true" className={d < 0 ? "rotate-180" : ""}>
                  <path d="M1 6h19m0 0l-5-5m5 5l-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            ))}
          </div>

          {/* Thumbnails */}
          <div className="flex justify-center gap-2 overflow-x-auto px-5 py-4" onClick={(e) => e.stopPropagation()}>
            {PHOTOS.map((p, i) => (
              <button
                key={p.src}
                type="button"
                onClick={() => setOpen(i)}
                aria-label={`Voir ${p.label}`}
                className={`relative h-12 w-16 shrink-0 overflow-hidden rounded-md transition-opacity ${i === open ? "opacity-100 ring-2 ring-white" : "opacity-40 hover:opacity-80"}`}
              >
                <Image src={p.src} alt="" fill sizes="64px" className="object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}

      <style jsx global>{`
        .studio-track {
          /* first photo lines up with the page content */
          padding-inline: max(var(--gutter), calc((100vw - var(--max-w)) / 2 + var(--gutter)));
        }
        .studio-caption {
          animation: studioFade 0.5s ease-out;
        }
        .studio-viewer {
          animation: studioFade 0.3s ease-out;
        }
        .studio-viewer-img {
          animation: studioFade 0.4s ease-out;
        }
        @keyframes studioFade {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </section>
  );
};

export default Studio;
