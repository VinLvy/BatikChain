# Deployment Guide - BatikChain

Panduan lengkap untuk deployment aplikasi BatikChain ke Ethereum Sepolia Testnet.

## 📋 Prerequisites

- Node.js 18+
- npm 8+
- MetaMask wallet
- Ethereum Sepolia testnet ETH tokens (untuk gas fees)
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
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_API_KEY
ETHERSCAN_API_KEY=your_etherscan_api_key_here
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

# Deploy ke Sepolia testnet
npm run deploy:sepolia
```

**Output yang diharapkan:**
```
BatikChain deployed to: 0x1234567890abcdef...
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
npm run add-sample:sepolia
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
- Pastikan wallet terhubung ke Ethereum Sepolia Testnet
- Jika belum, klik "Beralih ke Sepolia"

### 2. Contract Interaction Test
- Setelah wallet terhubung, seharusnya muncul daftar produk
- Klik "Lihat Detail" pada produk untuk melihat informasi lengkap
- Test fitur pencarian dan filter

### 3. Network Verification
- Pastikan di MetaMask menampilkan "Ethereum Sepolia"
- Pastikan balance ETH cukup untuk gas fees
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
- `NEXT_PUBLIC_NETWORK_CHAIN_ID=11155111`
- `NEXT_PUBLIC_RPC_URL=https://rpc.sepolia.org`

## 🔍 Troubleshooting

### Contract Deployment Issues

**Error: Insufficient funds**
- Pastikan wallet memiliki ETH untuk gas fees
- Check balance di Sepolia testnet

**Error: Invalid private key**
- Pastikan private key format benar (0x...)
- Jangan gunakan mnemonic phrase

**Error: Network connection**
- Check RPC URL Sepolia
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
- Pastikan wallet terhubung ke Ethereum Sepolia
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
- Monitor contract di [Sepolia Etherscan](https://sepolia.etherscan.io)
- Check transaction history
- Monitor gas usage

### Application Monitoring
- Monitor error logs
- Check user interactions
- Monitor performance metrics

## 🔐 Security Checklist

- [ ] Private key tidak tersimpan di public repository
- [ ] Environment variables tidak exposed
- [ ] Contract sudah di-verify di Etherscan
- [ ] Frontend menggunakan HTTPS di production
- [ ] MetaMask connection aman
- [ ] Input validation pada frontend

## 📞 Support

Jika mengalami masalah:
1. Check error logs di browser console
2. Check transaction status di Etherscan
3. Verify contract deployment
4. Check network configuration
5. Create issue di GitHub repository

## 🔗 Useful Links

- [Sepolia Faucet](https://sepoliafaucet.com/) - Get test ETH
- [Sepolia Etherscan](https://sepolia.etherscan.io) - Block explorer
- [MetaMask](https://metamask.io) - Wallet setup
- [Ethereum Documentation](https://ethereum.org/en/developers/docs/)
