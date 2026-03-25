import { type Request, type Response, type NextFunction } from "express";
import { prisma } from "../lib/prisma.js";

export const adminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const userId = (req as any).user?.userId;
  if (!userId) return res.status(401).json({ error: "Unauthorized" });

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user || user.role.toUpperCase() !== "ADMIN") {
      return res.status(403).json({ error: "Access denied. Admins only." });
    }
    next();
  } catch (error) {
    return res.status(500).json({ error: "Server error checking permissions" });
  }
};
