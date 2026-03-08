import { Router, type Request, type Response } from "express";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
    const furgonetkaToken = req.headers["x-furgonetka-token"];
    const expectedToken =
        process.env.FURGONETKA_INTEGRATION_TOKEN || "on-up-super-secret-token";

    console.log(`[Furgonetka] GET /orders - Received Token: ${furgonetkaToken}`);

    if (furgonetkaToken !== expectedToken) {
        console.warn(
            "[Furgonetka] Unauthorized access attempt - tokens do not match!",
        );
        return res.status(401).json({ error: "Unauthorized" });
    }

    // Ngrok bypass (opcjonalnie)
    res.setHeader("ngrok-skip-browser-warning", "69420");

    res.status(200).json({ orders: [] });
});

export default router;
