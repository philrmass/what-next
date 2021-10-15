function isDev() {
  return self.location.hostname === 'localhost';
}

function filePaths(files) {
  const base = isDev() ? '/' : '/what-next/';
  return files.map((file) => `${base}${file}`);
}

function getCacheName() {
  return 'what-next-cache';
}

function getCacheFiles() {
  const cacheFiles = [
    '',
    'favicon.ico',
    'logo192.png',
    'logo512.png',
    'logoApple.png',
    'manifest.json',
  ];
  return filePaths(cacheFiles);
}

self.oninstall = (e) => {
  e.waitUntil((async () => {
    await sendMessage({ msg: 'install' }, e.clientId);
    const cache = await caches.open(getCacheName());
    const files = getCacheFiles();
    return cache.addAll(files);
  })());
};

self.onfetch = (e) => {
  e.respondWith((async () => {
    await sendMessage({ msg: 'fetch', url: e.request.url }, e.clientId);
    const cache = await caches.open(getCacheName());
    const cached = await cache.match(e.request);
    if (cached) {
      return cached;
    }
    //??? save fetched file to cache
    return fetch(e.request);
  })());
};

self.onmessage = () => {
  //caches.delete(getCacheName());
};

async function sendMessage(data, id) {
  if (!id) {
    return;
  }

  const client = await self.clients.get(id);

  if (!client) {
    return;
  }

  client.postMessage(data);
}
