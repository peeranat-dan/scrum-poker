import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import SessionInformationContainer from "@/containers/session-information-container";
import SessionTerminationButton from "@/containers/session-termination-button";

export default function GameSettingsGeneralPage() {
  return (
    <div className="flex flex-col w-full gap-8 relative px-4 max-w-5xl mx-auto">
      <h2>General Settings</h2>
      <Card>
        <CardContent className="space-y-4">
          <SessionInformationContainer />
        </CardContent>
      </Card>
      <Separator />
      <section className="flex flex-col gap-4">
        <h3>Danger Zone</h3>
        <SessionTerminationButton />
      </section>
    </div>
  );
}
