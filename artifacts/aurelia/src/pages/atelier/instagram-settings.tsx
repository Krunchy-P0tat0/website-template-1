import { useEffect, useState } from "react";
import { Instagram, ExternalLink, Eye, EyeOff, RefreshCw, Check, AlertCircle } from "lucide-react";
import { atelierFetch } from "@/lib/atelierAuth";

const BASE = import.meta.env.BASE_URL?.replace(/\/$/, "") ?? "";

interface Config {
  instagram: {
    tokenConfigured: boolean;
    feedEnabled: boolean;
    handle: string;
    profileUrl: string;
  };
}

interface FeedPost {
  id: string;
  image: string;
  caption: string;
  alt: string;
  href: string;
}

type SaveState = "idle" | "saving" | "saved" | "error";

function StatusDot({ ok, label }: { ok: boolean; label: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className={`w-2 h-2 rounded-full shrink-0 ${ok ? "bg-emerald-400" : "bg-slate-300"}`} />
      <span className="text-xs text-foreground/60">{label}</span>
      <span className={`ml-auto text-[10px] uppercase tracking-widest font-medium ${ok ? "text-emerald-600" : "text-slate-400"}`}>
        {ok ? "Active" : "Not set"}
      </span>
    </div>
  );
}

export default function AtelierInstagram() {
  const [config, setConfig] = useState<Config["instagram"] | null>(null);
  const [loading, setLoading] = useState(true);

  const [handle, setHandle] = useState("");
  const [profileUrl, setProfileUrl] = useState("");
  const [profileSave, setProfileSave] = useState<SaveState>("idle");

  const [togglingFeed, setTogglingFeed] = useState(false);

  const [previewing, setPreviewing] = useState(false);
  const [posts, setPosts] = useState<FeedPost[] | null>(null);
  const [previewError, setPreviewError] = useState("");

  useEffect(() => {
    atelierFetch<{ telegram: unknown; instagram: Config["instagram"] }>("/config")
      .then((d) => {
        setConfig(d.instagram);
        setHandle(d.instagram.handle);
        setProfileUrl(d.instagram.profileUrl);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  async function handleSaveProfile() {
    if (profileSave === "saving") return;
    setProfileSave("saving");
    try {
      await atelierFetch("/settings/instagram", {
        method: "PATCH",
        body: JSON.stringify({ handle, profileUrl }),
      });
      setConfig((prev) => prev ? { ...prev, handle, profileUrl } : prev);
      setProfileSave("saved");
      setTimeout(() => setProfileSave("idle"), 2500);
    } catch {
      setProfileSave("error");
      setTimeout(() => setProfileSave("idle"), 3000);
    }
  }

  async function handleToggleFeed() {
    if (!config || togglingFeed) return;
    setTogglingFeed(true);
    const next = !config.feedEnabled;
    try {
      await atelierFetch("/settings/instagram", {
        method: "PATCH",
        body: JSON.stringify({ feedEnabled: next }),
      });
      setConfig((prev) => prev ? { ...prev, feedEnabled: next } : prev);
    } catch { /* noop */ } finally {
      setTogglingFeed(false);
    }
  }

  async function handlePreview() {
    setPreviewing(true);
    setPreviewError("");
    setPosts(null);
    try {
      const res = await fetch(`${BASE}/api/instagram/feed`);
      const data = await res.json() as { posts: FeedPost[]; configured: boolean };
      if (!data.configured || data.posts.length === 0) {
        setPreviewError("No live posts — token not configured or feed returned empty.");
      } else {
        setPosts(data.posts);
      }
    } catch {
      setPreviewError("Could not reach the feed endpoint.");
    } finally {
      setPreviewing(false);
    }
  }

  const saveLabel: Record<SaveState, string> = {
    idle: "Save",
    saving: "Saving…",
    saved: "Saved",
    error: "Error",
  };

  const saveIcon: Record<SaveState, React.ReactNode> = {
    idle: null,
    saving: <RefreshCw className="w-3 h-3 animate-spin" />,
    saved: <Check className="w-3 h-3" />,
    error: <AlertCircle className="w-3 h-3" />,
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <p className="text-[10px] uppercase tracking-[0.3em] text-foreground/40 mb-1">Configuration</p>
          <h2 className="font-serif text-2xl text-foreground/80">Instagram Feed</h2>
        </div>
        <div className="bg-white border border-[#e8e5df] p-12 text-center">
          <p className="text-xs uppercase tracking-widest text-foreground/30">Loading…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <p className="text-[10px] uppercase tracking-[0.3em] text-foreground/40 mb-1">Configuration</p>
        <h2 className="font-serif text-2xl text-foreground/80">Instagram Feed</h2>
      </div>

      <div className="flex flex-col gap-4">

        {/* Status */}
        <div className="bg-white border border-[#e8e5df] p-6">
          <div className="flex items-center gap-3 mb-5">
            <Instagram className="w-4 h-4 text-foreground/40" />
            <p className="text-[10px] uppercase tracking-[0.3em] text-foreground/40">Connection Status</p>
          </div>
          <div className="flex flex-col gap-3">
            <StatusDot ok={!!config?.tokenConfigured} label="Instagram Access Token (INSTAGRAM_ACCESS_TOKEN)" />
            <div className="border-t border-[#f0ede8] pt-3 flex items-center gap-2.5">
              <span className={`w-2 h-2 rounded-full shrink-0 ${config?.feedEnabled ? "bg-emerald-400" : "bg-slate-300"}`} />
              <span className="text-xs text-foreground/60">Live feed on public site</span>
              <button
                onClick={handleToggleFeed}
                disabled={togglingFeed}
                className={`ml-auto flex items-center gap-2 px-3 py-1 text-[10px] uppercase tracking-widest border rounded-full transition-all duration-150 disabled:opacity-40
                  ${config?.feedEnabled
                    ? "border-emerald-300 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                    : "border-[#e8e5df] text-foreground/40 hover:border-foreground/20 hover:text-foreground/60"
                  }`}
              >
                {config?.feedEnabled ? (
                  <><Eye className="w-3 h-3" /> Enabled</>
                ) : (
                  <><EyeOff className="w-3 h-3" /> Disabled</>
                )}
              </button>
            </div>
          </div>

          {!config?.tokenConfigured && (
            <div className="mt-4 flex items-start gap-3 p-3 bg-amber-50 border border-amber-100 rounded">
              <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-700 leading-relaxed">
                Add <code className="bg-amber-100 px-1 py-0.5 rounded text-[10px]">INSTAGRAM_ACCESS_TOKEN</code> to your
                environment secrets to enable the live feed. Until then, the section displays placeholder content.
              </p>
            </div>
          )}
        </div>

        {/* Profile settings */}
        <div className="bg-white border border-[#e8e5df] p-6">
          <p className="text-[10px] uppercase tracking-[0.3em] text-foreground/40 mb-5">Profile Settings</p>
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-[10px] uppercase tracking-[0.2em] text-foreground/40 block mb-1.5">
                Handle
              </label>
              <input
                type="text"
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                placeholder="@aureliaandco"
                className="w-full border border-[#e8e5df] bg-[#faf9f7] px-3 py-2 text-sm text-foreground/70 focus:outline-none focus:border-foreground/30 rounded transition-colors"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-[0.2em] text-foreground/40 block mb-1.5">
                Profile URL
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={profileUrl}
                  onChange={(e) => setProfileUrl(e.target.value)}
                  placeholder="https://instagram.com/aureliaandco"
                  className="flex-1 border border-[#e8e5df] bg-[#faf9f7] px-3 py-2 text-sm text-foreground/70 focus:outline-none focus:border-foreground/30 rounded transition-colors"
                />
                {profileUrl && (
                  <a
                    href={profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-3 border border-[#e8e5df] text-foreground/30 hover:text-foreground/60 rounded transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleSaveProfile}
                disabled={profileSave === "saving"}
                className={`flex items-center gap-2 px-4 py-2 text-[10px] uppercase tracking-widest border rounded transition-all duration-150
                  ${profileSave === "saved"
                    ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                    : profileSave === "error"
                    ? "border-red-300 bg-red-50 text-red-600"
                    : "border-[#0f0e0c] bg-[#0f0e0c] text-white hover:bg-[#0f0e0c]/80"
                  } disabled:opacity-50`}
              >
                {saveIcon[profileSave]}
                {saveLabel[profileSave]}
              </button>
            </div>
          </div>
        </div>

        {/* Feed preview */}
        <div className="bg-white border border-[#e8e5df] p-6">
          <div className="flex items-center justify-between mb-5">
            <p className="text-[10px] uppercase tracking-[0.3em] text-foreground/40">Feed Preview</p>
            <button
              onClick={handlePreview}
              disabled={previewing}
              className="flex items-center gap-2 text-[10px] uppercase tracking-widest border border-[#e8e5df] px-3 py-1.5 text-foreground/50 hover:border-foreground/20 hover:text-foreground/80 transition-colors rounded disabled:opacity-40"
            >
              <RefreshCw className={`w-3 h-3 ${previewing ? "animate-spin" : ""}`} />
              {previewing ? "Loading…" : "Load Preview"}
            </button>
          </div>

          {previewError && (
            <div className="flex items-start gap-3 p-3 bg-[#f7f6f3] border border-[#e8e5df] rounded">
              <AlertCircle className="w-3.5 h-3.5 text-foreground/30 shrink-0 mt-0.5" />
              <p className="text-xs text-foreground/50">{previewError}</p>
            </div>
          )}

          {posts && posts.length > 0 && (
            <div className="grid grid-cols-3 gap-2">
              {posts.map((post) => (
                <a
                  key={post.id}
                  href={post.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative aspect-square overflow-hidden rounded border border-[#e8e5df]"
                >
                  <img
                    src={post.image}
                    alt={post.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {post.caption && (
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-end p-2 opacity-0 group-hover:opacity-100">
                      <p className="text-white text-[10px] leading-tight line-clamp-2">{post.caption}</p>
                    </div>
                  )}
                </a>
              ))}
            </div>
          )}

          {!posts && !previewError && !previewing && (
            <p className="text-xs text-foreground/30 text-center py-4">
              Click "Load Preview" to fetch the current Instagram feed.
            </p>
          )}
        </div>

        {/* Setup guide */}
        {!config?.tokenConfigured && (
          <div className="bg-white border border-[#e8e5df] p-6">
            <p className="text-[10px] uppercase tracking-[0.3em] text-foreground/40 mb-5">Setup Guide</p>
            <div className="flex flex-col gap-3">
              {[
                "Go to Meta for Developers and create an app",
                "Add the Instagram Graph API product to your app",
                "Generate a long-lived access token for your Business account",
                "Add INSTAGRAM_ACCESS_TOKEN to your environment secrets",
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-3 text-xs">
                  <span className="w-5 h-5 rounded-full border border-[#e8e5df] flex items-center justify-center text-[10px] text-foreground/30 shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-foreground/60 leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
            <a
              href="https://developers.facebook.com/docs/instagram-platform"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-5 text-[10px] uppercase tracking-widest text-foreground/40 hover:text-foreground/70 transition-colors"
            >
              Meta Developer Docs <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        )}

      </div>
    </div>
  );
}
