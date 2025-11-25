'use client';

import { WalletConnection } from '@/components/WalletConnection';
import { ProductList } from '@/components/ProductList';
import { useWallet } from '@/hooks/useWallet';

export default function Home() {
  const { isConnected, isCorrectNetwork, provider, signer } = useWallet();

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Header */}
      <header className="relative border-b border-white/10 backdrop-blur-xl bg-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              {/* Logo Icon */}
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/50">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"></div>
              </div>
              
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  BatikChain
                </h1>
                <p className="text-blue-200/80 text-sm mt-0.5">
                  Blockchain-Powered Authenticity Platform
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Network Status */}
              <div className="hidden sm:flex items-center space-x-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg backdrop-blur-sm">
                <div className="relative">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-75"></div>
                </div>
                <span className="text-sm text-green-300 font-medium">Live on Blockchain</span>
              </div>

              {/* Chain Info */}
              <div className="hidden md:flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-400/20 rounded-lg">
                <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 7H7v6h6V7z" />
                  <path fillRule="evenodd" d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V5a2 2 0 012-2h2V2zM5 5h10v10H5V5z" clipRule="evenodd" />
                </svg>
                <span className="text-xs text-blue-300 font-medium">Sepolia Testnet</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-500/10 border border-blue-400/20 rounded-full mb-4">
            <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm text-blue-300 font-medium">Secure • Transparent • Immutable</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Verify Authenticity of Batik Products
            <span className="block mt-2 bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Based on Blockchain
            </span>
          </h2>
          
          <p className="text-blue-200/70 text-lg max-w-2xl mx-auto">
            Decentralized platform for ensuring the authenticity of batik products in Indonesia 
            using Web3 and Smart Contract technology
          </p>
        </div>

        {/* Wallet Connection Section */}
        <div className="mb-8">
          <WalletConnection />
        </div>

        {/* Product List Section */}
        {isConnected && isCorrectNetwork ? (
          <ProductList provider={provider} signer={signer} />
        ) : (
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 text-center shadow-2xl">
            <div className="relative inline-block mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/10">
                <svg className="w-10 h-10 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400/20 border border-yellow-400/40 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-3">
              Connect Your Web3 Wallet
            </h3>
            <p className="text-blue-200/70 mb-6 max-w-md mx-auto">
              Make sure you are connected to <span className="text-cyan-400 font-semibold">Ethereum Sepolia Testnet</span> to view the verified batik product catalog.
            </p>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 max-w-3xl mx-auto">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm">
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center mb-3 mx-auto">
                  <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className="text-white font-semibold mb-1">Secure</h4>
                <p className="text-blue-200/60 text-sm">End-to-end encryption</p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm">
                <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-3 mx-auto">
                  <svg className="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className="text-white font-semibold mb-1">Verified</h4>
                <p className="text-blue-200/60 text-sm">Smart contract validated</p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm">
                <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center mb-3 mx-auto">
                  <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className="text-white font-semibold mb-1">Instant</h4>
                <p className="text-blue-200/60 text-sm">Real-time verification</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="relative border-t border-white/10 mt-16 backdrop-blur-xl bg-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                </div>
                <span className="text-xl font-bold text-white">BatikChain</span>
              </div>
              <p className="text-blue-200/70 text-sm leading-relaxed">
                Blockchain-powered authenticity platform for batik products in Indonesia.
              </p>
            </div>

            {/* Technology */}
            <div>
              <h4 className="text-white font-semibold mb-4">Technology Stack</h4>
              <ul className="space-y-2 text-sm text-blue-200/70">
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                  <span>Ethereum Blockchain</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                  <span>Smart Contract (Solidity)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                  <span>IPFS Decentralized Storage</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                  <span>Web3.js Integration</span>
                </li>
              </ul>
            </div>

            {/* Stats */}
            <div>
              <h4 className="text-white font-semibold mb-4">Platform Stats</h4>
              <div className="space-y-3">
                <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                  <div className="text-2xl font-bold text-cyan-400">100%</div>
                  <div className="text-xs text-blue-200/70">Decentralized</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                  <div className="text-2xl font-bold text-blue-400">24/7</div>
                  <div className="text-xs text-blue-200/70">Network Uptime</div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4 text-sm text-blue-200/70">
                <span className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Smart Contract Verified</span>
                </span>
                <span>•</span>
                <span>Decentralized Authentication</span>
              </div>
              
              <div className="text-sm text-blue-200/70">
                © 2025 BatikChain. Built on Ethereum.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}