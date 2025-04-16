import { buttonVariants } from "@/components/ui/button-variants";
import { Users2 } from "lucide-react";
import { NavLink, Outlet } from "react-router";

const items = [
  // TODO: add general settings
  //   {
  //     label: "General",
  //     to: "general",
  //     icon: Settings,
  //   },
  {
    label: "Players",
    to: "players",
    icon: Users2,
  },
];

export default function GameSettingsLayout() {
  return (
    <div className="flex flex-1 max-w-3xl mx-auto py-8">
      <nav className="w-48 border-r space-y-2 pr-2">
        <p className="text-xs text-sidebar-foreground/70 font-semibold">
          Game Settings
        </p>
        {items.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              buttonVariants({
                variant: isActive ? "secondary" : "ghost",
                className: "w-full justify-start",
              })
            }
          >
            <Icon className="h-4 w-4" />
            {label}
          </NavLink>
        ))}
      </nav>
      <main className="flex flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
