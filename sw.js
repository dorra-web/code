// nama file: service-worker.js

// daftar file yang ingin di-cache
const filesToCache = [
  '/',
  'https://www.lihatdiskon.com/',
  'https://cdn.statically.io/gh/lihatdiskon/code/main/lihatdiskon-style.css',
  'https://cdn.statically.io/gh/lihatdiskon/code/main/function-jquery.js',
  'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjRl3DiK_uL-U-7rrhT3YEKBVfxyR303DWFp2pZoLpBxQC0WUGjvOSjMThKzmvfPscbbC1mmnbhIpc3YksFNhzxr-eaAwCWN7wXOLny60blujrHK5fYgtb50U7UgYDKDEA2-yufn1UR05oxHFnyf52VDqGXF6ND5Nlx9H1WfSANqbBPx7hbRuMrXPz0ZS4/s1600/bg-ld-512x512.png'
];

const staticCacheName = 'cache-v1';

// event install
self.addEventListener('install', event => {
  console.log('Mencoba menginstal service worker dan cache data statis');
  event.waitUntil(
    caches.open(staticCacheName)
    .then(cache => {
      return cache.addAll(filesToCache);
    })
  );
});

// event activate
self.addEventListener('activate', event => {
  console.log('Mengaktifkan service worker baru');
  const cacheWhitelist = [staticCacheName];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// event fetch
self.addEventListener('fetch', event => {
  console.log('Mengambil:', event.request.url);
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        console.log('Menemukan', event.request.url, 'di dalam cache');
        return response;
      }
      console.log('Jaringan permintaan untuk', event.request.url);
      return fetch(event.request)
    })
  );
});
