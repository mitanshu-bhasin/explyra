export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const backendURL = "https://explyra-news-engine-411853553644.us-central1.run.app";

    // 1. Sitemap Proxy
    if (url.pathname === "/sitemap.xml") {
      return fetch(backendURL + "/sitemap.xml");
    }

    // 2. Feed Proxy
    if (url.pathname === "/feed.xml") {
      return fetch(backendURL + "/feed.xml");
    }

    // 3. Articles Proxy (explyra.me/article/ -> cloud-run/generated/)
    if (url.pathname.startsWith("/article/")) {
      const newPath = url.pathname.replace("/article/", "/generated/");
      return fetch(backendURL + newPath);
    }

    // Default: Serve static assets from Cloudflare Pages
    return env.ASSETS.fetch(request);
  }
};
