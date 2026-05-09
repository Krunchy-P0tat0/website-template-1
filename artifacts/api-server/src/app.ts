import express, { type Express, type Request, type Response, type NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import pinoHttp from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

// ── CORS ──────────────────────────────────────────────────────────────────────
// In production, set ALLOWED_ORIGINS to a comma-separated list of allowed
// origins, e.g. "https://aurelia.replit.app,https://aureliandco.com".
// In development the Replit proxy origin is derived automatically.
function buildAllowedOrigins(): string[] {
  const env = process.env["ALLOWED_ORIGINS"];
  if (env) {
    return env.split(",").map((o) => o.trim()).filter(Boolean);
  }

  const origins: string[] = [];

  const devDomain = process.env["REPLIT_DEV_DOMAIN"];
  if (devDomain) {
    origins.push(`https://${devDomain}`);
  }

  const deployedDomain = process.env["REPLIT_DEPLOYMENT_URL"];
  if (deployedDomain) {
    origins.push(deployedDomain.replace(/\/$/, ""));
  }

  return origins;
}

const allowedOrigins = buildAllowedOrigins();

const corsOptions: cors.CorsOptions = {
  origin(requestOrigin, callback) {
    if (!requestOrigin) {
      return callback(null, true);
    }
    if (allowedOrigins.length === 0) {
      logger.warn({ requestOrigin }, "CORS: no allowed origins configured — allowing all in dev");
      return callback(null, true);
    }
    if (allowedOrigins.includes(requestOrigin)) {
      return callback(null, true);
    }
    logger.warn({ requestOrigin, allowedOrigins }, "CORS: blocked request from unknown origin");
    return callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "x-admin-token"],
  credentials: false,
};

// ── Middleware stack ──────────────────────────────────────────────────────────
app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return { statusCode: res.statusCode };
      },
    },
  }),
);

app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors(corsOptions));
app.use(express.json({ limit: "64kb" }));
app.use(express.urlencoded({ extended: true, limit: "64kb" }));

app.use("/api", router);

// ── Fallbacks ─────────────────────────────────────────────────────────────────
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: "Not found" });
});

app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  if (
    err instanceof Error &&
    err.message === "Not allowed by CORS"
  ) {
    return res.status(403).json({ error: "Forbidden" });
  }
  logger.error({ err }, "Unhandled error");
  return res.status(500).json({ error: "Internal server error" });
});

export default app;
