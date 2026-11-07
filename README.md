# Wardd Studio — Official Website

The official website for **Wardd Studio**, a professional music recording and production studio based in Salé, Morocco. Built with Next.js, fully bilingual (French & Arabic with RTL support), and featuring an AI-powered chatbot assistant.

---

## Features

- **Bilingual** — French (`/`) and Arabic (`/ar`) with full RTL layout and Arabic typography
- **Booking system** — 5-step reservation flow with package selection, date/time picker, and email confirmation
- **AI chatbot** — Powered by Claude (Anthropic), answers questions about the studio in FR, AR, and Moroccan Darija
- **Spotify integration** — Fetches and displays the studio's latest releases with cover art and dominant colors
- **YouTube clips** — Video gallery pulled via oEmbed (no API key required)
- **Custom cursor & animations** — GSAP timelines, shader-based wave effects, magnetic elements
- **Studio showcase** — Artist portfolio, pricing packages, behind-the-scenes content

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (Pages Router) |
| Styling | Tailwind CSS |
| Animations | GSAP, Motion |
| AI Chatbot | Anthropic API (Claude Haiku) |
| Music | Spotify Web API |
| Video | YouTube oEmbed |
| Form submission | FormSubmit |
| Fonts | Inter, IBM Plex Sans Arabic |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/Mosugar/WARDD-V3.git
cd WARDD-V3
npm install
```

### Environment Variables

Create a `.env.local` file at the root:

```env
# Required — powers the AI chatbot
ANTHROPIC_API_KEY=your_anthropic_api_key

# Optional overrides
ASSISTANT_MODEL=claude-haiku-4-5-20251001
```

> Without `ANTHROPIC_API_KEY`, the chatbot falls back to a pre-scripted offline mode — the rest of the site works fine.

### Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for French, [http://localhost:3000/ar](http://localhost:3000/ar) for Arabic.

### Build for Production

```bash
npm run build
npm start
```

---

## Project Structure

```
├── components/          # All UI components (Header, Hero, Footer, Chatbot, etc.)
│   └── ui/              # Reusable primitives (cursor, blur text, shader waves…)
├── data/                # Static content (tracks, clips, translations, chatbot knowledge)
├── lib/                 # Utilities (i18n hook, Spotify fetcher, chatbot fallback)
├── pages/               # Next.js pages + API routes
│   └── api/             # /api/chat (AI chatbot endpoint)
├── public/              # Static assets (images, fonts)
└── styles/              # Global CSS
```

---

## Internationalization

Routing is handled natively by Next.js:

| URL | Language |
|---|---|
| `/` | French (default) |
| `/ar` | Arabic (RTL) |

Translations live in `data/translations.json` and `data/bookingTranslations.json`. Component-level strings use the `useLang()` hook from `lib/i18n.js`.

---

## Deployment

The site is deployed on **Vercel**. Pushes to `main` trigger automatic deploys.

---

## Credits

Developed by [Mohamed Sekkar](https://www.mohamedsekkar.com)
