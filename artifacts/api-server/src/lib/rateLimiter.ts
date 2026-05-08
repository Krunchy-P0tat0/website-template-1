import rateLimit, { type Options } from "express-rate-limit";
import { logger } from "./logger";

function makeRateLimiter(opts: {
  name: string;
  windowMs: number;
  max: number;
  message?: string;
}) {
  return rateLimit({
    windowMs: opts.windowMs,
    max: opts.max,
    standardHeaders: "draft-7",
    legacyHeaders: false,
    message: { error: opts.message ?? "Too many requests. Please try again later." },
    skip: () => process.env.NODE_ENV === "test",
    handler(req, res, _next, options: Options) {
      logger.warn(
        {
          ip: req.ip,
          route: req.path,
          limiter: opts.name,
          retryAfter: res.getHeader("Retry-After"),
        },
        `Rate limit exceeded [${opts.name}]`,
      );
      res.status(options.statusCode).json(options.message);
    },
  });
}

export const inquiryLimiter = makeRateLimiter({
  name: "inquiries",
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: "You have submitted too many inquiries. Please wait before trying again.",
});

export const vendorLimiter = makeRateLimiter({
  name: "vendor-applications",
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: "You have submitted too many applications. Please wait before trying again.",
});

export const newsletterLimiter = makeRateLimiter({
  name: "newsletter",
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: "Too many subscription attempts. Please wait before trying again.",
});

export const adminLimiter = makeRateLimiter({
  name: "admin",
  windowMs: 15 * 60 * 1000,
  max: 30,
  message: "Too many admin requests.",
});
