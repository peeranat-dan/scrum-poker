import { Separator } from '@/components/ui/separator';
import { isSessionOwner } from '@/domain/participant/rules';
import { useParticipant } from '@/providers/participant';

import SessionInformationContainer from '../session-information-container';
import SessionTerminationButton from '../session-termination-button';
import SessionVotesExportButton from '../session-votes-export-button';

export default function GeneralSettings() {
  const { participant } = useParticipant();

  const isOwner = isSessionOwner(participant);

  return (
    <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-4">
      <SessionInformationContainer />
      <Separator />
      {isOwner && (
        <>
          <section className="flex flex-col gap-4">
            <p className="font-semibold">Export</p>
            <SessionVotesExportButton />
          </section>
          <Separator />
        </>
      )}
      <section className="flex flex-col gap-4">
        <p className="font-semibold">Danger Zone</p>
        <SessionTerminationButton />
      </section>
    </div>
  );
}
