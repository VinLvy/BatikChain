# BatikChain Frontend

Next.js frontend application for the platform verifying the authenticity of Indonesian batik products using blockchain technology.

## Features

- 🔗 Connection to Polygon Mumbai Testnet
- 📱 Responsive interface with Tailwind CSS
- 🔍 Batik product search and filter
- 📋 Complete product detail view
- ✅ Product authenticity verification status
- 🔐 Integration with MetaMask wallet

## Technology

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Ethers.js** - Blockchain interaction
- **Polygon Mumbai** - Test network

## Setup

1. Install dependencies:
```bash
npm install
```

2. Copy environment variables:
```bash
cp .env.example .env.local
```

3. Update contract address in `.env.local`:
```
NEXT_PUBLIC_CONTRACT_ADDRESS=0x...
```

4. Run development server:
```bash
npm run dev
```

## Contract Configuration

Ensure the contract address is correct in the `.env.local` file. The contract address can be obtained after deploying the BatikAuthenticity.sol smart contract to the Ethereum Sepolia Testnet.

## Project Structure

```
src/
├── app/                 # Next.js App Router
├── components/          # React components
│   ├── ProductCard.tsx
│   ├── ProductDetail.tsx
│   ├── ProductList.tsx
│   └── WalletConnection.tsx
├── config/              # Configuration files
│   └── contract.ts
├── hooks/               # Custom React hooks
│   ├── useContract.ts
│   └── useWallet.ts
└── types/               # TypeScript type definitions
```

## Smart Contract Integration

This application is integrated with the `BatikAuthenticity.sol` smart contract which provides:

- `getProduct(uint256 id)` - Retrieve complete product data
- `getProductBasicInfo(uint256 id)` - Retrieve basic product info
- `getTotalProducts()` - Retrieve total number of products
- `getAllProductIds()` - Retrieve all product IDs
- `isProductVerified(uint256 id)` - Check verification status

## Deployment

1. Build application:
```bash
npm run build
```

2. Deploy to hosting platforms like Vercel, Netlify, or AWS.

## Troubleshooting

### MetaMask Connection Issues
- Ensure MetaMask is installed and unlocked
- Ensure you are using Polygon Mumbai Testnet
- Refresh the page if there are connection issues

### Contract Interaction Issues
- Ensure contract address is correct in `.env.local`
- Ensure wallet is connected to the correct network
- Check browser console for error messages