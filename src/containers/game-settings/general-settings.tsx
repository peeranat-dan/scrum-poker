import { Separator } from '@/components/ui/separator';
import SessionInformationContainer from '../session-information-container';
import SessionTerminationButton from '../session-termination-button';

export default function GeneralSettings() {
  return (
    <div className='relative mx-auto flex w-full max-w-5xl flex-col gap-4'>
      <SessionInformationContainer />
      <Separator />
      <section className='flex flex-col gap-4'>
        <p className='font-semibold'>Danger Zone</p>
        <SessionTerminationButton />
      </section>
    </div>
  );
}
