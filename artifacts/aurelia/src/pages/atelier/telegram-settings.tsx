import { useEffect, useState } from "react";
import { MessageSquare, ExternalLink, Send, Check, AlertCircle, RefreshCw } from "lucide-react";
import { atelierFetch } from "@/lib/atelierAuth";

interface TelegramConfig {
  botConfigured: boolean;
  chatConfigured: boolean;
  active: boolean;
}

type TestState = "idle" | "sending" | "success" | "error";

function StatusRow({ ok, label, secret }: { ok: boolean; label: string; secret: string }) {
  return (
    <div className="flex items-center gap-3 py-3 border-b border-[#f0ede8] last:border-0">
      <span className={`w-2 h-2 rounded-full shrink-0 ${ok ? "bg-emerald-400" : "bg-slate-300"}`} />
      <div className="flex-1 min-w-0">
        <p className="text-xs text-foreground/70">{label}</p>
        <p className="text-[10px] font-mono text-foreground/35 mt-0.5">{secret}</p>
      </div>
      <span className={`text-[10px] uppercase tracking-widest font-medium shrink-0 ${ok ? "text-emerald-600" : "text-slate-400"}`}>
        {ok ? "Configured" : "Missing"}
      </span>
    </div>
  );
}

export default function AtelierTelegram() {
  const [config, setConfig] = useState<TelegramConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [testState, setTestState] = useState<TestState>("idle");
  const [testMessage, setTestMessage] = useState("");

  useEffect(() => {
    atelierFetch<{ telegram: TelegramConfig; instagram: unknown }>("/config")
      .then((d) => setConfig(d.telegram))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  async function handleTest() {
    if (testState === "sending") return;
    setTestState("sending");
    setTestMessage("");
    try {
      await atelierFetch("/telegram/test", { method: "POST" });
      setTestState("success");
      setTestMessage("Test notification delivered successfully.");
    } catch (err) {
      setTestState("error");
      setTestMessage(err instanceof Error ? err.message : "Failed to send test notification.");
    } finally {
      setTimeout(() => {
        setTestState("idle");
        setTestMessage("");
      }, 5000);
    }
  }

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <p className="text-[10px] uppercase tracking-[0.3em] text-foreground/40 mb-1">Configuration</p>
          <h2 className="font-serif text-2xl text-foreground/80">Telegram Bot</h2>
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
        <h2 className="font-serif text-2xl text-foreground/80">Telegram Bot</h2>
      </div>

      <div className="flex flex-col gap-4">

        {/* Bot status */}
        <div className="bg-white border border-[#e8e5df] p-6">
          <div className="flex items-center gap-3 mb-5">
            <MessageSquare className="w-4 h-4 text-foreground/40" />
            <p className="text-[10px] uppercase tracking-[0.3em] text-foreground/40">Bot Status</p>
            <div className="ml-auto flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${config?.active ? "bg-emerald-400" : "bg-slate-300"}`} />
              <span className={`text-[10px] uppercase tracking-widest font-medium ${config?.active ? "text-emerald-600" : "text-slate-400"}`}>
                {config?.active ? "Active" : "Inactive"}
              </span>
            </div>
          </div>

          <div>
            <StatusRow
              ok={!!config?.botConfigured}
              label="Bot Token"
              secret="TELEGRAM_BOT_TOKEN"
            />
            <StatusRow
              ok={!!config?.chatConfigured}
              label="Chat / Channel ID"
              secret="TELEGRAM_CHAT_ID"
            />
          </div>

          {!config?.active && (
            <div className="mt-4 flex items-start gap-3 p-3 bg-amber-50 border border-amber-100 rounded">
              <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-700 leading-relaxed">
                {!config?.botConfigured && !config?.chatConfigured
                  ? "Both TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID must be set to enable notifications."
                  : !config?.botConfigured
                  ? "TELEGRAM_BOT_TOKEN is missing. Add it to your environment secrets."
                  : "TELEGRAM_CHAT_ID is missing. Add it to your environment secrets."}
              </p>
            </div>
          )}
        </div>

        {/* Test notification */}
        <div className="bg-white border border-[#e8e5df] p-6">
          <p className="text-[10px] uppercase tracking-[0.3em] text-foreground/40 mb-2">Test Notification</p>
          <p className="text-xs text-foreground/50 leading-relaxed mb-5">
            Send a test message to confirm your bot and chat ID are working correctly.
          </p>

          <button
            onClick={handleTest}
            disabled={testState === "sending" || !config?.active}
            className={`flex items-center gap-2.5 px-5 py-2.5 text-[10px] uppercase tracking-widest border rounded transition-all duration-150
              ${testState === "success"
                ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                : testState === "error"
                ? "border-red-300 bg-red-50 text-red-600"
                : config?.active
                ? "border-[#0f0e0c] bg-[#0f0e0c] text-white hover:bg-[#0f0e0c]/80"
                : "border-[#e8e5df] text-foreground/30 cursor-not-allowed"
              } disabled:opacity-50`}
          >
            {testState === "sending" ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : testState === "success" ? (
              <Check className="w-3.5 h-3.5" />
            ) : testState === "error" ? (
              <AlertCircle className="w-3.5 h-3.5" />
            ) : (
              <Send className="w-3.5 h-3.5" />
            )}
            {testState === "sending"
              ? "Sending…"
              : testState === "success"
              ? "Delivered"
              : testState === "error"
              ? "Failed"
              : "Send Test Notification"}
          </button>

          {testMessage && (
            <p className={`text-xs mt-3 leading-relaxed ${testState === "success" ? "text-emerald-600" : "text-red-500"}`}>
              {testMessage}
            </p>
          )}

          {!config?.active && (
            <p className="text-[11px] text-foreground/35 mt-3">
              Configure both secrets above to enable test notifications.
            </p>
          )}
        </div>

        {/* Notification events */}
        <div className="bg-white border border-[#e8e5df] p-6">
          <p className="text-[10px] uppercase tracking-[0.3em] text-foreground/40 mb-5">Notification Events</p>
          <div className="flex flex-col gap-0 divide-y divide-[#f0ede8]">
            {[
              { event: "New client inquiry submitted", detail: "POST /api/inquiries" },
              { event: "New newsletter subscriber", detail: "POST /api/newsletter" },
              { event: "New vendor application received", detail: "POST /api/vendor-applications" },
            ].map(({ event, detail }) => (
              <div key={event} className="flex items-center gap-3 py-3">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                <div className="flex-1">
                  <p className="text-xs text-foreground/70">{event}</p>
                  <p className="text-[10px] font-mono text-foreground/30 mt-0.5">{detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Setup guide */}
        {!config?.active && (
          <div className="bg-white border border-[#e8e5df] p-6">
            <p className="text-[10px] uppercase tracking-[0.3em] text-foreground/40 mb-5">Setup Guide</p>
            <div className="flex flex-col gap-3">
              {[
                "Open Telegram and message @BotFather",
                "Send /newbot and follow the prompts to create your bot",
                "Copy the bot token and add it as TELEGRAM_BOT_TOKEN in secrets",
                "Add your bot to your target channel or group as an admin",
                "Get the chat ID from the Telegram getUpdates API and add as TELEGRAM_CHAT_ID",
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
              href="https://core.telegram.org/bots/api"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-5 text-[10px] uppercase tracking-widest text-foreground/40 hover:text-foreground/70 transition-colors"
            >
              Telegram Bot API Docs <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        )}

      </div>
    </div>
  );
}
