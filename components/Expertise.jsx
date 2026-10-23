"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import BlurText from "@/components/ui/BlurText";

const Threads = dynamic(() => import("@/components/ui/Threads"), {
  ssr: false,
});

/* ──────────────────────────────────────────────────────────────────────────
   CONTENT — edit freely. Copy below is a first draft.
   • image: optional. Put a 3D render / photo in /public and set e.g.
     image: "/expertise/recording.png" — it replaces the animated orb.
   • video: your existing YouTube demo (shown as a "Voir la démo" link).
   • orb:   how the animated lines look for that service.
   ────────────────────────────────────────────────────────────────────────── */
const SERVICES = [
  {
    title: "Recording",
    text: "Une cabine traitée, des micros de studio et un ingé son à l'écoute. Ta voix est captée avec chaleur et précision, prise après prise.",
    tags: ["Cabine vocale", "Micros studio", "Direction artistique"],
    video: "fWlUmFIdGnA",
    orb: { seed: 0, angle: 8, amplitude: 1.6, distance: 0.5, lineCount: 80 },
  },
  {
    title: "Mixage",
    text: "On équilibre, on sculpte et on donne de la profondeur à chaque piste pour que ton morceau sonne clair, puissant et prêt à sortir.",
    tags: ["Équilibrage", "Effets & espace", "Mastering"],
    video: "3qLFE-tx5ec",
    orb: { seed: 1, angle: 28, amplitude: 1.2, distance: 0.38, lineCount: 95 },
  },
  {
    title: "Beatmaking",
    text: "Des instrus originaux dans tous les styles : hip-hop, trap, R&B, afro, pop. Exclusifs ou non, taillés pour ta voix.",
    tags: ["Hip-hop & Trap", "Afro & R&B", "Instrus exclusifs"],
    video: "S6HAWKi81bs",
    orb: { seed: 2, angle: -14, amplitude: 2.1, distance: 0.55, lineCount: 60 },
  },
  {
    title: "Producing",
    text: "De l'idée au morceau fini : arrangement, direction artistique et production complète pour donner une identité à ton projet.",
    tags: ["Arrangement", "Direction artistique", "Projet complet"],
    video: "iAKam37eHYM",
    orb: { seed: 3, angle: 40, amplitude: 1.8, distance: 0.45, lineCount: 75 },
  },
  {
    title: "Ghost production",
    text: "Tu as la vision, on écrit la partition en coulisses. Une production sur mesure, livrée prête à être signée de ton nom.",
    tags: ["Sur mesure", "Discrétion", "Prêt à sortir"],
    video: "HYtqFjUIh8Q",
    orb: { seed: 4, angle: -30, amplitude: 1.4, distance: 0.6, lineCount: 70 },
  },
  {
    title: "Composition",
    text: "Mélodies, harmonies, topline : on compose avec toi un univers musical qui te ressemble, de la première note au dernier accord.",
    tags: ["Mélodies", "Harmonies", "Topline"],
    video: "927oWsK59Zk",
    orb: { seed: 5, angle: 18, amplitude: 2.2, distance: 0.4, lineCount: 85 },
  },
  {
    title: "Voice dubbing",
    text: "Doublage voix pour vidéos, pubs et films : enregistrement, calage et mixage de ta voix directement sur l'image.",
    tags: ["Doublage", "Voix off", "Calage sur l'image"],
    video: "8uT34tiBPR4",
    orb: { seed: 6, angle: 0, amplitude: 1.1, distance: 0.52, lineCount: 100 },
  },
  {
    title: "Movie soundtracks",
    text: "Des musiques originales pour le cinéma, les séries et les contenus vidéo, pensées pour porter l'émotion de chaque scène.",
    tags: ["Musique originale", "Cinéma & séries", "Contenu vidéo"],
    video: "E_59pKMr5Cs",
    orb: { seed: 7, angle: 34, amplitude: 1.9, distance: 0.48, lineCount: 65 },
  },
];

const N = SERVICES.length;
const STEP = 15; // degrees between numbers on the wheel
const SCROLL_PER_ITEM = 70; // svh of scrolling per service
const pad = (n) => String(n).padStart(2, "0");
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

const Expertise = () => {
  const sectionRef = useRef(null);
  const wheelRef = useRef(null);
  const itemRefs = useRef([]);
  const barRef = useRef(null);
  const [active, setActive] = useState(0); // service shown in the text
  const [shown, setShown] = useState(0); // service shown in the orb (lags a bit)
  const [fading, setFading] = useState(false);

  /* Scroll → continuous progress → rotate the wheel */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const state = { target: 0, current: 0, index: 0 };
    let raf = 0;

    const measure = () => {
      const total = section.offsetHeight - window.innerHeight;
      const scrolled = clamp(-section.getBoundingClientRect().top, 0, Math.max(total, 1));
      state.target = (scrolled / Math.max(total, 1)) * (N - 1);
    };

    const paint = () => {
      const p = state.current;
      if (wheelRef.current) wheelRef.current.style.transform = `rotate(${-p * STEP}deg)`;
      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        const d = Math.abs(i - p);
        const scale = 1 - Math.min(d, 1) * 0.4;
        el.style.opacity = String(clamp(1 - d * 0.5, 0.12, 1));
        el.style.transform = `translateY(-50%) scale(${scale.toFixed(3)})`;
      });
      if (barRef.current) barRef.current.style.transform = `scaleX(${(p / (N - 1)).toFixed(4)})`;
      const idx = Math.round(p);
      if (idx !== state.index) {
        state.index = idx;
        setActive(idx);
      }
    };

    const frame = () => {
      raf = 0;
      const diff = state.target - state.current;
      state.current = reduce || Math.abs(diff) < 0.001 ? state.target : state.current + diff * 0.14;
      paint();
      if (state.current !== state.target) raf = requestAnimationFrame(frame);
    };

    const wake = () => {
      measure();
      if (!raf) raf = requestAnimationFrame(frame);
    };

    wake();
    window.addEventListener("scroll", wake, { passive: true });
    window.addEventListener("resize", wake);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", wake);
      window.removeEventListener("resize", wake);
    };
  }, []);

  /* Orb: fade out → swap look → fade in, so the change never "jumps" */
  useEffect(() => {
    if (active === shown) return undefined;
    setFading(true);
    const t = setTimeout(() => {
      setShown(active);
      setFading(false);
    }, 220);
    return () => clearTimeout(t);
  }, [active, shown]);

  const s = SERVICES[active];
  const orb = SERVICES[shown];

  return (
    <section
      id="services"
      ref={sectionRef}
      style={{
        height: `calc(100svh + ${(N - 1) * SCROLL_PER_ITEM}svh)`,
        "--wheel-r": "clamp(320px, 58svh, 660px)",
        "--arc-x": "calc(var(--gutter) + clamp(16px, 3vw, 56px))",
      }}
      className="relative w-full bg-paper"
    >
      <div className="sticky top-0 h-svh overflow-hidden">
        {/* ── Wheel (desktop) ───────────────────────────────────────── */}
        <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden="true">
          <div
            ref={wheelRef}
            className="absolute top-1/2 h-0 w-0 will-change-transform"
            style={{ left: "calc(var(--arc-x) - var(--wheel-r))" }}
          >
            <div
              className="absolute rounded-full border border-line"
              style={{
                left: "calc(-1 * var(--wheel-r))",
                top: "calc(-1 * var(--wheel-r))",
                width: "calc(2 * var(--wheel-r))",
                height: "calc(2 * var(--wheel-r))",
              }}
            />
            {SERVICES.map((_, i) => (
              <div
                key={i}
                className="absolute left-0 top-0"
                style={{
                  transformOrigin: "0 0",
                  transform: `rotate(${i * STEP}deg) translateX(var(--wheel-r))`,
                }}
              >
                <span className="absolute -left-[3px] top-0 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-subtle/60" />
                <span
                  ref={(el) => (itemRefs.current[i] = el)}
                  className="absolute left-7 top-0 origin-left whitespace-nowrap text-[2.2rem] font-medium leading-none tracking-heading text-ink"
                  style={{ transform: "translateY(-50%)", opacity: i === 0 ? 1 : 0.4 }}
                >
                  {pad(i + 1)}
                </span>
              </div>
            ))}
          </div>
          {/* Fixed marker where the active number sits */}
          <span
            className="absolute top-1/2 h-[10px] w-[10px] -translate-y-1/2 rounded-full bg-ink"
            style={{ left: "calc(var(--arc-x) - 5px)" }}
          >
            <span className="absolute -inset-[6px] rounded-full border border-ink/20" />
          </span>
        </div>

        {/* ── Content ───────────────────────────────────────────────── */}
        <div className="container-x relative z-10 flex h-full flex-col items-center justify-center gap-7 pb-10 pt-24 lg:flex-row lg:gap-12 lg:pt-20">
          <div className="hidden shrink-0 lg:block lg:w-[24%]" />

          {/* Orb / image */}
          <div className="order-1 shrink-0 lg:order-2 lg:w-[min(32vw,56svh)]">
            <div
              className="relative mx-auto aspect-square w-[min(54vw,30svh)] overflow-hidden rounded-full transition-all duration-300 ease-out lg:w-full"
              style={{
                opacity: fading ? 0 : 1,
                transform: fading ? "scale(0.94)" : "scale(1)",
                background:
                  "radial-gradient(circle at 30% 24%, #ffffff 0%, #eef2f6 45%, #d9e0e9 100%)",
                boxShadow:
                  "inset 0 0 70px rgba(255,255,255,0.9), 0 40px 80px -36px rgba(35,42,52,0.4)",
              }}
            >
              {s.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={s.image} alt={s.title} className="h-full w-full object-cover" />
              ) : (
                <Threads
                  color="#2f3d52"
                  accentColor="#9db2c9"
                  thickness={0.8}
                  softness={1.2}
                  speed={0.5}
                  parting={0.4}
                  brightness={1.2}
                  fade={0.18}
                  taper={0.6}
                  enableMouseInteraction
                  seed={orb.orb.seed}
                  angle={orb.orb.angle}
                  amplitude={orb.orb.amplitude}
                  distance={orb.orb.distance}
                  lineCount={orb.orb.lineCount}
                />
              )}
            </div>
          </div>

          {/* Text */}
          <div className="order-2 w-full min-w-0 max-w-[560px] lg:order-1 lg:flex-1">
            <div className="mb-5 flex items-center justify-between gap-4 sm:mb-8">
              <span className="label">Notre expertise</span>
              <span className="font-mono text-xs tracking-[0.04em] text-muted lg:hidden">
                {pad(active + 1)} / {pad(N)}
              </span>
            </div>

            <div aria-live="polite">
              <h2 key={`t-${active}`} className="text-[clamp(2.4rem,5.4vw,5rem)] leading-[0.98] tracking-display">
                <BlurText
                  text={s.title}
                  trigger="load"
                  delay={70}
                  stepDuration={0.35}
                  direction="bottom"
                  blur={10}
                  distance={28}
                  color="#0a0a0a"
                />
              </h2>

              <div key={`d-${active}`} className="anim-fade-up" style={{ animationDelay: "120ms" }}>
                <p className="mt-5 max-w-[46ch] text-[15px] leading-relaxed sm:mt-7 sm:text-base">
                  {s.text}
                </p>

                <ul className="mt-6 flex flex-wrap gap-2 sm:mt-8">
                  {s.tags.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-line bg-white px-4 py-2 text-[13px] text-ink sm:text-sm"
                    >
                      {t}
                    </li>
                  ))}
                </ul>

                <a
                  href={`https://www.youtube.com/watch?v=${s.video}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-label="Voir"
                  className="cursor-target mt-7 inline-flex items-center gap-2 text-sm text-ink underline underline-offset-4 sm:mt-9"
                >
                  Voir la démo
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M3 11L11 3M11 3H4.5M11 3V9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Progress line */}
        <div className="absolute inset-x-0 bottom-0 h-[2px] bg-line/60">
          <div ref={barRef} className="h-full origin-left bg-ink" style={{ transform: "scaleX(0)" }} />
        </div>
      </div>
    </section>
  );
};

export default Expertise;
