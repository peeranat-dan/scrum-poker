import SessionCreationForm from "@/components/form/session-creation-form";
import { useAnonymousLogin } from "@/hooks/auth/use-anonymous-login";
import { useCreateParticipant } from "@/hooks/participant/use-create-participant";
import { useCreateSession } from "@/hooks/session/use-create-session";
import {
  type CreateSessionInput,
  CreateSessionSchema,
} from "@/types/schema.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

export default function SessionCreationContainer() {
  const form = useForm<CreateSessionInput>({
    resolver: zodResolver(CreateSessionSchema),
    defaultValues: {
      name: "",
      votingSystem: "fibonacci",
    },
  });
  const navigate = useNavigate();

  const anonymousLoginMutation = useAnonymousLogin();
  const createSessionMutation = useCreateSession();
  const createParticipantMutation = useCreateParticipant();

  const onSubmit = async (data: CreateSessionInput) => {
    // STEP 1: Handle anonymous login
    const user = await anonymousLoginMutation.mutateAsync();
    // STEP 2: Create session
    const session = await createSessionMutation.mutateAsync(data);
    // STEP 3: Create participant
    const participants = await createParticipantMutation.mutateAsync({
      sessionId: session.id,
      uid: user.user.uid,
      isOwner: true,
    });

    if (session && user && participants) {
      navigate(`/game/${session.id}`);
    }
  };

  return <SessionCreationForm form={form} onSubmit={onSubmit} />;
}
