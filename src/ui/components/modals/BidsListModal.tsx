import { DialogDescription, DialogHeader, DialogTitle } from '@/shadcn/components/dialog';
import { Stack } from '../layouts/stack/Stack';

interface Bid {
  bidderName: string;
  bidAmount: number;
}

interface BidsListModalProps {
  auctionName: string;
  bids: Bid[];
  startingPrice: number;
  isActive: boolean;
  winner?: {
    bidderName: string;
    pricePaid: number;
  };
}

export function BidsListModal({ auctionName, bids, startingPrice, isActive, winner }: BidsListModalProps) {
  const sortedBids = [...bids].sort((a, b) => b.bidAmount - a.bidAmount);

  return (
    <Stack className="p-4">
      <DialogHeader className='mb-4'>
        <DialogTitle className='mb-2'>Offres pour {auctionName}</DialogTitle>
        <DialogDescription>
          {isActive ? (
            "Liste des offres classées par ordre décroissant"
          ) : (
            <>
              L'enchère est actuellement clôturée.
              {winner && (
                <p className="mt-2 text-sm">
                  Gagnant : <span className='text-green-500 font-bold'>{winner.bidderName}</span> (Prix payé : <span className='font-bold'>{winner.pricePaid}€</span>)
                </p>
              )}
            </>
          )}
        </DialogDescription>
      </DialogHeader>
      
      <Stack className="mt-4">
        {sortedBids.length > 0 ? (
          <ul className="space-y-2">
            {sortedBids.map((bid, index) => (
              <li key={index} className="flex justify-between items-center p-2 border rounded">
                <span>{bid.bidderName}</span>
                <div className="flex items-center gap-2">
                  <span className="font-bold">{bid.bidAmount}€</span>
                  {bid.bidAmount < startingPrice && (
                    <span className="text-sm text-red-500 italic">
                      (offre inférieure au prix de réserve)
                    </span>
                  )}
                </div>
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