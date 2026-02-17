import type { CartItem } from "../../index.types";
import { ProductPrice } from "@/routes/sklep/components/ProductDetailsSection/ProductPrice";
import { getAssetPath } from "@/utils/paths";
import type { Product } from "@/data/mocks/products";
import { Heading } from "@/components/ui/Heading";

export const CartItemsList = ({ groupedItems, removeFromCart }: { groupedItems: CartItem[], removeFromCart: (product: Product) => void }) => {
  return (
    <div className="flex-1 flex flex-col gap-4">
      {groupedItems.map((item) => {
        const isOverStock = item.quantity > item.stock;
        return (
          <div key={item.id} className={`flex gap-4 p-4 bg-bg-secondary rounded-lg shadow-sm items-center ${isOverStock ? 'border-2 border-red-500' : ''}`}>
            <div className="w-24 h-32 shrink-0">
              <img
                src={getAssetPath(`/images/books/${item.imageUrl}`)}
                alt={item.title}
                className="w-full h-full object-cover rounded-md"
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <Heading size="md">{item.title}</Heading>
              <p className="text-sm text-text-tertiary">
                Ilość: <span className={`font-semibold ${isOverStock ? 'text-red-500' : 'text-text-primary'}`}>{item.quantity}</span>
                {isOverStock && <span className="text-red-500 text-xs ml-2 font-bold">(Dostępne tylko: {item.stock})</span>}
              </p>
            </div>

            <div className="flex flex-col items-end gap-2">
              <ProductPrice price={Number(item.price) * item.quantity} />
              <button
                onClick={() => removeFromCart(item)}
                className="text-red-500 hover:text-red-600 text-sm font-medium underline cursor-pointer"
              >
                Usuń
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}