import { Router, type Request, type Response } from "express";
import { prisma } from "../lib/prisma.js";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const qualifications = await prisma.qualification.findMany();
    res.json(qualifications);
  } catch (error) {
    console.error(
      "\x1b[91m%s\x1b[0m",
      "[Books] Error fetching qualifications:",
      error,
    );
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;
