import html from "../index.html";

export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === "/translate/" || url.pathname === "/translate/index.html") {
      url.pathname = "/translate";
      return Response.redirect(url.toString(), 301);
    }
    // The route is translate*, so pass through anything else (e.g. /translations) to the site.
    if (url.pathname !== "/translate") return fetch(request);

    if (request.method !== "GET" && request.method !== "HEAD") {
      return new Response("Method not allowed", { status: 405, headers: { Allow: "GET, HEAD" } });
    }

    // ?country=XX overrides for testing
    const country = (url.searchParams.get("country") || request.cf?.country || "").toUpperCase();
    const page = /^[A-Z]{2}$/.test(country)
      ? html.replace("</head>", `<script>window.COUNTRY = "${country}";</script>\n</head>`)
      : html;

    return new Response(request.method === "HEAD" ? null : page, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "private, max-age=300",
        "Referrer-Policy": "no-referrer",
        "X-Content-Type-Options": "nosniff",
      },
    });
  },
};
