// Server-side helpers: fetch title / artist / cover for Spotify tracks so the
// site can render its own UI instead of 20 heavy iframes.
// Runs only in getStaticProps (never in the browser). Every step is wrapped so
// a Spotify hiccup can never break the page — it just falls back to a placeholder.

const BASE = process.env.SPOTIFY_BASE || "https://open.spotify.com";
const TIMEOUT_MS = 8000;
const cache = new Map(); // survives between requests in the dev server

async function fetchText(url) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      signal: ctrl.signal,
      headers: {
        "user-agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36",
        "accept-language": "fr,en;q=0.8",
      },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.text();
  } finally {
    clearTimeout(timer);
  }
}

// Find the object that describes the track inside the embed page's JSON
function findEntity(root) {
  const stack = [root];
  let guard = 0;
  while (stack.length && guard++ < 4000) {
    const node = stack.pop();
    if (!node || typeof node !== "object") continue;
    if (node.coverArt || (node.artists && (node.name || node.title))) return node;
    for (const key of Object.keys(node)) stack.push(node[key]);
  }
  return null;
}

function pickCover(sources) {
  if (!Array.isArray(sources) || !sources.length) return null;
  const sorted = [...sources].filter((s) => s?.url).sort((a, b) => (b.width || 0) - (a.width || 0));
  return (sorted.find((s) => (s.width || 0) <= 700) || sorted[0])?.url || null;
}

function hexOf(color) {
  const hex = color?.hex;
  return typeof hex === "string" && /^#?[0-9a-f]{6}$/i.test(hex) ? (hex.startsWith("#") ? hex : `#${hex}`) : null;
}

async function fromEmbed(id) {
  const html = await fetchText(`${BASE}/embed/track/${id}`);
  const m = html.match(/<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/);
  if (!m) throw new Error("no __NEXT_DATA__");
  const entity = findEntity(JSON.parse(m[1]));
  if (!entity) throw new Error("no entity");
  const artists = Array.isArray(entity.artists)
    ? entity.artists.map((a) => a?.name).filter(Boolean).join(", ")
    : "";
  return {
    title: entity.title || entity.name || null,
    artist: artists || entity.subtitle || null,
    cover:
      pickCover(entity.coverArt?.sources) ||
      pickCover(entity.visualIdentity?.image) ||
      null,
    color:
      hexOf(entity.coverArt?.extractedColors?.colorDark) ||
      hexOf(entity.coverArt?.extractedColors?.colorLight) ||
      null,
  };
}

async function fromOEmbed(id) {
  const url = `${BASE}/oembed?url=${encodeURIComponent(`spotify:track:${id}`)}`;
  const data = JSON.parse(await fetchText(url));
  return { title: data.title || null, artist: null, cover: data.thumbnail_url || null, color: null };
}

export async function getTrack(id, override = {}) {
  let info = cache.get(id);
  if (!info) {
    info = { title: null, artist: null, cover: null, color: null };
    try {
      info = { ...info, ...(await fromEmbed(id)) };
    } catch (e) {
      console.warn(`[spotify] embed lookup failed for ${id}: ${e.message}`);
    }
    if (!info.title || !info.cover) {
      try {
        const o = await fromOEmbed(id);
        info = { ...info, title: info.title || o.title, cover: info.cover || o.cover };
      } catch (e) {
        console.warn(`[spotify] oEmbed lookup failed for ${id}: ${e.message}`);
      }
    }
    if (info.title || info.cover) cache.set(id, info); // don't cache total failures
  }
  // Next.js can't serialise `undefined`, so everything is string | null
  return {
    id,
    title: override.title || info.title || null,
    artist: override.artist || info.artist || null,
    cover: override.cover || info.cover || null,
    color: override.color || info.color || null,
  };
}

export async function getTracks(ids, overrides = {}) {
  return Promise.all(ids.map((id) => getTrack(id, overrides[id] || {})));
}
