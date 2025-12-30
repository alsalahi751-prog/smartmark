const CACHE_NAME = "smartmark-cache-v1";

const ASSETS_TO_CACHE = [
  "./",
  "./index.html",
  "./manifest.json"
];

// تثبيت Service Worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// تفعيل Service Worker
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// جلب البيانات
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return (
        cachedResponse ||
        fetch(event.request).catch(() =>
          new Response("التطبيق يعمل بدون اتصال بالإنترنت", {
            headers: { "Content-Type": "text/plain; charset=utf-8" }
          })
        )
      );
    })
  );
});
