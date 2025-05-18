import UserProfileForm from '@/components/form/user-profile-form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import config from '@/config';
import { useParticipant } from '@/providers/participant';
import { type UserProfileInput, UserProfileSchema } from '@/types/schema.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Edit } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../components/ui/button';

export default function EditUserProfileButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { participant, updateParticipantName } = useParticipant();
  const form = useForm<UserProfileInput>({
    resolver: zodResolver(UserProfileSchema),
    defaultValues: {
      displayName: participant?.displayName ?? config.game.defaultParticipantName,
    },
  });

  useEffect(() => {
    if (participant?.displayName === config.game.defaultParticipantName) {
      setIsModalOpen(true);
    }
  }, [participant]);

  const onSubmit = (data: UserProfileInput) => {
    updateParticipantName(data.displayName);
    setIsModalOpen(false);
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <Button variant='ghost' size='icon'>
          <Edit />
        </Button>
      </DialogTrigger>
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
