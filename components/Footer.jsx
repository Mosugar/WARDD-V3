"use client";
import { useEffect, useRef } from "react";
import { useLang } from "@/lib/i18n";

const Footer = () => {
  const { tr } = useLang();
  const year = new Date().getFullYear();
  const boxRef = useRef(null);
  const textRef = useRef(null);

  // Make the wordmark fill the container exactly, whatever font is loaded
  useEffect(() => {
    const box = boxRef.current;
    const text = textRef.current;
    if (!box || !text) return undefined;
    const fit = () => {
      text.style.fontSize = "100px";
      const w = text.offsetWidth; // inline-block => the text's own width
      if (w > 0) text.style.fontSize = `${(box.clientWidth / w) * 100}px`;
    };
    fit();
    document.fonts?.ready?.then(fit);
    const ro = new ResizeObserver(fit);
    ro.observe(box);
    return () => ro.disconnect();
  }, []);

  return (
    <footer className="container-wide pb-28 pt-14 sm:pt-20 lg:pt-28">
      {/* Giant faded wordmark — sized to the container, so it always fits */}
      <div ref={boxRef} className="text-center" aria-hidden="true">
        <div
          ref={textRef}
          dir="ltr"
            className="latin inline-block select-none whitespace-nowrap text-[13vw] font-semibold leading-[0.82] tracking-[-0.065em]"
          style={{
            background:
              "linear-gradient(90deg, #aab1ba 0%, #cfd4da 40%, #eceef1 78%, #f4f5f7 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            WebkitTextFillColor: "transparent",
            paddingBottom: "0.06em",
            paddingRight: "0.08em", // the tight tracking would otherwise clip the last letter
            paddingLeft: "0.01em",
          }}
        >
          wardd studio
        </div>
      </div>

      {/* Bottom line */}
      <div className="mt-8 flex flex-col gap-4 border-t border-line pt-6 text-[13px] text-muted sm:flex-row sm:items-center sm:justify-between sm:text-sm">
        <p className="!leading-relaxed">
          © {year} Wardd Studio. {tr("Tous droits réservés.", "جميع الحقوق محفوظة.")}
          <span className="mx-2 opacity-40">|</span>
          {tr("Développé par", "تطوير")}{" "}
          <a
            href="https://doodle.ma/"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-label="Doodle"
            className="cursor-target text-ink underline underline-offset-4"
          >
            Doodle
          </a>
        </p>

        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          data-cursor-label={tr("Haut", "للأعلى")}
          className="cursor-target inline-flex w-fit items-center gap-2 font-mono text-[11px] uppercase tracking-[0.06em] text-ink sm:text-xs"
        >
          {tr("Haut de page", "العودة للأعلى")}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 20V5m0 0l-6 6m6-6l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </footer>
  );
};

export default Footer;
