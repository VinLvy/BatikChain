# Batik Authenticity Frontend

Frontend aplikasi Next.js untuk platform verifikasi keaslian produk batik Indonesia menggunakan teknologi blockchain.

## Fitur

- 🔗 Koneksi ke Polygon Mumbai Testnet
- 📱 Interface responsif dengan Tailwind CSS
- 🔍 Pencarian dan filter produk batik
- 📋 Tampilan detail produk lengkap
- ✅ Status verifikasi keaslian produk
- 🔐 Integrasi dengan MetaMask wallet

## Teknologi

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

3. Update contract address di `.env.local`:
```
NEXT_PUBLIC_CONTRACT_ADDRESS=0x...
```

4. Run development server:
```bash
npm run dev
```

## Konfigurasi Contract

Pastikan contract address sudah benar di file `.env.local`. Contract address bisa didapatkan setelah deployment smart contract BatikAuthenticity.sol ke Polygon Mumbai Testnet.

## Struktur Project

```
src/
├── app/                 # Next.js App Router
├── components/          # React components
│   ├── ProductCard.tsx
│   ├── ProductDetail.tsx
│   ├── ProductList.tsx
│   └── WalletConnection.tsx
├── config/             # Configuration files
│   └── contract.ts
├── hooks/              # Custom React hooks
│   ├── useContract.ts
│   └── useWallet.ts
└── types/              # TypeScript type definitions
```

## Smart Contract Integration

Aplikasi ini terintegrasi dengan smart contract `BatikAuthenticity.sol` yang menyediakan:

- `getProduct(uint256 id)` - Mengambil data produk lengkap
- `getProductBasicInfo(uint256 id)` - Mengambil informasi dasar produk
- `getTotalProducts()` - Mengambil jumlah total produk
- `getAllProductIds()` - Mengambil semua ID produk
- `isProductVerified(uint256 id)` - Memeriksa status verifikasi

## Deployment

1. Build aplikasi:
```bash
npm run build
```

2. Deploy ke platform hosting seperti Vercel, Netlify, atau AWS.

## Troubleshooting

### MetaMask Connection Issues
- Pastikan MetaMask terinstall dan unlocked
- Pastikan menggunakan Polygon Mumbai Testnet
- Refresh halaman jika ada masalah koneksi

### Contract Interaction Issues
- Pastikan contract address benar di `.env.local`
- Pastikan wallet sudah terhubung ke network yang benar
- Check browser console untuk error messages