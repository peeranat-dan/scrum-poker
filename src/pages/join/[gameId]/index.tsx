import { Card, CardContent } from "@/components/ui/card";
import SessionJoinContainer from "@/containers/session-join-container";
import { useParticipant } from "@/providers/participant";
import { useSession } from "@/providers/session";
import { generatePath, Navigate } from "react-router";

export default function JoinPage() {
  const { id, name } = useSession();
  const { participant } = useParticipant();

  if (participant && participant.status === "active") {
    return (
      <Navigate to={generatePath("/game/:gameId", { gameId: id })} replace />
    );
  }

  return (
    <div className="flex flex-col items-center w-full justify-center bg-muted">
      <div className="flex flex-col gap-6 w-full max-w-sm md:max-w-3xl px-4 md:px-0">
        <Card className="overflow-hidden p-0">
          <CardContent className="grid p-0 md:grid-cols-2">
            <div className="flex flex-col gap-6 p-6 md:p-8">
              <div className="space-y-2">
                <p className="text-sm text-foreground/70">Joining</p>
                <h2>
                  <span className="font-mono py-1 px-2 rounded-sm border border-accent line-clamp-1 break-all">
                    {name}
                  </span>
                </h2>
                <p className="text-muted-foreground">
                  Introduce yourself to jump into this game session.
                </p>
              </div>
              <SessionJoinContainer />
            </div>
            <div className="relative hidden bg-muted md:block">
              <img
                src="/cat-poker.webp"
                alt="Cat playing poker"
                className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.7] dark:grayscale"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
