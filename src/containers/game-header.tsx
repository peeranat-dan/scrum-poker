import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { copyJoinLink } from "@/lib/utils";
import { useParticipant } from "@/providers/participant";
import { useSession } from "@/providers/session";
import { Link, Settings2 } from "lucide-react";
import { generatePath, Link as NavLink, useNavigate } from "react-router";
import { toast } from "sonner";

export default function GameHeader() {
  const { id } = useSession();
  const { participant } = useParticipant();
  const navigate = useNavigate();

  const handleCopyJoinLink = () => {
    if (participant) {
      copyJoinLink(participant.sessionId);
    }
    toast.success("Join link copied to clipboard");
  };

  const handleNavigateToSettings = () => {
    navigate(generatePath("/game/:gameId/settings", { gameId: id }));
  };

  const navigationLink = participant
    ? generatePath("/game/:gameId", { gameId: id })
    : generatePath("/join/:gameId", { gameId: id });

  return (
    <header className="flex items-center justify-between p-4 h-[var(--header-height)]">
      <div className="max-w-3xl mx-auto w-full flex items-center justify-between">
        <NavLink to={navigationLink}>
          <h1 className="text-2xl font-mono">S-Poker</h1>
        </NavLink>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger onClick={handleCopyJoinLink}>
              <div className="bg-primary/30 dark:bg-accent rounded-full px-4 py-2 cursor-pointer hidden md:flex gap-2 items-center">
                <Link className="w-4 h-4" />
                <span className="text-sm font-mono">{id}</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Copy join link to clipboard</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <div className="flex items-center gap-2 shrink-0">
          <ThemeToggle />
          {participant?.isOwner ? (
            <Button
              size="icon"
              variant="secondary"
              onClick={handleNavigateToSettings}
            >
              <Settings2 />
            </Button>
          ) : null}
        </div>
      </div>
    </header>
  );
}
