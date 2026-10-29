"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import BlurText from "@/components/ui/BlurText";
import { useLang } from "@/lib/i18n";

/* ── Edit artists here ───────────────────────────────────────────────────
   src:  photo in /public/art
   name: the artist's name (leave "" to show the photo only)
   ────────────────────────────────────────────────────────────────────── */
const ARTISTS = [
  { src: "/art/1.JPG", name: "" },
  { src: "/art/2.JPG", name: "" },
  { src: "/art/3.JPG", name: "" },
  { src: "/art/4.JPG", name: "" },
  { src: "/art/5.JPG", name: "" },
  { src: "/art/6.JPG", name: "" },
  { src: "/art/7.jpg", name: "" },
  { src: "/art/8.jpg", name: "" },
  { src: "/art/9.jpg", name: "" },
  { src: "/art/10.jpg", name: "" },
  { src: "/art/11.jpg", name: "" },
  { src: "/art/12.jpg", name: "" },
  { src: "/art/13.jpg", name: "" },
  { src: "/art/14.jpg", name: "" },
  { src: "/art/15.jpg", name: "" },
  { src: "/art/16.jpg", name: "" },
  { src: "/art/17.jpg", name: "" },
  { src: "/art/18.jpg", name: "" },
  { src: "/art/19.jpg", name: "" },
];

const pad = (n) => String(n).padStart(2, "0");

const ArrowBtn = ({ dir, onClick, disabled, tr }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    aria-label={dir === "prev" ? tr("Artistes précédents", "الفنانون السابقون") : tr("Artistes suivants", "الفنانون التاليون")}
    data-cursor-label={dir === "prev" ? tr("Précédent", "السابق") : tr("Suivant", "التالي")}
    className="cursor-target flex h-12 w-12 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white disabled:pointer-events-none disabled:opacity-30"
  >
    <svg width="18" height="12" viewBox="0 0 22 12" fill="none" aria-hidden="true" className={dir === "prev" ? "rotate-180" : ""}>
      <path d="M1 6h19m0 0l-5-5m5 5l-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </button>
);

const Artists = () => {
  const { tr, isAr } = useLang();
  const railRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  // Track scroll position for the progress bar and arrow states
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return undefined;
    const update = () => {
      const max = rail.scrollWidth - rail.clientWidth;
      const p = max > 0 ? rail.scrollLeft / max : 0;
      setProgress(p);
      setAtStart(rail.scrollLeft < 4);
      setAtEnd(rail.scrollLeft > max - 4);
    };
    update();
    rail.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      rail.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  // Drag to scroll with the mouse (touch already scrolls natively)
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return undefined;
    let down = false, startX = 0, startLeft = 0, moved = false;
    const onDown = (e) => {
      if (e.pointerType !== "mouse") return;
      down = true; moved = false;
      startX = e.clientX; startLeft = rail.scrollLeft;
      rail.style.scrollSnapType = "none";
    };
    const onMove = (e) => {
      if (!down) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 4) moved = true;
      rail.scrollLeft = startLeft - dx;
    };
    const onUp = () => {
      if (!down) return;
      down = false;
      rail.style.scrollSnapType = "";
    };
    const onClick = (e) => { if (moved) e.preventDefault(); };
    rail.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    rail.addEventListener("click", onClick, true);
    return () => {
      rail.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      rail.removeEventListener("click", onClick, true);
    };
  }, []);

  const scrollByCards = (dir) => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.querySelector("li");
    const step = card ? card.getBoundingClientRect().width + 16 : 300;
    rail.scrollBy({ left: dir * step * 2, behavior: "smooth" });
  };

  return (
    <section id="artists" className="section-y overflow-hidden">
      {/* Heading */}
      <div className="container-x mb-12 flex flex-col gap-6 lg:mb-16 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <span className="label">{tr("Artistes", "الفنانون")}</span>
          <h2 className="mt-5 text-[clamp(2.6rem,6vw,5.4rem)] leading-[0.98] tracking-display">
            <BlurText
              key={isAr ? "ar" : "fr"}
              text={tr("Ils sont passés en cabine", "مرّوا من كابينتنا")}
              delay={90}
              stepDuration={0.35}
              direction="bottom"
              blur={10}
              distance={28}
              color="#0a0a0a"
            />
          </h2>
        </div>
        <div className="flex flex-col gap-6 lg:items-end">
          <p className="max-w-[36ch] text-[15px] leading-relaxed sm:text-base lg:text-end">
            {tr(
              "Plus de 350 artistes, autant d’univers. Ceux qui portent l’art aux gens, les yeux et les oreilles grands ouverts.",
              "أكثر من 350 فناناً، وعوالم بقدر عددهم. هم من يحملون الفن إلى الناس، بعيون وآذان مفتوحة."
            )}
          </p>
          <div className="flex gap-3">
            <ArrowBtn tr={tr} dir="prev" onClick={() => scrollByCards(-1)} disabled={atStart} />
            <ArrowBtn tr={tr} dir="next" onClick={() => scrollByCards(1)} disabled={atEnd} />
          </div>
        </div>
      </div>

      {/* Rail */}
      <ul
        ref={railRef}
        dir="ltr" // scroll math and arrows assume left-to-right
        className="artists-rail flex cursor-grab snap-x snap-mandatory gap-4 overflow-x-auto pb-2 active:cursor-grabbing"
      >
        {ARTISTS.map((a, i) => (
          <li
            key={a.src}
            className="group relative w-[68vw] shrink-0 snap-start sm:w-[40vw] md:w-[30vw] lg:w-[22vw] xl:w-[19vw]"
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded-media bg-surface-2">
              <Image
                src={a.src}
                alt={a.name || `${tr("Artiste Wardd", "فنان Wardd")} ${i + 1}`}
                fill
                draggable={false}
                sizes="(max-width: 640px) 68vw, (max-width: 1024px) 30vw, 20vw"
                className="select-none object-cover grayscale transition-[filter,transform] duration-700 ease-out group-hover:scale-[1.04] group-hover:grayscale-0"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/55 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <span className="absolute left-4 top-4 rounded-full bg-white/85 px-2.5 py-1 font-mono text-[11px] text-ink backdrop-blur">
                {pad(i + 1)}
              </span>
              {a.name && (
                <span className="absolute bottom-4 left-4 text-lg font-medium tracking-heading text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  {a.name}
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>

      {/* Progress */}
      <div className="container-x mt-8 flex items-center gap-5">
        <span className="font-mono text-xs text-muted">{pad(1)}</span>
        <div className="h-[2px] flex-1 overflow-hidden rounded-full bg-line">
          <div
            className="h-full rounded-full bg-ink transition-[width] duration-300 ease-out"
            style={{ width: `${Math.max(6, progress * 100)}%` }}
          />
        </div>
        <span className="font-mono text-xs text-muted">{pad(ARTISTS.length)}</span>
      </div>

      <style jsx>{`
        .artists-rail {
          scrollbar-width: none;
          /* line the first card up with the page content, even on wide screens */
          --rail-pad: max(var(--gutter), calc((100vw - var(--max-w)) / 2 + var(--gutter)));
          padding-inline: var(--rail-pad);
          scroll-padding-inline: var(--rail-pad);
        }
        .artists-rail::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default Artists;
