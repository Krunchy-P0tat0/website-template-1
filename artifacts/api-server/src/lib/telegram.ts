import { logger } from "./logger";

const TELEGRAM_API_BASE = "https://api.telegram.org";

function escapeMarkdown(text: string): string {
  return text.replace(/([_*\[\]()~`>#+\-=|{}.!\\])/g, "\\$1");
}

export async function sendTelegramMessage(text: string): Promise<boolean> {
  const token = process.env["TELEGRAM_BOT_TOKEN"];
  const chatId = process.env["TELEGRAM_CHAT_ID"];

  if (!token || !chatId) {
    logger.warn(
      "Telegram notifications not configured. Set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID secrets to enable.",
    );
    return false;
  }

  try {
    const res = await fetch(`${TELEGRAM_API_BASE}/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "MarkdownV2",
        disable_web_page_preview: true,
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      logger.error({ status: res.status, body }, "Telegram send failed");
      return false;
    }

    return true;
  } catch (err) {
    logger.error({ err }, "Telegram notification error");
    return false;
  }
}

type Field = { label: string; value: string | number | null | undefined };

export function formatNotification(
  title: string,
  fields: Field[],
): string {
  const header = `*${escapeMarkdown(title)}*`;
  const body = fields
    .filter((f) => f.value !== null && f.value !== undefined && f.value !== "")
    .map((f) => `*${escapeMarkdown(f.label)}:* ${escapeMarkdown(String(f.value))}`)
    .join("\n");
  const footer = `\n\n_${escapeMarkdown(
    new Date().toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }),
  )}_`;
  return `${header}\n\n${body}${footer}`;
}
