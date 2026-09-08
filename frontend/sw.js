/**
 * ========== SERVICE WORKER ==========
 * PWA - Cache, offline, sincronización
 */

const CACHE_NAME = 'rise-v1';
const CORE_ASSETS = [
  '/',
  '/index.html',
  '/css/theme.css',
  '/css/animations.css',
  '/css/components.css',
  '/js/config.js',
  '/js/state.js',
  '/js/theme.js',
  '/js/animations.js',
  '/js/components.js',
  '/js/api.js',
  '/js/auth.js',
  '/js/screens/onboarding.js',
  '/js/screens/dashboard.js',
  '/js/screens/habits.js',
  '/js/main.js',
  '/manifest.json'
];

// Install
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(CORE_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// Fetch
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  
  // API calls - network first
  if (event.request.url.includes('/api/')) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response.ok) {
            const cache = caches.open(CACHE_NAME);
            cache.then((c) => c.put(event.request, response.clone()));
          }
          return response;
        })
        .catch(() => {
          return caches.match(event.request);
        })
    );
    return;
  }
  
  // Static assets - cache first
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      
      return fetch(event.request).then((response) => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });
        
        return response;
      });
    })
  );
});

// Background Sync (próximamente)
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-habits') {
    event.waitUntil(syncHabits());
  }
});

async function syncHabits() {
  // Implementar sincronización de hábitos
  console.log('Sincronizando hábitos...');
}