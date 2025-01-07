import { DialogDescription, DialogHeader, DialogTitle } from '@/shadcn/components/dialog';
import { Stack } from '../layouts/stack/Stack';

interface Bid {
  bidderName: string;
  bidAmount: number;
}

interface BidsListModalProps {
  auctionName: string;
  bids: Bid[];
}

export function BidsListModal({ auctionName, bids }: BidsListModalProps) {
  const sortedBids = [...bids].sort((a, b) => b.bidAmount - a.bidAmount);

  return (
    <Stack className="p-4">
      <DialogHeader className='mb-4'>
        <DialogTitle className='mb-2'>Offres pour {auctionName}</DialogTitle>
        <DialogDescription>Liste des offres classées par ordre décroissant</DialogDescription>
      </DialogHeader>
      
      <Stack className="mt-4">
        {sortedBids.length > 0 ? (
          <ul className="space-y-2">
            {sortedBids.map((bid, index) => (
              <li key={index} className="flex justify-between items-center p-2 border rounded">
                <span>{bid.bidderName}</span>
                <span className="font-bold">{bid.bidAmount}€</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">Aucune offre pour cette enchère</p>
        )}
      </Stack>
    </Stack>
  );
}