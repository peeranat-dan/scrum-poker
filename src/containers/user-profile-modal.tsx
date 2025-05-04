import UserProfileForm from '@/components/form/user-profile-form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useParticipant } from '@/providers/participant';
import { type UserProfileInput, UserProfileSchema } from '@/types/schema.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export default function UserProfileModal() {
  const { participant, updateParticipantName } = useParticipant();
  const form = useForm<UserProfileInput>({
    resolver: zodResolver(UserProfileSchema),
    defaultValues: {
      displayName: participant?.displayName ?? import.meta.env.VITE_GAME_DEFAULT_PARTICIPANT_NAME,
    },
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (participant?.displayName === import.meta.env.VITE_GAME_DEFAULT_PARTICIPANT_NAME) {
      setIsOpen(true);
    }
  }, [participant]);

  const onSubmit = (data: UserProfileInput) => {
    updateParticipantName(data.displayName);
    setIsOpen(false);
  };

  return (
    <Dialog defaultOpen={isOpen} open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit your profile</DialogTitle>
          <DialogDescription></DialogDescription>
          <UserProfileForm form={form} onSubmit={onSubmit} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
