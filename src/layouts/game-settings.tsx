import { buttonVariants } from "@/components/ui/button-variants";
import { useParticipant } from "@/providers/participant";
import { Settings, Users2 } from "lucide-react";
import {
  generatePath,
  Navigate,
  NavLink,
  Outlet,
  useParams,
} from "react-router";

const items = [
  {
    label: "General",
    to: "general",
    icon: Settings,
  },
  {
    label: "Players",
    to: "players",
    icon: Users2,
  },
];

export default function GameSettingsLayout() {
  const { gameId } = useParams<{ gameId: string }>();
  const { participant } = useParticipant();

  if (!gameId) {
    throw new Error("Game ID is required");
  }

  if (!participant) {
    return <Navigate to={generatePath("/join/:gameId", { gameId: gameId })} />;
  }

  return (
    <div className="flex flex-1 max-w-3xl mx-auto py-8 px-4 md:px-0">
      <nav className="w-fit md:w-48 border-r space-y-2 pr-2 flex flex-col">
        <p className="hidden md:block text-xs text-sidebar-foreground/70 font-semibold">
          Game Settings
        </p>
        {items.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              buttonVariants({
                variant: isActive ? "secondary" : "ghost",
                className: "w-fit md:w-full justify-start",
              })
            }
          >
            <Icon className="h-4 w-4" />
            <span className="hidden md:block">{label}</span>
          </NavLink>
        ))}
      </nav>
      <main className="flex flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
