import { Router, type IRouter } from "express";
import { z } from "zod/v4";
import { db, inquiriesTable, newsletterTable, vendorApplicationsTable } from "@workspace/db";
import { desc } from "drizzle-orm";
import { logger } from "../lib/logger";
import { signAtelierToken, requireAtelierAuth } from "../lib/atelierAuth";
import { adminLimiter } from "../lib/rateLimiter";

const router: IRouter = Router();

const loginSchema = z.object({
  email: z.string().email().max(255),
  password: z.string().min(1).max(255),
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

  if (email !== adminEmail || password !== adminPassword) {
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
