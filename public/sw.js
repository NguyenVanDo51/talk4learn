if(!self.define){let e,s={};const a=(a,i)=>(a=new URL(a+".js",i).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(i,o)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(s[c])return;let t={};const f=e=>a(e,c),n={module:{uri:c},exports:t,require:f};s[c]=Promise.all(i.map((e=>n[e]||f(e)))).then((e=>(o(...e),t)))}}define(["./workbox-50de5c5d"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"c441ff0d4579f23bf9da9181992dd7ba"},{url:"/_next/static/chunks/155-ea62f39ca3e1b548.js",revision:"s53Qp9IrSocsAo7Vk31Pa"},{url:"/_next/static/chunks/326-f809526537e45676.js",revision:"s53Qp9IrSocsAo7Vk31Pa"},{url:"/_next/static/chunks/364-19cb87512af6143f.js",revision:"s53Qp9IrSocsAo7Vk31Pa"},{url:"/_next/static/chunks/472-375eda9e7c24c489.js",revision:"s53Qp9IrSocsAo7Vk31Pa"},{url:"/_next/static/chunks/479-7542db00a9cde7cb.js",revision:"s53Qp9IrSocsAo7Vk31Pa"},{url:"/_next/static/chunks/535-fd974612b105fbdf.js",revision:"s53Qp9IrSocsAo7Vk31Pa"},{url:"/_next/static/chunks/611-86e4be7a496fb733.js",revision:"s53Qp9IrSocsAo7Vk31Pa"},{url:"/_next/static/chunks/667-e68d6af2edfab9d7.js",revision:"s53Qp9IrSocsAo7Vk31Pa"},{url:"/_next/static/chunks/691-102d884c3b66ec96.js",revision:"s53Qp9IrSocsAo7Vk31Pa"},{url:"/_next/static/chunks/792-5132a6edc9cfd76f.js",revision:"s53Qp9IrSocsAo7Vk31Pa"},{url:"/_next/static/chunks/838-dea03890c8d4e3d4.js",revision:"s53Qp9IrSocsAo7Vk31Pa"},{url:"/_next/static/chunks/873-772608992e31103d.js",revision:"s53Qp9IrSocsAo7Vk31Pa"},{url:"/_next/static/chunks/899-a7cfad8c9daadbf5.js",revision:"s53Qp9IrSocsAo7Vk31Pa"},{url:"/_next/static/chunks/994-7155254f0185fe76.js",revision:"s53Qp9IrSocsAo7Vk31Pa"},{url:"/_next/static/chunks/app/(auth)/(routes)/sign-in/%5B%5B...sign-in%5D%5D/page-55c12cb19342e736.js",revision:"s53Qp9IrSocsAo7Vk31Pa"},{url:"/_next/static/chunks/app/(auth)/(routes)/sign-up/%5B%5B...sign-up%5D%5D/page-01c5b69eeedc6747.js",revision:"s53Qp9IrSocsAo7Vk31Pa"},{url:"/_next/static/chunks/app/(auth)/layout-fe0045c36d247e2f.js",revision:"s53Qp9IrSocsAo7Vk31Pa"},{url:"/_next/static/chunks/app/(root)/create/page-9a593445705c2876.js",revision:"s53Qp9IrSocsAo7Vk31Pa"},{url:"/_next/static/chunks/app/(root)/explore/page-d54b753bc8cf54cc.js",revision:"s53Qp9IrSocsAo7Vk31Pa"},{url:"/_next/static/chunks/app/(root)/layout-686ee4a8146accbb.js",revision:"s53Qp9IrSocsAo7Vk31Pa"},{url:"/_next/static/chunks/app/(root)/loading-7770685f553a06f6.js",revision:"s53Qp9IrSocsAo7Vk31Pa"},{url:"/_next/static/chunks/app/(root)/page-a1ad9aceb49d4057.js",revision:"s53Qp9IrSocsAo7Vk31Pa"},{url:"/_next/static/chunks/app/(withoutsidebar)/chat/%5BbotId%5D/page-cd992f52b619a06f.js",revision:"s53Qp9IrSocsAo7Vk31Pa"},{url:"/_next/static/chunks/app/(withoutsidebar)/layout-090dcecfb0295ae6.js",revision:"s53Qp9IrSocsAo7Vk31Pa"},{url:"/_next/static/chunks/app/(withoutsidebar)/loading-72b8c1d29f63fcbc.js",revision:"s53Qp9IrSocsAo7Vk31Pa"},{url:"/_next/static/chunks/app/_not-found-e33b2e99f0cdd99e.js",revision:"s53Qp9IrSocsAo7Vk31Pa"},{url:"/_next/static/chunks/app/layout-e71d8245e9ee8af1.js",revision:"s53Qp9IrSocsAo7Vk31Pa"},{url:"/_next/static/chunks/app/loading-c52bdd11defc98f6.js",revision:"s53Qp9IrSocsAo7Vk31Pa"},{url:"/_next/static/chunks/app/policy/page-2458caf22f371240.js",revision:"s53Qp9IrSocsAo7Vk31Pa"},{url:"/_next/static/chunks/fd9d1056-c95a6eb1d335ab7a.js",revision:"s53Qp9IrSocsAo7Vk31Pa"},{url:"/_next/static/chunks/framework-43665103d101a22d.js",revision:"s53Qp9IrSocsAo7Vk31Pa"},{url:"/_next/static/chunks/main-7bfb90c3791cdf82.js",revision:"s53Qp9IrSocsAo7Vk31Pa"},{url:"/_next/static/chunks/main-app-26466c1c16d6fdb8.js",revision:"s53Qp9IrSocsAo7Vk31Pa"},{url:"/_next/static/chunks/pages/_app-174d3fc0b06857fe.js",revision:"s53Qp9IrSocsAo7Vk31Pa"},{url:"/_next/static/chunks/pages/_error-1749fe2efd45c640.js",revision:"s53Qp9IrSocsAo7Vk31Pa"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-456f2ba3869d8479.js",revision:"s53Qp9IrSocsAo7Vk31Pa"},{url:"/_next/static/css/b10b7f6fc64bb639.css",revision:"b10b7f6fc64bb639"},{url:"/_next/static/media/0e4fe491bf84089c-s.p.woff2",revision:"5e22a46c04d947a36ea0cad07afcc9e1"},{url:"/_next/static/media/1c57ca6f5208a29b-s.woff2",revision:"491a7a9678c3cfd4f86c092c68480f23"},{url:"/_next/static/media/3dbd163d3bb09d47-s.woff2",revision:"93dcb0c222437699e9dd591d8b5a6b85"},{url:"/_next/static/media/42d52f46a26971a3-s.woff2",revision:"b44d0dd122f9146504d444f290252d88"},{url:"/_next/static/media/5647e4c23315a2d2-s.woff2",revision:"e64969a373d0acf2586d1fd4224abb90"},{url:"/_next/static/media/627622453ef56b0d-s.p.woff2",revision:"e7df3d0942815909add8f9d0c40d00d9"},{url:"/_next/static/media/7be645d133f3ee22-s.woff2",revision:"3ba6fb27a0ea92c2f1513add6dbddf37"},{url:"/_next/static/media/7c53f7419436e04b-s.woff2",revision:"fd4ff709e3581e3f62e40e90260a1ad7"},{url:"/_next/static/media/8fb72f69fba4e3d2-s.woff2",revision:"7a2e2eae214e49b4333030f789100720"},{url:"/_next/static/media/912a9cfe43c928d9-s.woff2",revision:"376ffe2ca0b038d08d5e582ec13a310f"},{url:"/_next/static/media/934c4b7cb736f2a3-s.p.woff2",revision:"1f6d3cf6d38f25d83d95f5a800b8cac3"},{url:"/_next/static/media/a5b77b63ef20339c-s.woff2",revision:"96e992d510ed36aa573ab75df8698b42"},{url:"/_next/static/media/a6d330d7873e7320-s.woff2",revision:"f7ec4e2d6c9f82076c56a871d1d23a2d"},{url:"/_next/static/media/baf12dd90520ae41-s.woff2",revision:"8096f9b1a15c26638179b6c9499ff260"},{url:"/_next/static/media/bbdb6f0234009aba-s.woff2",revision:"5756151c819325914806c6be65088b13"},{url:"/_next/static/media/cff529cd86cc0276-s.woff2",revision:"c2b2c28b98016afb2cb7e029c23f1f9f"},{url:"/_next/static/media/d117eea74e01de14-s.woff2",revision:"4d1e5298f2c7e19ba39a6ac8d88e91bd"},{url:"/_next/static/media/dfa8b99978df7bbc-s.woff2",revision:"7a500aa24dccfcf0cc60f781072614f5"},{url:"/_next/static/media/e25729ca87cc7df9-s.woff2",revision:"9a74bbc5f0d651f8f5b6df4fb3c5c755"},{url:"/_next/static/media/eb52b768f62eeeb4-s.woff2",revision:"90687dc5a4b6b6271c9f1c1d4986ca10"},{url:"/_next/static/media/f06116e890b3dadb-s.woff2",revision:"2855f7c90916c37fe4e6bd36205a26a8"},{url:"/_next/static/media/fa-brands-400.6b36005f.woff2",revision:"6b36005f"},{url:"/_next/static/media/fa-brands-400.992138ef.ttf",revision:"992138ef"},{url:"/_next/static/media/fa-duotone-900.c7247ceb.woff2",revision:"c7247ceb"},{url:"/_next/static/media/fa-duotone-900.d21cc322.ttf",revision:"d21cc322"},{url:"/_next/static/media/fa-light-300.166ed667.woff2",revision:"166ed667"},{url:"/_next/static/media/fa-light-300.88ccdef6.ttf",revision:"88ccdef6"},{url:"/_next/static/media/fa-regular-400.26b3e814.woff2",revision:"26b3e814"},{url:"/_next/static/media/fa-regular-400.26ed472d.ttf",revision:"26ed472d"},{url:"/_next/static/media/fa-solid-900.0111ff7c.ttf",revision:"0111ff7c"},{url:"/_next/static/media/fa-solid-900.1ff0942a.woff2",revision:"1ff0942a"},{url:"/_next/static/media/fa-thin-100.16a70ea4.woff2",revision:"16a70ea4"},{url:"/_next/static/media/fa-thin-100.7c64f7d8.ttf",revision:"7c64f7d8"},{url:"/_next/static/media/fa-v4compatibility.077f6ca8.ttf",revision:"077f6ca8"},{url:"/_next/static/media/fa-v4compatibility.1b0a9653.woff2",revision:"1b0a9653"},{url:"/_next/static/s53Qp9IrSocsAo7Vk31Pa/_buildManifest.js",revision:"6822c4d5aaf7f92a59445cc0c6947e1d"},{url:"/_next/static/s53Qp9IrSocsAo7Vk31Pa/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/android-chrome-192x192.png",revision:"23d96995d2b9240d488b72125a5cf410"},{url:"/android-chrome-512x512.png",revision:"111a3ca066a8169b115cb0ddf8ba7480"},{url:"/apple-touch-icon.png",revision:"8642cfe14ddd3fa1e32b1d52abe182b7"},{url:"/bot_placeholder.png",revision:"278bdfb583c7c7d73dcc3e0584598441"},{url:"/favicon-16x16.png",revision:"1eb5bd650f2c0d6e74e8660d923afd69"},{url:"/favicon-32x32.png",revision:"0eab6d97bfb53a007c0750039e432368"},{url:"/fontawesome/css/all.css",revision:"c44463d510a0d55437bb1a9f5c9f7530"},{url:"/fontawesome/css/sharp-light.css",revision:"088a533b0805434c82eb348258dc8fc4"},{url:"/fontawesome/css/sharp-regular.css",revision:"b367ef6d5ce8af8f375b55aeebc41e38"},{url:"/fontawesome/css/sharp-solid.css",revision:"757773eb9ed2194220febe00786a5597"},{url:"/fontawesome/webfonts/fa-brands-400.eot",revision:"764a8efba3c8a098aa85b4c37b8155a6"},{url:"/fontawesome/webfonts/fa-brands-400.svg",revision:"ae4fe91a2855d5fa4ff8c77bf073fe83"},{url:"/fontawesome/webfonts/fa-brands-400.ttf",revision:"8d2c11bfefaa06777f86e3d504422ed1"},{url:"/fontawesome/webfonts/fa-brands-400.woff",revision:"36e7a8bfb3f250ddc37493130add89e5"},{url:"/fontawesome/webfonts/fa-brands-400.woff2",revision:"f022fca674f561d3f3f9f187a7fa3222"},{url:"/fontawesome/webfonts/fa-duotone-900.eot",revision:"e6a9123b6d6d89911e7a3d7f01e33f82"},{url:"/fontawesome/webfonts/fa-duotone-900.svg",revision:"a721737c2138f8142bd97bf27a995ae2"},{url:"/fontawesome/webfonts/fa-duotone-900.ttf",revision:"f48dc2a7c17646a48d63ae4e7d1584e8"},{url:"/fontawesome/webfonts/fa-duotone-900.woff",revision:"ea3d65a7b9829c9090b0a80c6e260a4a"},{url:"/fontawesome/webfonts/fa-duotone-900.woff2",revision:"f41b398f956e0110835289e223ab1147"},{url:"/fontawesome/webfonts/fa-light-300.eot",revision:"97468fa17b539584bbe0b351319d66e7"},{url:"/fontawesome/webfonts/fa-light-300.svg",revision:"a9d96b03f006cc09a10beb97d60d56fc"},{url:"/fontawesome/webfonts/fa-light-300.ttf",revision:"b0b8af255ee563e479319c683f8c48fd"},{url:"/fontawesome/webfonts/fa-light-300.woff",revision:"d8e14023b11ab348bcd6148a50b7ae85"},{url:"/fontawesome/webfonts/fa-light-300.woff2",revision:"183f1c8f71f9b21737cb79caea0f6c3d"},{url:"/fontawesome/webfonts/fa-regular-400.eot",revision:"75721d809c7b38cce914a6bd07b0973b"},{url:"/fontawesome/webfonts/fa-regular-400.svg",revision:"2966b20f704256f15b4ff0e33b869a7c"},{url:"/fontawesome/webfonts/fa-regular-400.ttf",revision:"bc49caa6c76dba9695b58d39ca306c75"},{url:"/fontawesome/webfonts/fa-regular-400.woff",revision:"dd012cb958a95fc77ced4ecbb7c87040"},{url:"/fontawesome/webfonts/fa-regular-400.woff2",revision:"f3100ca1d6b8939d47fe7e23a831bcd3"},{url:"/fontawesome/webfonts/fa-sharp-light-300.woff2",revision:"2315e17dd35201f4b19fcd4a41937e67"},{url:"/fontawesome/webfonts/fa-sharp-regular-400.woff2",revision:"9e643129e2db398eab0f8d326b12d355"},{url:"/fontawesome/webfonts/fa-sharp-solid-900.woff2",revision:"00291b4b3b503586be2a97c85fa07d22"},{url:"/fontawesome/webfonts/fa-solid-900.eot",revision:"9b39dfc9bafe5944979aff454bdfe44f"},{url:"/fontawesome/webfonts/fa-solid-900.svg",revision:"be869a65caeb9d97ca322c75bfe7538e"},{url:"/fontawesome/webfonts/fa-solid-900.ttf",revision:"8d1b6344c3391f41ca45c49d653c2ccb"},{url:"/fontawesome/webfonts/fa-solid-900.woff",revision:"265b724844b97d7427fc4a44c9c2e43d"},{url:"/fontawesome/webfonts/fa-solid-900.woff2",revision:"e0f1f10202002bf91422fd3768c2d744"},{url:"/fontawesome/webfonts/fa-thin-100.ttf",revision:"05d600eb0481fed5efe4ad89f6876e67"},{url:"/fontawesome/webfonts/fa-thin-100.woff2",revision:"b4e98c8d4e2a0e51a0afa2d651553bef"},{url:"/fontawesome/webfonts/fa-v4compatibility.ttf",revision:"18fdc2b11d2e2677a89107ecb39b9a8b"},{url:"/fontawesome/webfonts/fa-v4compatibility.woff2",revision:"e08822f73b5d7a9928c8f395e9782df2"},{url:"/images/favicon.ico",revision:"5e001bbe4f69b9c89160a2cdfc14c3c1"},{url:"/images/gif-recording.gif",revision:"edc80ced11bc570be0397cf779532971"},{url:"/images/mac-perview.png",revision:"eaa8aac36461fbc909daec56a86b1e59"},{url:"/images/mac-view.gif",revision:"9efb84c2988bde395f540063bed73a60"},{url:"/images/mobile-preview.png",revision:"8cd72b3d31ca7f8663a9dac096678fa9"},{url:"/logo.svg",revision:"492b1cd3e645b841dd09c8c3c91c93bf"},{url:"/logo125.png",revision:"c526265e6d06495c3a09d25d3719baa5"},{url:"/logo512.png",revision:"f94c8b963d49e5a65a6ca0b23cd26ee2"},{url:"/logo64.png",revision:"13bfafbc37dd5a96ce72c8067fd0aa36"},{url:"/site.webmanifest",revision:"e5b8bec82c107959b8346ec9982cb3bb"},{url:"/uploads/file.webm",revision:"c68c842b17bc4129afe0709a3a525706"},{url:"/vercel.svg",revision:"f6b67299b6c8acc29ae947f54a040b8b"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:i})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
