import { type Request, type Response, type NextFunction } from "express";
import jwt from "jsonwebtoken";
import { logger } from "./logger";

export interface AtelierJwtPayload {
  sub: string;
  role: "admin";
  iat: number;
  exp: number;
}

function getJwtSecret(): string {
  const secret = process.env["ADMIN_JWT_SECRET"];
  if (!secret) throw new Error("ADMIN_JWT_SECRET is not set");
  return secret;
}

export function signAtelierToken(): string {
  return jwt.sign({ sub: "admin", role: "admin" }, getJwtSecret(), {
    expiresIn: "8h",
  });
}

export function verifyAtelierToken(token: string): AtelierJwtPayload {
  return jwt.verify(token, getJwtSecret()) as AtelierJwtPayload;
}

export function requireAtelierAuth(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const authHeader = req.header("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  const token = authHeader.slice(7);
  try {
    const payload = verifyAtelierToken(token);
    (req as Request & { atelierUser: AtelierJwtPayload }).atelierUser = payload;
    next();
  } catch {
    logger.warn({ path: req.path }, "Atelier auth: invalid or expired token");
    res.status(401).json({ error: "Unauthorized" });
  }
}
