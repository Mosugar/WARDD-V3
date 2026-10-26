// Server-side helper: fetch title + channel name for YouTube videos (oEmbed, no
// API key needed). Runs only in getStaticProps, never in the browser. Any failure
// falls back to a generic label so the page can never break.

const BASE = process.env.YOUTUBE_BASE || "https://www.youtube.com";
const TIMEOUT_MS = 8000;
const cache = new Map(); // survives between requests in the dev server

async function fetchJSON(url) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, { signal: ctrl.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } finally {
    clearTimeout(timer);
  }
}

export async function getVideo(id, override = {}) {
  let info = cache.get(id);
  if (!info) {
    info = { title: null, author: null };
    try {
      const watch = `https://www.youtube.com/watch?v=${id}`;
      const data = await fetchJSON(`${BASE}/oembed?url=${encodeURIComponent(watch)}&format=json`);
      info = { title: data.title || null, author: data.author_name || null };
      cache.set(id, info);
    } catch (e) {
      console.warn(`[youtube] oEmbed lookup failed for ${id}: ${e.message}`);
    }
  }
  // Next.js can't serialise `undefined`, so everything is string | null
  return {
    id,
    title: override.title || info.title || null,
    author: override.author || info.author || null,
  };
}

export async function getVideos(ids, overrides = {}) {
  return Promise.all(ids.map((id) => getVideo(id, overrides[id] || {})));
}
