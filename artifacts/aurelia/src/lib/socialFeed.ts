export const INSTAGRAM_URL = "https://instagram.com/aureliaandco";

export interface SocialPost {
  id: string;
  image: string;
  caption: string;
  href: string;
}

export const socialPosts: SocialPost[] = [
  {
    id: "post-1",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=80",
    caption: "Lake Como in September — where the light never quite lets go.",
    href: INSTAGRAM_URL,
  },
  {
    id: "post-2",
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&q=80",
    caption: "Every table tells a story. This one took three weeks to write.",
    href: INSTAGRAM_URL,
  },
  {
    id: "post-3",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    caption: "Florals for a private birthday in Marrakech. Unseen until now.",
    href: INSTAGRAM_URL,
  },
  {
    id: "post-4",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&q=80",
    caption: "The rehearsal dinner is always where the real magic begins.",
    href: INSTAGRAM_URL,
  },
  {
    id: "post-5",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&q=80",
    caption: "Corporate is not the opposite of beautiful. It never was.",
    href: INSTAGRAM_URL,
  },
  {
    id: "post-6",
    image: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=600&q=80",
    caption: "A Tuscan afternoon. 120 guests. Zero visible effort.",
    href: INSTAGRAM_URL,
  },
];
