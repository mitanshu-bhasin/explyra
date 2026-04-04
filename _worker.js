export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const backendURL = "https://explyra-news-engine-3k63eqvzfa-uc.a.run.app";

    // 1. Legacy /article/ Redirect (301 for SEO)
    if (url.pathname.startsWith("/article/")) {
      const newPath = url.pathname.replace("/article/", "/articles/generated/");
      return Response.redirect(url.origin + newPath, 301);
    }

    // 2. Main static assets (including /articles/*)
    try {
      const response = await env.ASSETS.fetch(request);
      if (response.status !== 404) return response;
    } catch (e) {
      // Fall through to proxy if not found statically
    }

    // 3. Fallback/Proxy for Dynamic Content
    if (url.pathname === "/sitemap.xml" || url.pathname === "/articles/sitemap.xml") {
      return fetch(backendURL + "/sitemap.xml");
    }
    if (url.pathname === "/feed.xml" || url.pathname === "/articles/feed.xml") {
      return fetch(backendURL + "/feed.xml");
    }

    // 4. Default 404
    return new Response("Not Found", { status: 404 });
  }
};
