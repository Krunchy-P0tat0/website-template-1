import { Instagram, ExternalLink } from "lucide-react";
import { INSTAGRAM_CONFIG } from "@/lib/config";

export default function AtelierInstagram() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <p className="text-[10px] uppercase tracking-[0.3em] text-foreground/40 mb-1">Configuration</p>
        <h2 className="font-serif text-2xl text-foreground/80">Instagram Feed</h2>
      </div>

      <div className="flex flex-col gap-4">
        {/* Current status */}
        <div className="bg-white border border-[#e8e5df] p-6">
          <div className="flex items-center gap-3 mb-5">
            <Instagram className="w-4 h-4 text-foreground/40" />
            <p className="text-[10px] uppercase tracking-[0.3em] text-foreground/40">Current Configuration</p>
          </div>
          <div className="grid grid-cols-1 gap-4 text-xs">
            <ConfigRow label="Profile URL" value={INSTAGRAM_CONFIG.profileUrl} />
            <ConfigRow label="Handle" value={INSTAGRAM_CONFIG.handle} />
            <ConfigRow label="Feed API Endpoint" value={INSTAGRAM_CONFIG.feedEndpoint} />
          </div>
        </div>

        {/* Token status */}
        <div className="bg-white border border-[#e8e5df] p-6">
          <p className="text-[10px] uppercase tracking-[0.3em] text-foreground/40 mb-5">Live Feed Integration</p>
          <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-100">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1 shrink-0" />
            <div>
              <p className="text-xs font-medium text-amber-800 mb-1">Awaiting Access Token</p>
              <p className="text-xs text-amber-700 leading-relaxed">
                The live Instagram feed is ready but requires an{" "}
                <code className="bg-amber-100 px-1 py-0.5 rounded text-[10px]">INSTAGRAM_ACCESS_TOKEN</code>{" "}
                environment secret. Until set, the feed displays curated placeholder content.
              </p>
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-3 text-xs">
            <Step n={1} text="Go to Meta for Developers and create an app" />
            <Step n={2} text="Add the Instagram Graph API product to your app" />
            <Step n={3} text="Generate a long-lived access token for your Business account" />
            <Step n={4} text={`Add INSTAGRAM_ACCESS_TOKEN to your environment secrets`} />
          </div>

          <a
            href="https://developers.facebook.com/docs/instagram-platform"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-5 text-[10px] uppercase tracking-widest text-foreground/40 hover:text-foreground/70 transition-colors"
          >
            Meta Developer Docs
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* URL edit reminder */}
        <div className="bg-white border border-[#e8e5df] p-6">
          <p className="text-[10px] uppercase tracking-[0.3em] text-foreground/40 mb-4">Profile URL</p>
          <p className="text-xs text-foreground/60 leading-relaxed mb-4">
            To update the Instagram profile URL site-wide, edit the{" "}
            <code className="bg-[#f7f6f3] px-1.5 py-0.5 text-[10px]">SOCIAL_LINKS.instagram</code>{" "}
            constant in{" "}
            <code className="bg-[#f7f6f3] px-1.5 py-0.5 text-[10px]">src/lib/config.ts</code>.
          </p>
          <p className="text-[10px] text-foreground/30">
            Admin UI editing for this field is planned for a future release.
          </p>
        </div>
      </div>
    </div>
  );
}

function ConfigRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
      <span className="text-[10px] uppercase tracking-[0.2em] text-foreground/30 sm:w-36 shrink-0">{label}</span>
      <span className="font-mono text-[11px] text-foreground/60 bg-[#f7f6f3] px-2 py-1">{value}</span>
    </div>
  );
}

function Step({ n, text }: { n: number; text: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="w-5 h-5 rounded-full border border-[#e8e5df] flex items-center justify-center text-[10px] text-foreground/30 shrink-0 mt-0.5">
        {n}
      </span>
      <p className="text-foreground/60 leading-relaxed">{text}</p>
    </div>
  );
}
