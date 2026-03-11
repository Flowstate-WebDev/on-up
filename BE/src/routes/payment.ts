import { Router, type Request, type Response } from "express";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { prisma } from "../lib/prisma.js";
import { JWT_SECRET } from "../config/env.js";
import { createFurgonetkaPackage } from "../lib/furgonetka.js";
const router = Router();

router.post("/create", async (req: Request, res: Response) => {
  try {
    const {
      email,
      phone,
      firstName,
      lastName,
      items,
      address,
      shippingMethod,
      shippingPoint,
    } = req.body;

    if (
      !email ||
      !phone ||
      !firstName ||
      !lastName ||
      !items ||
      !items.length ||
      !address
    ) {
      return res.status(400).json({ error: "Brakuje wymaganych danych do złożenia zamówienia!" });
    }

    // Sprawdź czy użytkownik jest zalogowany
    const token = req.cookies.token;
    let userId: string | undefined;
    if (token) {
      try {
        const decoded = jwt.verify(token, JWT_SECRET) as any;
        userId = decoded.userId;
      } catch (e) {
        // Ignorujemy błąd tokena, potraktujemy jako gościa
      }
    }

    // Jeśli nie mamy userId, możemy spróbować znaleźć użytkownika po emailu
    if (!userId) {
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) userId = existingUser.id;
    }

    // TRANSAKCJA: Sprawdzenie dostępności -> Obliczenie Ceny -> Rezerwacja Towaru (Odejmowanie) -> Utworzenie Zamówienia
    const result = await prisma.$transaction(async (tx) => {
      let calculatedTotal = 0;
      const orderItemsData = [];

      // Generowanie ładnego numeru zamówienia: ONUP-DATA-LOSOWY
      const now = new Date();
      const dateStr = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;
      const randomPart = Math.floor(Math.random() * 9000 + 1000); // Losowe 4 cyfry
      const generatedOrderNumber = `ONUP-${dateStr}-${randomPart}`;

      for (const itemRequest of items) {
        const book = await tx.book.findUnique({
          where: { id: itemRequest.id },
        });

        if (!book) {
          throw new Error(`Produkt o ID ${itemRequest.id} nie istnieje.`);
        }

        if (book.stock < itemRequest.quantity) {
          throw new Error(
            `Produkt "${book.title}" jest niedostępny w wybranej ilości (pozostało: ${book.stock}).`,
          );
        }

        const price = Number(book.price);
        calculatedTotal += price * itemRequest.quantity;

        // Odejmowanie stanu magazynowego (Rezerwacja)
        await tx.book.update({
          where: { id: book.id },
          data: { stock: { decrement: itemRequest.quantity } },
        });

        orderItemsData.push({
          bookId: book.id,
          quantity: itemRequest.quantity,
          price: book.price, // Zapisujemy cenę z momentu zakupu
          orderNumber: generatedOrderNumber,
        });
      }

      // Utworzenie obiektu zamówienia
      const order = await tx.order.create({
        data: {
          orderNumber: generatedOrderNumber,
          totalAmount: calculatedTotal,
          status: "PENDING",
          userId: userId || null,
          customerEmail: email,
          customerFirstName: firstName,
          customerLastName: lastName,
          customerPhone: phone,
          customerCity: address.city,
          customerStreet: address.street,
          customerPostalCode: address.postalCode,
          customerBuilding: address.building,
          customerApartment: address.apartment,
          shippingMethod: shippingMethod,
          shippingPoint: shippingPoint,
          items: {
            create: orderItemsData,
          },
        },
      });

      // Aktualizacja adresu rozliczeniowego użytkownika
      if (userId) {
        await tx.billingAddress.upsert({
          where: { userId: userId },
          update: {
            city: address.city,
            postalCode: address.postalCode,
            street: address.street,
            building: address.building,
            apartment: address.apartment,
            firstname: firstName,
            lastname: lastName,
          },
          create: {
            userId: userId,
            city: address.city,
            postalCode: address.postalCode,
            street: address.street,
            building: address.building,
            apartment: address.apartment,
            firstname: firstName,
            lastname: lastName,
          },
        });
      }

      return { order, totalAmount: calculatedTotal };
    });

    let { order, totalAmount } = result;

    // Business logic: Free delivery and discounts
    const shippingPrices: Record<string, number> = {
      inpost: 14.0,
      orlen: 11.0,
      kurier: 18.0,
      poczta: 15.0,
    };

    let shippingCost = shippingPrices[shippingMethod] || 15.0;
    let discount = 0;

    if (totalAmount >= 400) {
      shippingCost = 0;
    }

    if (totalAmount >= 500) {
      discount = totalAmount * 0.05;
    }

    const finalAmount = totalAmount - discount + shippingCost;

    // Update the order with the final amount if it differs from calculated (due to shipping/discount)
    await prisma.order.update({
      where: { id: order.id },
      data: { totalAmount: finalAmount },
    });

    const payload = {
      amount: Math.round(finalAmount * 100), // convert to grosze
      currency: "PLN",
      externalId: order.orderNumber,
      description: `Zamówienie On-Up #${order.orderNumber}`,
      continueUrl: process.env.FRONTEND_URL
        ? `${process.env.FRONTEND_URL}/koszyk/sukces`
        : "http://localhost:5173/koszyk/sukces",
      buyer: {
        email: email,
        firstName: firstName,
        lastName: lastName,
        locale: "pl-PL",
      },
    };

    const signatureKey = process.env.PAYNOW_SIGNATURE_KEY!;
    const apiKey = process.env.PAYNOW_API_KEY!;
    const body = JSON.stringify(payload);

    const signature = crypto
      .createHmac("sha256", signatureKey)
      .update(body)
      .digest("base64");

    const idempotencyKey = crypto.randomUUID();

    const response = await fetch("https://api.sandbox.paynow.pl/v1/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Api-Key": apiKey,
        Signature: signature,
        "Idempotency-Key": idempotencyKey,
      },
      body: body,
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("\x1b[91m%s\x1b[0m", "[Payment] Error:", data);

      await prisma.order.update({
        where: { id: order.id },
        data: { status: "ERROR" },
      });

      // Przywracamy stock
      for (const item of items) {
        await prisma.book.update({
          where: { id: item.id },
          data: { stock: { increment: item.quantity } },
        });
      }

      return res
        .status(response.status)
        .json({ error: "PayNow integration error", details: data });
    }

    res.json(data);
  } catch (error: any) {
    console.error(
      "\x1b[91m%s\x1b[0m",
      "[Payment] Error during creation:",
      error,
    );

    if (error.message && error.message.includes("niedostępny")) {
      return res.status(400).json({ error: error.message });
    }

    res.status(500).json({
      error: "Internal server error during payment/order creation",
      message: error.message,
      details: error.stack,
    });
  }
});

// Endpoint do anulowania zamówienia i zwrotu towaru
router.post("/cancel", async (req: Request, res: Response) => {
  try {
    const { orderNumber } = req.body;

    if (!orderNumber) {
      return res.status(400).json({ error: "Missing orderNumber" });
    }

    const order = await prisma.order.findUnique({
      where: { orderNumber },
      include: { items: true },
    });

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Tylko zamówienia PENDING mogą być anulowane w ten sposób
    if (order.status !== "PENDING" && order.status !== "NEW") {
      return res.status(400).json({ error: "Order cannot be cancelled" });
    }

    await prisma.$transaction(async (tx) => {
      // 1. Zmień status
      await tx.order.update({
        where: { id: order.id },
        data: { status: "REJECTED" },
      });

      // 2. Zwróć stock
      for (const item of order.items) {
        await tx.book.update({
          where: { id: item.bookId },
          data: { stock: { increment: item.quantity } },
        });
      }
    });

    res.json({ message: "Order cancelled and stock restored" });
  } catch (error) {
    console.error(
      "\x1b[91m%s\x1b[0m",
      "[Payment] Error cancelling order:",
      error,
    );
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/notifications", async (req: Request, res: Response) => {
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
      console.error("\x1b[91m%s\x1b[0m", "[Payment] Invalid signature");
      return res.status(400).send("Invalid signature");
    }

    const { externalId, status, paymentId } = req.body;
    console.log("\x1b[96m%s\x1b[0m", `[Payment]: ${status} ${externalId}`);

    // 2. Mapowanie statusów PayNow na statusy Twojej bazy (OrderStatus)
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
      const currentOrder = await prisma.order.findUnique({
        where: { orderNumber: externalId },
        include: { items: { include: { book: true } } },
      });

      if (!currentOrder) {
        console.error(
          "\x1b[93m%s\x1b[0m",
          `[Payment] Order not found for: ${externalId}`,
        );
        return res.status(404).send("Order not found");
      }

      // 3. Aktualizacja statusu
      await prisma.order.update({
        where: { orderNumber: externalId },
        data: { status: newStatus },
      });
      console.log(
        "\x1b[96m%s\x1b[0m",
        `[Payment] Order ${externalId} updated to ${newStatus}`,
      );

      // 3.1. Wyślij do Furgonetki jeśli zamówienie zostało opłacone
      if (newStatus === "CONFIRMED" && currentOrder.status !== "CONFIRMED") {
        console.log(
          "\x1b[96m%s\x1b[0m",
          `[Payment] Sending ${externalId} to Furgonetka`,
        );
        const result = await createFurgonetkaPackage(currentOrder);
        if (!result.success) {
          console.error(
            "\x1b[91m%s\x1b[0m",
            `[Furgonetka] error for order ${externalId}:`,
            result.error,
          );
        }
      }

      // 4. OBSŁUGA ZWROTU TOWARU
      const failureStatuses = ["REJECTED", "ERROR", "EXPIRED", "ABANDONED"];
      const wasPending =
        currentOrder.status === "PENDING" || currentOrder.status === "NEW";

      if (failureStatuses.includes(newStatus) && wasPending) {
        console.log(
          "\x1b[96m%s\x1b[0m",
          `[Payment] Restoring stock for refused order ${externalId}`,
        );
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

export default router;
