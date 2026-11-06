import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import SessionInformationForm from '@/components/form/session-information-form';
import { useUpdateSessionInformation } from '@/hooks/session/use-update-session-information';
import { useSession } from '@/providers/session';
import { type SessionInformationInput, SessionInformationSchema } from '@/types/schema.types';

export default function SessionInformationContainer() {
  const { id, name, votingSystem, issueTrackerUrl } = useSession();

  const form = useForm<SessionInformationInput>({
    defaultValues: {
      name,
      votingSystem,
      issueTrackerUrl: issueTrackerUrl ?? '',
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
        // NOTE: `||` instead of `??` so an empty url turns auto-linking off
        issueTrackerUrl: data.issueTrackerUrl || null,
      },
      {
        onSuccess: () => {
          toast.success('Session information updated successfully');
        },
        onError: (error) => {
          toast.error(error.message);
          // oxlint-disable-next-line no-console
          console.error(error);
        },
      },
    );
  };

  useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      form.reset(form.getValues());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.formState.isSubmitSuccessful]);

  return <SessionInformationForm form={form} onSubmit={onSubmit} />;
}
