const BASE = import.meta.env.BASE_URL?.replace(/\/$/, "") ?? "";

export const SITE_CONFIG = {
  name: "Aurelia & Co.",
  tagline: "The Art of Celebration",
  locations: ["New York", "Los Angeles", "Miami", "Florence"],
} as const;

export const SOCIAL_LINKS = {
  instagram: "https://instagram.com/aureliaandco",
  instagramHandle: "@aureliaandco",
} as const;

export const INSTAGRAM_CONFIG = {
  profileUrl: SOCIAL_LINKS.instagram,
  handle: SOCIAL_LINKS.instagramHandle,
  feedEndpoint: `${BASE}/api/instagram/feed`,
} as const;
