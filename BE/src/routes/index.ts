import { Router } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

/**
 * Dynamically loads and mounts all route files.
 * Example:
 * - auth.ts containing router.post('/login') -> mounted at /api (becomes /api/login)
 * - books.ts containing router.get('/') -> mounted at /api/books (becomes /api/books)
 */
export async function setupRoutes() {
  const files = fs
    .readdirSync(__dirname)
    .filter(
      (file) =>
        (file.endsWith(".ts") || file.endsWith(".js")) &&
        file !== "index.ts" &&
        file !== "index.js",
    );

  console.log(
    "\x1b[94m%s\x1b[0m",
    `[Router] Found route files: ${files.join(", ")}`,
  );

  for (const file of files) {
    const routeName = path.parse(file).name;
    const filePath = path.join(__dirname, file);
    const module = await import(pathToFileURL(filePath).href);

    if (module.default) {
      // "auth" and "api" files are mounted at the root level /api
      // Other files like "books" are mounted at /api/books
      const prefix =
        routeName === "auth" || routeName === "api" ? "" : `/${routeName}`;

      router.use(prefix, module.default);
      console.log(
        "\x1b[94m%s\x1b[0m",
        `[Router] Loaded ${routeName} at /api${prefix}`,
      );
    }
  }

  return router;
}
