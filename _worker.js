export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const backendURL = "https://explyra-news-engine-411853553644.us-central1.run.app";

    // Ad script provided by the user
    const adsScript = `
<script>
  atOptions = {
    'key' : '4147493a3880628203f19f170af36691',
    'format' : 'iframe',
    'height' : 90,
    'width' : 728,
    'params' : {}
  };
</script>
<script src="https://www.highperformanceformat.com/4147493a3880628203f19f170af36691/invoke.js"></script>`;

    // Helper to dynamically update HTML content (Ads + Date)
    function transformHTML(response) {
      if (!response.headers.get("content-type")?.includes("text/html")) return response;

      const now = new Date();
      const dateStr = now.toLocaleDateString("en-US", {
        weekday: "long", month: "short", day: "numeric", year: "numeric"
      }).toUpperCase();

      return new HTMLRewriter()
        .on("body", {
          element(el) {
            el.append(adsScript, { html: true });
          },
        })
        .on("header, div, span, p", {
          text(text) {
            const content = text.text;
            if (content.includes("APR 2, 2026") || content.includes("APRIL 2, 2026")) {
              text.replace(dateStr);
            }
          },
        })
        .transform(response);
    }

    // 1. Articles Proxy (Cloud Run)
    if (url.pathname === "/articles" || url.pathname.startsWith("/articles/")) {
      let subpath = url.pathname.replace("/articles", "");
      if (subpath === "" || subpath === "/") subpath = "/index.html";
      const response = await fetch(backendURL + subpath);
      return transformHTML(response);
    }

    // 2. Generated Assets/Articles Proxy
    if (url.pathname.startsWith("/generated/")) {
      const response = await fetch(backendURL + url.pathname);
      return transformHTML(response);
    }

    // 3. Dynamic Proxies for Sitemap and Feed (Proxies only if not found locally)
    if (url.pathname === "/feed.xml" || url.pathname === "/articles/feed.xml") {
      try {
        const response = await fetch(backendURL + "/feed.xml");
        if (response.ok) return response;
      } catch (e) {}
    }

    // 4. All other static assets (Sitemap, Robots, root HTML, etc.)
    try {
      const response = await env.ASSETS.fetch(request);
      if (response.status !== 404) {
        return transformHTML(response);
      }
    } catch (e) {}

    // Fallback for sitemap if not in ASSETS
    if (url.pathname === "/sitemap.xml") {
      const response = await fetch(backendURL + "/sitemap.xml");
      return response;
    }

    return new Response("Not Found", { status: 404 });
  }
};
