import { INSTAGRAM_CONFIG } from "./config";

export const INSTAGRAM_URL = INSTAGRAM_CONFIG.profileUrl;

export interface SocialPost {
  id: string;
  image: string;
  caption: string;
  href: string;
  alt: string;
}

export const PLACEHOLDER_POSTS: SocialPost[] = [
  {
    id: "post-1",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=80",
    caption: "Lake Como in September — where the light never quite lets go.",
    alt: "Elegant wedding reception at Lake Como with floral arrangements",
    href: INSTAGRAM_URL,
  },
  {
    id: "post-2",
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&q=80",
    caption: "Every table tells a story. This one took three weeks to write.",
    alt: "Luxury event table setting with candles and florals",
    href: INSTAGRAM_URL,
  },
  {
    id: "post-3",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    caption: "Florals for a private birthday in Marrakech. Unseen until now.",
    alt: "Opulent floral installation in a Marrakech riad",
    href: INSTAGRAM_URL,
  },
  {
    id: "post-4",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&q=80",
    caption: "The rehearsal dinner is always where the real magic begins.",
    alt: "Intimate rehearsal dinner with candlelit ambiance",
    href: INSTAGRAM_URL,
  },
  {
    id: "post-5",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&q=80",
    caption: "Corporate is not the opposite of beautiful. It never was.",
    alt: "Sophisticated corporate event production with dramatic lighting",
    href: INSTAGRAM_URL,
  },
  {
    id: "post-6",
    image: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=600&q=80",
    caption: "A Tuscan afternoon. 120 guests. Zero visible effort.",
    alt: "Outdoor wedding reception in the Tuscan countryside",
    href: INSTAGRAM_URL,
  },
];

export async function fetchInstagramFeed(): Promise<SocialPost[]> {
  try {
    const res = await fetch(INSTAGRAM_CONFIG.feedEndpoint);
    if (!res.ok) throw new Error(`Feed fetch failed: ${res.status}`);
    const data = await res.json();
    if (Array.isArray(data.posts) && data.posts.length > 0) {
      return data.posts;
    }
    return PLACEHOLDER_POSTS;
  } catch {
    return PLACEHOLDER_POSTS;
  }
}
