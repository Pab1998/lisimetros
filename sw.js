const CACHE_NAME = 'v1_cache_lisimetros',
urlsToCache = [

'./',
'https://fonts.googleapis.com/css2?family=PT+Sans&display=swap',
'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css',
'./estilos.css',
'./script.js',
'./img/logogen.png',
'./img/logogen_1024.png',
'./img/logogen_512.png',
'./img/logogen_384.png',
'./img/logogen_256.png',
'./img/logogen_192.png',
'./img/logogen_128.png',
'./img/logogen_96.png',
'./img/logogen_64.png',
'./img/logogen_32.png',
]


self.addEventListener('install',e=>{
e.waitUntil(
    caches.open(CACHE_NAME)
    .then(cache=>{
       return cache.addAll(urlsToCache)
       .then(()=>self.skipWaiting())

    })
    .catch(err=>console.log('Falló registro de cache',err))
)
})

self.addEventListener('activate',e=>{

    const cacheWhitelist = [CACHE_NAME]

    e.waitUntil(
        caches.keys()
        .then(cachesNames =>{
            cachesNames.map(cacheName=>{
                if(cacheWhitelist.indexOf(cacheName)===-1){
                    return caches.delete(cacheName)
                }
            })
        })
        .then(()=>self.ClientRectList.claim())
    )
    
})

self.addEventListener('fetch',e=>{

    e.respondWith(
        caches.match(e.request)
        .then(res=>{
            if(res){
                return res
            }

            return fetch(e.request)
        })
    )

    
})