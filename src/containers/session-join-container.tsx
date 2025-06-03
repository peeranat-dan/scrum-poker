import SessionJoinForm from '@/components/form/session-join.form';
import { useCreateParticipant } from '@/hooks/participant/use-create-participant';
import { useAuth } from '@/providers/auth';
import { type JoinSessionInput, JoinSessionSchema } from '@/types/schema.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';

interface SessionJoinContainerProps {
  sessionId: string;
}

export default function SessionJoinContainer({ sessionId }: Readonly<SessionJoinContainerProps>) {
  const navigate = useNavigate();
  const { signInAnonymously, user: authUser } = useAuth();

  const form = useForm<JoinSessionInput>({
    defaultValues: {
      name: authUser?.displayName ?? '',
    },
    resolver: zodResolver(JoinSessionSchema),
  });

  const createParticipantMutation = useCreateParticipant();

  const onSubmit = async (data: JoinSessionInput) => {
    // STEP 1: Anonymous login
    const user = authUser ?? (await signInAnonymously()).user;
    // STEP 2: Create Participant
    const participant = await createParticipantMutation.mutateAsync({
      sessionId: sessionId,
      uid: user.uid,
      role: 'player',
      displayName: data.name,
    });

    // STEP 3: Navigate to game
    if (participant) {
      navigate({
        to: '/game/$gameId',
        params: {
          gameId: sessionId,
        },
      });
    }
  };

  return <SessionJoinForm form={form} onSubmit={onSubmit} />;
}
