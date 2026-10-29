/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // French at warddstudio.ma, Arabic at warddstudio.ma/ar
  i18n: {
    locales: ["fr", "ar"],
    defaultLocale: "fr",
    localeDetection: false, // visitors choose with the FR / عربي switch
  },
};

export default nextConfig;
