// Contract configuration for BatikAuthenticity
export const CONTRACT_CONFIG = {
    // Ethereum Sepolia Testnet
    ETHEREUM_SEPOLIA: {
        chainId: 11155111,
        chainName: 'Ethereum Sepolia',
        rpcUrls: ['https://rpc.sepolia.org', 'https://sepolia.infura.io/v3/YOUR_INFURA_API_KEY'],
        blockExplorerUrls: ['https://sepolia.etherscan.io'],
        nativeCurrency: {
            name: 'Ethereum',
            symbol: 'ETH',
            decimals: 18,
        },
    },

    // Contract ABI - hanya fungsi yang diperlukan untuk frontend
    CONTRACT_ABI: [
        {
            "inputs": [{ "internalType": "uint256", "name": "_id", "type": "uint256" }],
            "name": "getProduct",
            "outputs": [
                {
                    "components": [
                        { "internalType": "uint256", "name": "id", "type": "uint256" },
                        { "internalType": "string", "name": "productName", "type": "string" },
                        { "internalType": "string", "name": "artisanName", "type": "string" },
                        { "internalType": "string", "name": "artisanAddress", "type": "string" },
                        { "internalType": "string", "name": "village", "type": "string" },
                        { "internalType": "string", "name": "district", "type": "string" },
                        { "internalType": "string", "name": "regency", "type": "string" },
                        { "internalType": "string", "name": "province", "type": "string" },
                        { "internalType": "string", "name": "coordinates", "type": "string" },
                        { "internalType": "string", "name": "technique", "type": "string" },
                        { "internalType": "string", "name": "materials", "type": "string" },
                        { "internalType": "string", "name": "description", "type": "string" },
                        { "internalType": "string", "name": "imageHash", "type": "string" },
                        { "internalType": "string", "name": "artisanImageHash", "type": "string" },
                        { "internalType": "string", "name": "videoHash", "type": "string" },
                        { "internalType": "uint256", "name": "mintDate", "type": "uint256" },
                        { "internalType": "bool", "name": "isVerified", "type": "bool" },
                        { "internalType": "address", "name": "verifiedBy", "type": "address" }
                    ],
                    "internalType": "struct BatikAuthenticity.Product",
                    "name": "",
                    "type": "tuple"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [{ "internalType": "uint256", "name": "_id", "type": "uint256" }],
            "name": "getProductBasicInfo",
            "outputs": [
                { "internalType": "uint256", "name": "id", "type": "uint256" },
                { "internalType": "string", "name": "productName", "type": "string" },
                { "internalType": "string", "name": "artisanName", "type": "string" },
                { "internalType": "string", "name": "village", "type": "string" },
                { "internalType": "string", "name": "technique", "type": "string" },
                { "internalType": "bool", "name": "isVerified", "type": "bool" }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getTotalProducts",
            "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [{ "internalType": "uint256", "name": "_index", "type": "uint256" }],
            "name": "getProductIdByIndex",
            "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [{ "internalType": "uint256", "name": "_id", "type": "uint256" }],
            "name": "isProductVerified",
            "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
            "stateMutability": "view",
            "type": "function"
        }
    ],

    // Contract address - akan diisi setelah deployment
    CONTRACT_ADDRESS: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '',
};

// Type definitions
export interface Product {
    id: number;
    productName: string;
    artisanName: string;
    artisanAddress: string;
    village: string;
    district: string;
    regency: string;
    province: string;
    coordinates: string;
    technique: string;
    materials: string;
    description: string;
    imageHash: string;
    artisanImageHash: string;
    videoHash: string;
    mintDate: number;
    isVerified: boolean;
    verifiedBy: string;
}

export interface ProductBasicInfo {
    id: number;
    productName: string;
    artisanName: string;
    village: string;
    technique: string;
    isVerified: boolean;
}

