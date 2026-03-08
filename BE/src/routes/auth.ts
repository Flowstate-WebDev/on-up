import { Router, type Request, type Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma.js";
import { JWT_SECRET, SALT_ROUNDS, NODE_ENV } from "../config/env.js";

const router = Router();

router.post("/register", async (req: Request, res: Response) => {
    try {
        const { username, password, email, phone } = req.body;

        if (!username || !password || !email || !phone) {
            return res.status(400).json({ error: "All fields are required" });
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
            return res.status(400).json({ error: "User with this username or email already exists" });
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

        res.status(201).json({ message: "User created successfully", userId: user.id });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ error: "Something went wrong" });
    }
});

router.post("/login", async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: "Username and password are required" });
        }

        const user = await prisma.user.findUnique({
            where: { username: username }
        });

        if (!user) {
            return res.status(401).json({ error: "Invalid username or password" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid username or password" });
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
        console.error("Error logging in:", error);
        res.status(500).json({ error: "Something went wrong" });
    }
});

router.post("/logout", (req: Request, res: Response) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: NODE_ENV === "production",
        sameSite: "lax"
    }).json({ message: "Logged out successfully" });
});

export default router;
