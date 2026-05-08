import { SITE_CONFIG, SOCIAL_LINKS } from "@/lib/config";

export default function AtelierSiteSettings() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <p className="text-[10px] uppercase tracking-[0.3em] text-foreground/40 mb-1">Configuration</p>
        <h2 className="font-serif text-2xl text-foreground/80">Site Settings</h2>
      </div>

      <div className="flex flex-col gap-4">
        {/* Site identity */}
        <div className="bg-white border border-[#e8e5df] p-6">
          <p className="text-[10px] uppercase tracking-[0.3em] text-foreground/40 mb-5">Site Identity</p>
          <div className="flex flex-col gap-4 text-xs">
            <ReadOnlyField label="Site Name" value={SITE_CONFIG.name} />
            <ReadOnlyField label="Tagline" value={SITE_CONFIG.tagline} />
            <ReadOnlyField label="Locations" value={SITE_CONFIG.locations.join(" · ")} />
          </div>
          <p className="text-[10px] text-foreground/30 mt-5">
            Edit these values in <code className="bg-[#f7f6f3] px-1">src/lib/config.ts</code>
          </p>
        </div>

        {/* Social links */}
        <div className="bg-white border border-[#e8e5df] p-6">
          <p className="text-[10px] uppercase tracking-[0.3em] text-foreground/40 mb-5">Social Links</p>
          <div className="flex flex-col gap-4 text-xs">
            <ReadOnlyField label="Instagram URL" value={SOCIAL_LINKS.instagram} />
            <ReadOnlyField label="Instagram Handle" value={SOCIAL_LINKS.instagramHandle} />
          </div>
          <p className="text-[10px] text-foreground/30 mt-5">
            Edit these in <code className="bg-[#f7f6f3] px-1">SOCIAL_LINKS</code> inside{" "}
            <code className="bg-[#f7f6f3] px-1">src/lib/config.ts</code>
          </p>
        </div>

        {/* Environment secrets */}
        <div className="bg-white border border-[#e8e5df] p-6">
          <p className="text-[10px] uppercase tracking-[0.3em] text-foreground/40 mb-5">
            Environment Secrets Required
          </p>
          <div className="flex flex-col gap-2">
            {[
              { key: "ADMIN_EMAIL", desc: "Admin portal login email" },
              { key: "ADMIN_PASSWORD", desc: "Admin portal login password" },
              { key: "ADMIN_JWT_SECRET", desc: "Secret key for signing session tokens (min 32 chars)" },
              { key: "TELEGRAM_BOT_TOKEN", desc: "Telegram notification bot token" },
              { key: "TELEGRAM_CHAT_ID", desc: "Telegram target channel or group ID" },
              { key: "INSTAGRAM_ACCESS_TOKEN", desc: "Instagram Graph API long-lived token" },
              { key: "ALLOWED_ORIGINS", desc: "Comma-separated list of allowed CORS origins" },
            ].map(({ key, desc }) => (
              <div key={key} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 py-2 border-b border-[#f0ece6] last:border-0">
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

function ReadOnlyField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
      <span className="text-[10px] uppercase tracking-[0.2em] text-foreground/30 sm:w-36 shrink-0">{label}</span>
      <span className="text-foreground/60 bg-[#f7f6f3] px-2 py-1 text-[11px]">{value}</span>
    </div>
  );
}
