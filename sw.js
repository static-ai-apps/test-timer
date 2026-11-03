// static-ai-apps template service worker: network first, cache as fallback.
//
// Fresh content whenever the network is available; the last good copy when
// it isn't. Keep this file unless you need something different, and bump
// VERSION when you want old caches cleared. See ADVICE.md §6 and SPEC.md §7.

const VERSION = 1;

// Every app in the org shares one origin, so cache names carry the repo name,
// and this worker touches only caches that start with it (SPEC.md §7.2).
const SCOPE = self.registration.scope; // e.g. https://org.github.io/pocket-metronome/
const REPO = new URL(SCOPE).pathname.split("/").filter(Boolean)[0] || "local-app";
const PREFIX = `${REPO}-`;
const CACHE = `${PREFIX}v${VERSION}`;

// Optional files may be absent; a missing one shouldn't stop installation.
const CORE = ["./", "index.html", "manifest.webmanifest", "icon.png"];

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await Promise.allSettled(CORE.map((path) => cache.add(path)));
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    for (const name of await caches.keys()) {
      // Never "delete everything except CACHE": that wipes other apps' caches.
      if (name.startsWith(PREFIX) && name !== CACHE) await caches.delete(name);
    }
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (!url.protocol.startsWith("http")) return;
  // Same-origin requests outside this app's path belong to other apps.
  if (url.origin === self.location.origin && !request.url.startsWith(SCOPE)) return;

  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    try {
      const response = await fetch(request);
      // Opaque responses (cross-origin without CORS) can't be inspected but can be replayed.
      if (response.ok || response.type === "opaque") {
        cache.put(request, response.clone()).catch(() => {});
      }
      return response;
    } catch (error) {
      // Look only in this app's cache, never in other apps' caches.
      const cached = await cache.match(request, { ignoreSearch: request.mode === "navigate" });
      if (cached) return cached;
      if (request.mode === "navigate") {
        const shell = await cache.match("./");
        if (shell) return shell;
      }
      throw error;
    }
  })());
});
