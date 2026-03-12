import { Router, type Request, type Response } from "express";
import { prisma } from "../lib/prisma.js";
import { authMiddleware } from "../middleware/auth.js";
import bcrypt from "bcrypt";
import { SALT_ROUNDS } from "../config/env.js";

const router = Router();

router.get("/me", authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        email: true,
        phone: true,
        role: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error(
      "\x1b[91m%s\x1b[0m",
      "[User] Error fetching current user:",
      error,
    );
    res.status(500).json({ error: "Something went wrong" });
  }
});

// GET /api/user/orders - Get current user's order history
router.get("/orders", authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;

    const orders = await prisma.order.findMany({
      where: { userId },
      include: {
        items: {
          include: {
            book: true,
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
      "[User] Error fetching user orders:",
      error,
    );
    res.status(500).json({ error: "Failed to fetch order history" });
  }
});

router.put("/update", authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;
    const { username, email, phone, password } = req.body;

    // Check if the user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const updateData: any = {};

    if (username && username !== user.username) {
      const existing = await prisma.user.findUnique({ where: { username } });
      if (existing) return res.status(400).json({ error: "Username already taken" });
      updateData.username = username;
    }

    if (email && email !== user.email) {
      const existing = await prisma.user.findUnique({ where: { email } });
      if (existing) return res.status(400).json({ error: "Email already taken" });
      updateData.email = email;
    }

    if (phone && phone !== user.phone) {
      const existing = await prisma.user.findUnique({ where: { phone } });
      if (existing) return res.status(400).json({ error: "Phone number already taken" });
      updateData.phone = phone;
    }

    if (password) {
      updateData.password = await bcrypt.hash(password, SALT_ROUNDS);
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ error: "No data to update" });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        username: true,
        email: true,
        phone: true,
        role: true,
      },
    });

    res.json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error(
      "\x1b[91m%s\x1b[0m",
      "[User] Error updating user data:",
      error,
    );
    res.status(500).json({ error: "Failed to update user data" });
  }
});

router.get("/all", authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;
    const currentUser = await prisma.user.findUnique({ where: { id: userId } });
    if (!currentUser || currentUser.role !== "ADMIN") {
      return res.status(403).json({ error: "Forbidden: Admins only" });
    }

    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    });

    res.json(users);
  } catch (error) {
    console.error("[User] Error fetching all users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

router.put("/:id/role", authMiddleware, async (req: Request, res: Response) => {
  try {
    const adminId = (req as any).user.userId;
    const adminUser = await prisma.user.findUnique({ where: { id: adminId } });
    if (!adminUser || adminUser.role !== "ADMIN") {
      return res.status(403).json({ error: "Forbidden: Admins only" });
    }

    const targetUserId = req.params.id;
    const { role } = req.body;

    if (!role || !["USER", "ADMIN"].includes(role)) {
      return res.status(400).json({ error: "Invalid role specified" });
    }

    const updatedUser = await prisma.user.update({
      where: { id: targetUserId },
      data: { role },
      select: { id: true, username: true, email: true, role: true },
    });

    res.json({ message: "User role updated", user: updatedUser });
  } catch (error) {
    console.error("[User] Error updating user role:", error);
    res.status(500).json({ error: "Failed to update user role" });
  }
});

export default router;

