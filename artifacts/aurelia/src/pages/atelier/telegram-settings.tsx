import { MessageSquare, ExternalLink } from "lucide-react";

export default function AtelierTelegram() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <p className="text-[10px] uppercase tracking-[0.3em] text-foreground/40 mb-1">Configuration</p>
        <h2 className="font-serif text-2xl text-foreground/80">Telegram Bot</h2>
      </div>

      <div className="flex flex-col gap-4">
        {/* Status */}
        <div className="bg-white border border-[#e8e5df] p-6">
          <div className="flex items-center gap-3 mb-5">
            <MessageSquare className="w-4 h-4 text-foreground/40" />
            <p className="text-[10px] uppercase tracking-[0.3em] text-foreground/40">Notification Bot Status</p>
          </div>
          <p className="text-xs text-foreground/60 leading-relaxed mb-5">
            The Telegram bot delivers instant notifications when a new inquiry, newsletter subscription,
            or vendor application is received.
          </p>

          <div className="grid grid-cols-1 gap-3 text-xs">
            <SecretRow label="TELEGRAM_BOT_TOKEN" description="Bot token from @BotFather" />
            <SecretRow label="TELEGRAM_CHAT_ID" description="Target chat or channel ID" />
          </div>
        </div>

        {/* Setup guide */}
        <div className="bg-white border border-[#e8e5df] p-6">
          <p className="text-[10px] uppercase tracking-[0.3em] text-foreground/40 mb-5">Setup Guide</p>
          <div className="flex flex-col gap-3 text-xs">
            <Step n={1} text="Open Telegram and message @BotFather" />
            <Step n={2} text="Send /newbot and follow the prompts to create a bot" />
            <Step n={3} text="Copy the bot token and save it as TELEGRAM_BOT_TOKEN" />
            <Step n={4} text="Add your bot to the target channel or group" />
            <Step n={5} text="Get the chat ID via the Telegram getUpdates API and save as TELEGRAM_CHAT_ID" />
          </div>

          <a
            href="https://core.telegram.org/bots/api"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-5 text-[10px] uppercase tracking-widest text-foreground/40 hover:text-foreground/70 transition-colors"
          >
            Telegram Bot API Docs
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Notification events */}
        <div className="bg-white border border-[#e8e5df] p-6">
          <p className="text-[10px] uppercase tracking-[0.3em] text-foreground/40 mb-5">Notification Events</p>
          <div className="flex flex-col gap-2 text-xs">
            {[
              "New client inquiry submitted",
              "New newsletter subscriber",
              "New vendor application received",
            ].map((event) => (
              <div key={event} className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" />
                <span className="text-foreground/60">{event}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SecretRow({ label, description }: { label: string; description: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 p-3 bg-[#f7f6f3]">
      <code className="text-[11px] text-foreground/70 sm:w-52 shrink-0">{label}</code>
      <span className="text-foreground/40">{description}</span>
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
