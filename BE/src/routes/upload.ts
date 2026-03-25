import { Router, type Request, type Response } from "express";
import type { UploadApiErrorResponse, UploadApiResponse } from "cloudinary";
import { authMiddleware } from "../middleware/auth.js";
import { adminMiddleware } from "../middleware/admin.js";
import { upload } from "../middleware/upload.js";
import cloudinary from "../lib/cloudinary.js";

const router = Router();

/**
 * POST /api/upload
 * Uploads a single image to Cloudinary.
 * Returns: { url: string }
 */
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  upload.single("image"),
  async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No image file provided" });
      }

      // Upload buffer to Cloudinary using upload_stream
      const result = await new Promise<UploadApiResponse>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "on-up/books",
            resource_type: "image",
          },
          (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
            if (error || !result) return reject(error);
            resolve(result);
          },
        );
        stream.end(req.file!.buffer);
      });

      console.log(
        "\x1b[92m%s\x1b[0m",
        `[Upload] Image uploaded to Cloudinary: ${result.secure_url}`,
      );

      res.json({ url: result.secure_url });
    } catch (error: any) {
      console.error("\x1b[91m%s\x1b[0m", "[Upload] Error uploading image:", error);
      res.status(500).json({ error: error.message || "Upload failed" });
    }
  },
);

export default router;
