import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

interface OriginalEstimateDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (estimate: number) => void;
  cards: Array<{ value: number; displayValue: string }>;
}

/**
 * Dialog component for game owner to input original estimate before revealing votes
 */
export function OriginalEstimateDialog({
  isOpen,
  onClose,
  onSubmit,
  cards,
}: OriginalEstimateDialogProps) {
  const [selectedEstimate, setSelectedEstimate] = useState<number | null>(null);
  const [customEstimate, setCustomEstimate] = useState('');

  const handleSubmit = () => {
    const estimate = selectedEstimate ?? Number(customEstimate);
    if (!isNaN(estimate) && estimate >= 0) {
      onSubmit(estimate);
      onClose();
      setSelectedEstimate(null);
      setCustomEstimate('');
    }
  };

  const handleCardSelect = (value: number) => {
    setSelectedEstimate(value);
    setCustomEstimate('');
  };

  const handleCustomChange = (value: string) => {
    setCustomEstimate(value);
    setSelectedEstimate(null);
  };

  const isValid = selectedEstimate !== null || (!isNaN(Number(customEstimate)) && customEstimate !== '');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Set Original Estimate</DialogTitle>
          <DialogDescription>
            Enter the original estimate for this story to track win streaks. Participants who voted for this value will get a winning streak.
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='space-y-2'>
            <Label>Select from cards:</Label>
            <div className='grid grid-cols-4 gap-2'>
              {cards.map((card) => (
                <Button
                  key={card.value}
                  variant={selectedEstimate === card.value ? 'default' : 'outline'}
                  size='sm'
                  onClick={() => handleCardSelect(card.value)}
                >
                  {card.displayValue}
                </Button>
              ))}
            </div>
          </div>
          <div className='space-y-2'>
            <Label htmlFor='custom-estimate'>Or enter custom value:</Label>
            <Input
              id='custom-estimate'
              type='number'
              placeholder='Enter estimate'
              value={customEstimate}
              onChange={(e) => handleCustomChange(e.target.value)}
              min='0'
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant='outline' onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!isValid}>
            Reveal Votes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}