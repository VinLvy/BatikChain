'use client';

import { useRouter } from 'next/navigation';
import { AddProductForm } from '@/components/AddProductForm';
import { useWallet } from '@/hooks/useWallet';
import Link from 'next/link';

export default function AddProductPage() {
    const router = useRouter();
    const { isConnected, isCorrectNetwork, signer } = useWallet();

    const handleSuccess = () => {
        router.push('/');
    };

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
                        <Link href="/" className="flex items-center space-x-4 group">
                            <div className="relative">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/50 group-hover:shadow-blue-500/70 transition-all">
                                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                                    </svg>
                                </div>
                            </div>

                            <div>
                                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                                    BatikChain
                                </h1>
                                <p className="text-blue-200/80 text-sm mt-0.5">
                                    Add New Product
                                </p>
                            </div>
                        </Link>

                        <Link
                            href="/"
                            className="flex items-center space-x-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/30 rounded-lg transition-all"
                        >
                            <svg className="w-5 h-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            <span className="text-white font-medium">Back to Home</span>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Page Title */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-500/10 border border-blue-400/20 rounded-full mb-4">
                        <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" />
                        </svg>
                        <span className="text-sm text-blue-300 font-medium">Register New Product</span>
                    </div>

                    <h2 className="text-4xl font-bold text-white mb-4">
                        Add Product to Blockchain
                    </h2>

                    <p className="text-blue-200/70 text-lg max-w-2xl mx-auto">
                        Fill in the complete information about the batik product to register it on the blockchain
                    </p>
                </div>

                {/* Connection Check */}
                {!isConnected || !isCorrectNetwork ? (
                    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 text-center shadow-2xl">
                        <div className="relative inline-block mb-6">
                            <div className="w-20 h-20 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/10">
                                <svg className="w-10 h-10 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-3">
                            Wallet Connection Required
                        </h3>
                        <p className="text-blue-200/70 mb-6 max-w-md mx-auto">
                            Please connect your wallet and ensure you're on the Sepolia Testnet to add products to the blockchain.
                        </p>

                        <Link
                            href="/"
                            className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-xl font-bold transition-all"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            <span>Go to Home Page</span>
                        </Link>
                    </div>
                ) : (
                    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl">
                        <AddProductForm signer={signer} onSuccess={handleSuccess} />
                    </div>
                )}
            </div>
        </main>
    );
}
