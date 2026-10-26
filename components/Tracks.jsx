"use client";
import { useEffect, useRef, useState } from "react";
import BlurText from "@/components/ui/BlurText";

const PLAYLIST_URL =
  "https://open.spotify.com/playlist/2GznjCPT7BhHuci5z2gLMt?si=039fac172df0428d";

const pad = (n) => String(n).padStart(2, "0");

/* Cover with a tasteful placeholder if Spotify data isn't available */
const Cover = ({ track, className = "" }) =>
  track.cover ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={track.cover}
      alt={track.title ? `Pochette — ${track.title}` : "Pochette"}
      loading="lazy"
      draggable={false}
      className={`h-full w-full object-cover ${className}`}
    />
  ) : (
    <div
      className={`grid h-full w-full place-items-center bg-[radial-gradient(circle_at_30%_25%,#ffffff,#d9e0e9)] ${className}`}
    >
      <svg width="46%" viewBox="0 0 100 100" fill="none" aria-hidden="true" className="text-ink/70">
        <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="2" />
        <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="1" opacity=".5" />
        <circle cx="50" cy="50" r="12" stroke="currentColor" strokeWidth="2" />
        <circle cx="50" cy="50" r="2.5" fill="currentColor" />
      </svg>
    </div>
  );

const Arrow = ({ dir = "right" }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    style={{ transform: dir === "left" ? "scaleX(-1)" : undefined }}
  >
    <path d="M5 12h14m0 0l-6-6m6 6l-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Tracks = ({ tracks = [] }) => {
  const [active, setActive] = useState(0);
  const tileRefs = useRef([]);
  const moved = useRef(false); // don't scroll the rail on first render

  const total = tracks.length;
  const current = tracks[active];

  const go = (next) => {
    if (!total) return;
    moved.current = true;
    setActive((next + total) % total);
  };

  // keep the selected tile visible in the rail (only horizontally)
  useEffect(() => {
    if (!moved.current) return;
    tileRefs.current[active]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [active]);

  if (!total) return null;

  const title = current.title || `Sortie ${pad(active + 1)}`;
  const artist = current.artist || "Wardd Music";
  const tint = current.color
    ? `color-mix(in srgb, ${current.color} 16%, #f4f5f7)`
    : "#eaeef1";

  return (
    <section id="tracks" className="container-x section-y">
      {/* Heading */}
      <div className="mb-12 flex flex-col gap-6 lg:mb-16 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <span className="label">Nos sorties</span>
          <h2 className="mt-5 text-[clamp(2.6rem,6vw,5.4rem)] leading-[0.98] tracking-display">
            <BlurText
              text="Nos dernières sorties"
              delay={90}
              stepDuration={0.35}
              direction="bottom"
              blur={10}
              distance={28}
              color="#0a0a0a"
            />
          </h2>
        </div>
        <div className="flex flex-col gap-5 lg:items-end lg:text-right">
          <p className="max-w-[36ch] text-[15px] leading-relaxed sm:text-base">
            Écoute les derniers titres sortis du studio. Choisis une pochette
            pour lancer le morceau.
          </p>
          <a
            href={PLAYLIST_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-label="Spotify"
            className="btn-ghost cursor-target"
          >
            Tout écouter sur Spotify
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M3 11L11 3M11 3H4.5M11 3V9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>

      {/* Featured player */}
      <div
        className="media grid gap-6 p-4 transition-[background] duration-700 sm:p-6 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:gap-12 lg:p-8"
        style={{ background: tint }}
      >
        <div
          key={`cover-${current.id}`}
          className="anim-fade-up relative mx-auto aspect-square w-full max-w-[380px] overflow-hidden rounded-[20px] shadow-[0_34px_60px_-26px_rgba(10,10,10,0.5)] lg:mx-0"
        >
          <Cover track={current} />
        </div>

        <div className="flex min-w-0 flex-col justify-between gap-8">
          <div>
            <div className="flex items-center justify-between gap-4">
              <span className="label">
                {active === 0 ? "Dernière sortie" : `Sortie ${pad(active + 1)}`}
                {" · "}
                {pad(active + 1)}/{pad(total)}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => go(active - 1)}
                  aria-label="Titre précédent"
                  data-cursor-label="Préc."
                  className="cursor-target grid h-11 w-11 place-items-center rounded-full border border-line bg-white/70 text-ink transition-colors hover:bg-white"
                >
                  <Arrow dir="left" />
                </button>
                <button
                  type="button"
                  onClick={() => go(active + 1)}
                  aria-label="Titre suivant"
                  data-cursor-label="Suiv."
                  className="cursor-target grid h-11 w-11 place-items-center rounded-full bg-ink text-white transition-transform hover:-translate-y-0.5"
                >
                  <Arrow />
                </button>
              </div>
            </div>

            <h3
              key={`title-${current.id}`}
              className="mt-7 break-words text-[clamp(2.2rem,5vw,4.4rem)] leading-[0.98] tracking-display"
            >
              <BlurText
                text={title}
                trigger="load"
                delay={70}
                stepDuration={0.35}
                direction="bottom"
                blur={10}
                distance={26}
                color="#0a0a0a"
              />
            </h3>
            <p className="mt-3 text-base sm:text-lg">{artist}</p>
          </div>

          <div>
            {/* One compact Spotify player instead of 20 iframes */}
            <iframe
              key={`player-${current.id}`}
              title={`Lecteur Spotify — ${title}`}
              src={`https://open.spotify.com/embed/track/${current.id}?utm_source=generator&theme=0`}
              width="100%"
              height="152"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="block rounded-[14px]"
            />
          </div>
        </div>
      </div>

      {/* Cover rail */}
      <div
        className="no-scrollbar -mx-1 mt-3 flex snap-x gap-4 overflow-x-auto px-1 pb-5 pr-10 pt-3 sm:gap-5"
        style={{
          maskImage: "linear-gradient(to right, #000 92%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, #000 92%, transparent)",
        }}
        role="list"
        aria-label="Toutes les sorties"
      >
        {tracks.map((t, i) => {
          const isActive = i === active;
          return (
            <button
              key={t.id}
              ref={(el) => (tileRefs.current[i] = el)}
              type="button"
              role="listitem"
              onClick={() => go(i)}
              aria-pressed={isActive}
              aria-label={`Écouter ${t.title || `la sortie ${pad(i + 1)}`}`}
              data-cursor-label="Écouter"
              className="cursor-target group w-[150px] shrink-0 snap-start text-left sm:w-[176px]"
            >
              <span
                className={`media relative block aspect-square transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isActive
                    ? "-translate-y-1 shadow-[0_0_0_2px_#0a0a0a,0_22px_36px_-20px_rgba(10,10,10,0.55)]"
                    : "group-hover:-translate-y-1"
                } !rounded-[18px]`}
              >
                <Cover track={t} className="transition-transform duration-700 group-hover:scale-105" />
                <span className="absolute left-2.5 top-2.5 rounded-full bg-black/45 px-2.5 py-0.5 font-mono text-[10px] text-white backdrop-blur-md">
                  {pad(i + 1)}
                </span>
                {/* tiny equalizer on the active tile */}
                {isActive && (
                  <span className="absolute bottom-2.5 right-2.5 flex h-5 items-end gap-[3px] rounded-full bg-white px-2 py-1" aria-hidden="true">
                    {[0, 1, 2].map((b) => (
                      <i
                        key={b}
                        className="eq-bar block w-[3px] rounded-full bg-ink"
                        style={{ animationDelay: `${b * 140}ms` }}
                      />
                    ))}
                  </span>
                )}
              </span>
              <span className="mt-3 block truncate text-[14px] font-medium leading-tight tracking-[-0.01em] text-ink">
                {t.title || `Sortie ${pad(i + 1)}`}
              </span>
              <span className="mt-0.5 block truncate text-[12.5px] text-muted">
                {t.artist || "Wardd Music"}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default Tracks;
