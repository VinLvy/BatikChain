'use client';

import { WalletConnection } from '@/components/WalletConnection';
import { ProductList } from '@/components/ProductList';
import { useWallet } from '@/hooks/useWallet';

export default function Home() {
  const { isConnected, isCorrectNetwork, provider, signer } = useWallet();

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Batik Authenticity
              </h1>
              <p className="text-gray-600 mt-1">
                Platform Verifikasi Keaslian Produk Batik Indonesia
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Blockchain Verified</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Wallet Connection Section */}
        <div className="mb-8">
          <WalletConnection />
        </div>

        {/* Product List Section */}
        {isConnected && isCorrectNetwork ? (
          <ProductList provider={provider} signer={signer} />
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Hubungkan Wallet untuk Melihat Produk
            </h3>
            <p className="text-gray-600">
              Silakan hubungkan wallet MetaMask Anda dan pastikan menggunakan network Polygon Mumbai Testnet
              untuk melihat katalog produk batik yang telah terverifikasi.
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Batik Authenticity Platform
            </h3>
            <p className="text-gray-600 mb-4">
              Menjamin keaslian dan transparansi produk batik Indonesia melalui teknologi blockchain
            </p>
            <div className="flex justify-center space-x-6 text-sm text-gray-500">
              <span>Powered by Polygon Mumbai Testnet</span>
              <span>•</span>
              <span>Smart Contract Verified</span>
              <span>•</span>
              <span>Decentralized Authentication</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}