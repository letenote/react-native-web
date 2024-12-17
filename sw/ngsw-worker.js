import { CacheableResponsePlugin } from "workbox-cacheable-response";
import { clientsClaim, setCacheNameDetails } from "workbox-core";
import { ExpirationPlugin } from "workbox-expiration";
import { precacheAndRoute, createHandlerBoundToURL } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { StaleWhileRevalidate } from "workbox-strategies";

const DAY_IN_SECOND = 24 * 60 * 60;
const WEEK_IN_SECOND = DAY_IN_SECOND * 7;
setCacheNameDetails({
  prefix: "pmn",
  suffix: "v1",
  precache: "portal",
  runtime: "run-time",
  googleAnalytics: "ga",
});

clientsClaim();
precacheAndRoute(self.__WB_MANIFEST);

const fileExtensionRegexp = new RegExp("/[^/?]+\\.[^/]+$");
registerRoute(({ request, url }) => {
  if (request.mode !== "navigate") {
    return false;
  }

  if (url.pathname.startsWith("/_")) {
    return false;
  }

  if (url.pathname.match(fileExtensionRegexp)) {
    return false;
  }

  return true;
}, createHandlerBoundToURL(process.env.PUBLIC_URL + "/index.html"));

registerRoute(
  ({ url }) =>
    url.origin === self.location.origin && url.pathname.endsWith(".png"),
  new StaleWhileRevalidate({
    cacheName: "images",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: WEEK_IN_SECOND,
        purgeOnQuotaError: true,
      }),
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
