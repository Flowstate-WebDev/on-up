import express, { type NextFunction, type Request, type Response } from "express";
import cors from "cors";
import getBooks from "./data/books.js";
import bcrypt from "bcrypt";

const saltRounds = 10;

const globalCorsConfig = {
    origin: ["http://localhost:5173", "http://localhost:3001"],
    optionsSuccessStatus: 200,
}

const app = express();

app.use(cors(globalCorsConfig));
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

// FORMS
import { prisma } from "./lib/prisma.js";

app.post("/api/register", async (req: Request, res: Response) => {
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

        const hashedPassword = await bcrypt.hash(password, saltRounds);

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

app.post("/api/login", async (req: Request, res: Response) => {
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

        res.json({ message: "Login successful", user: { id: user.id, name: user.username } });
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ error: "Something went wrong" });
    }
});

export default app;