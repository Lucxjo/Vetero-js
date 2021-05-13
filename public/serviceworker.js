const CACHE_NAME = "v1";
const URLs = ['index.html', 'offline.html'];

const self = this;

// Install SW
self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log("Opened cache!")
                return cache.addAll(URLs)
            })
    )
});

// Listen for requests
self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request)
            .then(() => {
                return fetch(e.request)
                    .catch(() => caches.match('offline.html'))
            })
    )
});

// Activate SW
self.addEventListener('activate', (e) => {
    const cacheAcceptList = []
    cacheAcceptList.push(CACHE_NAME)

    e.waitUntil(
        caches.keys().then((cacheNames) => Promise.all(
            cacheNames.map((cacheName) => {
                if (!cacheAcceptList.includes(cacheName)) {
                    return caches.delete(cacheName)
                }
            })
        ))
    )
});