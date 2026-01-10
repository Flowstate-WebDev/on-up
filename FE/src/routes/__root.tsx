import { Outlet, createRootRoute } from '@tanstack/react-router';

import Header from '@/components/Layout/Header/Header';
import Footer from '@/components/Layout/Footer/Footer';
import { CartProvider } from '@/context/CartContext';

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <CartProvider>
      <div className='flex flex-col min-h-screen'>
        <Header />
        <main className='flex-1 px-8 flex flex-col'>
          <Outlet />
        </main>
        <Footer />
      </div>
    </CartProvider>
  )
}