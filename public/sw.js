const STATIC_CACHE = "bondcircle-shell-v2";
const OFFLINE_PAGE = "/offline.html";
const APP_ICONS = [
  "/manifest.webmanifest",
  "/brand/icon-192.png",
  "/brand/icon-512.png",
  "/brand/icon-maskable-512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => cache.addAll([...APP_ICONS, OFFLINE_PAGE]))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter(
              (key) =>
                key.startsWith("bondcircle-shell-") && key !== STATIC_CACHE,
            )
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  if (event.request.method !== "GET" || url.origin !== self.location.origin) {
    return;
  }

  if (
    event.request.mode === "navigate" &&
    !url.pathname.startsWith("/api/") &&
    !url.pathname.startsWith("/__/auth/")
  ) {
    event.respondWith(
      fetch(event.request).catch(async () => {
        const offline = await caches.match(OFFLINE_PAGE);
        return offline || Response.error();
      }),
    );
    return;
  }

  if (!APP_ICONS.includes(url.pathname)) return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response.ok) {
          const copy = response.clone();
          event.waitUntil(
            caches
              .open(STATIC_CACHE)
              .then((cache) => cache.put(event.request, copy))
              .catch(() => {}),
          );
        }
        return response;
      })
      .catch(
        async () => (await caches.match(event.request)) || Response.error(),
      ),
  );
});
