import { Router, type Request, type Response } from "express";
import { prisma } from "../lib/prisma.js";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();

import { adminMiddleware } from "../middleware/admin.js";

// Test route to check if admin is mounted
router.get("/", (req, res) => {
  res.json({ message: "Admin routes are active" });
});

// GET /api/admin/orders - Get all orders with details
router.get(
  "/orders",
  authMiddleware,
  adminMiddleware,
  async (req: Request, res: Response) => {
    console.log("\x1b[95m%s\x1b[0m", "[Admin] GET /orders was hit");
    try {
      const orders = await prisma.order.findMany({
        include: {
          items: {
            include: {
              book: true,
            },
          },
          user: {
            select: {
              id: true,
              email: true,
              username: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      res.json(orders);
    } catch (error) {
      console.error(
        "\x1b[91m%s\x1b[0m",
        "[Admin] Error fetching orders:",
        error,
      );
      res.status(500).json({ error: "Failed to fetch orders" });
    }
  },
);

// PATCH /api/admin/orders/:id/status - Update order status
router.patch(
  "/orders/:id/status",
  authMiddleware,
  adminMiddleware,
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const updatedOrder = await prisma.order.update({
        where: { id: id as string },
        data: { status },
      });

      res.json(updatedOrder);
    } catch (error) {
      console.error(
        "\x1b[91m%s\x1b[0m",
        "[Admin] Error updating order status:",
        error,
      );
      res.status(500).json({ error: "Failed to update order status" });
    }
  },
);

export default router;
