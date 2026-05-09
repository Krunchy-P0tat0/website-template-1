import { useEffect } from "react";
import { useLocation } from "wouter";
import { useSiteSettings } from "@/lib/SiteSettingsContext";

const titleMap: Record<string, string> = {
  "/": "Luxury Destination Events",
  "/about": "About the House",
  "/weddings": "Weddings",
  "/corporate": "Corporate & Brand Events",
  "/private-events": "Private Events",
  "/destinations": "Destinations",
  "/europe": "European Productions",
  "/portfolio": "Portfolio",
  "/journal": "The Journal",
  "/press": "Press",
  "/inquiry": "Begin an Inquiry",
  "/contact": "Contact",
  "/privacy": "Privacy Policy",
  "/terms": "Terms of Use",
  "/vendor": "Vendor Applications",
  "/internships": "The Atelier Internship",
  "/careers": "Careers",
};

function resolveTitle(path: string): string {
  if (titleMap[path]) return titleMap[path];
  if (path.startsWith("/portfolio/")) return "Portfolio";
  if (path.startsWith("/journal/")) return "The Journal";
  return "";
}

function setMeta(attr: string, attrVal: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${attrVal}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, attrVal);
    document.head.appendChild(el);
  }
  el.content = content;
}

function setLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.rel = rel;
    document.head.appendChild(el);
  }
  if (el.href !== href) el.href = href;
}

export function PageTitle() {
  const [location] = useLocation();
  const { settings } = useSiteSettings();
  const { siteName, faviconUrl, ogImageUrl } = settings;

  useEffect(() => {
    const page = resolveTitle(location);
    const title = page ? `${page} — ${siteName}` : siteName;
    document.title = title;
    setMeta("property", "og:title", title);
    setMeta("property", "og:site_name", siteName);
    setMeta("name", "twitter:title", siteName);
  }, [location, siteName]);

  useEffect(() => {
    const img = ogImageUrl || "/opengraph.jpg";
    setMeta("property", "og:image", img);
    setMeta("property", "og:image:alt", siteName);
    setMeta("name", "twitter:image", img);
  }, [ogImageUrl, siteName]);

  useEffect(() => {
    const icon = faviconUrl || "/favicon.svg";
    setLink("icon", icon);
    setLink("apple-touch-icon", icon);
  }, [faviconUrl]);

  return null;
}
