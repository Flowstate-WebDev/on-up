import { Heading } from "@/components/ui/Heading";
import type { CartItem } from "../../index.types";
import { Link } from "@tanstack/react-router";
import { PriceSummary } from "../PriceSummary";

export const CartSummary = ({
  groupedItems,
  totalPrice,
  isStockIssue,
}: {
  groupedItems: CartItem[];
  totalPrice: number;
  isStockIssue: boolean;
}) => {
  return (
    <div className="lg:w-1/3 shrink-0">
      <div className="bg-bg-secondary p-6 rounded-lg shadow-md sticky top-24">
        <Heading size="md">Podsumowanie</Heading>

        <div className="my-6">
          <PriceSummary groupedItems={groupedItems} totalPrice={totalPrice} />
        </div>

        <Link
          to="/koszyk/podsumowanie"
          disabled={isStockIssue}
          className={`w-full block text-center text-text-obj font-bold py-3 rounded-lg transition-colors shadow-lg cursor-pointer ${
            isStockIssue
              ? "bg-gray-400 cursor-not-allowed opacity-50"
              : "bg-primary hover:bg-secondary"
          }`}
        >
          Przejdź do płatności
        </Link>
        {isStockIssue && (
          <p className="text-red-500 text-sm font-semibold mt-2 text-center">
            Masz za dużo książek w koszyku. Zmniejsz ilość, aby kontynuować.
          </p>
        )}
      </div>
    </div>
  );
};
