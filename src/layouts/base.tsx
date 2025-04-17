import Header from "@/components/layout/header";
import { Toaster } from "@/components/ui/sonner";
import { Outlet } from "react-router";

export default function BaseLayout() {
  return (
    <div className="flex h-dvh w-screen flex-col relative">
      <Header />
      <main className="flex flex-1">
        <Outlet />
      </main>
      <Toaster />
    </div>
  );
}
