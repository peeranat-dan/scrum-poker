import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useGame } from '@/providers/game';
import { useParticipant } from '@/providers/participant';
import { useSession } from '@/providers/session';
import { InfoIcon } from 'lucide-react';
import { useMemo } from 'react';
import GameActions from './game-actions';

export default function GameController() {
  const { name: sessionName } = useSession();
  const { participants } = useGame();
  const { participant } = useParticipant();

  const votes = participants.filter((participant) => participant.vote !== undefined);

  const participantsWithNoVotes = useMemo(
    () => participants.filter((participant) => typeof participant.vote === 'undefined'),
    [participants],
  );

  return (
    <div>
      <Card className='relative w-full overflow-hidden sm:w-[350px]'>
        <CardHeader>
          <CardTitle>{sessionName}</CardTitle>
        </CardHeader>
        <CardContent className='flex flex-col items-center justify-center gap-4'>
          <div className='flex w-full items-center gap-4'>
            <div className='flex basis-1/2 flex-col gap-2'>
              <p className='text-sm font-semibold'>Players</p>
              <p className='text-sm'>{participants.length}</p>
            </div>
            <div className='flex basis-1/2 flex-col gap-2'>
              <div className='flex items-center gap-1'>
                <p className='text-sm font-semibold'>Votes</p>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <InfoIcon className='size-4' />
                    </TooltipTrigger>
                    <TooltipContent side='bottom'>
                      <p>Person who hasn't vote</p>
                      <ul className='m-0 px-4 py-1'>
                        {participantsWithNoVotes.map((p) => (
                          <li key={p.id}>
                            <span>{p.displayName}</span>
                            <span> {p.id === participant?.id ? '(You)' : ''}</span>
                          </li>
                        ))}
                      </ul>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <p className='text-sm'>{votes.length}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <GameActions />
        </CardFooter>
      </Card>
    </div>
  );
}
