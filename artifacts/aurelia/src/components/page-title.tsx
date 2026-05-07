import { useEffect } from "react";
import { useLocation } from "wouter";

const SUFFIX = "Aurelia & Co.";

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

export function PageTitle() {
  const [location] = useLocation();

  useEffect(() => {
    const t = resolveTitle(location);
    document.title = t ? `${t} — ${SUFFIX}` : SUFFIX;
  }, [location]);

  return null;
}
