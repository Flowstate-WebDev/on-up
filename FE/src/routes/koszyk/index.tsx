import { createFileRoute, Link } from '@tanstack/react-router'

import { Heading } from '@/components/ui/Heading'
import { CartSummary } from './components/CartSummary';
import { CartItemsList } from './components/CartItemsList';

import { useCart } from '@/context/CartContext';

export const Route = createFileRoute('/koszyk/')({
  component: CartPage,
  beforeLoad: () => {
    document.title = 'On-Up | Mój koszyk';
  }
})

function CartPage() {
  const { products, groupedItems, totalPrice, isStockIssue, removeFromCart } = useCart()

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <Heading size="xl">Twój koszyk jest pusty</Heading>
        <p className="text-text-secondary">Dodaj produkty, aby zobaczyć je tutaj.</p>
        <Link to="/" className="bg-primary hover:bg-secondary text-text-obj px-6 py-2 rounded-lg transition-colors">
          Przejdź do sklepu
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Heading size="xl">Twój Koszyk</Heading>
      <div className="mt-8 flex flex-col lg:flex-row gap-8">
        <CartItemsList groupedItems={groupedItems} removeFromCart={removeFromCart} />
        <CartSummary groupedItems={groupedItems} totalPrice={totalPrice} isStockIssue={isStockIssue} />
      </div>
    </div>
  )
}