import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { type Card } from '@/shared/card/types';
import { useState } from 'react';

interface OriginalEstimateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (originalEstimate: number) => void;
  cards: Card[];
}

export function OriginalEstimateDialog({
  open,
  onOpenChange,
  onConfirm,
  cards,
}: OriginalEstimateDialogProps) {
  const [selectedValue, setSelectedValue] = useState<string>('');

  const handleConfirm = () => {
    const estimate = Number(selectedValue);
    onConfirm(estimate);
    setSelectedValue('');
    onOpenChange(false);
  };

  const handleCancel = () => {
    setSelectedValue('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Original Estimate</DialogTitle>
          <DialogDescription>
            What was the original estimate for this story? Participants who voted for this value will get a win streak.
          </DialogDescription>
        </DialogHeader>
        <div className='py-4'>
          <Select value={selectedValue} onValueChange={setSelectedValue}>
            <SelectTrigger>
              <SelectValue placeholder='Select the original estimate' />
            </SelectTrigger>
            <SelectContent>
              {cards.map((card) => (
                <SelectItem key={card.value} value={card.value.toString()}>
                  {card.displayValue}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <Button variant='outline' onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} disabled={!selectedValue}>
            Confirm & Reveal
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}