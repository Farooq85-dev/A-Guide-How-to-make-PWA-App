const staticDevCoffee = "dev-coffee-site-v1"
const assets = [
  "/",
  //Add Your All files with Correct Path here and also it is better to add your logo images and fonts
  "/app.js",
  "/style.css",
  "/manifest.json",
  "/serviceworker.js",
  "android/android-launchericon-512-512.png",
  "android/android-launchericon-192-192.png",
  "android/android-launchericon-144-144.png",
  "android/android-launchericon-96-96.png",
  "android/android-launchericon-72-72.png",
  "android/android-launchericon-48-48.png",
]

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticDevCoffee).then(cache => {
      cache.addAll(assets)
    })
  )
})

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request)
    })
  )
})