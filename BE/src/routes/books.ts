import { Router, type Request, type Response } from "express";
import { getBooks, createBook, updateBook, deleteBook } from "../data/books.js";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();

// GETs
router.get("/", async (req: Request, res: Response) => {
    try {
        const books = await getBooks();
        res.json(books);
    } catch (error) {
        console.error("Problem z pobieraniem książek:", error);
        res.status(500).json({ error: "Problem z pobieraniem książek!" });
    }
});
router.get("/:slug", async (req: Request, res: Response) => {
    try {
        const books = await getBooks();
        const book = books.find((book: any) => book.slug === req.params.slug);
        if (!book) {
            return res.status(404).json({ error: "Książka nie została znaleziona!" });
        }
        res.json(book);
    } catch (error) {
        console.error("Problem z pobieraniem książki:", error);
        res.status(500).json({ error: "Problem z pobieraniem książki!" });
    }
});

// POSTs
router.post("/", authMiddleware, async (req: Request, res: Response) => {
    try {
        console.log("POST /api/books - Body:", JSON.stringify(req.body, null, 2));
        const book = await createBook(req.body);
        res.status(201).json(book);
    } catch (error: any) {
        console.error("Problem z dodaniem książki:", error);
        res.status(400).json({ error: error.message || "Problem z dodaniem książki!" });
    }
});

// PUTs
router.put("/:id", authMiddleware, async (req: Request, res: Response) => {
    try {
        const book = await updateBook(req.params.id as string, req.body);
        res.json(book);
    } catch (error) {
        console.error("Problem z aktualizacją książki:", error);
        res.status(500).json({ error: "Problem z aktualizacją książki!" });
    }
});

// DELETEs
router.delete("/:id", authMiddleware, async (req: Request, res: Response) => {
    try {
        await deleteBook(req.params.id as string);
        res.json({ message: "Książka została usunięta!" });
    } catch (error) {
        console.error("Problem z usunięciem książki:", error);
        res.status(500).json({ error: "Problem z usunięciem książki!" });
    }
});

export default router;
