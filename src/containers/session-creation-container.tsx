import SessionCreationForm from '@/components/form/session-creation-form';
import { useCreateParticipant } from '@/hooks/participant/use-create-participant';
import { useCreateRound } from '@/hooks/round/use-create-round';
import { useCreateSession } from '@/hooks/session/use-create-session';
import { useAuth } from '@/providers/auth';
import { type CreateSessionInput, CreateSessionSchema } from '@/types/schema.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';

export default function SessionCreationContainer() {
  const navigate = useNavigate();
  const form = useForm<CreateSessionInput>({
    resolver: zodResolver(CreateSessionSchema),
    defaultValues: {
      name: '',
      votingSystem: 'fibonacci',
    },
  });
  const { user: authUser, signInAnonymously } = useAuth();

  const createSessionMutation = useCreateSession();
  const createParticipantMutation = useCreateParticipant();
  const createRoundMutation = useCreateRound();

  const onSubmit = async (data: CreateSessionInput) => {
    // STEP 1: Handle anonymous login
    const user = authUser ?? (await signInAnonymously()).user;
    // STEP 2: Create session
    const session = await createSessionMutation.mutateAsync({
      name: data.name,
      votingSystem: data.votingSystem,
      ownerId: user.uid,
      status: 'active',
    });
    // STEP 3: Create participant
    const participant = await createParticipantMutation.mutateAsync({
      sessionId: session.id,
      uid: user.uid,
      role: 'owner',
    });
    // STEP 4: Create round
    const round = await createRoundMutation.mutateAsync(session.id);

    if (session && user && participant && round) {
      navigate({ to: '/game/$gameId', params: { gameId: session.id } });
    }
  };

  return <SessionCreationForm form={form} onSubmit={onSubmit} />;
}
