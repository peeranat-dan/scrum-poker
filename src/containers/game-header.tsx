import { useParticipant } from "@/providers/participant";
import { useSession } from "@/providers/session";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { copyJoinLink } from "@/lib/utils";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function GameHeader() {
  const { id } = useSession();
  const { participant } = useParticipant();

  const handleCopyJoinLink = () => {
    if (participant) {
      copyJoinLink(participant.sessionId);
    }
    toast.success("Join link copied to clipboard");
  };

  return (
    <header className="flex items-center justify-between p-4 h-[var(--header-height)]">
      <div className="max-w-3xl mx-auto w-full flex items-center justify-between">
        <h1 className="text-2xl font-mono">S-Poker</h1>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger onClick={handleCopyJoinLink}>
              <div className="bg-primary/30 dark:bg-accent rounded-full px-4 py-2 cursor-pointer hidden md:block">
                <span className="text-sm font-mono">Session ID: {id}</span>
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
            <Button variant="secondary">Manage players</Button>
          ) : null}
        </div>
      </div>
    </header>
  );
}
