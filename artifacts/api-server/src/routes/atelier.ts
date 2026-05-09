import { Router, type IRouter } from "express";
import { z } from "zod/v4";
import { db, inquiriesTable, newsletterTable, vendorApplicationsTable, siteSettingsTable } from "@workspace/db";
import { desc, eq } from "drizzle-orm";
import { logger } from "../lib/logger";
import { signAtelierToken, requireAtelierAuth } from "../lib/atelierAuth";
import { adminLimiter } from "../lib/rateLimiter";
import { sendTelegramMessage, formatNotification } from "../lib/telegram";

const router: IRouter = Router();

const loginSchema = z.object({
  email: z.string().trim().email().max(255),
  password: z.string().trim().min(1).max(255),
});

// ── POST /api/atelier/auth/login ─────────────────────────────────────────────
router.post("/atelier/auth/login", adminLimiter, (req, res) => {
  const adminEmail = process.env["ADMIN_EMAIL"];
  const adminPassword = process.env["ADMIN_PASSWORD"];
  const jwtSecret = process.env["ADMIN_JWT_SECRET"];

  if (!adminEmail || !adminPassword || !jwtSecret) {
    logger.error("Atelier login: missing ADMIN_EMAIL, ADMIN_PASSWORD, or ADMIN_JWT_SECRET");
    return res.status(503).json({ error: "Admin portal not configured" });
  }

  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid credentials" });
  }

  const { email, password } = parsed.data;

  if (email.trim() !== adminEmail.trim() || password !== adminPassword.trim()) {
    logger.warn({ email }, "Atelier login: invalid credentials attempt");
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = signAtelierToken();
  logger.info({ email }, "Atelier login: successful");
  return res.json({ token });
});

// ── GET /api/atelier/auth/verify ─────────────────────────────────────────────
router.get("/atelier/auth/verify", requireAtelierAuth, (_req, res) => {
  return res.json({ ok: true });
});

// ── GET /api/atelier/config ───────────────────────────────────────────────────
router.get("/atelier/config", requireAtelierAuth, async (_req, res) => {
  const botConfigured = !!process.env["TELEGRAM_BOT_TOKEN"];
  const chatConfigured = !!process.env["TELEGRAM_CHAT_ID"];
  const instagramTokenConfigured = !!process.env["INSTAGRAM_ACCESS_TOKEN"];

  try {
    const rows = await db.select().from(siteSettingsTable);
    const s = Object.fromEntries(rows.map((r) => [r.key, r.value]));

    return res.json({
      telegram: {
        botConfigured,
        chatConfigured,
        active: botConfigured && chatConfigured,
      },
      instagram: {
        tokenConfigured: instagramTokenConfigured,
        feedEnabled: s["instagram_feed_enabled"] !== "false",
        handle: s["instagram_handle"] ?? "@aureliaandco",
        profileUrl: s["instagram_profile_url"] ?? "https://instagram.com/aureliaandco",
      },
    });
  } catch (err) {
    logger.error({ err }, "Atelier: failed to fetch config");
    return res.status(500).json({ error: "Could not load config" });
  }
});

// ── PATCH /api/atelier/settings/instagram ────────────────────────────────────
const instagramSettingsSchema = z.object({
  handle: z.string().max(120).optional(),
  profileUrl: z.string().max(255).optional(),
  feedEnabled: z.boolean().optional(),
});

router.patch("/atelier/settings/instagram", requireAtelierAuth, async (req, res) => {
  const parsed = instagramSettingsSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "Invalid data" });

  const { handle, profileUrl, feedEnabled } = parsed.data;

  const updates: Array<{ key: string; value: string }> = [];
  if (handle !== undefined) updates.push({ key: "instagram_handle", value: handle });
  if (profileUrl !== undefined) updates.push({ key: "instagram_profile_url", value: profileUrl });
  if (feedEnabled !== undefined) updates.push({ key: "instagram_feed_enabled", value: String(feedEnabled) });

  if (updates.length === 0) return res.status(400).json({ error: "Nothing to update" });

  try {
    for (const u of updates) {
      await db
        .insert(siteSettingsTable)
        .values({ key: u.key, value: u.value })
        .onConflictDoUpdate({
          target: siteSettingsTable.key,
          set: { value: u.value, updatedAt: new Date() },
        });
    }
    return res.json({ updated: true });
  } catch (err) {
    logger.error({ err }, "Atelier: failed to update Instagram settings");
    return res.status(500).json({ error: "Could not update settings" });
  }
});

// ── POST /api/atelier/telegram/test ──────────────────────────────────────────
router.post("/atelier/telegram/test", requireAtelierAuth, adminLimiter, async (_req, res) => {
  if (!process.env["TELEGRAM_BOT_TOKEN"] || !process.env["TELEGRAM_CHAT_ID"]) {
    return res.status(503).json({ error: "Telegram not configured. Set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID." });
  }

  const message = formatNotification("Test Notification — Aurelia & Co.", [
    { label: "Status", value: "Connected and operational" },
    { label: "Sent at", value: new Date().toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" }) },
  ]);

  const sent = await sendTelegramMessage(message);
  if (sent) {
    logger.info("Atelier: test Telegram notification sent");
    return res.json({ sent: true });
  }
  return res.status(502).json({ error: "Failed to deliver message. Check TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID." });
});

// ── GET /api/atelier/inquiries ───────────────────────────────────────────────
router.get("/atelier/inquiries", requireAtelierAuth, async (_req, res) => {
  try {
    const rows = await db
      .select()
      .from(inquiriesTable)
      .orderBy(desc(inquiriesTable.createdAt))
      .limit(500);
    return res.json({ inquiries: rows, total: rows.length });
  } catch (err) {
    logger.error({ err }, "Atelier: failed to fetch inquiries");
    return res.status(500).json({ error: "Could not retrieve inquiries" });
  }
});

// ── PATCH /api/atelier/inquiries/:id ─────────────────────────────────────────
const patchInquirySchema = z.object({
  status: z.enum(["new", "contacted", "consultation_scheduled", "closed"]).optional(),
  notes: z.string().max(50000).optional(),
});

router.patch("/atelier/inquiries/:id", requireAtelierAuth, async (req, res) => {
  const id = parseInt(req.params["id"] as string, 10);
  if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });

  const parsed = patchInquirySchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "Invalid data" });

  const { status, notes } = parsed.data;

  if (status === undefined && notes === undefined) {
    return res.status(400).json({ error: "Nothing to update" });
  }

  const updates: Partial<{ status: string; notes: string }> = {};
  if (status !== undefined) updates.status = status;
  if (notes !== undefined) updates.notes = notes;

  try {
    const [row] = await db
      .update(inquiriesTable)
      .set(updates)
      .where(eq(inquiriesTable.id, id))
      .returning();

    if (!row) return res.status(404).json({ error: "Not found" });
    return res.json({ inquiry: row });
  } catch (err) {
    logger.error({ err }, "Atelier: failed to update inquiry");
    return res.status(500).json({ error: "Could not update inquiry" });
  }
});

// ── GET /api/atelier/newsletter ──────────────────────────────────────────────
router.get("/atelier/newsletter", requireAtelierAuth, async (_req, res) => {
  try {
    const rows = await db
      .select()
      .from(newsletterTable)
      .orderBy(desc(newsletterTable.createdAt))
      .limit(2000);
    return res.json({ subscribers: rows, total: rows.length });
  } catch (err) {
    logger.error({ err }, "Atelier: failed to fetch newsletter");
    return res.status(500).json({ error: "Could not retrieve subscribers" });
  }
});

// ── GET /api/atelier/vendors ─────────────────────────────────────────────────
router.get("/atelier/vendors", requireAtelierAuth, async (_req, res) => {
  try {
    const rows = await db
      .select()
      .from(vendorApplicationsTable)
      .orderBy(desc(vendorApplicationsTable.createdAt))
      .limit(500);
    return res.json({ vendors: rows, total: rows.length });
  } catch (err) {
    logger.error({ err }, "Atelier: failed to fetch vendors");
    return res.status(500).json({ error: "Could not retrieve vendor applications" });
  }
});

export default router;
