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
});

// clears out any old data from the cache and tells service worker how to manage cache
self.addEventListener('activate', function (e) {
    e.waitUntil(
        // returns an array of all cache names
        caches.keys().then(function (keyList) {
            // filters out caches that have the 'app' prefix
            let cacheKeeplist = keyList.filter(function (key) {
                return key.indexOf(APP_PREFIX);
            })
            cacheKeeplist.push(CACHE_NAME);

            return Promise.all(
                keyList.map(function (key, i) {
                    if (cacheKeeplist.indexOf(key) === -1) {
                        console.log('deleting cache : ' + keyList[i]);
                        return caches.delete(keyList[i]);
                    }
                })
            )
        })
    )
});

// listen for fetch event, log URL of requested resource and define how to respond to request
self.addEventListener('fetch', function (e) {
    console.log('fetch request : ' + e.request.url)
    e.respondWith(
        // determines whether resource already exists
        caches.match(e.request).then(function (request) {
            if (request) {
                console.log('responding with cache : ' + e.request.url)
                return request
                // if resource does not exist, retrieves it from online network
            } else {
                console.log('file is not cached, fetching : ' + e.request.url)
                return fetch(e.request)
            }
        })
    )
})