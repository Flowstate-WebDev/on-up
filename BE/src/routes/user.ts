import { Router, type Request, type Response } from "express";
import { prisma } from "../lib/prisma.js";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();

router.get("/me", authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        email: true,
        phone: true,
        role: true
      }
    });

    if (!user) {
      return res.status(404).json({ error: "Nie znaleziono użytkownika!" });
    }

    res.json(user);
  } catch (error) {
    console.error("Problem ze znalezieniem użytkownika:", error);
    res.status(500).json({ error: "Problem ze znalezieniem użytkownika!" });
  }
});

export default router;
