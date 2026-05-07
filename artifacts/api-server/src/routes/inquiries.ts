import { Router, type IRouter } from "express";
import { db, inquiriesTable, insertInquirySchema } from "@workspace/db";
import { desc } from "drizzle-orm";
import { z } from "zod/v4";
import { logger } from "../lib/logger";
import { sendTelegramMessage, formatNotification } from "../lib/telegram";

const router: IRouter = Router();

const inquiryBodySchema = insertInquirySchema.extend({
  email: z.string().email(),
  guests: z.coerce.number().int().min(1),
  firstName: z.string().min(1).max(120),
  lastName: z.string().min(1).max(120),
  phone: z.string().min(3).max(64),
  service: z.string().min(1),
  eventDate: z.string().min(1),
  destinationEvent: z.enum(["yes", "no"]),
  destinationServices: z.enum(["yes", "no"]),
  occasion: z.string().min(1),
  office: z.string().min(1),
  location: z.string().min(1),
  venue: z.string().optional().nullable(),
  additional: z.string().max(5000).optional().nullable(),
  hearAboutUs: z.string().optional().nullable(),
});

router.post("/inquiries", async (req, res) => {
  const parsed = inquiryBodySchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      error: "Invalid submission",
      issues: parsed.error.issues,
    });
  }

  const data = parsed.data;

  try {
    const [inserted] = await db
      .insert(inquiriesTable)
      .values({
        ...data,
        venue: data.venue ?? null,
        additional: data.additional ?? null,
        hearAboutUs: data.hearAboutUs ?? null,
      })
      .returning({ id: inquiriesTable.id });

    // Fire-and-forget Telegram notification
    const message = formatNotification("New Inquiry — Aurelia & Co.", [
      { label: "Name", value: `${data.firstName} ${data.lastName}` },
      { label: "Email", value: data.email },
      { label: "Phone", value: data.phone },
      { label: "Service", value: data.service },
      { label: "Occasion", value: data.occasion },
      { label: "Event Date", value: data.eventDate },
      { label: "Guests", value: data.guests },
      { label: "Location", value: data.location },
      {
        label: "Destination Event",
        value: data.destinationEvent === "yes" ? "Yes" : "No",
      },
      {
        label: "Destination Services",
        value: data.destinationServices === "yes" ? "Yes" : "No",
      },
      { label: "Preferred Office", value: data.office },
      { label: "Featured Venue", value: data.venue || null },
      { label: "Heard About Us", value: data.hearAboutUs || null },
      { label: "Notes", value: data.additional || null },
    ]);

    sendTelegramMessage(message).catch((err) =>
      logger.error({ err }, "Telegram notification failed (inquiry)"),
    );

    return res.status(201).json({ id: inserted.id, status: "received" });
  } catch (err) {
    logger.error({ err }, "Failed to save inquiry");
    return res.status(500).json({ error: "Could not save inquiry" });
  }
});

// Admin: list inquiries (protected by ADMIN_TOKEN query/header)
router.get("/inquiries", async (req, res) => {
  const adminToken = process.env["ADMIN_TOKEN"];
  if (!adminToken) {
    return res
      .status(503)
      .json({ error: "Admin disabled. Set ADMIN_TOKEN secret to enable." });
  }
  const provided =
    req.header("x-admin-token") ||
    (typeof req.query["token"] === "string" ? req.query["token"] : "");
  if (provided !== adminToken) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const rows = await db
    .select()
    .from(inquiriesTable)
    .orderBy(desc(inquiriesTable.createdAt))
    .limit(200);
  return res.json({ inquiries: rows });
});

export default router;
