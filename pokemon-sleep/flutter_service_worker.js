'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "91b4fd76da91584f675455218228b297",
"assets/AssetManifest.bin.json": "fce4392f5b6a9008bc70638b255a302f",
"assets/AssetManifest.json": "4637d8ef480565aa11bb9dcf852a0290",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "3c612413b14dbb70429f585932c8e317",
"assets/images/beanburgercurry.png": "21ed85b54cce31206efd320d0ae0fcba",
"assets/images/beanhamsalad.png": "d9be6cd8aa1b80bc66dca128ac9d8acd",
"assets/images/beansausage.png": "d11c83153687979377ecd001e1ca9d24",
"assets/images/bigmalasada.png": "6cf50b8cf5660a0b5fa2166f0c76b943",
"assets/images/bulkupbeancurry.png": "3021b17573b9e691b6d121fa061aecb8",
"assets/images/calmmindfruitsalad.png": "3dbb3f7c430dbb2cc76e4908fac6808e",
"assets/images/cloudninesoycake.png": "cecbe1d7524c3cf3c4ba3fbc908cf1e4",
"assets/images/contrarychocolatemeatsalad.png": "ec8d4562ca2dc6e2850a8b98808d86e6",
"assets/images/craftsodapop.png": "4180f0e17cd23c20090475a9d49dd84e",
"assets/images/dazzlingapplecheesesalad.png": "8333143d8885a7cb6cb6766a79fe3c5f",
"assets/images/dreameaterbuttercurry.png": "96eeb11611c654ea38086f8fbe33e39f",
"assets/images/droughtkatsucurry.png": "969a2a3400265cd0daf8318ea88a9a27",
"assets/images/eggbombcurry.png": "315f6d73c70f7ec661f287261e00f194",
"assets/images/embergingertea.png": "9468d6e1748b04acc7d07d8a781e4725",
"assets/images/explosionpopcorn.png": "e0810d483e0abb1256be9f2bfa507a9a",
"assets/images/fancyapple.png": "b29576dff47f22aec285559711a85e47",
"assets/images/fancyapplecurry.png": "2380bf01da6e19beadd3ea376e080b8e",
"assets/images/fancyapplejuice.png": "329d893b100da98737d413552fcba90e",
"assets/images/fancyapplesalad.png": "a60e9fdc2594cab9d8918b1aff2c0105",
"assets/images/fancyegg.png": "a7f0482769ac7dc14649cddd9d872850",
"assets/images/fieryherb.png": "dd6fe30d5d78c58290e2f526252b7196",
"assets/images/flowergiftmacarons.png": "66a95edb8d4eaf18ac10fb37cb00208a",
"assets/images/fluffysweetpotatoes.png": "82867a88743f9b862f47d4fc9f123a41",
"assets/images/furyattackcornsalad.png": "be84c908c100d8791fa71c164e4987e3",
"assets/images/gluttonypotatosalad.png": "e577bf8dead6ff7a1d70382b87f9a8bf",
"assets/images/greengrasscorn.png": "7a980aaae0f26e2d479d53124df08107",
"assets/images/greengrasssalad.png": "4fc8611b66f39e5308828f37930e6e8e",
"assets/images/greengrasssoybeans.png": "f8454c4df2924dfd5e5430e5cc808dfe",
"assets/images/grilledtailcurry.png": "1b60429d6fbd73f0f73e9f3d398c8b35",
"assets/images/heartycheeseburgercurry.png": "bb2a7cf38d3e507f6977007b7a6af6f0",
"assets/images/heatwavetofusalad.png": "7cd7221bd22a2b981322d9db695a293f",
"assets/images/honey.png": "950055d80fd81c987c5933541cc9fc5f",
"assets/images/hugepowersoydonuts.png": "86f932be36fa4433a33051ba16aadcc4",
"assets/images/hustleproteinsmoothie.png": "cd1964f07a653660775e8bd608ab74de",
"assets/images/immunityleeksalad.png": "0e956e35ec0003b73acb1fb83c9e74db",
"assets/images/infernocornkeemacurry.png": "404dd0b01e6d939b98b06104970694a4",
"assets/images/jigglypuff'sfruityflan.png": "047f3cc8dcb905e478412e105c4295d6",
"assets/images/largeleek.png": "25db14324d177009cbc062758ff9d517",
"assets/images/limbercornstew.png": "afa0e4de4b1a010dfcea79bcbd0ddaba",
"assets/images/lovelykisssmoothie.png": "a0b24e2e67f6a9826f5177960fe023c1",
"assets/images/luckychantapplepie.png": "ba95cd9b451d88f64550766ab25ae8d6",
"assets/images/meltyomelettecurry.png": "534006b64133d2478cb5482ecd810c65",
"assets/images/mildhoneycurry.png": "b5d5c1e99eada23ed419a43a1b5603a1",
"assets/images/mixedcurry.png": "e51295a92c7163d23155c7e4af36c227",
"assets/images/mixedjuice.png": "99b6c64b21c903f3e967a83086ba54ea",
"assets/images/mixedsalad.png": "5ac06d290995883fa2780ee0c9310ab1",
"assets/images/moomoocapresesalad.png": "2b062e97c97a730d57e5c0c84a5c77ab",
"assets/images/moomoomilk.png": "d26ec76bc8b665ee93cbded3fc0163e6",
"assets/images/neroli'srestorativetea.png": "651a51af74a133ed2a8bbc50295532ed",
"assets/images/ninjacurry.png": "3517270784d801c547fee65dd9d1e8a5",
"assets/images/ninjasalad.png": "2efe0917858a9804e085374bc9f8d913",
"assets/images/overheatgingersalad.png": "18ebe69c0202add29cf7dc250e423b2a",
"assets/images/petaldancechocolatetart.png": "44cbc32551875f4c1dccb0c724126e8e",
"assets/images/pureoil.png": "811a083638d983cd70bdb9eb473fb664",
"assets/images/simplechowder.png": "e9420c86e2d0db7bdd79f615d3eeb057",
"assets/images/slowpoketail.png": "1b4221590fff7fdfcecf7bfefd0cd84b",
"assets/images/slowpoketailpeppersalad.png": "be6f0006ad5932549efdbf867a3955b4",
"assets/images/snoozytomato.png": "f4da504662329d2ee178413c21b26263",
"assets/images/snoozytomatosalad.png": "f7e552e9eaf7e3975428815b65c5ccc6",
"assets/images/snowcloakcaesarsalad.png": "7bf1cace43ccda28540c8f61dc467b60",
"assets/images/softpotato.png": "521535192761333b2cf31837591a6add",
"assets/images/softpotatochowder.png": "b1e9ceaa0542e3a1591bc0a0001cf68b",
"assets/images/solarpowertomatocurry.png": "e0f9772f221b830d03769dcb7b9161ed",
"assets/images/soothingcacao.png": "089306f2a182ed882fb01193b4cedda2",
"assets/images/spicyleekcurry.png": "8cc64a33cffdc888e9206f39b3b5e6a4",
"assets/images/sporemushroomcurry.png": "4617134cb9633f88507c2b7c7536f185",
"assets/images/sporemushroomsalad.png": "88c54723a876d7efbe4e1387dbbbea87",
"assets/images/stalwartvegetablejuice.png": "4184b68d8c8e7d0b035cf7fb875c6e90",
"assets/images/steadfastgingercookies.png": "a30e4780e0be9147e05bfecaf2744743",
"assets/images/superpowerextremesalad.png": "d53d178c5d104e204cb939cbec1cf6f0",
"assets/images/sweetscentchocolatecake.png": "08f7c3768712984fd0d6fe9596bf1b7c",
"assets/images/tastymushroom.png": "a3868620cf21c1f6e5247c7e463c6d25",
"assets/images/teatimecornscones.png": "05377716a41907a5d9108d078fac0a51",
"assets/images/warmingginger.png": "e4eeb1d8d39d7ec9fa48208e1ca403a3",
"assets/images/warmmoomoomilk.png": "666aac64f004b3dd60f4f8e302cddf02",
"assets/images/waterveiltofusalad.png": "04125487a58e90e259338df2b1062d33",
"assets/jsons/ingredients.json": "b6090db5d008d9ff6d598ed0075905c6",
"assets/jsons/recipes.json": "02e7b497f7e3d2f283828b2efee01061",
"assets/NOTICES": "c935ac8b766ac29a8ce7a967fb8a86b5",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "89ed8f4e49bcdfc0b5bfc9b24591e347",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"canvaskit/canvaskit.js": "c86fbd9e7b17accae76e5ad116583dc4",
"canvaskit/canvaskit.js.symbols": "38cba9233b92472a36ff011dc21c2c9f",
"canvaskit/canvaskit.wasm": "3d2a2d663e8c5111ac61a46367f751ac",
"canvaskit/chromium/canvaskit.js": "43787ac5098c648979c27c13c6f804c3",
"canvaskit/chromium/canvaskit.js.symbols": "4525682ef039faeb11f24f37436dca06",
"canvaskit/chromium/canvaskit.wasm": "f5934e694f12929ed56a671617acd254",
"canvaskit/skwasm.js": "445e9e400085faead4493be2224d95aa",
"canvaskit/skwasm.js.symbols": "741d50ffba71f89345996b0aa8426af8",
"canvaskit/skwasm.wasm": "e42815763c5d05bba43f9d0337fa7d84",
"canvaskit/skwasm.worker.js": "bfb704a6c714a75da9ef320991e88b03",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "c71a09214cb6f5f8996a531350400a9a",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "2e29def1168dcff36ca22fb48e8e4996",
"/": "2e29def1168dcff36ca22fb48e8e4996",
"main.dart.js": "8e2f7aee9bfcd36cda57deb81571a3b6",
"manifest.json": "af8083c3232d7358634498c8820fced1",
"version.json": "f7f9f2918205b5834f3d42a1b1d8630c"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
