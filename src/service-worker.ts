self.addEventListener("install", () => {
  console.log("Service Worker installing.");
});

self.addEventListener("activate", () => {
  console.log("Service Worker activating.");
});

// self.addEventListener("fetch", (event) => {
//   console.log("Fetching:", event.request.url);
// });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
self.addEventListener('fetch', (event: any) => {
  if (event.request.url.includes('data.json')) {
    // همیشه از شبکه درخواست بفرست
    event.respondWith(fetch(event.request));
  } else {
    event.respondWith(
      caches.match(event.request)
        .then((response) => response || fetch(event.request))
    );
  }
});
