import SessionInformationForm from "@/components/form/session-information-form";
import { useUpdateSessionInformation } from "@/hooks/session/use-update-session-information";
import { useSession } from "@/providers/session";
import {
  type SessionInformationInput,
  SessionInformationSchema,
} from "@/types/schema.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function SessionInformationContainer() {
  const { id, name, votingSystem } = useSession();
  const form = useForm<SessionInformationInput>({
    defaultValues: {
      name,
      votingSystem,
    },
    resolver: zodResolver(SessionInformationSchema),
  });
  const updateSessionInformationMutation = useUpdateSessionInformation();

  const onSubmit = async (data: SessionInformationInput) => {
    await updateSessionInformationMutation.mutateAsync(
      {
        id,
        name: data.name,
        votingSystem: data.votingSystem,
      },
      {
        onSuccess: () => {
          toast.success("Session information updated successfully");
        },
        onError: (error) => {
          toast.error(error.message);
          console.error(error);
        },
      }
    );
  };

  useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      form.reset({
        name: name,
        votingSystem: votingSystem,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.formState.isSubmitSuccessful, name, votingSystem]);

  return <SessionInformationForm form={form} onSubmit={onSubmit} />;
}
