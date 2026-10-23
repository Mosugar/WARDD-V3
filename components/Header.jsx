"use client";
import { useEffect, useState } from "react";
import Logo from "@/components/ui/Logo";
import Magnet from "@/components/ui/Magnet";

// Main links shown in the bar (desktop)
const BAR_LINKS = [
  { label: "À propos", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Packs", href: "#package" },
  { label: "Sons", href: "#tracks" },
  { label: "Artistes", href: "#artists" },
  { label: "Contact", href: "#contact" },
];

// Full list shown in the mobile sheet
const ALL_LINKS = [
  { label: "À propos", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Sons", href: "#tracks" },
  { label: "Clips", href: "#clips" },
  { label: "Vie du studio", href: "#studio-life" },
  { label: "Artistes", href: "#artists" },
  { label: "Équipe", href: "#team" },
  { label: "Packs", href: "#package" },
  { label: "Témoignages", href: "#testimonial" },
  { label: "Contact", href: "#contact" },
  { label: "FAQs", href: "#faqs" },
];

const SOCIALS = [
  {
    label: "Spotify",
    href: "https://open.spotify.com/playlist/2GznjCPT7BhHuci5z2gLMt?si=039fac172df0428d",
  },
  { label: "Instagram", href: "https://www.instagram.com/warddmusic_/" },
  { label: "YouTube", href: "https://youtube.com/@omflow1?si=wgU7SbCpPVx3PXpf" },
  { label: "Facebook", href: "https://www.facebook.com/warddmusic" },
];

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path
      d="M3 11L11 3M11 3H4.5M11 3V9.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Header = () => {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  // Hide on scroll down, show on scroll up
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      if (Math.abs(y - lastY) > 8) {
        setHidden(y > lastY && y > 160);
        lastY = y;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the link of the section currently in view
  useEffect(() => {
    const ids = BAR_LINKS.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive("#" + e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Lock page scroll + close on Escape while the mobile sheet is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 pt-3 sm:pt-5 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          hidden && !open ? "-translate-y-[140%]" : "translate-y-0"
        }`}
      >
        <div className="container-x">
        <nav
          aria-label="Navigation principale"
          className={`flex h-[60px] items-center justify-between rounded-full border pl-5 pr-2 backdrop-blur-xl transition-colors duration-300 ${
            scrolled || open
              ? "border-line bg-white/85 shadow-[0_8px_30px_rgba(10,10,10,0.06)]"
              : "border-white/60 bg-white/55"
          }`}
        >
          {/* Logo */}
          <a
            href="#hero"
            aria-label="Wardd Music — accueil"
            className="cursor-target flex items-center text-ink"
            onClick={() => setOpen(false)}
          >
            <Logo width={54} />
          </a>

          {/* Links — desktop */}
          <ul className="hidden items-center gap-1 lg:flex">
            {BAR_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={`cursor-target relative rounded-full px-4 py-2 text-[15px] tracking-[-0.01em] transition-colors duration-200 hover:text-ink ${
                    active === l.href ? "text-ink" : "text-muted"
                  }`}
                >
                  {l.label}
                  <span
                    className={`absolute bottom-[5px] left-1/2 h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-ink transition-opacity duration-300 ${
                      active === l.href ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </a>
              </li>
            ))}
          </ul>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <Magnet padding={50} magnetStrength={4} wrapperClassName="hidden sm:inline-block">
              <a
                href="/booking"
                data-cursor-label="Réserver"
                className="cursor-target btn-pill !h-11 !px-5"
              >
                Réserver
                <Arrow />
              </a>
            </Magnet>

            {/* Mobile: a word, not three lines */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="btn-ghost !h-11 !px-5 lg:!hidden"
            >
              {open ? "Fermer" : "Menu"}
            </button>
          </div>
        </nav>
        </div>
      </header>

      {/* Mobile sheet */}
      <div
        id="mobile-menu"
        aria-hidden={!open}
        className={`fixed inset-0 z-40 flex flex-col overflow-y-auto bg-paper px-5 pb-8 pt-[104px] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden ${
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-3 opacity-0"
        }`}
      >
        <ul className="flex flex-col">
          {ALL_LINKS.map((l, i) => (
            <li key={l.href} className="border-b border-line">
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex items-baseline gap-4 py-3 text-[clamp(1.7rem,7vw,2.4rem)] font-medium leading-none tracking-heading text-ink"
              >
                <span className="w-8 text-xs font-normal tracking-normal text-subtle">
                  [{i + 1}]
                </span>
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-col gap-6">
          <a href="/booking" onClick={() => setOpen(false)} className="btn-pill w-full">
            Réserver une session
            <Arrow />
          </a>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
                {s.label}
              </a>
            ))}
          </div>
          <a href="mailto:contact@warddstudio.com" className="text-sm text-ink underline underline-offset-4">
            contact@warddstudio.com
          </a>
        </div>
      </div>
    </>
  );
};

export default Header;