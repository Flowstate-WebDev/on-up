import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { RouterProvider, createRouter } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { routeTree } from './routeTree.gen';

import './style.css';

import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider, useCart } from './context/CartContext';

const router = createRouter({
  routeTree,
  context: {
    auth: undefined!, // Those will be set in InnerApp
    cart: undefined!
  }
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

function InnerApp() {
  const auth = useAuth();
  const cart = useCart();
  return <RouterProvider router={router} context={{ auth, cart }} />;
}

const queryClient = new QueryClient()

import { ToastProvider } from './context/ToastContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <ToastProvider>
            <InnerApp />
          </ToastProvider>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)