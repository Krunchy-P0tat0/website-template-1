import { Router, type IRouter } from "express";
import { logger } from "../lib/logger";

const router: IRouter = Router();

const INSTAGRAM_TOKEN = process.env["INSTAGRAM_ACCESS_TOKEN"];
const INSTAGRAM_GRAPH_URL = "https://graph.instagram.com";

router.get("/instagram/feed", async (req, res) => {
  if (!INSTAGRAM_TOKEN) {
    logger.info("Instagram feed: no access token configured, returning empty");
    return res.json({ posts: [], source: "none", configured: false });
  }

  try {
    const fields = "id,caption,media_url,permalink,media_type,thumbnail_url";
    const url = `${INSTAGRAM_GRAPH_URL}/me/media?fields=${fields}&limit=6&access_token=${INSTAGRAM_TOKEN}`;

    const igRes = await fetch(url);

    if (!igRes.ok) {
      const body = await igRes.text();
      logger.error({ status: igRes.status, body }, "Instagram Graph API error");
      return res.status(502).json({
        error: "Instagram API request failed",
        code: "INSTAGRAM_API_ERROR",
      });
    }

    const data = (await igRes.json()) as {
      data?: Array<{
        id: string;
        caption?: string;
        media_url?: string;
        thumbnail_url?: string;
        permalink: string;
        media_type: string;
      }>;
    };

    const posts = (data.data ?? [])
      .filter((p) => p.media_type === "IMAGE" || p.media_type === "CAROUSEL_ALBUM")
      .map((p) => ({
        id: p.id,
        image: p.media_url ?? p.thumbnail_url ?? "",
        caption: p.caption?.split("\n")[0] ?? "",
        alt: p.caption?.split("\n")[0] ?? "Aurelia & Co. on Instagram",
        href: p.permalink,
      }));

    logger.info({ count: posts.length }, "Instagram feed fetched successfully");
    return res.json({ posts, source: "instagram", configured: true });
  } catch (err) {
    logger.error({ err }, "Instagram feed fetch failed");
    return res.status(500).json({
      error: "Failed to fetch Instagram feed",
      code: "INSTAGRAM_FETCH_ERROR",
    });
  }
});

export default router;
