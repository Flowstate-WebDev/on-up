import { Heading } from "@/components/ui/Heading"
import type { CartItem } from "../../index.types"

export const CartSummary = ({ groupedItems, totalPrice, isStockIssue }: { groupedItems: CartItem[], totalPrice: number, isStockIssue: boolean }) => {
  return (
    <div className="lg:w-1/3 shrink-0">
      <div className="bg-bg-secondary p-6 rounded-lg shadow-md sticky top-24">
        <Heading size="md">Podsumowanie</Heading>

        <div className="flex flex-col gap-3 mb-6">
          {groupedItems.map(item => (
            <div key={item.id} className="text-sm border-b border-gray-600/20 pb-2 last:border-0 text-text-secondary">
              <p className="font-medium truncate mb-1" title={item.title}>{item.title}</p>
              <div className="flex justify-between">
                <span>{Number(item.price).toFixed(2)} PLN x {item.quantity}</span>
                <span className="font-semibold text-text-primary">{(Number(item.price) * item.quantity).toFixed(2)} PLN</span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center mb-4 text-lg border-t-2 border-primary pt-4">
          <Heading size="sm">Łączna kwota:</Heading>
          <span className="font-bold text-primary text-xl">
            {totalPrice.toFixed(2)} PLN
          </span>
        </div>

        <button
          disabled={isStockIssue}
          className={`w-full text-text-obj font-bold py-3 rounded-lg transition-colors shadow-lg cursor-pointer ${isStockIssue ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-secondary'}`}
        >
          Przejdź do płatności
        </button>
        {isStockIssue && (
          <p className="text-red-500 text-sm font-semibold mt-2 text-center">
            Masz za dużo książek w koszyku. Zmniejsz ilość, aby kontynuować.
          </p>
        )}
      </div>
    </div>
  )
}
