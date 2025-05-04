import SessionJoinForm from '@/components/form/session-join.form';
import { useCreateParticipant } from '@/hooks/participant/use-create-participant';
import { useAuth } from '@/providers/auth';
import { useSession } from '@/providers/session';
import { type JoinSessionInput, JoinSessionSchema } from '@/types/schema.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { generatePath, useNavigate } from 'react-router';

export default function SessionJoinContainer() {
  const navigate = useNavigate();
  const { signInAnonymously } = useAuth();
  const { id: sessionId } = useSession();
  const form = useForm<JoinSessionInput>({
    defaultValues: {
      name: '',
    },
    resolver: zodResolver(JoinSessionSchema),
  });

  const createParticipantMutation = useCreateParticipant();

  const onSubmit = async (data: JoinSessionInput) => {
    // STEP 1: Anonymous login
    const user = await signInAnonymously();
    // STEP 2: Create Participant
    const participant = await createParticipantMutation.mutateAsync({
      sessionId: sessionId,
      uid: user.user.uid,
      role: 'player',
      displayName: data.name,
    });

    // STEP 3: Navigate to game
    if (participant) {
      navigate(generatePath('/game/:gameId', { gameId: sessionId }));
    }
  };

  return <SessionJoinForm form={form} onSubmit={onSubmit} />;
}
