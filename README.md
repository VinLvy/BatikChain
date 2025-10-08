# Prototype-5: Batik Authenticity Blockchain System

Prototype-5 adalah demonstrasi bukti konsep (Proof of Concept) yang berfokus pada inti desentralisasi untuk memverifikasi keaslian produk batik menggunakan blockchain technology.

## 🎯 Tujuan

Membuktikan bahwa data otentik produk batik (seperti pengrajin, lokasi, dan teknik pembuatan) dapat disimpan secara permanen dan transparan di blockchain dan dapat diakses oleh konsumen secara real-time.

## 🏗️ Arsitektur

### Smart Contract Features
- **Product Struct**: Menyimpan data lengkap produk batik termasuk:
  - ID unik produk
  - Nama produk dan pengrajin
  - Alamat dan lokasi geografis (desa, kecamatan, kabupaten, provinsi)
  - Koordinat GPS
  - Teknik pembuatan dan bahan yang digunakan
  - Hash untuk foto, video, dan dokumentasi
  - Status verifikasi dan timestamp

### Core Functions
- `addProduct()`: Menambahkan produk batik baru ke blockchain
- `getProduct(id)`: Mengambil data produk berdasarkan ID
- `verifyProduct(id)`: Memverifikasi produk (hanya owner)
- `isProductVerified(id)`: Memeriksa status verifikasi
- `getTotalProducts()`: Mendapatkan jumlah total produk

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 atau lebih baru)
- npm atau yarn

### Installation

1. **Clone repository**
```bash
git clone <repository-url>
cd prototype-5
```

2. **Install dependencies**
```bash
npm install
```

3. **Compile smart contracts**
```bash
npm run compile
```

4. **Run tests**
```bash
npm test
```

5. **Deploy locally (Hardhat Network)**
```bash
npm run deploy
```

6. **Add sample product**
```bash
npm run add-sample
```

## 📋 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run compile` | Compile smart contracts |
| `npm test` | Run test suite |
| `npm run deploy` | Deploy to local Hardhat network |
| `npm run deploy:mumbai` | Deploy to Polygon Mumbai testnet |
| `npm run deploy:polygon` | Deploy to Polygon mainnet |
| `npm run add-sample` | Add sample product to local deployment |
| `npm run add-sample:mumbai` | Add sample product to Mumbai testnet |
| `npm run add-sample:polygon` | Add sample product to Polygon mainnet |
| `npm run test-manual` | Run manual contract interaction tests |
| `npm run test-manual:localhost` | Run manual tests on localhost network |
| `npm run node` | Start local Hardhat node |
| `npm run clean` | Clean build artifacts |

## 🌐 Network Configuration

### Polygon Mumbai Testnet
- RPC URL: `https://rpc-mumbai.maticvigil.com`
- Chain ID: 80001
- Testnet MATIC: [Mumbai Faucet](https://faucet.polygon.technology/)

### Polygon Mainnet
- RPC URL: `https://polygon-rpc.com`
- Chain ID: 137

## 🔧 Environment Setup

1. **Copy environment file**
```bash
cp env.example .env
```

2. **Configure your environment variables**
```env
# Private key for deploying contracts (NEVER commit this to version control)
PRIVATE_KEY=your_private_key_here

# RPC URLs for different networks
POLYGON_MUMBAI_RPC_URL=https://rpc-mumbai.maticvigil.com
POLYGON_RPC_URL=https://polygon-rpc.com

# Optional: Etherscan API key for contract verification
ETHERSCAN_API_KEY=your_etherscan_api_key_here
```

## 📊 Gas Usage

| Function | Average Gas Cost |
|----------|------------------|
| `addProduct()` | ~471,192 gas |
| `verifyProduct()` | ~49,990 gas |
| Contract Deployment | ~2,125,698 gas |

## 🧪 Testing

### Automated Test Suite

The project includes comprehensive tests covering:
- ✅ Contract deployment
- ✅ Product addition with validation
- ✅ Product retrieval
- ✅ Product verification
- ✅ Access control (owner-only functions)
- ✅ Error handling for invalid inputs

### Manual Testing Guide

Berikut adalah urutan lengkap untuk melakukan testing proyek Prototype-5:

#### 1. **Environment Setup & Dependencies Check**
```bash
# Pastikan Node.js terinstall (v16+)
node --version

# Install dependencies
npm install

# Verifikasi semua dependencies terinstall
npm list
```

#### 2. **Compilation Test**
```bash
# Compile smart contracts
npm run compile

# Expected output: "Compiled X Solidity files successfully"
```

#### 3. **Automated Test Suite**
```bash
# Jalankan semua test cases
npm test

# Expected: 13 tests passing
# - Deployment tests (2 tests)
# - Adding Products tests (4 tests) 
# - Getting Products tests (4 tests)
# - Product Verification tests (3 tests)
```

#### 4. **Local Deployment Test**
```bash
# Deploy ke local Hardhat network
npm run deploy

# Expected output:
# - "Deploying BatikAuthenticity contract..."
# - Contract address: 0x5FbDB2315678afecb367f032d93F642f64180aa3
# - "Contract info saved to contract-info.json"
```

#### 5. **Sample Product Addition Test**
```bash
# Tambahkan sample product
npm run add-sample

# Expected output:
# - "Using contract at: [contract-address]"
# - "Adding sample product..."
# - "Product Name: Batik Parang Klasik"
# - "Artisan: Sari Indah"
# - "Product added successfully!"
# - "Product verified successfully!"
```

#### 6. **Contract Interaction Verification**

Jalankan test manual untuk verifikasi interaksi dengan smart contract:

```bash
# Jalankan test manual (pastikan sudah deploy dan add sample product)
npm run test-manual

# Atau dengan network localhost (recommended):
npx hardhat run scripts/test-manual.js --network localhost

# Expected output:
# - Contract address and network info
# - Total products count
# - Product details (if products exist)
# - Basic product info
# - Verification status
# - Error handling test
# - Test summary with all checks passed
```

**Note**: Untuk testing yang lebih stabil, gunakan `--network localhost` setelah menjalankan `npm run node` di terminal terpisah.

**Manual Test Features:**
- ✅ Contract deployment verification
- ✅ Product data retrieval
- ✅ Basic info extraction
- ✅ Verification status check
- ✅ Error handling validation
- ✅ Comprehensive test summary

#### 7. **Network-Specific Testing**

**Local Hardhat Node:**
```bash
# Terminal 1: Start local node
npm run node

# Terminal 2: Deploy to local node
npx hardhat run scripts/deploy.js --network localhost

# Terminal 2: Add sample product
npx hardhat run scripts/addSampleProduct.js --network localhost
```

**Polygon Mumbai Testnet:**
```bash
# Setup .env file dengan private key dan RPC URL
cp env.example .env
# Edit .env dengan data yang benar

# Deploy ke Mumbai testnet
npm run deploy:mumbai

# Add sample product ke Mumbai
npm run add-sample:mumbai
```

#### 8. **Gas Usage Verification**
```bash
# Compile dengan gas reporter
npx hardhat compile

# Run tests dengan gas reporting
REPORT_GAS=true npm test

# Expected gas usage:
# - addProduct(): ~471,192 gas
# - verifyProduct(): ~49,990 gas
# - Contract Deployment: ~2,125,698 gas
```

#### 9. **Error Handling Tests**

Test error scenarios:

```bash
# Test 1: Try to add duplicate product ID
npx hardhat run scripts/test-duplicate.js

# Test 2: Try to get non-existent product
npx hardhat run scripts/test-nonexistent.js

# Test 3: Try unauthorized access
npx hardhat run scripts/test-unauthorized.js
```

#### 10. **Cleanup Test**
```bash
# Clean build artifacts
npm run clean

# Verify cleanup
ls artifacts/  # Should show no files

# Recompile to ensure everything works after cleanup
npm run compile
```

### 🎯 **Testing Checklist**

- [ ] Dependencies installed correctly
- [ ] Smart contracts compile successfully
- [ ] All 13 automated tests pass
- [ ] Local deployment works
- [ ] Sample product addition works
- [ ] Contract interaction functions work
- [ ] Gas usage within expected ranges
- [ ] Error handling works correctly
- [ ] Network-specific deployment works
- [ ] Cleanup and recompilation works

### 🚨 **Troubleshooting Common Issues**

**Issue**: "Stack too deep" compilation error
**Solution**: viaIR: true already enabled in hardhat.config.js

**Issue**: "Contract not found" error
**Solution**: Run `npm run compile` first

**Issue**: "Insufficient funds" on testnet
**Solution**: Get testnet MATIC from [Mumbai Faucet](https://faucet.polygon.technology/)

**Issue**: "Network not found" error
**Solution**: Check network configuration in hardhat.config.js

### 📊 **Expected Test Results**

```
✓ 13 passing (459ms)
✓ Contract deployed successfully
✓ Sample product added and verified
✓ All functions working correctly
✓ Gas usage optimized
✓ Error handling functional
```

## 🔐 Security Features

- **Access Control**: Hanya owner yang dapat menambah dan memverifikasi produk
- **Input Validation**: Validasi data input untuk mencegah data kosong
- **Reentrancy Protection**: Menggunakan OpenZeppelin ReentrancyGuard
- **Unique ID Validation**: Mencegah duplikasi ID produk

## 📁 Project Structure

```
prototype-5/
├── contracts/
│   └── BatikAuthenticity.sol    # Main smart contract
├── scripts/
│   ├── deploy.js                # Deployment script
│   └── addSampleProduct.js      # Sample product addition
├── test/
│   └── BatikAuthenticity.test.js # Test suite
├── hardhat.config.js            # Hardhat configuration
├── package.json                 # Dependencies and scripts
└── README.md                    # This file
```

## 🔮 Next Steps

1. **Frontend Development**: Build Next.js frontend untuk konsumen
2. **QR Code Integration**: Generate QR codes untuk produk fisik
3. **IPFS Integration**: Store media files (images, videos) on IPFS
4. **Mobile App**: Develop mobile application untuk scanning QR codes
5. **Analytics Dashboard**: Build dashboard untuk tracking dan analytics

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Prototype-5 Development Team**

---

**Prototype-5** - Bringing transparency and authenticity to Indonesian batik through blockchain technology 🇮🇩