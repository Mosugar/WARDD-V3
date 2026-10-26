"use client";
import { useEffect, useRef, useState } from "react";
import BlurText from "@/components/ui/BlurText";

/* ── Edit the story here ──────────────────────────────────────────────── */
const STORY = [
  {
    year: "2016",
    title: "D’abord, notre propre musique",
    text: "Au départ, de jeunes passionnés veulent simplement enregistrer leurs morceaux. Deux beatmakers, deux ingénieurs du son et deux artistes qui pilotent l’activité réunissent leurs forces : Wardd Studio prend vie.",
  },
  {
    year: "2017",
    title: "Notre studio devient le vôtre",
    text: "Ce qui servait à créer notre musique s’ouvre aux autres. Wardd se structure en studio professionnel pour accueillir les premières prises comme les projets d’artistes confirmés.",
  },
  {
    year: "2018",
    title: "L’équipe grandit, le son s’ouvre",
    text: "De nouveaux talents rejoignent l’équipe et de nouveaux styles entrent en cabine. La musique reste notre moteur, tandis que l’enregistrement s’étend aux voix et aux projets des entreprises.",
  },
  {
    year: "2019",
    title: "Donner sa chance au premier morceau",
    text: "Avec les packs jeunes, nous rendons l’enregistrement plus accessible à la relève marocaine. Rencontres et performances live prolongent les sessions : le studio devient aussi un lieu pour se découvrir et se faire entendre.",
  },
  {
    year: "2022",
    title: "Une nouvelle adresse, la même âme",
    text: "Après la pause sanitaire, Wardd reprend dans une nouvelle ville. Une équipe élargie, un studio plus professionnel et la même conviction : bien accompagner un artiste commence par comprendre son univers.",
  },
  {
    year: "2023",
    title: "Plus de 350 artistes, autant d’univers",
    text: "Depuis 2016, plus de 350 artistes ont croisé notre parcours. Chaque voix, chaque session et chaque collaboration affinent notre savoir-faire et notre écoute de la scène marocaine.",
  },
  {
    year: "2024",
    title: "Votre vision guide les sessions",
    text: "Enregistrement, mixage et accompagnement artistique s’adaptent à chaque parcours. Artistes indépendants ou déjà signés trouvent chez Wardd un espace et une équipe au service de leur musique.",
  },
  {
    year: "2025",
    title: "Du studio au hub créatif",
    text: "Nous repensons notre identité autour d’une vision plus large : réunir le son, la photo et la vidéo, tout en favorisant les rencontres entre artistes. Un accompagnement professionnel accessible à la prestation, sans obligation de signer chez nous.",
  },
  {
    year: "2026",
    title: "Créer ici. Résonner partout.",
    text: "Notre nouveau studio donne corps à ce hub créatif, avec une exigence sonore internationale. Vous réservez le lieu et les prestations adaptées à votre projet. Nous apportons les moyens et l’expérience, sans revendiquer vos masters : votre avenir reste entre vos mains.",
  },
];

/* ── Key numbers (value is animated from 0 when it appears) ─────────────── */
const STATS = [
  { value: 2016, label: "Année de création", plain: true },
  { value: 500, suffix: "+", label: "Titres produits" },
  { value: 350, suffix: "+", label: "Artistes accompagnés" },
  { text: "3 en 1", label: "Son · Photo · Vidéo" },
];

const CountUp = ({ value, suffix = "", plain = false, start }) => {
  const [n, setN] = useState(plain ? value : 0);
  useEffect(() => {
    if (!start || plain) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(value);
      return undefined;
    }
    let raf = 0;
    const t0 = performance.now();
    const dur = 1400;
    const tick = (now) => {
      const p = Math.min((now - t0) / dur, 1);
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, value, plain]);
  return (
    <>
      {n}
      {suffix}
    </>
  );
};

const About = () => {
  const [active, setActive] = useState(0);
  const [statsOn, setStatsOn] = useState(false);
  const itemsRef = useRef([]);
  const statsRef = useRef(null);
  const lineWrapRef = useRef(null);
  const lineRef = useRef(null);

  // Highlight the chapter crossing the middle of the screen
  useEffect(() => {
    const items = itemsRef.current.filter(Boolean);
    if (!items.length || typeof IntersectionObserver === "undefined") return undefined;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(Number(e.target.dataset.index))),
      { rootMargin: "-45% 0px -45% 0px" }
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Start the counters when the numbers come into view
  useEffect(() => {
    const el = statsRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return setStatsOn(true);
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setStatsOn(true), io.disconnect()), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // The timeline line fills as you scroll through it
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const wrap = lineWrapRef.current;
      const line = lineRef.current;
      if (!wrap || !line) return;
      const r = wrap.getBoundingClientRect();
      const mid = window.innerHeight * 0.5;
      const p = Math.min(Math.max((mid - r.top) / r.height, 0), 1);
      line.style.transform = `scaleY(${p})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section id="about" className="container-x section-y">
      {/* Intro */}
      <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div>
          <span className="label">Notre histoire</span>
          <h2 className="mt-5 whitespace-nowrap text-[clamp(2.2rem,4vw,4rem)] font-bold leading-[0.98] tracking-[-0.04em]">
            <BlurText
              text="Qui sommes-nous ?"
              delay={90}
              stepDuration={0.35}
              direction="bottom"
              blur={10}
              distance={28}
              color="#0a0a0a"
            />
          </h2>
        </div>
        <p className="text-[clamp(1.35rem,2.4vw,2.1rem)] font-medium leading-[1.25] tracking-[-0.02em] !text-subtle">
          <span className="text-ink">Wardd Studio est un hub créatif</span> dédié à l’enregistrement et à la
          production musicale, où se rencontrent <span className="text-ink">amateurs passionnés et artistes
          professionnels</span>. Né d’une envie d’artistes de créer ensemble, le studio a accompagné des univers
          variés avec <span className="text-ink">une même exigence sonore</span>.
        </p>
      </div>

      {/* Numbers */}
      <div ref={statsRef} className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-media border border-line bg-line lg:mt-20 lg:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label} className="flex flex-col justify-between gap-10 bg-paper p-6 sm:p-8">
            <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-subtle">{s.label}</span>
            <span className="text-[clamp(2.6rem,5vw,4.6rem)] font-bold leading-none tracking-[-0.05em] text-ink">
              {s.text ?? <CountUp value={s.value} suffix={s.suffix} plain={s.plain} start={statsOn} />}
            </span>
          </div>
        ))}
      </div>

      {/* Timeline */}
      <div className="mt-20 lg:mt-28">
        <div className="mb-10 flex items-end justify-between gap-6 lg:mb-14">
          <h3 className="text-[clamp(1.6rem,2.6vw,2.4rem)] font-bold leading-tight tracking-[-0.03em] text-ink">
            De 2016 à aujourd’hui
          </h3>
          <span className="font-mono text-xs text-muted">
            <span className="text-ink">{STORY[active].year}</span> / {STORY[STORY.length - 1].year}
          </span>
        </div>

        <div ref={lineWrapRef} className="relative">
          {/* Line: grey track + ink fill that follows the scroll */}
          <div className="absolute bottom-0 left-[7px] top-0 w-px bg-line md:left-1/2 md:-translate-x-1/2" aria-hidden="true">
            <div ref={lineRef} className="h-full w-full origin-top bg-ink" style={{ transform: "scaleY(0)" }} />
          </div>

          <ol className="space-y-12 md:space-y-4">
            {STORY.map((item, i) => {
              const on = i <= active;
              const right = i % 2 === 1;
              return (
                <li
                  key={item.year}
                  ref={(el) => (itemsRef.current[i] = el)}
                  data-index={i}
                  className="relative grid pl-10 md:grid-cols-2 md:gap-16 md:pl-0"
                >
                  {/* Dot */}
                  <span
                    className={`absolute left-0 top-2 h-[15px] w-[15px] rounded-full border-2 transition-colors duration-500 md:left-1/2 md:-translate-x-1/2 ${
                      on ? "border-ink bg-ink" : "border-line bg-paper"
                    }`}
                    aria-hidden="true"
                  />
                  <div
                    className={`transition-all duration-700 ease-out md:py-6 ${right ? "md:col-start-2" : "md:col-start-1 md:text-right"} ${
                      on ? "translate-y-0 opacity-100" : "translate-y-3 opacity-40"
                    }`}
                  >
                    <div className="text-[clamp(2.6rem,5vw,4.4rem)] font-bold leading-none tracking-[-0.05em] text-ink">{item.year}</div>
                    <h4 className="mt-3 text-[clamp(1.15rem,1.6vw,1.45rem)] font-semibold leading-snug tracking-[-0.02em] text-ink">{item.title}</h4>
                    <p className={`mt-3 max-w-[48ch] text-[15px] leading-relaxed ${right ? "" : "md:ml-auto"}`}>{item.text}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default About;
