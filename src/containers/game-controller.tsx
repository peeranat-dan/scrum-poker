import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useGame } from '@/providers/game';
import { useParticipant } from '@/providers/participant';
import { useSession } from '@/providers/session';
import { InfoIcon, ThumbsUpIcon } from 'lucide-react';
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
    <div className='w-full'>
      <Card className='relative mx-auto w-full overflow-hidden sm:w-[350px]'>
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
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant='ghost' size='icon'>
                      <InfoIcon className='size-4' />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className='bg-secondary text-secondary-foreground border-secondary'>
                    {participantsWithNoVotes.length ? (
                      <>
                        <p className='text-sm font-semibold'>Person who hasn't vote</p>
                        <ul className='m-0 px-4 py-1 text-xs'>
                          {participantsWithNoVotes.map((p) => (
                            <li key={p.id}>
                              <span>{p.displayName}</span>
                              <span> {p.id === participant?.id ? '(You)' : ''}</span>
                            </li>
                          ))}
                        </ul>
                      </>
                    ) : (
                      <div className='flex items-center gap-2'>
                        Everyone has voted <ThumbsUpIcon className='size-4' />
                      </div>
                    )}
                  </PopoverContent>
                </Popover>
              </div>
              <p className='text-sm'>{votes.length}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className='gap-2'>
          <GameActions />
        </CardFooter>
      </Card>
    </div>
  );
}
