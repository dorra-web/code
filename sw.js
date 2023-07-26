// sw.js

// Nama cache untuk menyimpan aset situs
const CACHE_NAME = "my-site-cache-v1";
const urlsToCache = [
  "https://www.lihatdiskon.com/", // Ganti dengan URL halaman utama situs Anda
  "/styles/main.css", // Ganti dengan URL file CSS Anda
  "/scripts/main.js", // Ganti dengan URL file JavaScript Anda
  // Tambahkan URL aset lainnya yang ingin Anda cache
];

// Install service worker dan menyimpan aset ke dalam cache
self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log("Mengisi cache dengan aset...");
      return cache.addAll(urlsToCache);
    })
  );
});

// Menghapus cache lama saat aktivasi
self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            console.log("Menghapus cache lama: " + cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Intercept fetch events dan mengembalikan aset dari cache jika tersedia
self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      // Jika aset ditemukan dalam cache, kembalikan dari cache
      if (response) {
        return response;
      }
      // Jika aset tidak ditemukan dalam cache, lakukan fetch dari server
      return fetch(event.request);
    })
  );
});
