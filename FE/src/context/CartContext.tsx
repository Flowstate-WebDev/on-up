import type { Product } from "@/data/mocks/products";
import { createContext, type ReactNode, useContext, useState, useEffect } from "react";

export interface CartContextType {
  products: Product[],
  addToCart: (product: Product) => void,
  removeFromCart: (product: Product) => void,
}

const CartContext = createContext<CartContextType | null>(null);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === null) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(products));
  }, [products]);

  const addToCart = (product: Product) => {
    setProducts(prev => [...prev, product]);
  }
  const removeFromCart = (product: Product) => {
    setProducts(prev => prev.filter(p => p.id !== product.id));
  }

  return (
    <CartContext value={{ products, addToCart, removeFromCart }}>
      {children}
    </CartContext>
  );
}