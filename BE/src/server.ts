import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import getBooks from "./data/books.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config();

const JWT_SECRET: string = process.env.JWT_SECRET || "fallback_secret";

const saltRounds = 10;

const globalCorsConfig = {
  origin: ["http://localhost:5173", "http://localhost:3001"],
  optionsSuccessStatus: 200,
  credentials: true,
};

const app = express();

app.use(cors(globalCorsConfig));
app.use(cookieParser());
app.use(express.json());

app.get("/api/books", async (req: Request, res: Response) => {
  try {
    const books = await getBooks();
    res.json(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.get("/api/books/:slug", async (req: Request, res: Response) => {
  try {
    const books = await getBooks();
    const book = books.find((book: any) => book.slug === req.params.slug);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json(book);
  } catch (error) {
    console.error("Error fetching book by slug:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Auth Middleware
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token!, JWT_SECRET as jwt.Secret) as any;
    (req as any).user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

// FORMS
import { prisma } from "./lib/prisma.js";

app.post("/api/payment/create", async (req: Request, res: Response) => {
  try {
    const { email, phone, firstName, lastName, items, address } = req.body;

    if (
      !email ||
      !phone ||
      !firstName ||
      !lastName ||
      !items ||
      !items.length ||
      !address
    ) {
      return res.status(400).json({ error: "Missing required fields" });
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

        // Konwersja Decimal na number dla obliczeń (lub użycie biblioteki do Decimal jeśli wymagana precyzja finansowa)
        // Tutaj zakładamy prostą matematykę, ale w produkcji warto uważać na precyzję float.
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
        });
      }

      // Utworzenie obiektu zamówienia
      const order = await tx.order.create({
        data: {
          // orderNumber wygeneruje się automatycznie (CUID)
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

    const { order, totalAmount } = result;

    const payload = {
      amount: Math.round(totalAmount * 100), // convert to grosze
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
      console.error("PayNow Error:", data);

      // Jeśli PayNow odrzuci (np. błąd konfiguracji), powinniśmy oznaczyć zamówienie jako błąd i zwrócić towar?
      // W tym prostym flow, jeśli request do PayNow nie przejdzie, rzucamy błąd,
      // co może (jeśli obsłużymy) triggerować zwrot towaru, ale transaction już poszła commit.
      // Dobre miejsce na "Manual rollback" lub ustawienie statusu ERROR.

      await prisma.order.update({
        where: { id: order.id },
        data: { status: "ERROR" },
      });

      // Przywracamy stock
      // (W idealnym świecie to powinno być w osobnym bloku catch/finally lub kolejce)
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
    console.error("Error creating payment and order:", error);
    // Obsługa custom errors z transakcji
    if (error.message && error.message.includes("niedostępny")) {
      return res.status(400).json({ error: error.message });
    }
    res
      .status(500)
      .json({ error: "Internal server error during payment/order creation" });
  }
});

app.post("/api/register", async (req: Request, res: Response) => {
  try {
    const { username, password, email, phone } = req.body;

    if (!username || !password || !email || !phone) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ username: username }, { email: email }],
      },
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with this username or email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await prisma.user.create({
      data: {
        username: username,
        password: hashedPassword,
        email: email,
        phone: phone,
      },
    });

    res
      .status(201)
      .json({ message: "User created successfully", userId: user.id });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.post("/api/login", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }

    const user = await prisma.user.findUnique({
      where: { username: username },
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 1000,
      })
      .json({
        message: "Login successful",
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          phone: user.phone,
        },
      });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.post("/api/logout", (req: Request, res: Response) => {
  res
    .clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    })
    .json({ message: "Logged out successfully" });
});

app.get("/api/user/me", authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, username: true, email: true, phone: true },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching current user:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.post("/api/payment/notifications", async (req: Request, res: Response) => {
  try {
    console.log("🔔 Otrzymano powiadomienie płatności!");

    // Logowanie nagłówków i body dla debugowania
    const signature = req.headers["signature"] as string;
    console.log("Headers:", req.headers);
    console.log("Signature headers:", signature);

    const body = JSON.stringify(req.body);
    console.log("Body:", body);

    const signatureKey = process.env.PAYNOW_SIGNATURE_KEY!;

    // 1. Weryfikacja podpisu (zabezpieczenie przed podszywaniem się)
    const calculatedSignature = crypto
      .createHmac("sha256", signatureKey)
      .update(body)
      .digest("base64");

    console.log(
      `Signature check: Received=${signature}, Calculated=${calculatedSignature}`,
    );

    if (signature !== calculatedSignature) {
      console.error("❌ Invalid PayNow signature");
      return res.status(400).send("Invalid signature");
    }

    const { externalId, status, paymentId } = req.body;
    console.log(
      `✅ Valid PayNow notification for ${externalId}: ${status} (${paymentId})`,
    );

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
        include: { items: true },
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
