var cacheName = "coursework-v1";
var cacheFiles = [
    'index.html',
    'coursework.webmanifest',
    'images/accounting.jpg',
    'images/biology.jpg',
    'images/chemistry.jpg',
    'images/commerce.jpg',
    'images/economics.jpg',
    'images/english.jpg',
    'images/geography.jpg',
    'images/maths.jpg',
    'images/music.jpg',
    'images/physics.jpg',
    'images/icon-512.png'
];

self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');
    e.waitUntil(
        caches.open(cacheName).then((cache) => {
            console.log('[Service Worker] Caching all the files');
            return cache.addAll(cacheFiles);
        })
    );
});
self.addEventListener('fetch', function (e) {
    e.respondWith(
        cache.match(e.request).then(function (r) {
            //Download the file if it is not in the cache
            return r || fetch(e.request).then(function (response) {
                //Add the new file to cache
                return caches.open(cacheName).then(function (cache) {
                    cache.put(e.request, response.clone());
                    return response;
                })
            })
        })
    )
});