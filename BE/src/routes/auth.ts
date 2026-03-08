import { Router, type Request, type Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma.js";
import { JWT_SECRET, SALT_ROUNDS, NODE_ENV } from "../config/env.js";

const router = Router();

// POSTs
router.post("/register", async (req: Request, res: Response) => {
  try {
    const { username, password, email, phone } = req.body;

    if (!username || !password || !email || !phone) {
      return res.status(400).json({ error: "Wymagane są wszystkie pola!" });
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { username: username },
          { email: email }
        ]
      }
    });

    if (existingUser) {
      return res.status(400).json({ error: "Użytkownik o danym emailu lub loginie już istnieje!" });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await prisma.user.create({
      data: {
        username: username,
        password: hashedPassword,
        email: email,
        phone: phone
      }
    });

    res.status(201).json({ message: "Użytkownik utworzony pomyślnie!", userId: user.id });
  } catch (error) {
    console.error("Wystąpił błąd podczas rejestracji:", error);
    res.status(500).json({ error: "Wystąpił błąd podczas rejestracji!" });
  }
});

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Wymagane są wszystkie pola!" });
    }

    const user = await prisma.user.findUnique({
      where: { username: username }
    });

    if (!user) {
      return res.status(401).json({ error: "Użytkownik nie istnieje!" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Podano nieprawidłowy login lub hasło!" });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 1000
    }).json({
      message: "Login successful",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
    });
  } catch (error) {
    console.error("Problem z logowaniem:", error);
    res.status(500).json({ error: "Problem z logowaniem!" });
  }
});

router.post("/logout", (req: Request, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: NODE_ENV === "production",
    sameSite: "lax"
  }).json({ message: "Wylogowano pomyślnie!" });
});

export default router;
