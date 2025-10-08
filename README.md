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

The project includes comprehensive tests covering:
- ✅ Contract deployment
- ✅ Product addition with validation
- ✅ Product retrieval
- ✅ Product verification
- ✅ Access control (owner-only functions)
- ✅ Error handling for invalid inputs

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