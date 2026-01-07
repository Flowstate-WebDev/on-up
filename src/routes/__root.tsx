import * as React from 'react';
import { Outlet, createRootRoute } from '@tanstack/react-router';

import Header from '@/components/Blocks/Header';

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <React.Fragment> {/* React.Fragment działa dosłownie tak samo jak <></> */}
      <Header />
      <Outlet />
    </React.Fragment>
  )
}