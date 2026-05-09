import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react";

const BASE = import.meta.env.BASE_URL?.replace(/\/$/, "") ?? "";

export interface SiteSettings {
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

export const BRAND_DEFAULTS: SiteSettings = {
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

interface SiteSettingsContextValue {
  settings: SiteSettings;
  loading: boolean;
  refresh: () => void;
}

const SiteSettingsContext = createContext<SiteSettingsContextValue>({
  settings: BRAND_DEFAULTS,
  loading: false,
  refresh: () => {},
});

export function SiteSettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings>(BRAND_DEFAULTS);
  const [loading, setLoading] = useState(true);

  const fetchSettings = useCallback(() => {
    fetch(`${BASE}/api/brand`)
      .then((r) => {
        if (!r.ok) throw new Error("settings fetch failed");
        return r.json() as Promise<Partial<SiteSettings>>;
      })
      .then((data) => setSettings({ ...BRAND_DEFAULTS, ...data }))
      .catch(() => { /* silently use defaults */ })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  return (
    <SiteSettingsContext.Provider value={{ settings, loading, refresh: fetchSettings }}>
      {children}
    </SiteSettingsContext.Provider>
  );
}

export function useSiteSettings(): SiteSettingsContextValue {
  return useContext(SiteSettingsContext);
}
