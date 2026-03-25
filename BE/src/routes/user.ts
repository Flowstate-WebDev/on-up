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
      where: { id: userId as string },
      select: {
        id: true,
        username: true,
        email: true,
        phone: true,
        firstname: true,
        lastname: true,
        role: true,
        billingAddress: true,
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
    const { username, email, phone, firstname, lastname, city, postalCode, street, building, apartment } = req.body;

    // Check if the user exists
    const user = await prisma.user.findUnique({
      where: { id: userId as string },
      include: { billingAddress: true },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const updateData: any = {};

    if (username !== undefined && username !== user.username) {
      if (username) {
        const existing = await prisma.user.findUnique({ where: { username: username as string } });
        if (existing) return res.status(400).json({ error: "Ta nazwa użytkownika jest już zajęta" });
      }
      updateData.username = username || null;
    }

    if (email !== undefined && email !== user.email) {
      if (email) {
        const existing = await prisma.user.findUnique({ where: { email: email as string } });
        if (existing) return res.status(400).json({ error: "Ten adres e-mail jest już zajęty" });
        updateData.email = email;
      }
    }

    if (phone !== undefined && phone !== user.phone) {
      if (phone) {
        const existing = await prisma.user.findUnique({ where: { phone: phone as string } });
        if (existing) return res.status(400).json({ error: "Ten numer telefonu jest już zajęty" });
      }
      updateData.phone = phone || null;
    }

    if (firstname !== undefined) updateData.firstname = firstname || null;
    if (lastname !== undefined) updateData.lastname = lastname || null;

    const addressProvided = city !== undefined || postalCode !== undefined || street !== undefined || building !== undefined || apartment !== undefined;

    if (addressProvided) {
      updateData.billingAddress = {
        upsert: {
          create: {
            firstname: firstname || user.firstname || "",
            lastname: lastname || user.lastname || "",
            city: city || "",
            postalCode: postalCode || "",
            street: street || "",
            building: building || "",
            apartment: apartment || null,
          },
          update: {
            ...(firstname !== undefined && { firstname }),
            ...(lastname !== undefined && { lastname }),
            ...(city !== undefined && { city }),
            ...(postalCode !== undefined && { postalCode }),
            ...(street !== undefined && { street }),
            ...(building !== undefined && { building }),
            ...(apartment !== undefined && { apartment }),
          }
        }
      };
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ error: "No data to update" });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId as string },
      data: updateData,
      select: {
        id: true,
        username: true,
        email: true,
        phone: true,
        firstname: true,
        lastname: true,
        role: true,
        billingAddress: true,
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

router.post("/change-password", authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({ error: "Old and new password are required" });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId as string },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Stare hasło jest nieprawidłowe" });
    }

    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]).{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      return res.status(400).json({ error: "Nowe hasło musi mieć co najmniej 8 znaków, w tym 1 cyfrę i znak specjalny" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);
    await prisma.user.update({
      where: { id: userId as string },
      data: { password: hashedPassword },
    });

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("[User] Error changing password:", error);
    res.status(500).json({ error: "Failed to change password" });
  }
});

router.get("/all", authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;
    const currentUser = await prisma.user.findUnique({ where: { id: userId as string } });
    if (!currentUser || currentUser.role.toUpperCase() !== "ADMIN") {
      return res.status(403).json({ error: "Forbidden: Admins only" });
    }

    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        phone: true,
        createdAt: true,
        billingAddress: true,
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
    const adminUser = await prisma.user.findUnique({ where: { id: adminId as string } });
    if (!adminUser || adminUser.role.toUpperCase() !== "ADMIN") {
      return res.status(403).json({ error: "Forbidden: Admins only" });
    }

    const targetUserId = req.params.id;
    const { role } = req.body;

    if (!role || !["USER", "ADMIN"].includes(role)) {
      return res.status(400).json({ error: "Invalid role specified" });
    }

    const updatedUser = await prisma.user.update({
      where: { id: targetUserId as string },
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

