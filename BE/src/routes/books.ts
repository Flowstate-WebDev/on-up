import { Router, type Request, type Response } from "express";
import { getBooks, createBook, updateBook, deleteBook } from "../data/books.js";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const books = await getBooks();
    res.json(books);
  } catch (error) {
    console.error("\x1b[91m%s\x1b[0m", "Error fetching books:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.get("/:slug", async (req: Request, res: Response) => {
  try {
    const books = await getBooks();
    const book = books.find((book: any) => book.slug === req.params.slug);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json(book);
  } catch (error) {
    console.error("\x1b[91m%s\x1b[0m", "Error fetching book by slug:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.post("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    console.log(
      "\x1b[93m%s\x1b[0m",
      "[Books] POST /api/books - Body:",
      JSON.stringify(req.body, null, 2),
    );
    const book = await createBook(req.body);
    res.status(201).json(book);
  } catch (error: any) {
    console.error("\x1b[91m%s\x1b[0m", "Error creating book:", error);
    res.status(400).json({ error: error.message || "Something went wrong" });
  }
});

router.put("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const book = await updateBook(req.params.id as string, req.body);
    res.json(book);
  } catch (error) {
    console.error("\x1b[91m%s\x1b[0m", "Error updating book:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.delete("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    await deleteBook(req.params.id as string);
    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("\x1b[91m%s\x1b[0m", "Error deleting book:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;
