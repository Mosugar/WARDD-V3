import { Html, Head, Main, NextScript } from "next/document";

const TITLE = "Wardd Studio";
const DESC = "Wardd Studio, hub créatif d'enregistrement et de production musicale à Kénitra, Maroc : enregistrement, mixage, mastering, beatmaking, photo et vidéo.";
const URL = "https://warddstudio.ma/";
const IMAGE = "https://warddstudio.ma/op.jpg";

export default function Document() {
  return (
    // lang="fr" stops browsers from auto-translating the (French) page
    <Html lang="fr">
      <Head>
        <meta name="google" content="notranslate" />
        <meta name="description" content={DESC} />
        <link type="image/x-icon" rel="icon" href="/favicon.svg" />
        <link rel="canonical" href={URL} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESC} />
        <meta property="og:image" content={IMAGE} />
        <meta property="og:url" content={URL} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="fr_MA" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESC} />
        <meta name="twitter:image" content={IMAGE} />
        <meta name="theme-color" content="#0a0a0a" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
