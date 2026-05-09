import { Router, type IRouter } from "express";
import { getBrandSettings } from "../lib/brandSettings";
import { logger } from "../lib/logger";

const router: IRouter = Router();

router.get("/brand", async (_req, res) => {
  try {
    const settings = await getBrandSettings();
    return res.json(settings);
  } catch (err) {
    logger.error({ err }, "Failed to fetch brand settings");
    return res.status(500).json({ error: "Could not load brand settings" });
  }
});

export default router;
