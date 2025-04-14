import SessionCreationForm from "@/components/form/session-creation-form";
import { useCreateParticipant } from "@/hooks/participant/use-create-participant";
import { useCreateRound } from "@/hooks/round/use-create-round";
import { useCreateSession } from "@/hooks/session/use-create-session";
import { useAuth } from "@/providers/auth";
import {
  type CreateSessionInput,
  CreateSessionSchema,
} from "@/types/schema.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { generatePath, useNavigate } from "react-router";

export default function SessionCreationContainer() {
  const navigate = useNavigate();
  const form = useForm<CreateSessionInput>({
    resolver: zodResolver(CreateSessionSchema),
    defaultValues: {
      name: "",
      votingSystem: "fibonacci",
    },
  });
  const { signInAnonymously } = useAuth();

  const createSessionMutation = useCreateSession();
  const createParticipantMutation = useCreateParticipant();
  const createRoundMutation = useCreateRound();
  const onSubmit = async (data: CreateSessionInput) => {
    // STEP 1: Handle anonymous login
    const user = await signInAnonymously();
    // STEP 2: Create session
    const session = await createSessionMutation.mutateAsync(data);
    // STEP 3: Create participant
    const participant = await createParticipantMutation.mutateAsync({
      sessionId: session.id,
      uid: user.user.uid,
      isOwner: true,
    });
    // STEP 4: Create round
    const round = await createRoundMutation.mutateAsync(session.id);

    if (session && user && participant && round) {
      navigate(generatePath("/game/:gameId", { gameId: session.id }));
    }
  };

  return <SessionCreationForm form={form} onSubmit={onSubmit} />;
}
