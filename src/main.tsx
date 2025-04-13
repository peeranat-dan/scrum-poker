import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

import "./index.css";
import BaseLayout from "./layouts/base";
import HomePage from "./pages/home";
import NewGamePage from "./pages/new-game";
import { ThemeProvider } from "./providers/theme";
import GamePage from "./pages/game/[gameId]";

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
        path: "game/:id",
        Component: GamePage,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>
);
