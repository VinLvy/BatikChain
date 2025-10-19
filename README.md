# BatikChain

Platform verifikasi keaslian produk batik Indonesia menggunakan teknologi blockchain Ethereum. Sistem ini memungkinkan pengrajin untuk mendaftarkan produk batik mereka dengan informasi lengkap dan transparan, sementara konsumen dapat memverifikasi keaslian produk melalui blockchain.

## 🏗️ Struktur Monorepo

```
├── hardhat/           # Smart contract development
│   ├── contracts/     # Solidity contracts
│   ├── scripts/       # Deployment scripts
│   ├── test/          # Contract tests
│   └── ...
├── frontend/          # Next.js web application
│   ├── src/          # Source code
│   ├── components/   # React components
│   ├── hooks/        # Custom hooks
│   └── ...
└── README.md         # This file
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm 8+
- MetaMask wallet
- Ethereum Sepolia testnet ETH tokens

### Installation

1. Clone repository:
```bash
git clone <repository-url>
```

2. Install dependencies untuk semua workspace:
```bash
npm run install:all
```

3. Setup environment variables:
```bash
# Copy hardhat environment
cp hardhat/env.example hardhat/.env

# Copy frontend environment  
cp frontend/.env.example frontend/.env.local
```

4. Deploy smart contract:
```bash
npm run deploy:sepolia
```

5. Update contract address di `frontend/.env.local` dengan address yang didapat dari deployment.

6. Start development server:
```bash
npm run dev:frontend
```

## 📁 Workspace Details

### Hardhat (`./hardhat/`)

Smart contract development environment untuk BatikAuthenticity.sol.

**Key Features:**
- ✅ Product registration dengan data lengkap
- ✅ Verification system untuk keaslian produk
- ✅ Query functions untuk frontend integration
- ✅ OpenZeppelin security standards
- ✅ ReentrancyGuard protection

**Commands:**
```bash
cd hardhat
npm run compile     # Compile contracts
npm run test        # Run tests
npm run deploy:sepolia  # Deploy to Sepolia testnet
npm run add-sample:sepolia  # Add sample product
```

### Frontend (`./frontend/`)

Next.js web application untuk interaksi dengan smart contract.

**Key Features:**
- 🔗 MetaMask wallet integration
- 📱 Responsive design dengan Tailwind CSS
- 🔍 Search dan filter produk
- 📋 Product detail view
- ✅ Verification status display
- 🌐 Ethereum Sepolia network support

**Commands:**
```bash
cd frontend
npm run dev      # Development server
npm run build    # Production build
npm run start    # Production server
npm run lint     # ESLint check
```

## 🔧 Configuration

### Smart Contract

Update `hardhat/.env` dengan:
```
PRIVATE_KEY=your_private_key
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_API_KEY
ETHERSCAN_API_KEY=your_etherscan_api_key
```

### Frontend

Update `frontend/.env.local` dengan:
```
NEXT_PUBLIC_CONTRACT_ADDRESS=0x... # Contract address from deployment
```

## 📋 Smart Contract Functions

### Read Functions (Public)
- `getProduct(uint256 id)` - Get complete product data
- `getProductBasicInfo(uint256 id)` - Get basic product info
- `getTotalProducts()` - Get total number of products
- `getProductIdByIndex(uint256 index)` - Get product ID by index
- `isProductVerified(uint256 id)` - Check verification status

### Write Functions (Owner Only)
- `addProduct(...)` - Add new product
- `verifyProduct(uint256 id)` - Verify product authenticity

## 🎯 Product Data Structure

```solidity
struct Product {
    uint256 id;                 // Unique product ID
    string productName;         // Product name
    string artisanName;         // Artisan name
    string artisanAddress;      // Artisan address
    string village;            // Village name
    string district;           // District name
    string regency;            // Regency name
    string province;           // Province name
    string coordinates;        // GPS coordinates
    string technique;          // Batik technique
    string materials;          // Materials used
    string description;        // Product description
    string imageHash;          // Product image hash
    string artisanImageHash;   // Artisan image hash
    string videoHash;          // Process video hash
    uint256 mintDate;          // Minting timestamp
    bool isVerified;           // Verification status
    address verifiedBy;        // Verifier address
}
```

## 🌐 Network Configuration

### Ethereum Sepolia Testnet
- **Chain ID:** 11155111
- **RPC URL:** https://rpc.sepolia.org
- **Block Explorer:** https://sepolia.etherscan.io
- **Currency:** ETH

## 🧪 Testing

### Smart Contract Tests
```bash
cd hardhat
npm run test
```

### Frontend Type Checking
```bash
npm run type-check
```

### Frontend Linting
```bash
npm run lint
```

## 🚀 Deployment

### Smart Contract
```bash
npm run deploy:sepolia   # Sepolia testnet
npm run deploy:polygon   # Polygon mainnet
```

### Frontend
```bash
npm run build:frontend
# Deploy dist/ folder to your hosting platform
```

## 📚 Documentation

- [Smart Contract Documentation](./hardhat/README.md)
- [Frontend Documentation](./frontend/README.md)
- [API Reference](./docs/api.md)

## 🤝 Contributing

1. Fork repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- Create issue di GitHub repository
- Check documentation di masing-masing workspace

## 🔗 Links

- [Ethereum Sepolia Testnet](https://sepolia.etherscan.io)
- [Sepolia Faucet](https://sepoliafaucet.com/)
- [MetaMask](https://metamask.io)
- [Next.js Documentation](https://nextjs.org/docs)
- [Hardhat Documentation](https://hardhat.org/docs)
