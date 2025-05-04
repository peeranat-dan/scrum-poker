import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import SessionInformationContainer from '@/containers/session-information-container';
import SessionTerminationButton from '@/containers/session-termination-button';

export default function GameSettingsGeneralPage() {
  return (
    <div className='relative mx-auto flex w-full max-w-5xl flex-col gap-8 px-4'>
      <h2>General Settings</h2>
      <Card>
        <CardContent className='space-y-4'>
          <SessionInformationContainer />
        </CardContent>
      </Card>
      <Separator />
      <section className='flex flex-col gap-4'>
        <h3>Danger Zone</h3>
        <SessionTerminationButton />
      </section>
    </div>
  );
}
