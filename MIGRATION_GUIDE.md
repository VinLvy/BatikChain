# Migration Guide: Polygon Mumbai → Ethereum Sepolia

Panduan lengkap untuk migrasi proyek Batik Authenticity Platform dari Polygon Mumbai Testnet ke Ethereum Sepolia Testnet.

## 📋 Overview

Migrasi ini mengubah platform dari menggunakan Polygon Mumbai Testnet ke Ethereum Sepolia Testnet untuk:
- ✅ Kompatibilitas yang lebih baik dengan tooling Ethereum
- ✅ Akses ke ekosistem Ethereum yang lebih luas
- ✅ Stabilitas network yang lebih baik
- ✅ Dukungan tooling yang lebih komprehensif

## 🔄 Perubahan yang Dilakukan

### 1. Network Configuration

#### Hardhat Configuration (`hardhat/hardhat.config.js`)
- ✅ Updated Sepolia network configuration dengan gas settings
- ✅ Added Etherscan verification support
- ✅ Set Sepolia sebagai default deployment target

#### Frontend Configuration (`frontend/src/config/contract.ts`)
- ✅ Changed from `POLYGON_MUMBAI` to `ETHEREUM_SEPOLIA`
- ✅ Updated chain ID: `80001` → `11155111`
- ✅ Updated RPC URLs dan block explorer URLs
- ✅ Updated currency: `MATIC` → `ETH`

### 2. Environment Variables

#### Hardhat Environment (`hardhat/env.example`)
- ✅ Updated untuk menggunakan `SEPOLIA_RPC_URL`
- ✅ Added `ETHERSCAN_API_KEY` untuk contract verification

#### Frontend Environment (`frontend/env.example`)
- ✅ Updated network configuration untuk Sepolia
- ✅ Changed chain ID dan RPC URLs

### 3. Package Scripts

#### Hardhat Scripts (`hardhat/package.json`)
- ✅ Set `deploy` command default ke Sepolia
- ✅ Added `verify:sepolia` command
- ✅ Updated sample data commands

### 4. Frontend Components

#### Wallet Hook (`frontend/src/hooks/useWallet.ts`)
- ✅ Updated network validation untuk Sepolia
- ✅ Renamed `switchToMumbai` → `switchToSepolia`
- ✅ Updated error messages dan UI text

#### Wallet Connection Component (`frontend/src/components/WalletConnection.tsx`)
- ✅ Updated UI text untuk Sepolia
- ✅ Updated network switching functionality

### 5. Documentation

#### README.md
- ✅ Updated semua referensi dari Polygon ke Ethereum
- ✅ Updated network configuration section
- ✅ Updated deployment commands
- ✅ Updated links dan resources

#### DEPLOYMENT.md
- ✅ Completely updated untuk Sepolia deployment
- ✅ Updated troubleshooting section
- ✅ Updated monitoring links

## 🚀 Langkah-langkah Migrasi

### 1. Update Environment Variables

#### Hardhat Environment
```bash
cd hardhat
cp env.example .env
```

Edit `hardhat/.env`:
```env
PRIVATE_KEY=your_private_key_here
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_API_KEY
ETHERSCAN_API_KEY=your_etherscan_api_key_here
```

#### Frontend Environment
```bash
cd frontend
cp env.example .env.local
```

Edit `frontend/.env.local`:
```env
NEXT_PUBLIC_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_NETWORK_NAME=Ethereum Sepolia
NEXT_PUBLIC_NETWORK_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://rpc.sepolia.org
NEXT_PUBLIC_BLOCK_EXPLORER_URL=https://sepolia.etherscan.io
```

### 2. Deploy Contract ke Sepolia

```bash
cd hardhat
npm run compile
npm run deploy:sepolia
```

**Output yang diharapkan:**
```
BatikAuthenticity deployed to: 0x1234567890abcdef...
Network: sepolia
```

### 3. Update Contract Address

Update `frontend/.env.local` dengan contract address yang baru:
```env
NEXT_PUBLIC_CONTRACT_ADDRESS=0x1234567890abcdef...
```

### 4. Verify Contract (Optional)

```bash
cd hardhat
npm run verify:sepolia 0x1234567890abcdef...
```

### 5. Add Sample Data

```bash
cd hardhat
npm run add-sample:sepolia
```

### 6. Test Frontend

```bash
cd frontend
npm run dev
```

Buka http://localhost:3000 dan pastikan:
- ✅ Wallet terhubung ke Sepolia
- ✅ Contract data ter-load dengan benar
- ✅ Semua fungsi bekerja normal

## 🔧 Testing Migration

### 1. Network Connection Test
- [ ] MetaMask terhubung ke Ethereum Sepolia
- [ ] Chain ID menunjukkan 11155111
- [ ] Balance ETH tersedia untuk gas fees

### 2. Contract Interaction Test
- [ ] Contract address benar di environment
- [ ] ABI functions dapat dipanggil
- [ ] Data produk ter-load dengan benar

### 3. Frontend Functionality Test
- [ ] Wallet connection berfungsi
- [ ] Network switching berfungsi
- [ ] Product listing berfungsi
- [ ] Product detail view berfungsi

## ⚠️ Important Notes

### Gas Fees
- **Ethereum Sepolia** memiliki gas fees yang lebih tinggi dibanding Polygon Mumbai
- Pastikan memiliki cukup ETH untuk deployment dan testing
- Gunakan gas price yang reasonable (20 gwei recommended)

### RPC Limits
- Free RPC providers mungkin memiliki rate limits
- Pertimbangkan menggunakan Infura atau Alchemy untuk production
- Monitor RPC usage dan error rates

### Contract Verification
- Contract verification di Etherscan membutuhkan API key
- Pastikan `ETHERSCAN_API_KEY` sudah di-set dengan benar
- Verification membantu debugging dan transparency

## 🔗 Useful Resources

### Sepolia Testnet
- [Sepolia Faucet](https://sepoliafaucet.com/) - Get test ETH
- [Sepolia Etherscan](https://sepolia.etherscan.io) - Block explorer
- [Sepolia RPC](https://rpc.sepolia.org) - Public RPC endpoint

### Development Tools
- [Infura](https://infura.io/) - Ethereum RPC provider
- [Alchemy](https://www.alchemy.com/) - Ethereum RPC provider
- [Etherscan API](https://etherscan.io/apis) - Contract verification

## 🆘 Troubleshooting

### Common Issues

#### 1. "Insufficient funds for gas"
- **Solution:** Get test ETH dari Sepolia faucet
- **Check:** Balance di MetaMask untuk Sepolia network

#### 2. "Network not found"
- **Solution:** Add Sepolia network ke MetaMask
- **Check:** Network configuration di frontend

#### 3. "Contract not found"
- **Solution:** Verify contract address di environment
- **Check:** Contract sudah deployed dan verified

#### 4. "RPC rate limit exceeded"
- **Solution:** Use premium RPC provider (Infura/Alchemy)
- **Check:** RPC usage dan error logs

### Getting Help

1. Check error logs di browser console
2. Check transaction status di Etherscan
3. Verify contract deployment
4. Check network configuration
5. Create issue di GitHub repository

## ✅ Migration Checklist

- [ ] Environment variables updated
- [ ] Contract deployed to Sepolia
- [ ] Contract address updated in frontend
- [ ] Contract verified on Etherscan (optional)
- [ ] Sample data added
- [ ] Frontend tested
- [ ] Wallet connection tested
- [ ] All functions working
- [ ] Documentation updated
- [ ] Team notified of changes

## 🎉 Post-Migration

Setelah migrasi selesai:

1. **Update team** tentang perubahan network
2. **Test thoroughly** semua functionality
3. **Monitor** contract dan application performance
4. **Update** user documentation jika diperlukan
5. **Plan** untuk mainnet deployment jika ready

---

**Migration completed successfully!** 🚀

Platform sekarang menggunakan Ethereum Sepolia Testnet dan siap untuk development dan testing.
