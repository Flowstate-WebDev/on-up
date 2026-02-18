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
    const {
      amount,
      email,
      phone,
      firstName,
      lastName,
      externalId,
      items,
      address,
    } = req.body;

    if (
      !amount ||
      !email ||
      !phone ||
      !firstName ||
      !lastName ||
      !externalId ||
      !items ||
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

    // 1. Zawsze twórz zamówienie w bazie danych
    await prisma.order.create({
      data: {
        orderNumber: externalId,
        totalAmount: amount,
        status: "PENDING" as any,
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
          create: items.map((item: any) => ({
            bookId: item.id,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
    });

    // 2. Jeśli mamy userId, zaktualizuj też jego stały adres rozliczeniowy
    if (userId) {
      await prisma.billingAddress.upsert({
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

    const payload = {
      amount: Math.round(amount * 100), // convert to grosze
      currency: "PLN",
      externalId: externalId,
      description: `Zamówienie On-Up #${externalId}`,
      continueUrl: "http://localhost:5173/koszyk/sukces",
      buyer: {
        email: email,
        firstName: firstName,
        lastName: lastName,
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
      return res
        .status(response.status)
        .json({ error: "PayNow integration error", details: data });
    }

    res.json(data);
  } catch (error) {
    console.error("Error creating payment and order:", error);
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
    const signature = req.headers["signature"] as string;
    const body = JSON.stringify(req.body);
    const signatureKey = process.env.PAYNOW_SIGNATURE_KEY!;

    // 1. Weryfikacja podpisu (zabezpieczenie przed podszywaniem się)
    const calculatedSignature = crypto
      .createHmac("sha256", signatureKey)
      .update(body)
      .digest("base64");

    if (signature !== calculatedSignature) {
      console.error("Invalid PayNow signature");
      return res.status(400).send("Invalid signature");
    }

    const { externalId, status, paymentId } = req.body;
    console.log(
      `Received PayNow notification for ${externalId}: ${status} (${paymentId})`,
    );

    // 2. Mapowanie statusów PayNow na statusy Twojej bazy (OrderStatus)
    // PayNow statuses: NEW, PENDING, CONFIRMED, REJECTED, ERROR
    const statusMap: Record<string, any> = {
      CONFIRMED: "CONFIRMED",
      REJECTED: "REJECTED",
      ERROR: "ERROR",
      PENDING: "PENDING",
    };

    const newStatus = statusMap[status];

    if (newStatus) {
      // 3. Aktualizacja statusu zamówienia w bazie
      await prisma.order.update({
        where: { orderNumber: externalId },
        data: { status: newStatus },
      });
      console.log(`Order ${externalId} updated to ${newStatus}`);
    }

    res.status(200).send("OK");
  } catch (error) {
    console.error("Error processing PayNow notification:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default app;
