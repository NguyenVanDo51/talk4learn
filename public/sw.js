if(!self.define){let e,s={};const a=(a,t)=>(a=new URL(a+".js",t).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(t,i)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(s[n])return;let f={};const c=e=>a(e,n),o={module:{uri:n},exports:f,require:c};s[n]=Promise.all(t.map((e=>o[e]||c(e)))).then((e=>(i(...e),f)))}}define(["./workbox-7c2a5a06"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"804df93ae62a45107a370c9499f9682b"},{url:"/_next/static/7tFs7bkR-_z2b7KqhBLtR/_buildManifest.js",revision:"53723b02eab85f5f409c6bec289da7f1"},{url:"/_next/static/7tFs7bkR-_z2b7KqhBLtR/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/1.1005944bca942438.js",revision:"1005944bca942438"},{url:"/_next/static/chunks/115-10ed7144edaaba91.js",revision:"7tFs7bkR-_z2b7KqhBLtR"},{url:"/_next/static/chunks/198-6776193f4edd6dac.js",revision:"7tFs7bkR-_z2b7KqhBLtR"},{url:"/_next/static/chunks/314-af4c0fd927c29bb4.js",revision:"7tFs7bkR-_z2b7KqhBLtR"},{url:"/_next/static/chunks/340-fac62103380eada6.js",revision:"7tFs7bkR-_z2b7KqhBLtR"},{url:"/_next/static/chunks/470-50b61aa6ac22fab6.js",revision:"7tFs7bkR-_z2b7KqhBLtR"},{url:"/_next/static/chunks/477-fa90fd66de51a5e0.js",revision:"7tFs7bkR-_z2b7KqhBLtR"},{url:"/_next/static/chunks/512.f7d8ea0b0a15b4e6.js",revision:"f7d8ea0b0a15b4e6"},{url:"/_next/static/chunks/551.6394cf944f381d0e.js",revision:"6394cf944f381d0e"},{url:"/_next/static/chunks/574-ff503216f4f995de.js",revision:"7tFs7bkR-_z2b7KqhBLtR"},{url:"/_next/static/chunks/588-81ac36197b3c3d1c.js",revision:"7tFs7bkR-_z2b7KqhBLtR"},{url:"/_next/static/chunks/596-99afb33412217ce3.js",revision:"7tFs7bkR-_z2b7KqhBLtR"},{url:"/_next/static/chunks/617-a358112600f9ef31.js",revision:"7tFs7bkR-_z2b7KqhBLtR"},{url:"/_next/static/chunks/621-d947ceed7beac6b8.js",revision:"7tFs7bkR-_z2b7KqhBLtR"},{url:"/_next/static/chunks/641-5c7e8cadde6009a1.js",revision:"7tFs7bkR-_z2b7KqhBLtR"},{url:"/_next/static/chunks/685-af35b500ee553f24.js",revision:"7tFs7bkR-_z2b7KqhBLtR"},{url:"/_next/static/chunks/749-322ed78214b4e396.js",revision:"7tFs7bkR-_z2b7KqhBLtR"},{url:"/_next/static/chunks/835-56aedf8bcd9bb942.js",revision:"7tFs7bkR-_z2b7KqhBLtR"},{url:"/_next/static/chunks/872.ef127316051a1ea4.js",revision:"ef127316051a1ea4"},{url:"/_next/static/chunks/954-755a49e6d25817d7.js",revision:"7tFs7bkR-_z2b7KqhBLtR"},{url:"/_next/static/chunks/app/app/conversations/%5Bid%5D/page-b496c6fb3d5b792e.js",revision:"7tFs7bkR-_z2b7KqhBLtR"},{url:"/_next/static/chunks/app/app/conversations/page-40d802c50d0fb87a.js",revision:"7tFs7bkR-_z2b7KqhBLtR"},{url:"/_next/static/chunks/app/app/layout-52c24d2b8a9dcdae.js",revision:"7tFs7bkR-_z2b7KqhBLtR"},{url:"/_next/static/chunks/app/app/loading-dfc643fb3883643e.js",revision:"7tFs7bkR-_z2b7KqhBLtR"},{url:"/_next/static/chunks/app/app/page-3cc2757d319f750e.js",revision:"7tFs7bkR-_z2b7KqhBLtR"},{url:"/_next/static/chunks/app/layout-61f66ff226dd369d.js",revision:"7tFs7bkR-_z2b7KqhBLtR"},{url:"/_next/static/chunks/app/lessons/%5Bid%5D/page-688f6f65faa5af1c.js",revision:"7tFs7bkR-_z2b7KqhBLtR"},{url:"/_next/static/chunks/app/lessons/page-8c65fdca98c6b689.js",revision:"7tFs7bkR-_z2b7KqhBLtR"},{url:"/_next/static/chunks/app/loading-1e12912a78720e3c.js",revision:"7tFs7bkR-_z2b7KqhBLtR"},{url:"/_next/static/chunks/app/page-9fe52fa3b71065f0.js",revision:"7tFs7bkR-_z2b7KqhBLtR"},{url:"/_next/static/chunks/app/policy/page-88493dbc7438ce09.js",revision:"7tFs7bkR-_z2b7KqhBLtR"},{url:"/_next/static/chunks/fd9d1056-a6a51877aa8a0ab8.js",revision:"7tFs7bkR-_z2b7KqhBLtR"},{url:"/_next/static/chunks/framework-43665103d101a22d.js",revision:"7tFs7bkR-_z2b7KqhBLtR"},{url:"/_next/static/chunks/main-app-f48609adbe57eb6b.js",revision:"7tFs7bkR-_z2b7KqhBLtR"},{url:"/_next/static/chunks/main-b1fb80bd4e6c15c0.js",revision:"7tFs7bkR-_z2b7KqhBLtR"},{url:"/_next/static/chunks/pages/_app-6b79a29ad0d63b21.js",revision:"7tFs7bkR-_z2b7KqhBLtR"},{url:"/_next/static/chunks/pages/_error-9aeb3e4d490fe4b8.js",revision:"7tFs7bkR-_z2b7KqhBLtR"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-8f13f29517a169c1.js",revision:"7tFs7bkR-_z2b7KqhBLtR"},{url:"/_next/static/css/d8af066d305d2d00.css",revision:"d8af066d305d2d00"},{url:"/_next/static/media/2aaf0723e720e8b9-s.p.woff2",revision:"e1b9f0ecaaebb12c93064cd3c406f82b"},{url:"/_next/static/media/9c4f34569c9b36ca-s.woff2",revision:"2c1fc211bf5cca7ae7e7396dc9e4c824"},{url:"/_next/static/media/ae9ae6716d4f8bf8-s.woff2",revision:"b0c49a041e15bdbca22833f1ed5cfb19"},{url:"/_next/static/media/b1db3e28af9ef94a-s.woff2",revision:"70afeea69c7f52ffccde29e1ea470838"},{url:"/_next/static/media/b967158bc7d7a9fb-s.woff2",revision:"08ccb2a3cfc83cf18d4a3ec64dd7c11b"},{url:"/_next/static/media/c0f5ec5bbf5913b7-s.woff2",revision:"8ca5bc1cd1579933b73e51ec9354eec9"},{url:"/_next/static/media/d1d9458b69004127-s.woff2",revision:"9885d5da3e4dfffab0b4b1f4a259ca27"},{url:"/_next/static/media/fa-brands-400.6b36005f.woff2",revision:"6b36005f"},{url:"/_next/static/media/fa-brands-400.992138ef.ttf",revision:"992138ef"},{url:"/_next/static/media/fa-duotone-900.c7247ceb.woff2",revision:"c7247ceb"},{url:"/_next/static/media/fa-duotone-900.d21cc322.ttf",revision:"d21cc322"},{url:"/_next/static/media/fa-light-300.166ed667.woff2",revision:"166ed667"},{url:"/_next/static/media/fa-light-300.88ccdef6.ttf",revision:"88ccdef6"},{url:"/_next/static/media/fa-regular-400.26b3e814.woff2",revision:"26b3e814"},{url:"/_next/static/media/fa-regular-400.26ed472d.ttf",revision:"26ed472d"},{url:"/_next/static/media/fa-solid-900.0111ff7c.ttf",revision:"0111ff7c"},{url:"/_next/static/media/fa-solid-900.1ff0942a.woff2",revision:"1ff0942a"},{url:"/_next/static/media/fa-thin-100.16a70ea4.woff2",revision:"16a70ea4"},{url:"/_next/static/media/fa-thin-100.7c64f7d8.ttf",revision:"7c64f7d8"},{url:"/_next/static/media/fa-v4compatibility.077f6ca8.ttf",revision:"077f6ca8"},{url:"/_next/static/media/fa-v4compatibility.1b0a9653.woff2",revision:"1b0a9653"},{url:"/android-chrome-192x192.png",revision:"23d96995d2b9240d488b72125a5cf410"},{url:"/android-chrome-512x512.png",revision:"111a3ca066a8169b115cb0ddf8ba7480"},{url:"/apple-touch-icon.png",revision:"8642cfe14ddd3fa1e32b1d52abe182b7"},{url:"/favicon-16x16.png",revision:"1eb5bd650f2c0d6e74e8660d923afd69"},{url:"/favicon-32x32.png",revision:"0eab6d97bfb53a007c0750039e432368"},{url:"/fontawesome/css/all.css",revision:"c44463d510a0d55437bb1a9f5c9f7530"},{url:"/fontawesome/css/sharp-light.css",revision:"088a533b0805434c82eb348258dc8fc4"},{url:"/fontawesome/css/sharp-regular.css",revision:"b367ef6d5ce8af8f375b55aeebc41e38"},{url:"/fontawesome/css/sharp-solid.css",revision:"757773eb9ed2194220febe00786a5597"},{url:"/fontawesome/webfonts/fa-brands-400.eot",revision:"764a8efba3c8a098aa85b4c37b8155a6"},{url:"/fontawesome/webfonts/fa-brands-400.svg",revision:"ae4fe91a2855d5fa4ff8c77bf073fe83"},{url:"/fontawesome/webfonts/fa-brands-400.ttf",revision:"8d2c11bfefaa06777f86e3d504422ed1"},{url:"/fontawesome/webfonts/fa-brands-400.woff",revision:"36e7a8bfb3f250ddc37493130add89e5"},{url:"/fontawesome/webfonts/fa-brands-400.woff2",revision:"f022fca674f561d3f3f9f187a7fa3222"},{url:"/fontawesome/webfonts/fa-duotone-900.eot",revision:"e6a9123b6d6d89911e7a3d7f01e33f82"},{url:"/fontawesome/webfonts/fa-duotone-900.svg",revision:"a721737c2138f8142bd97bf27a995ae2"},{url:"/fontawesome/webfonts/fa-duotone-900.ttf",revision:"f48dc2a7c17646a48d63ae4e7d1584e8"},{url:"/fontawesome/webfonts/fa-duotone-900.woff",revision:"ea3d65a7b9829c9090b0a80c6e260a4a"},{url:"/fontawesome/webfonts/fa-duotone-900.woff2",revision:"f41b398f956e0110835289e223ab1147"},{url:"/fontawesome/webfonts/fa-light-300.eot",revision:"97468fa17b539584bbe0b351319d66e7"},{url:"/fontawesome/webfonts/fa-light-300.svg",revision:"a9d96b03f006cc09a10beb97d60d56fc"},{url:"/fontawesome/webfonts/fa-light-300.ttf",revision:"b0b8af255ee563e479319c683f8c48fd"},{url:"/fontawesome/webfonts/fa-light-300.woff",revision:"d8e14023b11ab348bcd6148a50b7ae85"},{url:"/fontawesome/webfonts/fa-light-300.woff2",revision:"183f1c8f71f9b21737cb79caea0f6c3d"},{url:"/fontawesome/webfonts/fa-regular-400.eot",revision:"75721d809c7b38cce914a6bd07b0973b"},{url:"/fontawesome/webfonts/fa-regular-400.svg",revision:"2966b20f704256f15b4ff0e33b869a7c"},{url:"/fontawesome/webfonts/fa-regular-400.ttf",revision:"bc49caa6c76dba9695b58d39ca306c75"},{url:"/fontawesome/webfonts/fa-regular-400.woff",revision:"dd012cb958a95fc77ced4ecbb7c87040"},{url:"/fontawesome/webfonts/fa-regular-400.woff2",revision:"f3100ca1d6b8939d47fe7e23a831bcd3"},{url:"/fontawesome/webfonts/fa-sharp-light-300.woff2",revision:"2315e17dd35201f4b19fcd4a41937e67"},{url:"/fontawesome/webfonts/fa-sharp-regular-400.woff2",revision:"9e643129e2db398eab0f8d326b12d355"},{url:"/fontawesome/webfonts/fa-sharp-solid-900.woff2",revision:"00291b4b3b503586be2a97c85fa07d22"},{url:"/fontawesome/webfonts/fa-solid-900.eot",revision:"9b39dfc9bafe5944979aff454bdfe44f"},{url:"/fontawesome/webfonts/fa-solid-900.svg",revision:"be869a65caeb9d97ca322c75bfe7538e"},{url:"/fontawesome/webfonts/fa-solid-900.ttf",revision:"8d1b6344c3391f41ca45c49d653c2ccb"},{url:"/fontawesome/webfonts/fa-solid-900.woff",revision:"265b724844b97d7427fc4a44c9c2e43d"},{url:"/fontawesome/webfonts/fa-solid-900.woff2",revision:"e0f1f10202002bf91422fd3768c2d744"},{url:"/fontawesome/webfonts/fa-thin-100.ttf",revision:"05d600eb0481fed5efe4ad89f6876e67"},{url:"/fontawesome/webfonts/fa-thin-100.woff2",revision:"b4e98c8d4e2a0e51a0afa2d651553bef"},{url:"/fontawesome/webfonts/fa-v4compatibility.ttf",revision:"18fdc2b11d2e2677a89107ecb39b9a8b"},{url:"/fontawesome/webfonts/fa-v4compatibility.woff2",revision:"e08822f73b5d7a9928c8f395e9782df2"},{url:"/images/favicon.ico",revision:"5e001bbe4f69b9c89160a2cdfc14c3c1"},{url:"/images/mac-perview.png",revision:"eaa8aac36461fbc909daec56a86b1e59"},{url:"/images/mac-view.gif",revision:"9efb84c2988bde395f540063bed73a60"},{url:"/images/mobile-preview.png",revision:"8cd72b3d31ca7f8663a9dac096678fa9"},{url:"/logo.svg",revision:"492b1cd3e645b841dd09c8c3c91c93bf"},{url:"/logo125.png",revision:"c526265e6d06495c3a09d25d3719baa5"},{url:"/logo512.png",revision:"f94c8b963d49e5a65a6ca0b23cd26ee2"},{url:"/logo64.png",revision:"13bfafbc37dd5a96ce72c8067fd0aa36"},{url:"/site.webmanifest",revision:"e5b8bec82c107959b8346ec9982cb3bb"},{url:"/vercel.svg",revision:"f6b67299b6c8acc29ae947f54a040b8b"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:t})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
