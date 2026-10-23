"use client";
import { useEffect } from "react";
import { useRouter } from "next/router";
import BlurText from "@/components/ui/BlurText";
import TearTicket from "@/components/ui/TearTicket";

/* ──────────────────────────────────────────────────────────────────────────
   PACKS — edit content here.
   Each pack is a ticket. Tearing the stub off = "Réserver".
   • image:  banner photo (in /public/images/packs)
   • rotate: resting tilt in degrees (the ticket also tilts toward the cursor)
   ────────────────────────────────────────────────────────────────────────── */
const PACKS = [
  {
    id: "etudiant",
    name: "Étudiant",
    featured: false,
    image: "/images/packs/etudiant.jpg",
    imageAlt: "Artiste au micro dans la cabine d'enregistrement",
    rotate: -3,
    features: [
      "Enregistrement",
      "Mixage",
      "Mastering",
      "Shooting (Offert)",
      "Contenu vidéo pour réseaux sociaux",
    ],
    theme: {
      background: "#e9edf2",
      stubBackground: "#f6f8fa",
      color: "#0a0a0a",
      borderColor: "#d3d9e0",
    },
  },
  {
    id: "pro",
    name: "Pro",
    featured: true,
    image: "/images/packs/pro.jpg",
    imageAlt: "Artiste avec casque en session d'enregistrement",
    rotate: 0,
    features: [
      "Enregistrement",
      "Mixage",
      "Mastering",
      "Shooting (Offert)",
      "Contenu vidéo pour réseaux sociaux",
      "Instru non exclusif",
      "Tuning vocal avancé",
    ],
    theme: {
      background: "#0a0a0a",
      stubBackground: "#171717",
      color: "#ffffff",
      borderColor: "rgba(255,255,255,0.16)",
    },
  },
  {
    id: "premium",
    name: "Premium",
    featured: false,
    image: "/images/packs/premium.jpg",
    imageAlt: "Producteur aux claviers dans le studio",
    rotate: 3,
    features: [
      "Enregistrement",
      "Mixage",
      "Mastering",
      "Shooting (Offert)",
      "Contenu vidéo pour réseaux sociaux",
      "Instru exclusif",
      "Tuning vocal avancé",
    ],
    theme: {
      background: "#dde5ee",
      stubBackground: "#eef2f7",
      color: "#0a0a0a",
      borderColor: "#c6d1dd",
    },
  },
];

// Ticket design size (scales down automatically on small screens)
const TICKET = { width: 360, height: 580, stub: 120 };
const BODY_H = TICKET.height - TICKET.stub; // 460
const PHOTO_H = 176; // photo height inside the ticket
const PHOTO_SPAN = (PHOTO_H + 16) / BODY_H; // share of the body (16 = 2×8px inset)

const Check = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0">
    <circle cx="12" cy="12" r="10" fill="currentColor" />
    <path
      d="M8.5 12.2l2.3 2.3 4.7-4.9"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ stroke: "var(--tt-bg)" }}
    />
  </svg>
);

const Package = () => {
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/booking");
  }, [router]);

  const book = (pack) => {
    // Let the torn ticket settle for a beat, then go to booking
    setTimeout(() => router.push(`/booking?pack=${pack.id}`), 450);
  };

  return (
    <section id="package" className="container-x section-y">
      {/* Heading */}
      <div className="mb-14 flex flex-col gap-6 lg:mb-20 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <span className="label">Nos packs</span>
          <h2 className="mt-5 text-[clamp(2.6rem,6vw,5.4rem)] leading-[0.98] tracking-display">
            <BlurText
              text="Choisis ton pack"
              delay={90}
              stepDuration={0.35}
              direction="bottom"
              blur={10}
              distance={28}
              color="#0a0a0a"
            />
          </h2>
        </div>
        <p className="max-w-[36ch] text-[15px] leading-relaxed sm:text-base">
          Trouve la formule qui te correspond, puis déchire le coupon pour
          lancer ta réservation.
        </p>
      </div>

      {/* Tickets */}
      <div className="grid grid-cols-1 justify-items-center gap-14 lg:grid-cols-3 lg:items-start lg:gap-8">
        {PACKS.map((pack, i) => (
          <div
            key={pack.id}
            className={`relative w-full max-w-[360px] ${
              pack.featured ? "lg:-translate-y-6" : ""
            }`}
          >
            {/* Soft contact shadow so the ticket feels like it floats */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-6 -bottom-4 h-12 rounded-full bg-ink/30 blur-2xl"
            />

            <TearTicket
              orientation="vertical"
              width={TICKET.width}
              height={TICKET.height}
              stubSize={TICKET.stub}
              radius={22}
              holes={13}
              holeSize={6}
              notch={12}
              roughness={0.6}
              tearAngle={30}
              stretch={30}
              resistance={0.45}
              rotate={pack.rotate}
              tilt
              tiltMax={10}
              tiltReach={340}
              perspective={900}
              parallax={10}
              recenter={false}
              border
              borderWidth={1}
              image={pack.image}
              imageAlt={pack.imageAlt}
              imageRadius={14}
              imageSpan={PHOTO_SPAN}
              scrim
              background={pack.theme.background}
              stubBackground={pack.theme.stubBackground}
              color={pack.theme.color}
              borderColor={pack.theme.borderColor}
              ariaLabel={`Déchirer pour réserver le pack ${pack.name}`}
              onTear={() => book(pack)}
              stub={
                <div className="flex h-full items-center justify-between px-7">
                  <div className="flex flex-col gap-2">
                    <span className="font-mono text-[11px] uppercase tracking-[0.06em] opacity-60">
                      Déchire pour réserver
                    </span>
                    <span className="text-[1.7rem] font-medium leading-none tracking-heading">
                      Réserver
                    </span>
                  </div>
                  <span
                    className="grid h-12 w-12 place-items-center rounded-full"
                    style={{
                      border:
                        "1px solid color-mix(in srgb, currentColor 28%, transparent)",
                    }}
                  >
                    <svg
                      className="anim-nudge"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M12 4v15m0 0l-6-6m6 6l6-6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
              }
            >
              {/* Ticket body — positioned on the ticket's own design grid */}
              <div className="relative h-full">
                {/* Pills over the photo */}
                <div className="absolute inset-x-5 top-5 flex items-center justify-between">
                  <span className="rounded-full bg-black/40 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.06em] text-white backdrop-blur-md">
                    N° 0{i + 1}
                  </span>
                  {pack.featured && (
                    <span className="rounded-full bg-white px-3 py-1 font-mono text-[10px] uppercase tracking-[0.06em] text-ink">
                      Populaire
                    </span>
                  )}
                </div>

                {/* Name sits on the faded bottom of the photo */}
                <h3
                  className="absolute inset-x-7 text-[2.3rem] font-medium leading-none tracking-display text-inherit"
                  style={{ top: PHOTO_H + 8 - 46 }}
                >
                  {pack.name}
                </h3>

                {/* Features */}
                <ul
                  className="absolute inset-x-7 flex flex-col gap-[10px] text-[15px] leading-tight"
                  style={{ top: PHOTO_H + 8 + 20 }}
                >
                  {pack.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <Check />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </TearTicket>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Package;
