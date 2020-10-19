console.log("antes de instalar");
self.addEventListener('install', ()=> {
    console.log("cuando se está instalando??");
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return cache.addAll([
                './',
                './index.html',
                './android-chrome-192x192.png',
                './PWA_web.html'
            ]).then(function() {
                self.skipWaiting();
            });
        })
    );
});
