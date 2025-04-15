import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

import "./index.css";
import BaseLayout from "./layouts/base";
import GameLayout from "./layouts/game";
import NotFoundPage from "./pages/404";
import GamePage from "./pages/game/[gameId]";
import HomePage from "./pages/home";
import JoinPage from "./pages/join/[gameId]";
import NewGamePage from "./pages/new-game";
import { AuthProvider } from "./providers/auth";
import { ThemeProvider } from "./providers/theme";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    Component: BaseLayout,
    children: [
      { index: true, Component: HomePage },
      {
        path: "new-game",
        Component: NewGamePage,
      },
      {
        path: "*",
        Component: NotFoundPage,
      },
    ],
  },
  {
    Component: GameLayout,
    children: [
      {
        path: "game/:gameId",
        Component: GamePage,
      },
      {
        path: "join/:gameId",
        Component: JoinPage,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen={false} />
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>
);
