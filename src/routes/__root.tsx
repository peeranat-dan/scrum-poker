import NotFound from '@/components/not-found';
import { type AuthProviderState } from '@/providers/auth/types';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

export type MyRouterContext = {
  auth: AuthProviderState;
};

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => {
    return (
      <>
        <Outlet />
        <TanStackRouterDevtools />
      </>
    );
  },
  notFoundComponent: () => {
    return <NotFound />;
  },
});
