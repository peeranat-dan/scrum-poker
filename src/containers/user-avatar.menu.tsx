import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/auth";
import { useParticipant } from "@/providers/participant";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { copyJoinLink } from "@/lib/utils";
import { toast } from "sonner";

export default function UserAvatarMenu() {
  const { signOut } = useAuth();
  const { participant } = useParticipant();

  const menus = [
    {
      label: "Edit Name",
      show: "all",
      // TODO: Open a modal to edit name
    },
    {
      label: "Toggle Appearance",
      show: "all",
      shortcut: "⇧⌘L",
      // TODO: Implement toggle appearance
    },
    {
      label: "Manage Players",
      show: "owner",
      // TODO: Open a modal to manage players
    },
    {
      label: "Invite Players",
      show: "players",
      onClick: () => {
        copyJoinLink(participant?.sessionId ?? "");
        toast.success("Join link copied to clipboard");
      },
    },
    {
      label: "Leave Game",
      show: "players",
      onClick: () => {
        signOut();
      },
    },
    {
      label: "Terminate Game",
      show: "owner",
      // TODO: Implement terminate game
    },
  ];

  const filteredMenus = menus.filter((menu) => {
    if (menu.show === "all") return true;
    if (menu.show === "owner" && participant?.isOwner) return true;
    if (menu.show === "players" && !participant?.isOwner) return true;
    return false;
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="rounded-md" size="icon" variant="outline">
          {participant?.displayName?.charAt(0)?.toUpperCase()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {filteredMenus.map((menu) => (
          <DropdownMenuItem key={menu.label} onClick={menu.onClick}>
            {menu.label}
            {menu.shortcut && (
              <DropdownMenuShortcut>{menu.shortcut}</DropdownMenuShortcut>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
