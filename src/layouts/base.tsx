import Header from "@/components/layout/header";
import { Toaster } from "@/components/ui/sonner";
import { Outlet } from "react-router";

export default function BaseLayout() {
  return (
    <div className="flex h-dvh w-screen flex-col relative">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        {/* <Sidebar /> */}
        <main className="flex flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
      <Toaster />
    </div>
  );
}
