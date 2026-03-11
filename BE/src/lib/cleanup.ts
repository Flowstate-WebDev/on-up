import { prisma } from "./prisma.js";

/**
 * Automatyczne sprawdzanie i anulowanie zamówień PENDING, które są starsze niż x minut.
 * Przywraca stan magazynowy książek.
 * @param timeoutMinutes Czas w minutach, po którym zamówienie uznawane jest za porzucone.
 */
export async function cleanupExpiredOrders(timeoutMinutes: number = 20) {
  try {
    const expirationDate = new Date();
    expirationDate.setMinutes(expirationDate.getMinutes() - timeoutMinutes);

    // Znajdź wszystkie zamówienia PENDING, które są starsze niż data wygaśnięcia
    const expiredOrders = await prisma.order.findMany({
      where: {
        status: "PENDING",
        createdAt: {
          lt: expirationDate,
        },
      },
      include: {
        items: true,
      },
    });

    if (expiredOrders.length === 0) {
      return;
    }

    console.log(
      "\x1b[93m%s\x1b[0m",
      `[Cleanup] Found ${expiredOrders.length} expired pending orders.`,
    );

    for (const order of expiredOrders) {
      console.log(
        "\x1b[93m%s\x1b[0m",
        `[Cleanup] Cancelling order ${order.orderNumber} (created ${order.createdAt})`,
      );

      await prisma.$transaction(async (tx: any) => {
        // 1. Zmień status na EXPIRED lub ABANDONED
        await tx.order.update({
          where: { id: order.id },
          data: { status: "EXPIRED" },
        });

        // 2. Przywróć stan magazynowy
        for (const item of order.items) {
          await tx.book.update({
            where: { id: item.bookId },
            data: { stock: { increment: item.quantity } },
          });
        }
      });

      console.log(
        "\x1b[93m%s\x1b[0m",
        `[Cleanup] Order ${order.orderNumber} marked as EXPIRED and stock restored.`,
      );
    }
  } catch (error) {
    console.error(
      "\x1b[91m%s\x1b[0m",
      "[Cleanup] Error cleaning up expired orders:",
      error,
    );
  }
}

/**
 * Uruchamia cykliczne sprawdzanie wygasłych zamówień.
 */
export function startOrderCleanupJob(
  intervalMinutes: number = 5,
  timeoutMinutes: number = 20,
) {
  console.log(
    "\x1b[93m%s\x1b[0m",
    `[Cleanup] Starting background job... Interval: ${intervalMinutes}m, Timeout: ${timeoutMinutes}m`,
  );

  // Uruchom od razu przy starcie, a potem co interwał
  cleanupExpiredOrders(timeoutMinutes);

  setInterval(
    () => {
      cleanupExpiredOrders(timeoutMinutes);
    },
    intervalMinutes * 60 * 1000,
  );
}
