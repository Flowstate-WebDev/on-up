import { Router, type Request, type Response } from "express";
import { prisma } from "../lib/prisma.js";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const qualifications = await prisma.qualification.findMany();
    res.json(qualifications);
  } catch (error) {
    console.error("Problem z pobieraniem kwalifikacji:", error);
    res.status(500).json({ error: "Problem z pobieraniem kwalifikacji!" });
  }
});

export default router;
