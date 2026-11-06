import { InfoIcon, ThumbsUpIcon } from 'lucide-react';
import { useMemo } from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { VoteProgress } from '@/components/vote-progress';
import { cn } from '@/lib/cn';
import { useGame } from '@/providers/game';
import { useParticipant } from '@/providers/participant';
import { useSession } from '@/providers/session';

import GameActions from './game-actions';
import GameRoundIssue from './game-round-issue';

const roundStatusLabels = {
  'in-progress': 'Voting',
  revealed: 'Revealed',
  finished: 'Finished',
} as const;

export default function GameController() {
  const { name: sessionName } = useSession();
  const { participants, round } = useGame();
  const { participant } = useParticipant();

  const votes = participants.filter((participant) => participant.vote !== undefined);

  const participantsWithNoVotes = useMemo(
    () => participants.filter((participant) => typeof participant.vote === 'undefined'),
    [participants],
  );

  const isRevealed = round?.status === 'revealed';

  return (
    <div className="w-full">
      <Card className="relative mx-auto w-full gap-5 overflow-hidden sm:w-[380px]">
        <CardHeader>
          <CardTitle className="truncate leading-6">{sessionName}</CardTitle>
          {round && (
            <CardAction>
              <span
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold transition-colors duration-200',
                  isRevealed ? 'bg-primary/15 text-primary' : 'bg-accent text-accent-foreground',
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    'size-1.5 rounded-full transition-colors duration-200',
                    isRevealed ? 'bg-primary' : 'bg-muted-foreground',
                  )}
                />
                {roundStatusLabels[round.status]}
              </span>
            </CardAction>
          )}
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <GameRoundIssue />
          <VoteProgress
            voted={votes.length}
            total={participants.length}
            action={
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Show who hasn't voted"
                    className="size-6"
                  >
                    <InfoIcon className="size-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="border-secondary bg-secondary text-secondary-foreground">
                  {participantsWithNoVotes.length ? (
                    <>
                      <p className="text-sm font-semibold">Person who hasn't vote</p>
                      <ul className="m-0 px-4 py-1 text-xs">
                        {participantsWithNoVotes.map((p) => (
                          <li key={p.id}>
                            <span>{p.displayName}</span>
                            <span> {p.id === participant?.id ? '(You)' : ''}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <div className="flex items-center gap-2 text-sm">
                      Everyone has voted <ThumbsUpIcon className="size-4" />
                    </div>
                  )}
                </PopoverContent>
              </Popover>
            }
          />
        </CardContent>
        <CardFooter className="gap-2">
          <GameActions />
        </CardFooter>
      </Card>
    </div>
  );
}
