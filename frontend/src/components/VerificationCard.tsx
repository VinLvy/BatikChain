'use client';

import { useState } from 'react';
import { ethers } from 'ethers';
import Image from 'next/image';

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

interface VerificationCardProps {
    product: Product;
    signer: ethers.JsonRpcSigner | null;
    onVerified: () => void;
}

export const VerificationCard = ({ product, signer, onVerified }: VerificationCardProps) => {
    const [isVerifying, setIsVerifying] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleVerify = async () => {
        if (!signer) {
            setError('Wallet not connected');
            return;
        }

        setIsVerifying(true);
        setError(null);

        try {
            const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '';
            const CONTRACT_ABI = [
                "function verifyProduct(uint256 _id) external",
            ];

            const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

            const tx = await contract.verifyProduct(product.id);
            await tx.wait();

            setShowConfirm(false);
            onVerified();

        } catch (error: unknown) {
            console.error('Error verifying product:', error);

            if (error instanceof Error) {
                if (error.message.includes('user rejected')) {
                    setError('Transaction was rejected by user');
                } else if (error.message.includes('Ownable')) {
                    setError('Only contract owner can verify products');
                } else {
                    setError(error.message || 'Failed to verify product');
                }
            } else {
                setError('An unexpected error occurred');
            }
        } finally {
            setIsVerifying(false);
        }
    };

    const formatDate = (timestamp: bigint) => {
        const date = new Date(Number(timestamp) * 1000);
        return date.toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <>
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-400/30 transition-all group">
                {/* Product Image */}
                <div className="relative h-64 bg-gradient-to-br from-slate-800 to-blue-900">
                    {product.imageHash && product.imageHash.startsWith('data:') ? (
                        <Image
                            src={product.imageHash}
                            alt={product.productName}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <svg className="w-16 h-16 text-blue-400/30" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                            </svg>
                        </div>
                    )}

                    {/* Status Badge */}
                    <div className="absolute top-4 right-4">
                        <div className="px-3 py-1.5 bg-yellow-500/20 border border-yellow-400/40 rounded-full backdrop-blur-sm">
                            <span className="text-xs font-semibold text-yellow-300">Pending Verification</span>
                        </div>
                    </div>
                </div>

                {/* Product Info */}
                <div className="p-6 space-y-4">
                    {/* Header */}
                    <div>
                        <div className="flex items-start justify-between mb-2">
                            <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                                {product.productName}
                            </h3>
                            <span className="text-sm text-blue-200/50">ID: {product.id.toString()}</span>
                        </div>
                        <p className="text-blue-200/70 text-sm">by {product.artisanName}</p>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10">
                        <div>
                            <p className="text-xs text-blue-200/50 mb-1">Technique</p>
                            <p className="text-sm text-white font-medium">{product.technique || '-'}</p>
                        </div>
                        <div>
                            <p className="text-xs text-blue-200/50 mb-1">Location</p>
                            <p className="text-sm text-white font-medium">{product.village || '-'}</p>
                        </div>
                        <div>
                            <p className="text-xs text-blue-200/50 mb-1">Province</p>
                            <p className="text-sm text-white font-medium">{product.province || '-'}</p>
                        </div>
                        <div>
                            <p className="text-xs text-blue-200/50 mb-1">Minted</p>
                            <p className="text-sm text-white font-medium">{formatDate(product.mintDate)}</p>
                        </div>
                    </div>

                    {/* Description */}
                    {product.description && (
                        <div className="pt-3 border-t border-white/10">
                            <p className="text-xs text-blue-200/50 mb-1">Description</p>
                            <p className="text-sm text-blue-200/80 line-clamp-2">{product.description}</p>
                        </div>
                    )}

                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-500/10 border border-red-400/30 rounded-lg p-3">
                            <p className="text-sm text-red-300">{error}</p>
                        </div>
                    )}

                    {/* Verify Button */}
                    <button
                        onClick={() => setShowConfirm(true)}
                        disabled={isVerifying}
                        className="w-full relative group/btn mt-4"
                    >
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl blur opacity-50 group-hover/btn:opacity-75 transition"></div>
                        <div className="relative bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 disabled:from-green-800 disabled:to-emerald-800 text-white px-6 py-3 rounded-xl font-bold transition-all flex items-center justify-center space-x-2">
                            {isVerifying ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                                    <span>Verifying...</span>
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>Verify Product</span>
                                </>
                            )}
                        </div>
                    </button>
                </div>
            </div>

            {/* Confirmation Modal */}
            {showConfirm && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
                        onClick={() => !isVerifying && setShowConfirm(false)}
                    ></div>

                    <div className="flex min-h-full items-center justify-center p-4">
                        <div className="relative w-full max-w-md">
                            <div className="absolute -inset-1 bg-gradient-to-r from-green-500 via-emerald-500 to-green-500 rounded-3xl blur opacity-30 animate-pulse"></div>

                            <div className="relative backdrop-blur-xl bg-gradient-to-br from-slate-900/95 to-green-900/95 border border-white/20 rounded-3xl shadow-2xl overflow-hidden p-6">
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-8 h-8 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                    </div>

                                    <h3 className="text-2xl font-bold text-white mb-2">Verify Product?</h3>
                                    <p className="text-blue-200/70 mb-6">
                                        Are you sure you want to verify <span className="font-semibold text-white">{product.productName}</span>? This action will mark the product as authenticated on the blockchain.
                                    </p>

                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => setShowConfirm(false)}
                                            disabled={isVerifying}
                                            className="flex-1 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/30 text-white rounded-xl font-semibold transition-all disabled:opacity-50"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleVerify}
                                            disabled={isVerifying}
                                            className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white rounded-xl font-bold transition-all disabled:opacity-50"
                                        >
                                            {isVerifying ? 'Verifying...' : 'Confirm'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
