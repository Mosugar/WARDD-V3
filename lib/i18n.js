import { useRouter } from "next/router";

/*
  Tiny i18n helper. Texts stay next to the code that uses them:
    const { tr, isAr } = useLang();
    tr("Bonjour", "مرحبا")
  The language comes from the URL: /  = French, /ar = Arabic.
*/
export function useLang() {
  const { locale } = useRouter();
  const lang = locale === "ar" ? "ar" : "fr";
  const isAr = lang === "ar";
  return {
    lang,
    isAr,
    dir: isAr ? "rtl" : "ltr",
    tr: (fr, ar) => (isAr && ar != null ? ar : fr),
    // Pick the right field from an object like { fr: "...", ar: "..." }
    pick: (o) => (o && typeof o === "object" && "fr" in o ? (isAr && o.ar != null ? o.ar : o.fr) : o),
    // Section links: keep the visitor in their language
    home: (hash = "") => `${isAr ? "/ar" : ""}/${hash}`,
  };
}
