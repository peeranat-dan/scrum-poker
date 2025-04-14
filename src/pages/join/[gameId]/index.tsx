import { Card, CardContent } from "@/components/ui/card";
import SessionJoinContainer from "@/containers/session-join-container";
import { useSession } from "@/providers/session";

export default function JoinPage() {
  const { name } = useSession();
  return (
    <div className="flex flex-col items-center w-full justify-center min-h-svh bg-muted">
      <div className="flex flex-col gap-6 w-full max-w-sm md:max-w-3xl px-4 md:px-0">
        <Card className="overflow-hidden p-0">
          <CardContent className="grid p-0 md:grid-cols-2">
            <div className="flex flex-col gap-6 p-6 md:p-8">
              <div className="space-y-2">
                <h2>
                  Join <span className="italic">{name}</span>
                </h2>
                <p className="text-muted-foreground">Join {name} session</p>
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
