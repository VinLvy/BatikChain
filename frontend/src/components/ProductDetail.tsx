'use client';

import { Product } from '@/config/contract';
import { useEffect } from 'react';

interface ProductDetailProps {
    product: Product;
    onClose: () => void;
}

export const ProductDetail = ({ product, onClose }: ProductDetailProps) => {
    // Prevent body scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    // Close on ESC key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop */}
            <div 
                className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal */}
            <div className="flex min-h-full items-center justify-center p-4">
                <div className="relative w-full max-w-4xl">
                    {/* Glow Effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 rounded-3xl blur opacity-30 animate-pulse"></div>
                    
                    {/* Content */}
                    <div className="relative backdrop-blur-xl bg-gradient-to-br from-slate-900/95 to-blue-900/95 border border-white/20 rounded-3xl shadow-2xl overflow-hidden">
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-10 group/close"
                        >
                            <div className="relative">
                                <div className="absolute inset-0 bg-red-500 rounded-full blur-lg opacity-0 group-hover/close:opacity-50 transition-opacity"></div>
                                <div className="relative w-10 h-10 bg-white/10 hover:bg-red-500/20 border border-white/20 hover:border-red-400/40 rounded-full flex items-center justify-center backdrop-blur-sm transition-all">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </div>
                            </div>
                        </button>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                            {/* Left Side - Image */}
                            <div className="relative h-96 lg:h-auto bg-gradient-to-br from-blue-900/50 to-purple-900/50">
                                {product.imageUrl ? (
                                    <img 
                                        src={product.imageUrl} 
                                        alt={product.productName}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <svg className="w-24 h-24 text-blue-300/30" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                )}
                                
                                {/* Verification Badge Overlay */}
                                <div className="absolute top-6 left-6">
                                    {product.isVerified ? (
                                        <div className="relative">
                                            <div className="absolute inset-0 bg-green-400 rounded-2xl blur-xl opacity-60"></div>
                                            <div className="relative bg-green-500/90 backdrop-blur-md text-white px-5 py-3 rounded-2xl font-bold flex items-center space-x-2 border border-green-400/50 shadow-2xl">
                                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                                <span>Blockchain Verified</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="relative">
                                            <div className="absolute inset-0 bg-yellow-400 rounded-2xl blur-xl opacity-60"></div>
                                            <div className="relative bg-yellow-500/90 backdrop-blur-md text-white px-5 py-3 rounded-2xl font-bold flex items-center space-x-2 border border-yellow-400/50 shadow-2xl">
                                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                                </svg>
                                                <span>Pending Verification</span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* ID Badge */}
                                <div className="absolute bottom-6 left-6">
                                    <div className="bg-black/70 backdrop-blur-md text-cyan-300 px-5 py-3 rounded-xl font-mono font-bold border border-cyan-400/50 shadow-xl">
                                        Product ID: #{product.id}
                                    </div>
                                </div>

                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-40"></div>
                            </div>

                            {/* Right Side - Details */}
                            <div className="p-8 lg:p-10 space-y-6 overflow-y-auto max-h-[600px]">
                                {/* Header */}
                                <div>
                                    <div className="flex items-center space-x-2 mb-3">
                                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                                        <span className="text-xs font-semibold text-cyan-300 uppercase tracking-wider">Product Information</span>
                                    </div>
                                    <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3">
                                        {product.productName}
                                    </h2>
                                    <div className="flex items-center space-x-2 text-blue-200/80">
                                        <svg className="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                        </svg>
                                        <span className="font-semibold text-lg">{product.artisanName}</span>
                                    </div>
                                </div>

                                {/* Info Grid */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm">
                                        <div className="flex items-center space-x-2 mb-2">
                                            <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                                            </svg>
                                            <span className="text-xs text-blue-200/60 font-medium uppercase">Technique</span>
                                        </div>
                                        <div className="text-lg font-bold text-white">{product.technique}</div>
                                    </div>

                                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm">
                                        <div className="flex items-center space-x-2 mb-2">
                                            <svg className="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-xs text-blue-200/60 font-medium uppercase">Village</span>
                                        </div>
                                        <div className="text-lg font-bold text-cyan-300">{product.village}</div>
                                    </div>

                                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm">
                                        <div className="flex items-center space-x-2 mb-2">
                                            <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-xs text-blue-200/60 font-medium uppercase">Production</span>
                                        </div>
                                        <div className="text-lg font-bold text-white">
                                            {new Date(Number(product.productionDate) * 1000).toLocaleDateString('id-ID', {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric'
                                            })}
                                        </div>
                                    </div>

                                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm">
                                        <div className="flex items-center space-x-2 mb-2">
                                            <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-xs text-blue-200/60 font-medium uppercase">Status</span>
                                        </div>
                                        <div className={`text-lg font-bold ${product.isVerified ? 'text-green-400' : 'text-yellow-400'}`}>
                                            {product.isVerified ? 'Verified ✓' : 'Pending ⏳'}
                                        </div>
                                    </div>
                                </div>

                                {/* Description */}
                                {product.description && (
                                    <div className="bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur-sm">
                                        <div className="flex items-center space-x-2 mb-3">
                                            <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-sm font-semibold text-blue-200/80 uppercase tracking-wide">Description</span>
                                        </div>
                                        <p className="text-blue-100/80 leading-relaxed">{product.description}</p>
                                    </div>
                                )}

                                {/* Blockchain Info */}
                                <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-400/30 rounded-xl p-5 backdrop-blur-sm">
                                    <div className="flex items-center space-x-2 mb-4">
                                        <svg className="w-6 h-6 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M13 7H7v6h6V7z" />
                                            <path fillRule="evenodd" d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V5a2 2 0 012-2h2V2zM5 5h10v10H5V5z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-sm font-bold text-cyan-300 uppercase tracking-wide">Blockchain Data</span>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-blue-200/70">Token ID:</span>
                                            <span className="font-mono font-bold text-white">#{product.id}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-blue-200/70">Chain:</span>
                                            <span className="font-semibold text-cyan-300">Ethereum Sepolia</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-blue-200/70">Verification:</span>
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                                product.isVerified 
                                                    ? 'bg-green-500/20 text-green-300 border border-green-400/30' 
                                                    : 'bg-yellow-500/20 text-yellow-300 border border-yellow-400/30'
                                            }`}>
                                                {product.isVerified ? 'On-Chain Verified' : 'Awaiting Verification'}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-3 pt-4">
                                    <button className="flex-1 relative group/btn">
                                        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl blur opacity-50 group-hover/btn:opacity-75 transition"></div>
                                        <div className="relative bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white py-4 rounded-xl font-bold transition-all flex items-center justify-center space-x-2">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                            <span>View on Explorer</span>
                                        </div>
                                    </button>
                                    
                                    <button 
                                        onClick={onClose}
                                        className="px-6 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/30 text-white py-4 rounded-xl font-bold transition-all"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};