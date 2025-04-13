import { Toaster } from "@/components/ui/sonner";
import { type PropsWithChildren } from "react";
import { Outlet } from "react-router";

type BaseLayoutProps = PropsWithChildren;

export default function BaseLayout({ children }: Readonly<BaseLayoutProps>) {
  return (
    <div className="flex h-dvh w-screen flex-col">
      {/* <Header /> */}
      <div className="flex flex-1 overflow-hidden">
        {/* <Sidebar /> */}
        <main className="flex flex-1 overflow-y-auto">
          {children ?? <Outlet />}
        </main>
      </div>
      <Toaster />
    </div>
  );
}
