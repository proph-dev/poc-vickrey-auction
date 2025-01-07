import React, { useState } from 'react';
import { Button } from '@/shadcn/components/button';
import { Stack } from '../layouts/stack/Stack';
import { Input } from '@/shadcn/components/input';
import { DialogTitle, DialogDescription, DialogHeader } from '@/shadcn/components/dialog';

interface BidModalProps {
  auctionName: string;
  startingPrice: number;
  onSubmit: (bidderName: string, bidAmount: number) => void;
  onClose: () => void;
}

export const BidModal: React.FC<BidModalProps> = ({ auctionName, startingPrice, onSubmit, onClose }) => {
  const [bidderName, setBidderName] = useState('');
  const [bidAmount, setBidAmount] = useState<string>('');

  const handleSubmit = () => {
    const bidAmountNumber = parseFloat(bidAmount);
    if (bidderName.trim() && !isNaN(bidAmountNumber)) {
      onSubmit(bidderName, bidAmountNumber);
      setBidderName('');
      setBidAmount('');
      onClose();
    } else {
      alert('Veuillez remplir tous les champs correctement.');
    }
  };

  return (
    <Stack>
      <DialogHeader className='mb-4'>
        <DialogTitle className='mb-2'>Faire une offre pour {auctionName}</DialogTitle>
        <DialogDescription>Réalisez votre offre pour l'enchère {auctionName}</DialogDescription>
      </DialogHeader>
      <Input
        type="text"
        className="border border-gray-300 rounded p-2 w-full mb-4"
        placeholder="Votre prénom et nom"
        value={bidderName}
        onChange={(e) => setBidderName(e.target.value)}
      />
      <Input
        type="text"
        className="border border-gray-300 rounded p-2 w-full mb-4"
        placeholder={`Proposition à partir de ${startingPrice}€`}
        value={bidAmount}
        onChange={(e) => setBidAmount(e.target.value)}
      />
      <Stack className="flex justify-end">
        <Button variant="outline" onClick={onClose} className="mr-2">
          Annuler
        </Button>
        <Button onClick={handleSubmit}>Soumettre l'offre</Button>
      </Stack>
    </Stack>
  );
};
