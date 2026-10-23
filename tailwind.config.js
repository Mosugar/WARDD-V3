/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#ffffff",
        ink: "#0a0a0a",
        muted: "#666666",
        subtle: "#8f8f8f",
        line: "#dcdcdc",
        surface: { DEFAULT: "#f4f5f7", 2: "#eaeef1" },
        steel: { DEFAULT: "#c8cece", deep: "#232a34" },

        /* TEMPORARY BRIDGE: the chatbot/booking components still use
           green-* / emerald-* utilities. Remapping them to a neutral ramp
           removes the green without editing every component.
           Delete once those components are restyled. */
        green: {
          50: "#f7f7f8", 100: "#efeff1", 200: "#e2e2e5", 300: "#cfcfd3",
          400: "#8f8f95", 500: "#5c5c63", 600: "#3a3a40", 700: "#26262b",
          800: "#161619", 900: "#0a0a0a",
        },
        emerald: {
          50: "#f7f7f8", 100: "#efeff1", 200: "#e2e2e5", 300: "#cfcfd3",
          400: "#8f8f95", 500: "#5c5c63", 600: "#3a3a40", 700: "#26262b",
          800: "#161619", 900: "#0a0a0a",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
      },
      letterSpacing: {
        display: "-0.045em",
        heading: "-0.03em",
      },
      borderRadius: {
        media: "24px",
      },
      maxWidth: {
        site: "1760px",
      },
    },
  },
  plugins: [],
};