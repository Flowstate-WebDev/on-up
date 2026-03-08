import type { Product } from "@/data/mocks/products";
import {
  calculateGroupedItems,
  calculateTotalPrice,
  checkStockIssue,
} from "@/utils/cart/calculations";
import {
  createContext,
  type ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";
import type { CartItem } from "@/routes/koszyk/index.types";

export interface CartContextType {
  products: Product[];
  groupedItems: CartItem[];
  totalPrice: number;
  isStockIssue: boolean;
  addToCart: (product: Product) => void;
  removeFromCart: (product: Product) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === null) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[]>(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const groupedItems = calculateGroupedItems(products);
  const totalPrice = calculateTotalPrice(groupedItems);
  const isStockIssue = checkStockIssue(groupedItems);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(products));
  }, [products]);

  const addToCart = (product: Product) => {
    setProducts((prev) => [...prev, product]);
  };
  const removeFromCart = (product: Product) => {
    setProducts((prev) => prev.filter((p) => p.id !== product.id));
  };
  const clearCart = () => {
    setProducts([]);
  };

  return (
    <CartContext
      value={{
        products,
        groupedItems,
        totalPrice,
        isStockIssue,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext>
  );
};
