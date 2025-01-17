export interface Auction {
  id: number;
  name: string;
  startingPrice: number;
  active: boolean;
  winner?: {
    bidderName: string;
    pricePaid: number;
  };
} 