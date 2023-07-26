// File: sw.js
const CACHE_NAME = "LihatDiskon Chace";
const urlsToCache = [
  "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEigKgZbriM3HBWl3Ly0sLvm85-MbG7Kw7HlCF_i7OjV5jfZArN9R5XGRZemd88DE-xfFGFeYgMGBTUiWuaoDtLaYYwFDOBfNr4_jUmFOEAmsKMZUVw8yp7Lq0HQSaMyaHqp31FNeCVNNUoo-iuwSXfLAxsClMzpKTTyCD_sOpzU-A1FKu7WQT2WtR2Gbs4/s192/bg-ld-192x192.png",
  "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjRl3DiK_uL-U-7rrhT3YEKBVfxyR303DWFp2pZoLpBxQC0WUGjvOSjMThKzmvfPscbbC1mmnbhIpc3YksFNhzxr-eaAwCWN7wXOLny60blujrHK5fYgtb50U7UgYDKDEA2-yufn1UR05oxHFnyf52VDqGXF6ND5Nlx9H1WfSANqbBPx7hbRuMrXPz0ZS4/s1600/bg-ld-512x512.png",
  "https://cdn.statically.io/gh/lihatdiskon/code/main/function-jquery.js",
  "https://cdn.statically.io/gh/lihatdiskon/code/main/lihatdiskon-style.css",
  // Tambahkan daftar URL aset yang ingin Anda cache untuk offline access
];

self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log("Cache opened");
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
