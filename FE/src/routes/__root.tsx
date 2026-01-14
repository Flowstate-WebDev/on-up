import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';

import Header from '@/components/Layout/Header/Header';
import Footer from '@/components/Layout/Footer/Footer';

interface AuthContext {
  isAuthenticated: boolean;
  user: { id: string; username: string; email: string } | null;
  login: (token: string, user: any) => void;
  logout: () => void;
}

interface MyRouterContext {
  auth: AuthContext;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: RootComponent,
})

function RootComponent() {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className='flex-1 px-8 flex flex-col justify-center items-center'>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}