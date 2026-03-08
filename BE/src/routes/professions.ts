import { Router, type Request, type Response } from "express";
import { prisma } from "../lib/prisma.js";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const professions = await prisma.profession.findMany();
    res.json(professions);
  } catch (error) {
    console.error("Problem z pobieraniem zawodów:", error);
    res.status(500).json({ error: "Problem z pobieraniem zawodów!" });
  }
});

export default router;
