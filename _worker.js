export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const backendURL = "https://explyra-news-engine-3k63eqvzfa-uc.a.run.app";

    // 1. Sitemap Proxy
    if (url.pathname === "/sitemap.xml" || url.pathname === "/articles/sitemap.xml") {
      return fetch(backendURL + "/sitemap.xml");
    }

    // 2. Feed Proxy
    if (url.pathname === "/feed.xml" || url.pathname === "/articles/feed.xml") {
      return fetch(backendURL + "/feed.xml");
    }

    // 3. Articles & Archive Proxy (/articles/* -> cloud-run/*)
    // This handles:
    // /articles -> /index.html
    // /articles/archive.html -> /archive.html
    // /articles/generated/filename.html -> /generated/filename.html
    if (url.pathname === "/articles" || url.pathname.startsWith("/articles/")) {
      let subpath = url.pathname.replace("/articles", "");
      if (subpath === "" || subpath === "/") {
        subpath = "/index.html";
      }
      return fetch(backendURL + subpath);
    }

    // 4. Legacy single /article/ mapping (for backward compatibility if needed)
    if (url.pathname.startsWith("/article/")) {
      const newPath = url.pathname.replace("/article/", "/generated/");
      return fetch(backendURL + newPath);
    }

    // Default: Serve static assets from Cloudflare Pages
    try {
      return await env.ASSETS.fetch(request);
    } catch (e) {
      return new Response("Asset Not Found", { status: 404 });
    }
  }
};
