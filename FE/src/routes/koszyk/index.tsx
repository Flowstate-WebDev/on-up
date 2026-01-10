import { createFileRoute } from '@tanstack/react-router'
import { useCart } from '@/context/CartContext';

export const Route = createFileRoute('/koszyk/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-6">Twój Koszyk</h1>

      {cart.length === 0 ? (
        <p>Twój koszyk jest pusty.</p>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            {cart.map((item) => (
              <div key={item.product.id} className="flex items-center justify-between border p-4 rounded-lg">
                <div className="flex items-center gap-4">
                  {item.product.imageUrl && (
                    <img
                      src={`/images/books/${item.product.imageUrl}`}
                      alt={item.product.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                  <div>
                    <h3 className="font-bold">{item.product.title}</h3>
                    <p className="text-sm text-gray-600">Ilość: {item.quantity}</p>
                    <p className="font-semibold">{item.product.price} PLN</p>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Usuń
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8 border-t pt-4">
            <div className="flex justify-between items-center text-xl font-bold">
              <span>Suma:</span>
              <span>{total.toFixed(2)} PLN</span>
            </div>
            <div className="flex gap-4 mt-4">
              <button
                onClick={clearCart}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
              >
                Wyczyść koszyk
              </button>
              <button className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                Przejdź do płatności
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}