import { Heading } from "@/components/ui/Heading";
import type { CartItem } from "../index.types";

interface PriceSummaryProps {
  groupedItems: CartItem[];
  totalPrice: number;
  shippingCost?: number;
}

export const PriceSummary = ({
  groupedItems,
  totalPrice,
  shippingCost = 15,
}: PriceSummaryProps) => {
  const discount = totalPrice >= 500 ? totalPrice * 0.05 : 0;
  const shipping = totalPrice >= 400 ? 0 : shippingCost;
  const finalTotal = totalPrice - discount + shipping;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3">
        {groupedItems.map((item) => (
          <div
            key={item.id}
            className="text-sm border-b border-gray-600/20 pb-2 last:border-0 text-text-secondary"
          >
            <p className="font-medium truncate mb-1" title={item.title}>
              {item.title}
            </p>
            <div className="flex justify-between">
              <span>
                {Number(item.price).toFixed(2)} PLN x {item.quantity}
              </span>
              <span className="font-semibold text-text-primary">
                {(Number(item.price) * item.quantity).toFixed(2)} PLN
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Promocje i opłaty */}
      <div className="space-y-3 border-t border-gray-600/20 pt-4">
        {/* Dostawa */}
        <div className="flex justify-between text-sm">
          <span className="text-text-secondary">Dostawa:</span>
          <span className="font-semibold text-text-primary">
            {totalPrice >= 400 ? (
              <span className="text-green-500">GRATIS</span>
            ) : (
              `${shippingCost.toFixed(2)} PLN`
            )}
          </span>
        </div>

        {/* Rabat */}
        {totalPrice >= 500 && (
          <div className="flex justify-between text-sm text-green-500">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z"
                  clipRule="evenodd"
                />
              </svg>
              Rabat (5%):
            </span>
            <span className="font-bold">-{discount.toFixed(2)} PLN</span>
          </div>
        )}

        {/* Informacja o progach */}
        <div className="mt-4 p-3 bg-primary/10 rounded-lg border border-primary/20">
          <p className="text-[11px] leading-tight text-text-secondary uppercase font-black tracking-widest mb-2">
            Aktualne promocje
          </p>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs">
              <div
                className={`w-2 h-2 rounded-full ${totalPrice >= 400 ? "bg-green-500 animate-pulse" : "bg-gray-400"}`}
              />
              <span
                className={
                  totalPrice >= 400
                    ? "text-text-primary font-bold"
                    : "text-text-secondary"
                }
              >
                Darmowa dostawa od 400 zł
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div
                className={`w-2 h-2 rounded-full ${totalPrice >= 500 ? "bg-green-500 animate-pulse" : "bg-gray-400"}`}
              />
              <span
                className={
                  totalPrice >= 500
                    ? "text-text-primary font-bold"
                    : "text-text-secondary"
                }
              >
                Rabat 5% od 500 zł
              </span>
            </div>
          </div>

          {totalPrice < 400 && (
            <p className="text-[10px] text-primary font-bold mt-2">
              Brakuje Ci {(400 - totalPrice).toFixed(2)} PLN do darmowej
              dostawy!
            </p>
          )}
          {totalPrice >= 400 && totalPrice < 500 && (
            <p className="text-[10px] text-primary font-bold mt-2">
              Brakuje Ci {(500 - totalPrice).toFixed(2)} PLN do rabatu 5%!
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center text-lg border-t-2 border-primary pt-4">
        <Heading size="sm">Do zapłaty:</Heading>
        <span className="font-bold text-primary text-xl">
          {finalTotal.toFixed(2)} PLN
        </span>
      </div>
    </div>
  );
};
