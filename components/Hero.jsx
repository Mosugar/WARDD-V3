"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import BlurText from "@/components/ui/BlurText";
import Magnet from "@/components/ui/Magnet";

// WebGL canvas: client-only, so it never blocks server rendering.
const Threads = dynamic(() => import("@/components/ui/Threads"), {
  ssr: false,
});

// Live local time (Kénitra). Rendered after mount to avoid hydration mismatch.
const LiveClock = () => {
  const [time, setTime] = useState("--:--");
  useEffect(() => {
    const tick = () =>
      setTime(
        new Intl.DateTimeFormat("fr-FR", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Africa/Casablanca",
        }).format(new Date())
      );
    tick();
    const id = setInterval(tick, 15000);
    return () => clearInterval(id);
  }, []);
  return (
    <span>
      Kénitra <span className="mx-1 opacity-40">/</span> {time}
    </span>
  );
};

const Hero = () => {
  return (
    <section id="hero" className="container-x relative pb-3 pt-3 sm:pb-4 sm:pt-4">
      <div
        className="media relative flex h-[calc(100svh-24px)] min-h-[620px] flex-col items-center justify-center text-center sm:h-[calc(100svh-32px)]"
        style={{
          // Static fallback: shows if WebGL2 is unavailable or while loading
          background:
            "linear-gradient(180deg, #f6f8fa 0%, #e9eef3 55%, #dde4ec 100%)",
        }}
      >
        {/* Threads shader */}
        <div className="absolute inset-0">
          <Threads
            color="#2f3d52"
            accentColor="#9db2c9"
            amplitude={1.6}
            distance={0.5}
            lineCount={80}
            thickness={0.7}
            softness={1.3}
            speed={0.55}
            angle={10}
            parting={0.55}
            brightness={1.2}
            fade={0.1}
            enableMouseInteraction
          />
        </div>

        {/* Soft glow behind the text so it stays readable over the lines */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 55% 42% at 50% 50%, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.55) 45%, rgba(255,255,255,0) 100%)",
          }}
        />

        {/* Centered content */}
        <div className="relative z-10 flex flex-col items-center gap-7 px-5">
          <h1 className="max-w-[11em] text-[clamp(3rem,8.4vw,7.6rem)] leading-[0.96] tracking-display text-ink">
            <BlurText
              text="Là où ta voix prend vie."
              trigger="load"
              delay={110}
              stepDuration={0.35}
              direction="bottom"
              blur={12}
              distance={36}
              color="#0a0a0a"
              className="justify-center text-center"
            />
          </h1>

          <p className="max-w-[38ch] text-[15px] leading-relaxed sm:text-base">
            Enregistrement, mixage, mastering et production. Un studio créé par
            des artistes, pour ceux qui veulent faire sonner leur musique.
          </p>

          <Magnet padding={80} magnetStrength={3}>
            <a
              href="#tracks"
              data-cursor-label="Écouter"
              className="cursor-target btn-pill"
            >
              Écouter nos sorties
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M7 2.5v9m0 0l-3.5-3.5M7 11.5L10.5 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </Magnet>
        </div>

        {/* Corner meta, like the reference */}
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 font-mono text-[11px] uppercase tracking-[0.04em] text-ink sm:p-8 sm:text-xs">
          <LiveClock />
          <a
            href="mailto:contact@warddstudio.com"
            className="cursor-target hidden sm:block"
          >
            contact@warddstudio.com
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;