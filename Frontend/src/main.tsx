import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { RouterProvider, createRouter } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { routeTree } from './routeTree.gen';

import './style.css';

// declare module '@tanstack/react-router' {
//   interface Register {
//     router: typeof router
//   }
// }

const router = createRouter({ routeTree })
const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
)