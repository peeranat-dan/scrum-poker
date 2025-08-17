import '@fontsource-variable/jetbrains-mono/index.css';
import '@fontsource-variable/noto-sans-thai/index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { H } from 'highlight.run';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import { AuthProvider, useAuth } from './providers/auth';
import { ThemeProvider } from './providers/theme';

// Import the generated route tree
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';

// Create a new router instance
const router = createRouter({
  routeTree,
  context: {
    auth: undefined!, // This will be set after we wrap the app in AuthContextProvider
  },
});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function InnerApp() {
  const auth = useAuth();

  return <RouterProvider router={router} context={{ auth }} />;
}

function App() {
  return (
    <AuthProvider>
      <InnerApp />
    </AuthProvider>
  );
}

if (!import.meta.env.DEV && import.meta.env.VITE_HIGHLIGHT_PROJECT_ID) {
  H.init(import.meta.env.VITE_HIGHLIGHT_PROJECT_ID, {
    serviceName: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    tracingOrigins: true,
  });
}

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme='system' storageKey='vite-ui-theme'>
      <QueryClientProvider client={queryClient}>
        <App />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>,
);
