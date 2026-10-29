"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useLang } from "@/lib/i18n";
import Logo from "@/components/ui/Logo";
import Magnet from "@/components/ui/Magnet";

// Main links shown in the bar (desktop)
const BAR_LINKS = [
  { label: { fr: "À propos", ar: "من نحن" }, hash: "#about" },
  { label: { fr: "Services", ar: "خدماتنا" }, hash: "#services" },
  { label: { fr: "Studio", ar: "الاستوديو" }, hash: "#studio" },
  { label: { fr: "Packs", ar: "الباقات" }, hash: "#package" },
  { label: { fr: "Sons", ar: "إصداراتنا" }, hash: "#tracks" },
  { label: { fr: "Artistes", ar: "الفنانون" }, hash: "#artists" },
  { label: { fr: "Contact", ar: "اتصل بنا" }, hash: "#contact" },
];

// Full list shown in the mobile sheet
const ALL_LINKS = [
  { label: { fr: "À propos", ar: "من نحن" }, hash: "#about" },
  { label: { fr: "Services", ar: "خدماتنا" }, hash: "#services" },
  { label: { fr: "Studio", ar: "الاستوديو" }, hash: "#studio" },
  { label: { fr: "Sons", ar: "إصداراتنا" }, hash: "#tracks" },
  { label: { fr: "Clips", ar: "الكليبات" }, hash: "#clips" },
  { label: { fr: "Vie du studio", ar: "حياة الاستوديو" }, hash: "#studio-life" },
  { label: { fr: "Artistes", ar: "الفنانون" }, hash: "#artists" },
  { label: { fr: "Packs", ar: "الباقات" }, hash: "#package" },
  { label: { fr: "Contact", ar: "اتصل بنا" }, hash: "#contact" },
];

const SOCIALS = [
  {
    label: "Spotify",
    href: "https://open.spotify.com/playlist/2GznjCPT7BhHuci5z2gLMt?si=039fac172df0428d",
  },
  { label: "Instagram", href: "https://www.instagram.com/warddstudio/" },
  { label: "YouTube", href: "https://youtube.com/@omflow1?si=wgU7SbCpPVx3PXpf" },
  { label: "Facebook", href: "https://www.facebook.com/warddmusic" },
];

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="rtl-flip">
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
  const router = useRouter();
  const { tr, pick, home, isAr } = useLang();
  const bookingHref = isAr ? "/ar/booking" : "/booking";

  // FR <-> عربي on the same page
  const LangSwitch = ({ className = "" }) => (
    <Link
      href={router.asPath}
      locale={isAr ? "fr" : "ar"}
      scroll={false}
      onClick={() => setOpen(false)}
      aria-label={isAr ? "Version française" : "النسخة العربية"}
      className={`cursor-target inline-flex h-11 items-center rounded-full border border-line px-4 text-[14px] font-medium text-ink transition-colors hover:border-ink ${className}`}
    >
      <span lang={isAr ? "fr" : "ar"}>{isAr ? "FR" : "عربي"}</span>
    </Link>
  );

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
    const ids = BAR_LINKS.map((l) => l.hash.slice(1));
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
          aria-label={tr("Navigation principale", "التنقل الرئيسي")}
          className={`flex h-[60px] items-center justify-between rounded-full border ps-5 pe-2 backdrop-blur-xl transition-colors duration-300 ${
            scrolled || open
              ? "border-line bg-white/85 shadow-[0_8px_30px_rgba(10,10,10,0.06)]"
              : "border-white/60 bg-white/55"
          }`}
        >
          {/* Logo */}
          <a
            href={home("#hero")}
            aria-label={tr("Wardd Studio — accueil", "Wardd Studio — الرئيسية")}
            className="cursor-target flex items-center text-ink"
            onClick={() => setOpen(false)}
          >
            <Logo width={54} />
          </a>

          {/* Links — desktop */}
          <ul className="hidden items-center gap-1 lg:flex">
            {BAR_LINKS.map((l) => (
              <li key={l.hash}>
                <a
                  href={home(l.hash)}
                  className={`cursor-target relative rounded-full px-4 py-2 text-[15px] tracking-[-0.01em] transition-colors duration-200 hover:text-ink ${
                    active === l.hash ? "text-ink" : "text-muted"
                  }`}
                >
                  {pick(l.label)}
                  <span
                    className={`absolute bottom-[5px] left-1/2 h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-ink transition-opacity duration-300 ${
                      active === l.hash ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </a>
              </li>
            ))}
          </ul>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <LangSwitch className="hidden sm:inline-flex" />
            <Magnet padding={50} magnetStrength={4} wrapperClassName="hidden sm:inline-block">
              <a
                href={bookingHref}
                data-cursor-label={tr("Réserver", "احجز")}
                className="cursor-target btn-pill !h-11 !px-5"
              >
                {tr("Réserver", "احجز")}
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
              {open ? tr("Fermer", "إغلاق") : tr("Menu", "القائمة")}
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
            <li key={l.hash} className="border-b border-line">
              <a
                href={home(l.hash)}
                onClick={() => setOpen(false)}
                className="flex items-baseline gap-4 py-3 text-[clamp(1.7rem,7vw,2.4rem)] font-medium leading-none tracking-heading text-ink"
              >
                <span className="w-8 text-xs font-normal tracking-normal text-subtle">
                  [{i + 1}]
                </span>
                {pick(l.label)}
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-col gap-6">
          <LangSwitch className="w-full justify-center" />
          <a href={bookingHref} onClick={() => setOpen(false)} className="btn-pill w-full">
            {tr("Réserver une session", "احجز جلستك")}
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