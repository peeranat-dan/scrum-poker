import UserProfileForm from '@/components/form/user-profile-form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import config from '@/config';
import { useParticipant } from '@/providers/participant';
import { type UserProfileInput, UserProfileSchema } from '@/types/schema.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

interface UserProfileModalProps {
  isOpen?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
}

export default function UserProfileModal({ isOpen, setIsOpen }: UserProfileModalProps = {}) {
  const { participant, updateParticipantName } = useParticipant();
  const form = useForm<UserProfileInput>({
    resolver: zodResolver(UserProfileSchema),
    defaultValues: {
      displayName: participant?.displayName ?? config.game.defaultParticipantName,
    },
  });

  const onSubmit = (data: UserProfileInput) => {
    updateParticipantName(data.displayName);
    setIsOpen?.(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
