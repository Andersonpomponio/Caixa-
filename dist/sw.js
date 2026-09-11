// O painel funciona somente online. Este worker remove versões antigas que
// ficaram instaladas em celulares e deixa de interceptar as requisições.
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',event=>{
  event.waitUntil((async()=>{
    const keys=await caches.keys();
    await Promise.all(keys.map(key=>caches.delete(key)));
    await self.registration.unregister();
  })());
});
