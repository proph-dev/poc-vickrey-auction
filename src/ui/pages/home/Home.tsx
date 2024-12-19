import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shadcn/components/table';
import { Button } from '@/shadcn/components/button';
import { Dialog, DialogContent, DialogTrigger } from '@/shadcn/components/dialog';
import { useToast } from '@/shadcn/hooks/use-toast';
import defaultAuctions from '@/data/defaultsAuctions.json';
import { Auction } from '@/types/auctions';
import { FirstTitle } from '../../components/typos/FirstTitle';
import { Section } from '../../components/layouts/Section';
import { Stack } from '@/ui/components/layouts/stack/Stack';
import { CreateAuctionModal } from '@/ui/components/modals/CreateAuctionModal';
import { BidModal } from '@/ui/components/modals/BidModal';
import { BidsListModal } from '@/ui/components/modals/BidsListModal';
import style from './home.module.scss';

export default function Home() {
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [selectedAuction, setSelectedAuction] = useState<Auction | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCreateAuctionDialogOpen, setIsCreateAuctionDialogOpen] = useState(false);
  const [isViewBidsDialogOpen, setIsViewBidsDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const storedAuctions = localStorage.getItem('auctions');
    if (storedAuctions) {
      setAuctions(JSON.parse(storedAuctions) as Auction[]);
    } else {
      localStorage.setItem('auctions', JSON.stringify(defaultAuctions));
      setAuctions(defaultAuctions as Auction[]);
    }
  }, []);

  const getBidCount = (auctionId: number): number => {
    const bids = JSON.parse(localStorage.getItem('bids') || '[]') as { auctionId: number }[];
    return bids.filter((bid) => bid.auctionId === auctionId).length;
  };

  const handleBidSubmit = (bidderName: string, bidAmount: number) => {
    if (!selectedAuction) return;

    const isValidBidAmount = typeof bidAmount === 'number' && bidAmount >= selectedAuction.startingPrice;
    const isValidBidderName = bidderName.trim().length > 0;

    if (!isValidBidAmount || !isValidBidderName) {
      toast({
        title: 'Erreur lors du dépôt de l\'offre',
        description: 'Veuillez remplir tous les champs correctement. Le montant doit être valide et supérieur ou égal au prix de réserve.',
        variant: 'destructive',
      });
      return;
    }

    const existingBids = getAuctionBids(selectedAuction.id);
    const hasDuplicateAmount = existingBids.some(bid => bid.bidAmount === bidAmount);

    if (hasDuplicateAmount) {
      toast({
        title: 'Erreur lors du dépôt de l\'offre',
        description: 'Une offre avec ce montant existe déjà. Veuillez choisir un montant différent.',
        variant: 'destructive',
      });
      return;
    }

    const newBid = {
      auctionId: selectedAuction.id,
      bidderName,
      bidAmount,
    };

    const storedBids = JSON.parse(localStorage.getItem('bids') || '[]');
    const updatedBids = [...storedBids, newBid];

    localStorage.setItem('bids', JSON.stringify(updatedBids));
    setAuctions((prev) => {
      const updatedAuctions = prev.map((auction) =>
        auction.id === selectedAuction.id
          ? { ...auction, bidCount: getBidCount(selectedAuction.id) + 1 }
          : auction
      );
      return updatedAuctions;
    });

    setSelectedAuction(null);
    setIsDialogOpen(false);

    toast({
      title: 'Offre déposée avec succès !',
      description: `Votre offre de ${bidAmount}€ pour ${selectedAuction.name} a bien été enregistrée.`,
    });
  };

  const handleCreateAuction = (name: string, price: number) => {
    if (!name.trim() || typeof price !== 'number' || price <= 0) {
      toast({
        title: 'Erreur',
        description: 'Veuillez entrer un nom et un prix de réserve valides.',
        variant: 'destructive',
      });
      return;
    }

    const newAuction = {
      id: auctions.length + 1,
      name: name,
      startingPrice: price,
      bidCount: 0,
      active: true,
    };

    const updatedAuctions = [...auctions, newAuction];
    localStorage.setItem('auctions', JSON.stringify(updatedAuctions));
    setAuctions(updatedAuctions);
    setIsCreateAuctionDialogOpen(false);

    toast({
      title: 'Enchère créée avec succès !',
      description: `L'enchère "${name}" a été ajoutée avec un prix de réserve de ${price}€.`,
    });
  };

  const handleCloseAuction = (auctionId: number) => {
    const bids = JSON.parse(localStorage.getItem('bids') || '[]') as { auctionId: number; bidderName: string; bidAmount: number }[];
    const auctionBids = bids.filter((bid) => bid.auctionId === auctionId).sort((a, b) => b.bidAmount - a.bidAmount);
  
    if (auctionBids.length === 0) {
      toast({
        title: 'Impossible de clôturer',
        description: 'Il faut au moins une offre pour clôturer cette enchère.',
        variant: 'destructive',
      });
      return;
    }
  
    const winner = auctionBids[0];
    const priceToPay = auctionBids.length > 1 ? auctionBids[1].bidAmount : auctions.find((a) => a.id === auctionId)?.startingPrice;
  
    const updatedAuctions = auctions.map((auction) =>
      auction.id === auctionId ? { ...auction, active: false } : auction
    );
  
    setAuctions(updatedAuctions);
    localStorage.setItem('auctions', JSON.stringify(updatedAuctions));
  
    toast({
      title: `${winner.bidderName} a remporté l'enchère !`,
      description: `Il devra payer ${priceToPay}€.`,
    });
  };

  const getAuctionBids = (auctionId: number) => {
    const bids = JSON.parse(localStorage.getItem('bids') || '[]') as { auctionId: number; bidderName: string; bidAmount: number }[];
    return bids.filter((bid) => bid.auctionId === auctionId);
  };

  return (
    <main className="container mx-auto p-4">
      <Section className={style.heroSection}>
        <Stack>
          <FirstTitle className="text-2xl font-bold mb-4">Les enchères existantes</FirstTitle>
          <p>Vous retrouverez ci-dessous la liste des enchères existantes. Cliquez sur une offre pour voir les offres en cours sur cette dernière.</p>
        </Stack>
        <Button onClick={() => setIsCreateAuctionDialogOpen(true)} className={style.createAuctionBtn}>Créer une enchère</Button>
      </Section>

      <Section className={style.auctionsList}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom de l'enchère</TableHead>
              <TableHead>Prix de réserve</TableHead>
              <TableHead>Offres</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {auctions.map((auction) => (
              <TableRow 
                key={auction.id} 
                className="cursor-pointer hover:bg-gray-100"
                onClick={(e) => {
                  const target = e.target as HTMLElement;
                  if (!target.closest('button')) {
                    setSelectedAuction(auction);
                    setIsViewBidsDialogOpen(true);
                  }
                }}
              >
                <TableCell>{auction.name}</TableCell>
                <TableCell>{auction.startingPrice}€</TableCell>
                <TableCell>{getBidCount(auction.id)}</TableCell>
                <TableCell>
                  {auction.active ? (
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                      <DialogTrigger asChild>
                        <Button onClick={() => setSelectedAuction(auction)}>
                          Faire une offre
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        {selectedAuction && (
                          <BidModal
                            auctionName={selectedAuction.name}
                            startingPrice={selectedAuction.startingPrice}
                            onSubmit={handleBidSubmit}
                            onClose={() => setIsDialogOpen(false)}
                          />
                        )}
                      </DialogContent>
                    </Dialog>
                  ) : (
                    <span className="text-red-500 font-bold">Enchère clôturée</span>
                  )}
                  {auction.active && (
                    <Button variant="outline" onClick={() => handleCloseAuction(auction.id)} className='ml-4'>
                      Clôturer
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Section>

      <Dialog open={isCreateAuctionDialogOpen} onOpenChange={setIsCreateAuctionDialogOpen}>
        <DialogContent>
          <CreateAuctionModal
            onSubmit={handleCreateAuction}
            onClose={() => setIsCreateAuctionDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={isViewBidsDialogOpen} onOpenChange={setIsViewBidsDialogOpen}>
        <DialogContent>
          {selectedAuction && (
            <BidsListModal
              auctionName={selectedAuction.name}
              bids={getAuctionBids(selectedAuction.id)}
            />
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
}
