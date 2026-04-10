import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/dashboard", "/messages", "/profile"],
    },
    sitemap: "https://x.explyra.me/sitemap.xml",
  };
}
