import { createFileRoute, Link } from '@tanstack/react-router'
import { useCart } from '@/context/CartContext'
import { Heading } from '@/components/ui/Heading'
import { ProductPrice } from '@/routes/sklep/components/ProductDetailsSection/ProductPrice'
import { useMemo } from 'react'
import type { Product } from '@/data/mocks/products'

export const Route = createFileRoute('/koszyk/')({
  component: CartPage,
  beforeLoad: () => {
    document.title = 'ON-UP | Twój koszyk'
  }
})

type CartItem = Product & { quantity: number }

function CartPage() {
  const { products, removeFromCart } = useCart()

  const groupedItems = useMemo(() => {
    const map = new Map<string, CartItem>();
    for (const p of products) {
      if (!map.has(p.id)) {
        map.set(p.id, { ...p, quantity: 0 });
      }
      const item = map.get(p.id)!;
      item.quantity++;
    }
    return Array.from(map.values());
  }, [products]);

  // Robust total calculation
  const totalPrice = useMemo(() => {
    return products.reduce((acc, product) => {
      const priceVal = Number(product.price);
      return acc + (isNaN(priceVal) ? 0 : priceVal);
    }, 0);
  }, [products]);

  const hasStockIssue = groupedItems.some(item => item.quantity > item.stock);

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <Heading>Twój koszyk jest pusty</Heading>
        <p className="text-text-secondary">Dodaj produkty, aby zobaczyć je tutaj.</p>
        <Link to="/" className="bg-primary hover:bg-secondary text-text-obj px-6 py-2 rounded-lg transition-colors">
          Przejdź do sklepu
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Heading>Twój Koszyk</Heading>

      <div className="mt-8 flex flex-col lg:flex-row gap-8">
        <div className="flex-1 flex flex-col gap-4">
          {groupedItems.map((item) => {
            const isOverStock = item.quantity > item.stock;
            return (
              <div key={item.id} className={`flex gap-4 p-4 bg-bg-secondary rounded-lg shadow-sm items-center ${isOverStock ? 'border-2 border-red-500' : ''}`}>
                <div className="w-24 h-32 shrink-0">
                  <img
                    src={`./images/books/${item.imageUrl}`}
                    alt={item.title}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>

                <div className="flex-1 flex flex-col gap-1">
                  <h3 className="font-bold text-lg leading-tight">{item.title}</h3>
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

        <div className="lg:w-1/3 shrink-0">
          <div className="bg-bg-secondary p-6 rounded-lg shadow-md sticky top-24">
            <h3 className="text-xl font-bold mb-4">Podsumowanie</h3>

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
              <span className="text-text-secondary">Łączna kwota:</span>
              <span className="font-bold text-primary text-xl">
                {totalPrice.toFixed(2)} PLN
              </span>
            </div>

            <button
              disabled={hasStockIssue}
              className={`w-full text-text-obj font-bold py-3 rounded-lg transition-colors shadow-lg cursor-pointer ${hasStockIssue ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-secondary'}`}
            >
              Przejdź do płatności
            </button>
            {hasStockIssue && (
              <p className="text-red-500 text-sm font-semibold mt-2 text-center">
                Masz za dużo książek w koszyku. Zmniejsz ilość, aby kontynuować.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}