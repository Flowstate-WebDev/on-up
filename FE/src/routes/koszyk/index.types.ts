import type { Product } from "@/data/mocks/products";

export type CartItem = Product & { quantity: number }