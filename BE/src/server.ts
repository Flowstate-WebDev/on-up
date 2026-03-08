import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { CORS_CONFIG } from "./config/env.js";
import { setupRoutes } from "./routes/index.js";

const app = express();

// Global Middleware
app.use(cors(CORS_CONFIG));
app.use(cookieParser());
app.use(
  express.json({
    verify: (req: any, res, buf) => {
      req.rawBody = buf.toString();
    },
  }),
);

// Load dynamic routes
const router = await setupRoutes();
app.use("/api", router);

app.get("/orders", (req: Request, res: Response) => {
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

  // Zwracamy pustą listę zamówień
  res.status(200).json({ orders: [] });
});

app.post("/api/payment/notifications", async (req: Request, res: Response) => {
  try {
    const signature = req.headers["signature"] as string;
    const rawBody = (req as any).rawBody;
    const verificationBody = rawBody || JSON.stringify(req.body);

    const signatureKey = process.env.PAYNOW_SIGNATURE_KEY!;

    // 1. Weryfikacja podpisu (zabezpieczenie przed podszywaniem się)
    const calculatedSignature = crypto
      .createHmac("sha256", signatureKey)
      .update(verificationBody)
      .digest("base64");

    if (signature !== calculatedSignature) {
      console.error("❌ Invalid PayNow signature");
      return res.status(400).send("Invalid signature");
    }

    const { externalId, status, paymentId } = req.body;
    console.log(`Paynow notification: ${status}`);

    // 2. Mapowanie statusów PayNow na statusy Twojej bazy (OrderStatus)
    // PayNow statuses: NEW, PENDING, CONFIRMED, REJECTED, ERROR
    const statusMap: Record<string, any> = {
      CONFIRMED: "CONFIRMED",
      REJECTED: "REJECTED",
      ERROR: "ERROR",
      PENDING: "PENDING",
      ABANDONED: "ABANDONED",
      EXPIRED: "EXPIRED",
    };

    const newStatus = statusMap[status];

    if (newStatus) {
      // Pobierz aktualny stan zamówienia
      const currentOrder = await prisma.order.findUnique({
        where: { orderNumber: externalId },
        include: { items: { include: { book: true } } },
      });

      if (!currentOrder) {
        console.error(`Order not found for notification: ${externalId}`);
        return res.status(404).send("Order not found");
      }

      // 3. Aktualizacja statusu
      await prisma.order.update({
        where: { orderNumber: externalId },
        data: { status: newStatus },
      });
      console.log(`Order ${externalId} updated to ${newStatus}`);

      // 3.1. Wyślij do Furgonetki jeśli zamówienie zostało opłacone
      if (newStatus === "CONFIRMED" && currentOrder.status !== "CONFIRMED") {
        console.log(`Sending order ${externalId} to Furgonetka...`);
        const result = await createFurgonetkaPackage(currentOrder);
        if (!result.success) {
          console.error(
            `Furgonetka error for order ${externalId}:`,
            result.error,
          );
        }
      }

      // 4. OBSŁUGA ZWROTU TOWARU (Jeśli płatność się nie udała)
      // Jeśli nowe statusy to REJECTED, ERROR, EXPIRED itd., a zamówienie nie było wcześniej potwierdzone/odrzucone
      const failureStatuses = ["REJECTED", "ERROR", "EXPIRED", "ABANDONED"];
      const wasPending =
        currentOrder.status === "PENDING" || currentOrder.status === "NEW";

      if (failureStatuses.includes(newStatus) && wasPending) {
        console.log(`Restoring stock for refused order ${externalId}`);
        await prisma.$transaction(
          currentOrder.items.map((item) =>
            prisma.book.update({
              where: { id: item.bookId },
              data: { stock: { increment: item.quantity } },
            }),
          ),
        );
      }
    }

    res.status(200).send("OK");
  } catch (error) {
    console.error("Error processing PayNow notification:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default app;
