"use client";
import { useEffect, useRef, useState } from "react";
import BlurText from "@/components/ui/BlurText";

const CHANNEL_URL = "https://youtube.com/@omflow1?si=wgU7SbCpPVx3PXpf";

const pad = (n) => String(n).padStart(2, "0");

/* YouTube poster: HD if it exists, otherwise a smaller true-16:9 image */
const Poster = ({ id, hd = true, className = "" }) => {
  const [src, setSrc] = useState(
    `https://i.ytimg.com/vi/${id}/${hd ? "maxresdefault" : "mqdefault"}.jpg`
  );
  const fallback = () =>
    setSrc((s) => (s.includes("mqdefault") ? s : `https://i.ytimg.com/vi/${id}/mqdefault.jpg`));
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      loading="lazy"
      draggable={false}
      onError={fallback}
      onLoad={(e) => {
        // YouTube answers a missing HD poster with a tiny grey placeholder
        if (e.currentTarget.naturalWidth <= 120) fallback();
      }}
      className={`h-full w-full object-cover ${className}`}
    />
  );
};

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

const Clips = ({ clips = [] }) => {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const listRef = useRef(null);
  const rowRefs = useRef([]);
  const moved = useRef(false); // don't scroll the list on first render

  const total = clips.length;
  const clip = clips[active];

  const go = (next) => {
    if (!total) return;
    moved.current = true;
    setActive((next + total) % total);
  };
  const select = (i) => {
    moved.current = true;
    setActive(i);
    setPlaying(true); // picking a clip from the list = "play it"
  };

  // keep the selected row centred in the list (scrolls the list only, never the page)
  useEffect(() => {
    if (!moved.current) return;
    const list = listRef.current;
    const row = rowRefs.current[active];
    if (!list || !row) return;
    list.scrollTo({
      top: row.offsetTop - list.clientHeight / 2 + row.clientHeight / 2,
      behavior: "smooth",
    });
  }, [active]);

  if (!total) return null;

  const title = clip.title || `Clip ${pad(active + 1)}`;
  const author = clip.author || "Wardd Music";

  return (
    <section id="clips" className="container-x section-y">
      {/* Heading */}
      <div className="mb-12 flex flex-col gap-6 lg:mb-16 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <span className="label">Vidéos</span>
          <h2 className="mt-5 text-[clamp(2.6rem,6vw,5.4rem)] leading-[0.98] tracking-display">
            <BlurText
              text="Nos clips"
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
            Les clips tournés et produits au studio. Choisis une vidéo dans la
            liste pour la lancer.
          </p>
          <a
            href={CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-label="YouTube"
            className="btn-ghost cursor-target"
          >
            Notre chaîne YouTube
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M3 11L11 3M11 3H4.5M11 3V9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,390px)] lg:gap-8">
        {/* ── Player + info ─────────────────────────────────────────── */}
        <div className="min-w-0">
          <div className="media relative aspect-video bg-ink shadow-[0_40px_70px_-40px_rgba(10,10,10,0.55)]">
            {playing ? (
              <iframe
                key={clip.id}
                title={title}
                src={`https://www.youtube-nocookie.com/embed/${clip.id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            ) : (
              <button
                key={`poster-${clip.id}`}
                type="button"
                onClick={() => setPlaying(true)}
                aria-label={`Lire : ${title}`}
                data-cursor-label="Lire"
                className="cursor-target group anim-fade-up absolute inset-0 block h-full w-full overflow-hidden"
              >
                <Poster id={clip.id} className="transition-transform duration-700 ease-out group-hover:scale-[1.03]" />
                <span className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-black/20" />
                <span className="absolute left-5 top-5 rounded-full bg-black/45 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.06em] text-white backdrop-blur-md sm:left-7 sm:top-7">
                  {pad(active + 1)} / {pad(total)}
                </span>
                <span className="absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-ink shadow-[0_20px_50px_-10px_rgba(0,0,0,0.6)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110 sm:h-24 sm:w-24">
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="ml-1">
                    <path d="M7 4.8v14.4a.8.8 0 0 0 1.2.7l11.6-7.2a.8.8 0 0 0 0-1.4L8.2 4.1A.8.8 0 0 0 7 4.8z" />
                  </svg>
                </span>
              </button>
            )}
          </div>

          <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
            <div className="min-w-0">
              <span className="label">
                {active === 0 ? "Dernier clip" : `Clip ${pad(active + 1)}`}
              </span>
              <h3
                key={`title-${clip.id}`}
                className="mt-4 break-words text-[clamp(1.7rem,3.2vw,2.8rem)] leading-[1.02] tracking-display"
              >
                <BlurText
                  text={title}
                  trigger="load"
                  delay={50}
                  stepDuration={0.35}
                  direction="bottom"
                  blur={8}
                  distance={22}
                  color="#0a0a0a"
                />
              </h3>
              <p className="mt-2 text-base">{author}</p>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() => go(active - 1)}
                aria-label="Clip précédent"
                data-cursor-label="Préc."
                className="cursor-target grid h-11 w-11 place-items-center rounded-full bg-surface-2 text-ink transition-colors hover:bg-line"
              >
                <Arrow dir="left" />
              </button>
              <button
                type="button"
                onClick={() => go(active + 1)}
                aria-label="Clip suivant"
                data-cursor-label="Suiv."
                className="cursor-target grid h-11 w-11 place-items-center rounded-full bg-ink text-white transition-transform hover:-translate-y-0.5"
              >
                <Arrow />
              </button>
              <a
                href={`https://www.youtube.com/watch?v=${clip.id}`}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-label="YouTube"
                className="btn-ghost cursor-target !h-11 !px-4 text-[13px]"
              >
                Voir sur YouTube
              </a>
            </div>
          </div>
        </div>

        {/* ── Up next list ──────────────────────────────────────────── */}
        <div className="relative rounded-[24px] bg-surface-2 p-2.5 lg:min-h-[420px]">
          <div
            ref={listRef}
            className="no-scrollbar relative max-h-[440px] overflow-y-auto lg:absolute lg:inset-2.5 lg:max-h-none"
            style={{
              maskImage: "linear-gradient(to bottom, #000 90%, transparent)",
              WebkitMaskImage: "linear-gradient(to bottom, #000 90%, transparent)",
            }}
          >
            <ul className="flex flex-col gap-1.5 pb-8">
              {clips.map((c, i) => {
                const isActive = i === active;
                return (
                  <li key={c.id}>
                    <button
                      ref={(el) => (rowRefs.current[i] = el)}
                      type="button"
                      onClick={() => select(i)}
                      aria-current={isActive ? "true" : undefined}
                      aria-label={`Lire ${c.title || `le clip ${pad(i + 1)}`}`}
                      data-cursor-label="Lire"
                      className={`cursor-target group flex w-full items-center gap-4 rounded-[18px] p-2.5 text-left transition-all duration-300 ${
                        isActive
                          ? "bg-white shadow-[0_10px_26px_-16px_rgba(10,10,10,0.4)]"
                          : "hover:bg-white/60"
                      }`}
                    >
                      <span className="media relative block aspect-video w-[132px] shrink-0 !rounded-[12px] sm:w-[148px]">
                        <Poster id={c.id} hd={false} className="transition-transform duration-500 group-hover:scale-105" />
                        <span className="absolute left-2 top-2 rounded-full bg-black/50 px-2 py-0.5 font-mono text-[9px] text-white backdrop-blur-md">
                          {pad(i + 1)}
                        </span>
                        {isActive && (
                          <span className="absolute bottom-2 right-2 flex h-5 items-end gap-[3px] rounded-full bg-white px-2 py-1" aria-hidden="true">
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
                      <span className="min-w-0">
                        <span className="line-clamp-2 block text-[14px] font-medium leading-snug tracking-[-0.01em] text-ink">
                          {c.title || `Clip ${pad(i + 1)}`}
                        </span>
                        <span className="mt-1 block truncate text-[12.5px] text-muted">
                          {c.author || "Wardd Music"}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Clips;
