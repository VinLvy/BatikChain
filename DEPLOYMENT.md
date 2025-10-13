# Deployment Guide - Batik Authenticity Platform

Panduan lengkap untuk deployment aplikasi Batik Authenticity Platform ke Polygon Mumbai Testnet.

## 📋 Prerequisites

- Node.js 18+
- npm 8+
- MetaMask wallet
- Polygon Mumbai testnet MATIC tokens (untuk gas fees)
- Hardhat account dengan private key

## 🚀 Step-by-Step Deployment

### 1. Setup Environment Variables

#### Hardhat Environment
```bash
cd hardhat
cp env.example .env
```

Edit `hardhat/.env`:
```env
PRIVATE_KEY=your_wallet_private_key_here
POLYGON_MUMBAI_URL=https://rpc-mumbai.maticvigil.com
POLYGON_MUMBAI_API_KEY=your_api_key_optional
```

#### Frontend Environment
```bash
cd frontend
cp env.example .env.local
```

Edit `frontend/.env.local` (akan diisi setelah deployment contract):
```env
NEXT_PUBLIC_CONTRACT_ADDRESS=0x...
```

### 2. Deploy Smart Contract

```bash
# Compile contract
npm run compile

# Deploy ke Mumbai testnet
npm run deploy:mumbai
```

**Output yang diharapkan:**
```
BatikAuthenticity deployed to: 0x1234567890abcdef...
```

**⚠️ Penting:** Simpan contract address yang ditampilkan!

### 3. Update Frontend Configuration

Edit `frontend/.env.local` dan masukkan contract address:
```env
NEXT_PUBLIC_CONTRACT_ADDRESS=0x1234567890abcdef...
```

### 4. Add Sample Data (Optional)

```bash
# Menambahkan produk sample untuk testing
npm run add-sample:mumbai
```

### 5. Start Frontend Development

```bash
npm run dev:frontend
```

Aplikasi akan berjalan di: http://localhost:3000

## 🔧 Testing Deployment

### 1. Wallet Connection Test
- Buka http://localhost:3000
- Klik "Hubungkan MetaMask"
- Pastikan wallet terhubung ke Polygon Mumbai Testnet
- Jika belum, klik "Beralih ke Mumbai"

### 2. Contract Interaction Test
- Setelah wallet terhubung, seharusnya muncul daftar produk
- Klik "Lihat Detail" pada produk untuk melihat informasi lengkap
- Test fitur pencarian dan filter

### 3. Network Verification
- Pastikan di MetaMask menampilkan "Polygon Mumbai"
- Pastikan balance MATIC cukup untuk gas fees
- Test transaksi jika diperlukan

## 🌐 Production Deployment

### Frontend Deployment

#### Option 1: Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel --prod
```

#### Option 2: Netlify
```bash
# Build aplikasi
npm run build:frontend

# Upload folder frontend/out ke Netlify
```

#### Option 3: Manual Server
```bash
# Build aplikasi
npm run build:frontend

# Upload folder frontend/out ke server web
```

### Environment Variables untuk Production

Pastikan set environment variables di platform hosting:
- `NEXT_PUBLIC_CONTRACT_ADDRESS`
- `NEXT_PUBLIC_NETWORK_CHAIN_ID=80001`
- `NEXT_PUBLIC_RPC_URL=https://rpc-mumbai.maticvigil.com`

## 🔍 Troubleshooting

### Contract Deployment Issues

**Error: Insufficient funds**
- Pastikan wallet memiliki MATIC untuk gas fees
- Check balance di Mumbai testnet

**Error: Invalid private key**
- Pastikan private key format benar (0x...)
- Jangan gunakan mnemonic phrase

**Error: Network connection**
- Check RPC URL Mumbai
- Pastikan internet connection stabil

### Frontend Issues

**Error: Contract not found**
- Pastikan `NEXT_PUBLIC_CONTRACT_ADDRESS` benar
- Pastikan contract sudah deployed

**Error: Wallet connection failed**
- Pastikan MetaMask terinstall
- Pastikan menggunakan network yang benar
- Clear browser cache dan reload

**Error: Network mismatch**
- Pastikan wallet terhubung ke Polygon Mumbai
- Update network configuration jika perlu

### Smart Contract Interaction Issues

**Error: Contract call failed**
- Check gas limit
- Pastikan contract address benar
- Pastikan ABI sesuai dengan deployed contract

**Error: Function not found**
- Pastikan menggunakan function yang ada
- Check contract ABI di `frontend/src/config/contract.ts`

## 📊 Monitoring

### Contract Monitoring
- Monitor contract di [Mumbai PolygonScan](https://mumbai.polygonscan.com)
- Check transaction history
- Monitor gas usage

### Application Monitoring
- Monitor error logs
- Check user interactions
- Monitor performance metrics

## 🔐 Security Checklist

- [ ] Private key tidak tersimpan di public repository
- [ ] Environment variables tidak exposed
- [ ] Contract sudah di-verify di PolygonScan
- [ ] Frontend menggunakan HTTPS di production
- [ ] MetaMask connection aman
- [ ] Input validation pada frontend

## 📞 Support

Jika mengalami masalah:
1. Check error logs di browser console
2. Check transaction status di PolygonScan
3. Verify contract deployment
4. Check network configuration
5. Create issue di GitHub repository

## 🔗 Useful Links

- [Polygon Mumbai Faucet](https://faucet.polygon.technology/) - Get test MATIC
- [Mumbai PolygonScan](https://mumbai.polygonscan.com) - Block explorer
- [MetaMask](https://metamask.io) - Wallet setup
- [Polygon Documentation](https://docs.polygon.technology/)
