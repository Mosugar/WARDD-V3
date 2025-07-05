import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>Wardd Music</title>
        <meta name="description" content="Wardd Music est un studio d'enregistrement situé à Kénitra, Maroc, offrant des services professionnels d'enregistrement vocal, de mixage et de mastering."></meta>
        <link type="image/x-icon" rel="icon" href="/favicon.svg" />
        <meta property="og:title" content="Wardd Music" />
        <meta
          property="og:description"
          content="Wardd Music est un studio d'enregistrement situé à Kénitra, Maroc, offrant des services professionnels d'enregistrement vocal, de mixage et de mastering."
        />
        <meta property="og:image" content="https://www.warddmusic.com/op.jpg" />
        <meta property="og:url" content="https://www.warddmusic.com/" />
        <meta property="og:type" content="website" />
        <meta
          name="twitter:title"
          content="Wardd Music"
        />
        <meta
          name="twitter:description"
          content="Wardd Music est un studio d'enregistrement situé à Kénitra, Maroc, offrant des services professionnels d'enregistrement vocal, de mixage et de mastering."
        />
        <meta name="twitter:image" content="https://www.warddmusic.com/op.jpg" />
        <meta name="twitter:url" content="https://www.warddmusic.com/" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#1c421b" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
