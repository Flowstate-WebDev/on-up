import type { Product } from "@/data/mocks/products";
import type { CartItem } from "@/routes/koszyk/index.types";

export const calculateGroupedItems = (products: Product[]) => {
  const groupedItems = products.reduce((acc, product) => {
    acc[product.id] = acc[product.id] || { ...product, quantity: 0 }
    acc[product.id].quantity++;

    return acc
  }, {} as Record<string, CartItem>)

  return Object.values(groupedItems);
}

export const calculateTotalPrice = (groupedItems: CartItem[]) => {
  return groupedItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
}

export const checkStockIssue = (groupedItems: CartItem[]) => {
  return groupedItems.some(item => item.quantity > item.stock);
}