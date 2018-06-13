var cacheVersion = 'v1';

var toBeCached = ['offline.html'];

self.addEventListener('install', function(event){
    console.log('sw was installed');
    event.waitUntil(
        caches.open(cacheVersion)
        .then(function(cache) {
            return cache.addAll(toBeCached);
    }));
    self.skipWaiting();
});

self.addEventListener('activate', function(event){
    event.waitUntil(
        caches.keys()
        .then(function(keys) {
            return Promise.all(keys.filter(function(key){
                return key != cacheVersion;
            }).map(function(key){
                return caches.delete(key);
            }));
        })
    );
});

self.addEventListener('fetch', function(event){
    event.respondWith(
        caches.match(event.request)
        .then(function(res) {
            if(res) {
                return res;
            } else {
                if(!navigator.onLine) {
                    return caches.match(new Request('offline.html'));
                } else {
                    return fetch(event.request);
                }
            }
            
        })
    );
    
});