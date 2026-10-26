"use client";
import dynamic from "next/dynamic";
import BlurText from "@/components/ui/BlurText";

// WebGL canvas: client-only, so it never blocks server rendering.
const ShaderWaves = dynamic(() => import("@/components/ui/ShaderWaves"), {
  ssr: false,
});

const Hero = () => {
  return (
    <section id="hero" className="container-wide relative pb-4 pt-[84px] sm:pb-6 sm:pt-[104px]">
      <div
        className="media relative flex h-[calc(100svh-108px)] min-h-[520px] flex-col justify-end sm:h-[calc(100svh-136px)]"
        style={{ background: "#0a0a0a" }}
      >
        {/* Liquid green waves */}
        <div className="absolute inset-0">
          <ShaderWaves color1="#0dff88" color2="#0a0a0a" speed={0.3} scale={1.4} warp={1.2} softness={0.4} frequency={5.5} />
        </div>

        {/* Darken the lower-left corner so the headline always reads */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 85% 70% at 0% 100%, rgba(10,10,10,0.88) 0%, rgba(10,10,10,0.55) 45%, rgba(10,10,10,0) 80%)",
          }}
        />

        {/* Headline */}
        <div className="relative z-10 p-6 pb-10 sm:p-10 sm:pb-14 lg:p-16 lg:pb-20">
          <h1 className="text-[clamp(3.6rem,11vw,11.5rem)] font-semibold leading-[0.9] tracking-display text-white">
            <BlurText
              text="We make"
              trigger="load"
              delay={110}
              stepDuration={0.35}
              direction="bottom"
              blur={12}
              distance={36}
              color="#ffffff"
            />
            <BlurText
              text="Creative Things."
              trigger="load"
              delay={110}
              stepDuration={0.35}
              direction="bottom"
              blur={12}
              distance={36}
              color="#ffffff"
            />
          </h1>

        </div>

      </div>
    </section>
  );
};

export default Hero;
