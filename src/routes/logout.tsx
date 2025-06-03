import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';

export const Route = createFileRoute('/logout')({
  component: RouteComponent,
  loader: async ({ context }) => {
    const { signOut } = context.auth;

    await signOut();

    return null;
  },
});

function RouteComponent() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate({ to: '/' });
  }, [navigate]);

  return null;
}
