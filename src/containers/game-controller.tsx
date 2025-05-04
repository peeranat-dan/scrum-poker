import { BorderBeam } from '@/components/magicui/border-beam';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useSession } from '@/providers/session';
import GameActions from './game-actions';

export default function GameController() {
  const { name: sessionName } = useSession();
  return (
    <div>
      <Card className='relative w-full overflow-hidden sm:w-[350px]'>
        <CardHeader>
          <CardTitle>{sessionName}</CardTitle>
        </CardHeader>
        <CardContent className='flex items-center justify-center gap-4'>
          <GameActions />
        </CardContent>
        <BorderBeam duration={8} size={100} />
      </Card>
    </div>
  );
}
