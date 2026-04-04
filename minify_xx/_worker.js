export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const backendURL = "https://explyra-news-engine-411853553644.us-central1.run.app";

    const adsScript = `
<script>
  atOptions = {
    'key' : '6ba2490f903e87b89b3544dfc343bda3',
    'format' : 'iframe',
    'height' : 90,
    'width' : 728,
    'params' : {}
  };
</script>
<script src="https://www.highperformanceformat.com/6ba2490f903e87b89b3544dfc343bda3/invoke.js"></script>`;

    function transformHTML(response) {
      if (!response.headers.get("content-type")?.includes("text/html")) return response;
      const now = new Date();
      const dateStr = now.toLocaleDateString("en-US", {
        weekday: "long", month: "short", day: "numeric", year: "numeric"
      }).toUpperCase();

      return new HTMLRewriter()
        .on("body", { element(el) { el.append(adsScript, { html: true }); } })
        .on("header, div, span, p", {
          text(text) {
            if (text.text.includes("APR 2, 2026") || text.text.includes("APRIL 2, 2026")) {
              text.replace(dateStr);
            }
          },
        })
        .transform(response);
    }

    if (url.pathname === "/articles" || url.pathname.startsWith("/articles/")) {
      let subpath = url.pathname.replace("/articles", "");
      if (subpath === "" || subpath === "/") subpath = "/index.html";
      return transformHTML(await fetch(backendURL + subpath));
    }
    if (url.pathname.startsWith("/generated/")) {
      return transformHTML(await fetch(backendURL + url.pathname));
    }
    if (url.pathname === "/sitemap.xml" || url.pathname === "/articles/sitemap.xml") {
      return fetch(backendURL + "/sitemap.xml");
    }
    if (url.pathname === "/feed.xml" || url.pathname === "/articles/feed.xml") {
      return fetch(backendURL + "/feed.xml");
    }
    try {
      const response = await env.ASSETS.fetch(request);
      if (response.status !== 404) return transformHTML(response);
    } catch (e) {}
    return new Response("Not Found", { status: 404 });
  }
};