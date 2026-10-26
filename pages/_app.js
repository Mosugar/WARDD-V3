import { Inter } from "next/font/google";
import "@/styles/globals.css";

// Inter, self-hosted by Next.js (no request to Google from the visitor's browser)
const inter = Inter({ subsets: ["latin", "latin-ext"], display: "swap" });

export default function App({ Component, pageProps }) {
  return (
    <>
      <style jsx global>{`
        :root {
          --font-inter: ${inter.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
}
