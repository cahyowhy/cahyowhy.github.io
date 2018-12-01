/*
 *  Kita akan ubah nama
 *  pada cacheVersion
 *  supaya browser tahu bahwa
 *  ada perubahan terbaru
 */
const cacheVersion = 'cahyo-blog-v1';
const filesToCache = [
    '/static/vendor/css/gist.min.css',
    '/static/vendor/css/jssocials.css',
    '/static/vendor/css/jssocials-theme-flat.css',
    '/static/vendor/css/magnific.pop.up.min.css',
    '/static/vendor/js/jquery.min.js',
    '/static/vendor/js/jquery.migrate.min.js',
    '/static/vendor/js/jquery.waypoints.min.js',
    '/static/vendor/js/jssocials.min.js',
    '/static/vendor/js/magnific.pop.up.min.js',
    '/static/vendor/js/sticky.min.js',
];

self.addEventListener('install', function(event) {
    console.log('start fetch');
    event.waitUntil(
        caches.open(cacheVersion)
            .then(function(cache) {
                return cache.addAll(filesToCache)
            })
    )
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(res) {
                if (res) return res;

                return fetch(event.request);
            })
    );
});

self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames
                    .filter(function(cacheName) {
                        return cacheName !== cacheVersion;
                    })
                    .map(function(cacheName) {
                        caches.delete(cacheName);
                    })
            );
        })
    );
});

self.addEventListener('message', function(event) {
    if (event.data.action === 'skipWaiting') {
        self.skipWaiting();
    }
});