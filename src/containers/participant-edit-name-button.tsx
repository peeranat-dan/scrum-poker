import { Edit } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '../components/ui/button';
import config from '../config';
import { useParticipant } from '../providers/participant';
import UserProfileModal from './user-profile-modal';

export default function ParticipantEditNameButton() {
  const { participant: currentParticipant } = useParticipant();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (currentParticipant?.displayName === config.game.defaultParticipantName) {
      setIsModalOpen(true);
    }
  }, [currentParticipant]);

  return (
    <>
      <Button variant='ghost' size='icon' onClick={handleOpenModal}>
        <Edit />
      </Button>
      {isModalOpen && <UserProfileModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />}
    </>
  );
}
