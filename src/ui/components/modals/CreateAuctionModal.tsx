import React, { useState } from 'react';
import { SecondTitle } from '../typos/SecondTitle';
import { Stack } from '../layouts/stack/Stack';
import { Button } from '@/shadcn/components/button';
import { Input } from '@/shadcn/components/input';
import { DialogDescription, DialogHeader, DialogTitle } from '@/shadcn/components/dialog';

interface CreateAuctionModalProps {
  onSubmit: (name: string, startingPrice: number) => void;
  onClose: () => void;
}

export const CreateAuctionModal: React.FC<CreateAuctionModalProps> = ({ onSubmit, onClose }) => {
  const [auctionName, setAuctionName] = useState('');
  const [startingPrice, setStartingPrice] = useState<number | ''>('');

  const handleSubmit = () => {
    if (auctionName.trim() && typeof startingPrice === 'number' && startingPrice > 0) {
      onSubmit(auctionName, startingPrice);
      onClose();
      setAuctionName('');
      setStartingPrice('');
    } else {
      alert('Veuillez entrer un nom et un prix de réserve valides.');
    }
  };

  return (
    <Stack>
      <DialogHeader className='mb-4'>
        <DialogTitle className='mb-2'>Créer une nouvelle enchère</DialogTitle>
        <DialogDescription>Créez une nouvelle enchère pour commencer à vendre vos objets</DialogDescription>
      </DialogHeader>
      <Input
        type="text"
        className="border border-gray-300 rounded p-2 w-full mb-4"
        placeholder="Nom de l'enchère"
        value={auctionName}
        onChange={(e) => setAuctionName(e.target.value)}
      />
      <Input
        type="number"
        className="border border-gray-300 rounded p-2 w-full mb-4"
        placeholder="Prix de réserve (€)"
        value={startingPrice}
        onChange={(e) => setStartingPrice(Number(e.target.value))}
      />
      <Stack className="flex justify-end">
        <Button variant="outline" onClick={onClose} className="mr-2">
          Annuler
        </Button>
        <Button onClick={handleSubmit}>Créer l'enchère</Button>
      </Stack>
    </Stack>
  );
};
