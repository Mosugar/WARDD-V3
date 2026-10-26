"use client";
import Image from "next/image";

/* ── Edit photos and link here ───────────────────────────────────────── */
const INSTAGRAM_URL = "https://www.instagram.com/warddmusic_/";
const PHOTOS = [
  "/studiolife/1.jpg", "/studiolife/2.jpg", "/studiolife/3.JPG", "/studiolife/4.JPG",
  "/studiolife/5.JPG", "/studiolife/6.JPG", "/studiolife/7.JPG", "/studiolife/8.JPG",
  "/studiolife/9.jpg", "/studiolife/10.JPG", "/studiolife/11.JPG", "/studiolife/12.JPG",
  "/studiolife/13.jpg", "/studiolife/14.jpg", "/studiolife/15.jpg", "/studiolife/16.JPG",
  "/studiolife/17.JPG", "/studiolife/18.JPG", "/studiolife/19.JPG", "/studiolife/20.jpg",
];

const COLS = 4;
const columns = Array.from({ length: COLS }, (_, c) => PHOTOS.filter((_, i) => i % COLS === c));

// Each column drifts at its own pace; odd columns move the other way.
const SPEEDS = [52, 64, 48, 60];

const StudioLife = () => {
  return (
    <section id="studio-life" className="container-wide section-y">
      <div className="relative overflow-hidden rounded-[28px] bg-[#0a0a0b] sm:rounded-[36px]">
        {/* Photo wall */}
        <div className="relative h-[460px] overflow-hidden sm:h-[540px] lg:h-[min(640px,82svh)]">
          <div className="grid h-full grid-cols-2 gap-3 px-3 sm:gap-4 sm:px-4 md:grid-cols-4">
            {columns.map((col, c) => (
              <div key={c} className={`relative h-full overflow-hidden ${c > 1 ? "hidden md:block" : ""}`}>
                <div
                  className="studio-col flex flex-col"
                  style={{
                    animationDuration: `${SPEEDS[c]}s`,
                    animationDirection: c % 2 ? "reverse" : "normal",
                  }}
                >
                  {[...col, ...col].map((src, i) => (
                    <div key={`${src}-${i}`} className="shrink-0 pb-3 sm:pb-4">
                    <div className="group relative aspect-[4/5] w-full overflow-hidden rounded-[18px] bg-[#1a1a1d]">
                      <Image
                        src={src}
                        alt="Session au studio Wardd"
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        aria-hidden={i >= col.length ? "true" : undefined}
                      />
                    </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Fades into the card at top and bottom */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#0a0a0b] to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-[#0a0a0b] from-[18%] via-[#0a0a0b]/75 to-transparent" />

        {/* Caption, sitting on the dark fade (no separator line) */}
        <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col gap-5 px-6 pb-7 sm:flex-row sm:items-end sm:justify-between sm:px-10 sm:pb-9 lg:px-14 lg:pb-11">
            <h2 className="text-[clamp(2rem,3.6vw,3.4rem)] font-bold leading-none tracking-[-0.04em] text-white">
              Studio Life
            </h2>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-label="Instagram"
            className="cursor-target group inline-flex w-fit items-center gap-5 rounded-full bg-white py-2 pl-7 pr-2 text-[15px] font-medium text-ink transition-colors hover:bg-[#e9ecef]"
          >
            Voir sur Instagram
            <span className="flex h-11 w-14 items-center justify-center rounded-full bg-ink text-white transition-transform duration-300 group-hover:translate-x-1">
              <svg width="22" height="12" viewBox="0 0 22 12" fill="none" aria-hidden="true">
                <path d="M1 6h19m0 0l-5-5m5 5l-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </a>
        </div>
        </div>
      </div>

      <style jsx>{`
        .studio-col {
          animation-name: studioScroll;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          will-change: transform;
        }
        .studio-col:hover {
          animation-play-state: paused;
        }
        @keyframes studioScroll {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(-50%);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .studio-col {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
};

export default StudioLife;
