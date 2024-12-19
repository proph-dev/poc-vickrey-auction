# Vickrey Auction Project

## Overview
This project implements a Vickrey auction system (sealed-bid second-price auction) as a web application using React with TypeScript. It allows users to:

- Create auctions with a name and a reserve price.
- Submit bids for an auction, provided the bid is equal to or greater than the reserve price.
- View all bids for a specific auction.
- Close an auction to determine the winner and the final price, following Vickrey auction rules.

In a Vickrey auction, the winner is the bidder with the highest bid that meets or exceeds the reserve price. However, they pay the price of the second-highest bid. If there is no second-highest bid above the reserve price, the reserve price itself becomes the winning price.

## Key Features

- **Create Auction**: Users can create an auction by specifying a name and a reserve price.
- **Submit Bids**: Users can place bids on an auction. Bids must be higher than or equal to the reserve price. Duplicate bid values from different users are not allowed.
- **View Bids**: Users can view all bids submitted for a specific auction.
- **Close Auction**: Once an auction is closed:
  - The bidder with the highest bid wins.
  - The winning price is determined as the second-highest bid above the reserve price.

## Tech Stack

- **Frontend Framework**: React (with Vite for project scaffolding).
- **Language**: TypeScript for robust and type-safe development.
- **Styling**:
  - Tailwind CSS for rapid UI styling.
  - Shadcn/ui for reusable and accessible components.
  - SaSS for enhanced styling capabilities.
- **State Management**: LocalStorage is used for simplicity in persisting auctions and bids.

## Installation and Setup

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd kata-frontend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the Development Server**:
   ```bash
   npm run dev
   ```

4. **Open in Browser**:
   Open [http://localhost:5173](http://localhost:5173) in your browser.

## Usage

### 1. Create an Auction
- Navigate to the auction creation modale.
- Enter the auction name and reserve price.
- Submit the form to create the auction.

### 2. Submit a Bid
- Select an auction from the list.
- Enter a bid amount that meets or exceeds the reserve price.
- Submit the bid. Duplicate bid values are not allowed between users.

### 3. View Bids
- Select an auction from the list.
- View all the bids associated with that auction.

### 4. Close an Auction
- Click the "Close Auction" button.
- The winner and the final price will be displayed:
  - The highest bidder wins.
  - The winning price is the second-highest bid above the reserve price.

## Project Structure

```
/src
├── data            # Mocks for the three auctions created by default
├── infrastructure  # Contains routes
├── lib             # Bookstore linked to Shadcn/ui
├── shadcn          # Contains all Shadcn/ui components and hooks
├── types           # Contains basic types (auction types)
├── ui
  ├── components      # Reusable React components
  ├── layouts         # Page layout (addition of navbar and footer)
  └── pages           # Main application pages
```

## LocalStorage Usage

The application uses LocalStorage to persist data:

- **Auctions**: Stored with a unique identifier, name, reserve price and status.
- **Bids**: Stored as an array associated with their respective auction IDs.

## Possible improvements

- Add authentication for a multi-user experience.
- Implement a database backend to replace LocalStorage for scalability.
- Add real-time updates using WebSockets for live auction participation.
- Improve UI with advanced animations and better bid visualizations.
- Enhance validation for inputs and edge-case handling.

## License
This project is licensed under the MIT License.

## Acknowledgments
Thank you to Kerdres Agency for providing the opportunity to implement this coding kata.
