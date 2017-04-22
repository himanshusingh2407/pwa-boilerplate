importScripts('cache-polyfill.js');

var dataCacheName = 'murmurData-v1';
var cacheName = 'murmurPWA-final-1';
var filesToCache = [
  './',
  './index.html',
  './favicon.ico',
  './manifest.json',
  './scripts/app.js',
  './styles/style.css',
  './images/icons/icon-32x32.png',
  './images/icons/icon-128x128.png',
  './images/icons/icon-144x144.png',
  './images/icons/icon-152x152.png',
  './images/icons/icon-192x192.png',
  './images/icons/icon-256x256.png'
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(caches.open(cacheName).then(function(cache) {
    console.log('[ServiceWorker] Caching app shell');
    return cache.addAll(filesToCache);
  }));
});

self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
  e.respondWith(caches.match(e.request).then(function(response) {
    return response || fetch(e.request);
  }));
});
