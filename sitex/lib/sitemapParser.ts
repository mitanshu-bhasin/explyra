export const extractLocsFromXml = (xmlString: string, currentDomain?: string): string[] => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlString, "text/xml");
  const locs = Array.from(xmlDoc.getElementsByTagName("loc")).map((el) => el.textContent || "").filter(Boolean);

  if (currentDomain) {
    // Basic domain validation
    return locs.filter(url => {
      try {
        const urlObj = new URL(url);
        return urlObj.hostname.includes(currentDomain.replace(/https?:\/\//, ''));
      } catch {
        return false;
      }
    });
  }
  return locs;
};

export const fetchSitemap = async (url: string): Promise<string> => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to fetch sitemap`);
  return await res.text();
};
