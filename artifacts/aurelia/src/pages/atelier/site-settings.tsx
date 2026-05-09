import { useEffect, useState } from "react";
import { ExternalLink, Check, AlertCircle, RefreshCw, Eye } from "lucide-react";
import { useSiteSettings, BRAND_DEFAULTS, type SiteSettings } from "@/lib/SiteSettingsContext";
import { atelierFetch } from "@/lib/atelierAuth";

type SaveState = "idle" | "saving" | "saved" | "error";

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-[10px] uppercase tracking-[0.2em] text-foreground/40 mb-1.5">
      {children}
    </label>
  );
}

function Field({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  hint,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  hint?: string;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border border-[#e8e5df] bg-[#faf9f7] px-3 py-2 text-sm text-foreground/70 focus:outline-none focus:border-foreground/30 rounded transition-colors"
      />
      {hint && <p className="text-[10px] text-foreground/30 mt-1">{hint}</p>}
    </div>
  );
}

function UrlField({
  label,
  value,
  onChange,
  placeholder,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  hint?: string;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <div className="flex gap-2">
        <input
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 border border-[#e8e5df] bg-[#faf9f7] px-3 py-2 text-sm text-foreground/70 focus:outline-none focus:border-foreground/30 rounded transition-colors"
        />
        {value && (
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center px-3 border border-[#e8e5df] text-foreground/30 hover:text-foreground/60 rounded transition-colors shrink-0"
            title="Open URL"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
      {hint && <p className="text-[10px] text-foreground/30 mt-1">{hint}</p>}
    </div>
  );
}

function ImageUrlField({
  label,
  value,
  onChange,
  placeholder,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  hint?: string;
}) {
  const [previewOpen, setPreviewOpen] = useState(false);

  return (
    <div>
      <Label>{label}</Label>
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 border border-[#e8e5df] bg-[#faf9f7] px-3 py-2 text-sm text-foreground/70 focus:outline-none focus:border-foreground/30 rounded transition-colors"
        />
        {value && (
          <button
            type="button"
            onClick={() => setPreviewOpen((p) => !p)}
            className="flex items-center px-3 border border-[#e8e5df] text-foreground/30 hover:text-foreground/60 rounded transition-colors shrink-0"
            title="Preview image"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
      {hint && <p className="text-[10px] text-foreground/30 mt-1">{hint}</p>}
      {previewOpen && value && (
        <div className="mt-2 border border-[#e8e5df] bg-[#f7f6f3] p-2 rounded inline-block">
          <img
            src={value}
            alt="Preview"
            className="max-h-20 max-w-xs object-contain rounded"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        </div>
      )}
    </div>
  );
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-[#e8e5df] p-6">
      <p className="text-[10px] uppercase tracking-[0.3em] text-foreground/40 mb-5">{title}</p>
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  );
}

export default function AtelierSiteSettings() {
  const { settings, loading: settingsLoading, refresh } = useSiteSettings();
  const [form, setForm] = useState<SiteSettings>({ ...BRAND_DEFAULTS });
  const [initialized, setInitialized] = useState(false);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [saveError, setSaveError] = useState("");

  useEffect(() => {
    if (!settingsLoading && !initialized) {
      setForm({ ...settings });
      setInitialized(true);
    }
  }, [settingsLoading, settings, initialized]);

  function setField(key: keyof SiteSettings, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSave() {
    if (saveState === "saving") return;
    setSaveState("saving");
    setSaveError("");
    try {
      await atelierFetch("/settings/brand", {
        method: "PUT",
        body: JSON.stringify(form),
      });
      setSaveState("saved");
      refresh();
      setTimeout(() => setSaveState("idle"), 3000);
    } catch (err) {
      setSaveState("error");
      setSaveError(err instanceof Error ? err.message : "Could not save settings");
      setTimeout(() => setSaveState("idle"), 4000);
    }
  }

  if (settingsLoading && !initialized) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <p className="text-[10px] uppercase tracking-[0.3em] text-foreground/40 mb-1">Configuration</p>
          <h2 className="font-serif text-2xl text-foreground/80">Site Settings</h2>
        </div>
        <div className="bg-white border border-[#e8e5df] p-12 text-center">
          <p className="text-[10px] uppercase tracking-widest text-foreground/30">Loading…</p>
        </div>
      </div>
    );
  }

  const saveLabel = { idle: "Save Settings", saving: "Saving…", saved: "Saved", error: "Error" };
  const SaveIcon = saveState === "saving"
    ? <RefreshCw className="w-3.5 h-3.5 animate-spin" />
    : saveState === "saved"
    ? <Check className="w-3.5 h-3.5" />
    : saveState === "error"
    ? <AlertCircle className="w-3.5 h-3.5" />
    : null;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <p className="text-[10px] uppercase tracking-[0.3em] text-foreground/40 mb-1">Configuration</p>
        <h2 className="font-serif text-2xl text-foreground/80">Site Settings</h2>
      </div>

      <div className="flex flex-col gap-4">

        <SectionCard title="Brand Identity">
          <Field
            label="Site Name"
            value={form.siteName}
            onChange={(v) => setField("siteName", v)}
            placeholder={BRAND_DEFAULTS.siteName}
            hint="Used in the navbar, footer, browser tab, and notifications."
          />
          <Field
            label="Tagline"
            value={form.siteTagline}
            onChange={(v) => setField("siteTagline", v)}
            placeholder={BRAND_DEFAULTS.siteTagline}
            hint="Displayed in select hero sections and meta descriptions."
          />
        </SectionCard>

        <SectionCard title="Logo & Favicon">
          <ImageUrlField
            label="Logo URL"
            value={form.logoUrl}
            onChange={(v) => setField("logoUrl", v)}
            placeholder="https://… or /logo.svg"
            hint="If set, replaces the text logo in the navbar. Leave blank to use site name as text."
          />
          <ImageUrlField
            label="Favicon URL"
            value={form.faviconUrl}
            onChange={(v) => setField("faviconUrl", v)}
            placeholder={BRAND_DEFAULTS.faviconUrl}
            hint="Shown in browser tabs and bookmarks. Supports .svg, .png, .ico."
          />
        </SectionCard>

        <SectionCard title="Contact Information">
          <Field
            label="Primary Email"
            type="email"
            value={form.primaryEmail}
            onChange={(v) => setField("primaryEmail", v)}
            placeholder={BRAND_DEFAULTS.primaryEmail}
            hint="Displayed in the footer and contact pages."
          />
          <Field
            label="Primary Phone"
            type="tel"
            value={form.primaryPhone}
            onChange={(v) => setField("primaryPhone", v)}
            placeholder={BRAND_DEFAULTS.primaryPhone}
            hint="Displayed in the footer and contact pages."
          />
        </SectionCard>

        <SectionCard title="Social Media">
          <UrlField
            label="Instagram URL"
            value={form.instagramUrl}
            onChange={(v) => setField("instagramUrl", v)}
            placeholder={BRAND_DEFAULTS.instagramUrl}
          />
          <UrlField
            label="LinkedIn URL"
            value={form.linkedinUrl}
            onChange={(v) => setField("linkedinUrl", v)}
            placeholder={BRAND_DEFAULTS.linkedinUrl}
          />
          <UrlField
            label="Pinterest URL"
            value={form.pinterestUrl}
            onChange={(v) => setField("pinterestUrl", v)}
            placeholder={BRAND_DEFAULTS.pinterestUrl}
          />
        </SectionCard>

        <SectionCard title="SEO & Open Graph">
          <ImageUrlField
            label="OG Image URL"
            value={form.ogImageUrl}
            onChange={(v) => setField("ogImageUrl", v)}
            placeholder={BRAND_DEFAULTS.ogImageUrl}
            hint="1200×630px recommended. Shown when pages are shared on social media."
          />
        </SectionCard>

        {/* Save */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleSave}
            disabled={saveState === "saving"}
            className={`flex items-center gap-2 px-6 py-2.5 text-[10px] uppercase tracking-widest border rounded transition-all duration-150 disabled:opacity-50
              ${saveState === "saved"
                ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                : saveState === "error"
                ? "border-red-300 bg-red-50 text-red-600"
                : "border-[#0f0e0c] bg-[#0f0e0c] text-white hover:bg-[#0f0e0c]/80"
              }`}
          >
            {SaveIcon}
            {saveLabel[saveState]}
          </button>
          {saveState === "saved" && (
            <p className="text-xs text-emerald-600">Changes are now live across the entire site.</p>
          )}
          {saveState === "error" && saveError && (
            <p className="text-xs text-red-500">{saveError}</p>
          )}
        </div>

        {/* Environment secrets reference */}
        <div className="bg-white border border-[#e8e5df] p-6">
          <p className="text-[10px] uppercase tracking-[0.3em] text-foreground/40 mb-5">
            Environment Secrets Required
          </p>
          <div className="flex flex-col gap-0 divide-y divide-[#f0ece6]">
            {[
              { key: "ADMIN_EMAIL", desc: "Admin portal login email" },
              { key: "ADMIN_PASSWORD", desc: "Admin portal login password" },
              { key: "ADMIN_JWT_SECRET", desc: "Secret key for signing session tokens (min 32 chars)" },
              { key: "TELEGRAM_BOT_TOKEN", desc: "Telegram notification bot token" },
              { key: "TELEGRAM_CHAT_ID", desc: "Telegram target channel or group ID" },
              { key: "INSTAGRAM_ACCESS_TOKEN", desc: "Instagram Graph API long-lived token" },
              { key: "ALLOWED_ORIGINS", desc: "Comma-separated list of allowed CORS origins (production)" },
            ].map(({ key, desc }) => (
              <div key={key} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 py-2.5">
                <code className="text-[11px] text-foreground/70 sm:w-56 shrink-0">{key}</code>
                <span className="text-[11px] text-foreground/40">{desc}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
