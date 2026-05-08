import { Router, type IRouter } from "express";
import { db, vendorApplicationsTable } from "@workspace/db";
import { z } from "zod/v4";
import { logger } from "../lib/logger";
import { sendTelegramMessage, formatNotification } from "../lib/telegram";
import { vendorLimiter } from "../lib/rateLimiter";

const router: IRouter = Router();

const safeUrl = z
  .string()
  .max(500)
  .refine(
    (val) => {
      try {
        const u = new URL(val);
        return u.protocol === "https:" || u.protocol === "http:";
      } catch {
        return false;
      }
    },
    { message: "Must be a valid URL (http or https)" },
  )
  .optional()
  .nullable();

const vendorBodySchema = z.object({
  businessName: z.string().min(1).max(180),
  contactName: z.string().min(1).max(180),
  email: z.string().email().max(255),
  phone: z.string().max(64).optional().nullable(),
  website: safeUrl,
  instagram: z.string().max(120).optional().nullable(),
  category: z.string().min(1).max(80),
  regions: z.string().min(1).max(255),
  yearsActive: z.string().max(40).optional().nullable(),
  bio: z.string().min(20).max(3000),
  portfolioUrl: safeUrl,
  hearAboutUs: z.string().max(255).optional().nullable(),
});

router.post("/vendor-applications", vendorLimiter, async (req, res) => {
  const parsed = vendorBodySchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid submission" });
  }

  const data = parsed.data;

  try {
    const [inserted] = await db
      .insert(vendorApplicationsTable)
      .values({
        ...data,
        phone: data.phone ?? null,
        website: data.website ?? null,
        instagram: data.instagram ?? null,
        yearsActive: data.yearsActive ?? null,
        portfolioUrl: data.portfolioUrl ?? null,
        hearAboutUs: data.hearAboutUs ?? null,
      })
      .returning({ id: vendorApplicationsTable.id });

    const message = formatNotification("New Vendor Application", [
      { label: "Business", value: data.businessName },
      { label: "Contact", value: data.contactName },
      { label: "Email", value: data.email },
      { label: "Phone", value: data.phone || null },
      { label: "Category", value: data.category },
      { label: "Regions", value: data.regions },
      { label: "Years Active", value: data.yearsActive || null },
      { label: "Website", value: data.website || null },
      { label: "Instagram", value: data.instagram || null },
      { label: "Portfolio URL", value: data.portfolioUrl || null },
      { label: "Heard About Us", value: data.hearAboutUs || null },
      { label: "Bio", value: data.bio },
    ]);

    sendTelegramMessage(message).catch((err) =>
      logger.error({ err }, "Telegram notification failed (vendor application)"),
    );

    return res.status(201).json({ id: inserted.id, status: "received" });
  } catch (err) {
    logger.error({ err }, "Failed to save vendor application");
    return res.status(500).json({ error: "Could not save application" });
  }
});

export default router;
