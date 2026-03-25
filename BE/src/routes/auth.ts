import { Router, type Request, type Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma.js";
import { JWT_SECRET, SALT_ROUNDS, NODE_ENV } from "../config/env.js";

const router = Router();

// POSTs
router.post("/register", async (req: Request, res: Response) => {
  try {
    const { password, email } = req.body;

    if (!password || !email) {
      return res.status(400).json({ error: "Email i hasło są wymagane" });
    }

    if (!email.includes("@")) {
      return res.status(400).json({ error: "Podaj poprawny adres email" });
    }

    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({ error: "Hasło musi mieć co najmniej 8 znaków, w tym 1 cyfrę i znak specjalny" });
    }

    const existingUser = await prisma.user.findFirst({
      where: { email: email },
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Konto z tym adresem email już istnieje" });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const createData: any = {
      password: hashedPassword,
      email: email,
    };

    const user = await prisma.user.create({
      data: createData,
    });

    res
      .status(201)
      .json({ message: "User created successfully", userId: user.id });
  } catch (error) {
    console.error("\x1b[91m%s\x1b[0m", "Error registering user:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email i hasło są wymagane" });
    }

    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      return res
        .status(401)
        .json({ error: "Nieprawidłowa nazwa użytkownika lub hasło" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ error: "Nieprawidłowa nazwa użytkownika lub hasło" });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: NODE_ENV === "production",
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
          role: user.role,
        },
      });
  } catch (error) {
    console.error("\x1b[91m%s\x1b[0m", "Error logging in:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.post("/logout", (req: Request, res: Response) => {
  res
    .clearCookie("token", {
      httpOnly: true,
      secure: NODE_ENV === "production",
      sameSite: "lax",
    })
    .json({ message: "Logged out successfully" });
});

export default router;
