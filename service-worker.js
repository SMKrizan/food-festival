const APP_PREFIX = 'FoodFest-';
const VERSION = 'version_01';
const CACHE_NAME = APP_PREFIX + VERSION;

const FILES_TO_CACHE = [
    './index.html',
    './events.html',
    './tickets.html',
    './schedule.html',
    './assets/css/style.css',
    './assets/css/bootstrap.css',
    './assets/css/tickets.css',
    './dist/app.bundle.js',
    './dist/events.bundle.js',
    './dist/tickets.bundle.js',
    './dist/schedule.bundle.js'
];


// Service Workers run before the 'window' object has been created, so 'self.' is used to instantiate listeners on the Service Worker, rather than 'window.'
self.addEventListener('install', function (e) {
    // tells browser to wait until work is complete before terminating Service Worker
    e.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            console.log('installing cache : ' + CACHE_NAME)
            return cache.addAll(FILES_TO_CACHE)
        })
    )
})