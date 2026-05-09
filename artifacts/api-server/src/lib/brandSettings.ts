import { db, siteSettingsTable } from "@workspace/db";

export interface BrandSettings {
  siteName: string;
  siteTagline: string;
  logoUrl: string;
  faviconUrl: string;
  primaryEmail: string;
  primaryPhone: string;
  instagramUrl: string;
  linkedinUrl: string;
  pinterestUrl: string;
  ogImageUrl: string;
}

export const BRAND_DEFAULTS: BrandSettings = {
  siteName: "Aurelia & Co.",
  siteTagline: "The Art of Celebration",
  logoUrl: "",
  faviconUrl: "/favicon.svg",
  primaryEmail: "hello@aureliaco.com",
  primaryPhone: "+1 (212) 555-0123",
  instagramUrl: "https://www.instagram.com/",
  linkedinUrl: "https://www.linkedin.com/",
  pinterestUrl: "https://www.pinterest.com/",
  ogImageUrl: "/opengraph.jpg",
};

export const BRAND_KEYS: Record<keyof BrandSettings, string> = {
  siteName: "brand_site_name",
  siteTagline: "brand_site_tagline",
  logoUrl: "brand_logo_url",
  faviconUrl: "brand_favicon_url",
  primaryEmail: "brand_primary_email",
  primaryPhone: "brand_primary_phone",
  instagramUrl: "brand_instagram_url",
  linkedinUrl: "brand_linkedin_url",
  pinterestUrl: "brand_pinterest_url",
  ogImageUrl: "brand_og_image_url",
};

const CACHE_TTL = 5 * 60 * 1000;
let cache: { settings: BrandSettings; expiry: number } | null = null;

export function invalidateBrandCache(): void {
  cache = null;
}

export async function getBrandSettings(): Promise<BrandSettings> {
  if (cache && Date.now() < cache.expiry) return cache.settings;

  try {
    const rows = await db.select().from(siteSettingsTable);
    const map = Object.fromEntries(rows.map((r) => [r.key, r.value]));

    const settings: BrandSettings = {
      siteName: map[BRAND_KEYS.siteName] ?? BRAND_DEFAULTS.siteName,
      siteTagline: map[BRAND_KEYS.siteTagline] ?? BRAND_DEFAULTS.siteTagline,
      logoUrl: map[BRAND_KEYS.logoUrl] ?? BRAND_DEFAULTS.logoUrl,
      faviconUrl: map[BRAND_KEYS.faviconUrl] ?? BRAND_DEFAULTS.faviconUrl,
      primaryEmail: map[BRAND_KEYS.primaryEmail] ?? BRAND_DEFAULTS.primaryEmail,
      primaryPhone: map[BRAND_KEYS.primaryPhone] ?? BRAND_DEFAULTS.primaryPhone,
      instagramUrl: map[BRAND_KEYS.instagramUrl] ?? BRAND_DEFAULTS.instagramUrl,
      linkedinUrl: map[BRAND_KEYS.linkedinUrl] ?? BRAND_DEFAULTS.linkedinUrl,
      pinterestUrl: map[BRAND_KEYS.pinterestUrl] ?? BRAND_DEFAULTS.pinterestUrl,
      ogImageUrl: map[BRAND_KEYS.ogImageUrl] ?? BRAND_DEFAULTS.ogImageUrl,
    };

    cache = { settings, expiry: Date.now() + CACHE_TTL };
    return settings;
  } catch {
    return { ...BRAND_DEFAULTS };
  }
}

export async function saveBrandSettings(settings: BrandSettings): Promise<void> {
  const updates = (Object.keys(BRAND_KEYS) as Array<keyof BrandSettings>).map((field) => ({
    key: BRAND_KEYS[field],
    value: settings[field] ?? "",
  }));

  for (const u of updates) {
    await db
      .insert(siteSettingsTable)
      .values({ key: u.key, value: u.value })
      .onConflictDoUpdate({
        target: siteSettingsTable.key,
        set: { value: u.value, updatedAt: new Date() },
      });
  }

  invalidateBrandCache();
}
