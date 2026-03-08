import { Router, type Request, type Response } from "express";
import { prisma } from "../lib/prisma.js";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
    try {
        const professions = await prisma.profession.findMany();
        res.json(professions);
    } catch (error) {
        console.error("Error fetching professions:", error);
        res.status(500).json({ error: "Something went wrong" });
    }
});

export default router;
