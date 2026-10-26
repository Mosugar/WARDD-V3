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

const pad = (n) => String(n).padStart(2, "0");

const About = () => {
  const [active, setActive] = useState(0);
  const itemsRef = useRef([]);

  // Highlight the chapter crossing the middle of the screen
  useEffect(() => {
    const items = itemsRef.current.filter(Boolean);
    if (!items.length || typeof IntersectionObserver === "undefined") return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number(e.target.dataset.index));
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const current = STORY[active];
  const progress = ((active + 1) / STORY.length) * 100;

  return (
    <section id="about" className="container-x section-y">
      {/* Heading */}
      <div className="mb-14 flex flex-col gap-6 lg:mb-20 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <span className="label">Notre histoire</span>
          <h2 className="mt-5 text-[clamp(2.6rem,6vw,5.4rem)] leading-[0.98] tracking-display">
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
        <p className="max-w-[52ch] text-[15px] leading-relaxed sm:text-base lg:text-right">
          Wardd Studio est un hub créatif dédié à l’enregistrement et à la
          production musicale, où se rencontrent amateurs passionnés et artistes
          professionnels. Né d’une envie d’artistes de créer ensemble, le studio a
          accompagné des univers variés avec une même exigence sonore : plus de
          500 titres produits depuis 2016.
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        {/* Sticky year panel (desktop) */}
        <div className="hidden lg:block">
          <div className="sticky top-28 flex h-[calc(100svh-9rem)] max-h-[640px] flex-col justify-between rounded-media bg-surface p-10">
            <div className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.08em] text-muted">
              <span>Chapitre {pad(active + 1)}</span>
              <span>
                {pad(active + 1)} / {pad(STORY.length)}
              </span>
            </div>

            <div>
              <div
                key={current.year}
                className="about-year text-[clamp(6rem,11vw,11rem)] font-semibold leading-[0.85] tracking-display text-ink"
              >
                {current.year}
              </div>
              <p className="mt-6 max-w-[22ch] text-xl leading-snug tracking-heading text-ink">
                {current.title}
              </p>
            </div>

            <div>
              <div className="h-[2px] w-full overflow-hidden rounded-full bg-line">
                <div
                  className="h-full rounded-full bg-ink transition-[width] duration-700 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="mt-3 flex justify-between font-mono text-[11px] text-subtle">
                <span>{STORY[0].year}</span>
                <span>{STORY[STORY.length - 1].year}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <ol className="relative">
          {STORY.map((item, i) => {
            const isActive = i === active;
            return (
              <li
                key={item.year}
                ref={(el) => (itemsRef.current[i] = el)}
                data-index={i}
                className={`grid gap-3 border-t border-line py-9 transition-opacity duration-500 sm:grid-cols-[96px_minmax(0,1fr)] sm:gap-8 lg:py-12 ${
                  isActive ? "opacity-100" : "lg:opacity-35"
                }`}
              >
                <span className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.08em] text-muted sm:items-start sm:pt-2">
                  <span
                    className={`h-2 w-2 shrink-0 rounded-full transition-colors duration-500 ${
                      isActive ? "bg-ink" : "bg-line"
                    }`}
                  />
                  {item.year}
                </span>
                <div>
                  <h3 className="text-[clamp(1.5rem,2.4vw,2.1rem)] leading-tight tracking-heading text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-4 max-w-[58ch] text-[15px] leading-relaxed sm:text-base">
                    {item.text}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      <style jsx>{`
        .about-year {
          animation: yearIn 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }
        @keyframes yearIn {
          from {
            opacity: 0;
            transform: translateY(18px);
            filter: blur(8px);
          }
          to {
            opacity: 1;
            transform: none;
            filter: none;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .about-year {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
};

export default About;
