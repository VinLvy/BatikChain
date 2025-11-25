'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ethers } from 'ethers';
import { VerificationCard } from '@/components/VerificationCard';
import { useWallet } from '@/hooks/useWallet';
import Link from 'next/link';

interface Product {
    id: bigint;
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
    mintDate: bigint;
    isVerified: boolean;
    verifiedBy: string;
}

export default function VerifyPage() {
    const router = useRouter();
    const { isConnected, isCorrectNetwork, provider, signer } = useWallet();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadUnverifiedProducts = async () => {
        if (!provider) return;

        setLoading(true);
        setError(null);

        try {
            const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '';
            const CONTRACT_ABI = [
                "function getTotalProducts() external view returns (uint256)",
                "function getProductIdByIndex(uint256 _index) external view returns (uint256)",
                "function getProduct(uint256 _id) external view returns (tuple(uint256 id, string productName, string artisanName, string artisanAddress, string village, string district, string regency, string province, string coordinates, string technique, string materials, string description, string imageHash, string artisanImageHash, string videoHash, uint256 mintDate, bool isVerified, address verifiedBy))",
            ];

            const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

            const totalProducts = await contract.getTotalProducts();
            const unverifiedProducts: Product[] = [];

            for (let i = 0; i < Number(totalProducts); i++) {
                const productId = await contract.getProductIdByIndex(i);
                const product = await contract.getProduct(productId);

                // Only include unverified products
                if (!product.isVerified) {
                    unverifiedProducts.push(product);
                }
            }

            setProducts(unverifiedProducts);

        } catch (error: unknown) {
            console.error('Error loading products:', error);
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('Failed to load products');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isConnected && isCorrectNetwork && provider) {
            loadUnverifiedProducts();
        }
    }, [isConnected, isCorrectNetwork, provider]);

    const handleVerified = () => {
        // Reload products after verification
        loadUnverifiedProducts();
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
                                    Verify Products
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
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Page Title */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center space-x-2 px-4 py-2 bg-green-500/10 border border-green-400/20 rounded-full mb-4">
                        <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm text-green-300 font-medium">Product Verification</span>
                    </div>

                    <h2 className="text-4xl font-bold text-white mb-4">
                        Verify Batik Products
                    </h2>

                    <p className="text-blue-200/70 text-lg max-w-2xl mx-auto">
                        Review and verify batik products before they are marked as authenticated on the blockchain
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
                            Please connect your wallet and ensure you're on the Sepolia Testnet to verify products.
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
                ) : loading ? (
                    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-12 text-center shadow-2xl">
                        <div className="animate-spin rounded-full h-16 w-16 border-4 border-cyan-400 border-t-transparent mx-auto mb-4"></div>
                        <p className="text-blue-200/70">Loading products...</p>
                    </div>
                ) : error ? (
                    <div className="backdrop-blur-xl bg-red-500/10 border border-red-400/30 rounded-2xl p-8 text-center shadow-2xl">
                        <svg className="w-16 h-16 text-red-400 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        <h3 className="text-xl font-bold text-white mb-2">Error Loading Products</h3>
                        <p className="text-red-300 mb-4">{error}</p>
                        <button
                            onClick={loadUnverifiedProducts}
                            className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded-xl font-bold transition-all"
                        >
                            Try Again
                        </button>
                    </div>
                ) : products.length === 0 ? (
                    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-12 text-center shadow-2xl">
                        <div className="w-20 h-20 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <svg className="w-10 h-10 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">
                            All Products Verified!
                        </h3>
                        <p className="text-blue-200/70 mb-6">
                            There are no pending products waiting for verification.
                        </p>
                        <Link
                            href="/"
                            className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-xl font-bold transition-all"
                        >
                            <span>View All Products</span>
                        </Link>
                    </div>
                ) : (
                    <>
                        {/* Stats */}
                        <div className="mb-6 flex items-center justify-between">
                            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl px-6 py-3">
                                <p className="text-sm text-blue-200/70">Pending Verification</p>
                                <p className="text-2xl font-bold text-white">{products.length} {products.length === 1 ? 'Product' : 'Products'}</p>
                            </div>

                            <button
                                onClick={loadUnverifiedProducts}
                                className="flex items-center space-x-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/30 rounded-lg transition-all"
                            >
                                <svg className="w-5 h-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                <span className="text-white font-medium">Refresh</span>
                            </button>
                        </div>

                        {/* Products Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {products.map((product) => (
                                <VerificationCard
                                    key={product.id.toString()}
                                    product={product}
                                    signer={signer}
                                    onVerified={handleVerified}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </main>
    );
}
