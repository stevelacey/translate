// Serves the single-page app at steve.ly/translate. The page itself is index.html, bundled as text.
import html from "../index.html";

export default {
  async fetch(request) {
    const url = new URL(request.url);

    // One canonical URL: /translate (not /translate/ or /translate/index.html). Query strings
    // (?utm_source, ?fbclid…) are fine and preserved.
    if (url.pathname === "/translate/" || url.pathname === "/translate/index.html") {
      url.pathname = "/translate";
      return Response.redirect(url.toString(), 301);
    }
    // The route is steve.ly/translate* so it also catches e.g. /translations; hand those back to the site.
    if (url.pathname !== "/translate") return fetch(request);

    if (request.method !== "GET" && request.method !== "HEAD") {
      return new Response("Method not allowed", { status: 405, headers: { Allow: "GET, HEAD" } });
    }

    return new Response(request.method === "HEAD" ? null : html, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "public, max-age=300",
        "Referrer-Policy": "no-referrer",
        "X-Content-Type-Options": "nosniff",
      },
    });
  },
};
