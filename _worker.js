export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const backendURL = "https://explyra-news-engine-3k63eqvzfa-uc.a.run.app";

    // 1. Articles Proxy: Serving from Cloud Run while keeping the URL on explyra.me/articles
    if (url.pathname === "/articles" || url.pathname.startsWith("/articles/")) {
      let subpath = url.pathname.replace("/articles", "");
      if (subpath === "" || subpath === "/") {
        subpath = "/index.html"; // Ensure Cloud Run sees /index.html if articles root is requested
      }
      return fetch(backendURL + subpath);
    }

    // Fix for /generated/ path (Handles links like explyra.me/generated/article_2.html)
    if (url.pathname.startsWith("/generated/")) {
      return fetch(backendURL + url.pathname);
    }

    // 2. Legacy /article/ Redirect (301 for SEO)
    if (url.pathname.startsWith("/article/")) {
      const newPath = url.pathname.replace("/article/", "/articles/generated/");
      return Response.redirect(url.origin + newPath, 301);
    }

    // 3. Dynamic Proxies for Sitemap and Feed
    if (url.pathname === "/sitemap.xml" || url.pathname === "/articles/sitemap.xml") {
      return fetch(backendURL + "/sitemap.xml");
    }
    if (url.pathname === "/feed.xml" || url.pathname === "/articles/feed.xml") {
      return fetch(backendURL + "/feed.xml");
    }

    // 4. All other requests go to Static Cloudflare Pages (Fast & Offline-friendly)
    try {
      const response = await env.ASSETS.fetch(request);
      if (response.status !== 404) return response;
    } catch (e) {
      // Fall through to 404
    }

    return new Response("Not Found", { status: 404 });
  }
};
