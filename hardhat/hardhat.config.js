require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: {
        version: "0.8.19",
        settings: {
            optimizer: {
                enabled: true,
                runs: 200
            },
            viaIR: true
        }
    },
    networks: {
        // ... (konfigurasi networks tetap sama)
        hardhat: {
            chainId: 1337
        },
        sepolia: {
            url: process.env.SEPOLIA_RPC_URL || "https://ethereum-sepolia-rpc.publicnode.com",
            accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
            chainId: 11155111,
        },
    },
    paths: {
        sources: "./contracts",
        tests: "./test",
        cache: "./cache",
        artifacts: "./artifacts"
    },
    // PERBAIKAN: Konfigurasi Etherscan API V2
    etherscan: {
        // 1. Kunci API tunggal (V2-compliant)
        apiKey: process.env.ETHERSCAN_API_KEY, 

        // 2. Definisi jaringan khusus (untuk Sepolia dan chain lainnya)
        customChains: [
            {
                network: "sepolia",
                chainId: 11155111,
                urls: {
                    apiURL: "https://api-sepolia.etherscan.io/api",
                    browserURL: "https://sepolia.etherscan.io"
                }
            },
            // Tambahkan chain lain di sini (misalnya Polygon) jika Anda punya API key untuk itu
        ]
    }
};