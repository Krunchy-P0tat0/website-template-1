import { Router, type IRouter } from "express";
import { db, newsletterTable } from "@workspace/db";
import { z } from "zod/v4";
import { logger } from "../lib/logger";
import { sendTelegramMessage, formatNotification } from "../lib/telegram";

const router: IRouter = Router();

const newsletterBodySchema = z.object({
  email: z.string().email().max(255),
  source: z.string().max(80).optional(),
});

router.post("/newsletter", async (req, res) => {
  const parsed = newsletterBodySchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      error: "Invalid email",
      issues: parsed.error.issues,
    });
  }

  const { email, source } = parsed.data;

  try {
    const [row] = await db
      .insert(newsletterTable)
      .values({ email, source: source ?? "footer" })
      .onConflictDoNothing({ target: newsletterTable.email })
      .returning({ id: newsletterTable.id });

    if (row) {
      const message = formatNotification("New Newsletter Subscriber", [
        { label: "Email", value: email },
        { label: "Source", value: source ?? "footer" },
      ]);
      sendTelegramMessage(message).catch((err) =>
        logger.error({ err }, "Telegram notification failed (newsletter)"),
      );
    }

    return res.status(201).json({ status: "subscribed" });
  } catch (err) {
    logger.error({ err }, "Newsletter subscription failed");
    return res.status(500).json({ error: "Could not subscribe" });
  }
});

export default router;
