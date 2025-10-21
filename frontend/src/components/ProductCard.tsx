'use client';

import { Product } from '@/config/contract';

interface ProductCardProps {
    product: Product;
    onViewDetails: (product: Product) => void;
}

export const ProductCard = ({ product, onViewDetails }: ProductCardProps) => {
    return (
        <div className="group relative">
            {/* Glow Effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500"></div>
            
            <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:border-cyan-400/30">
                {/* Product Image */}
                <div className="relative h-56 bg-gradient-to-br from-blue-900/50 to-purple-900/50 overflow-hidden">
                    {product.imageUrl ? (
                        <img 
                            src={product.imageUrl} 
                            alt={product.productName}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <svg className="w-16 h-16 text-blue-300/30" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                            </svg>
                        </div>
                    )}
                    
                    {/* Verification Badge */}
                    <div className="absolute top-3 right-3">
                        {product.isVerified ? (
                            <div className="relative">
                                <div className="absolute inset-0 bg-green-400 rounded-full blur-md opacity-50"></div>
                                <div className="relative bg-green-500/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center space-x-1.5 border border-green-400/50">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>Verified</span>
                                </div>
                            </div>
                        ) : (
                            <div className="relative">
                                <div className="absolute inset-0 bg-yellow-400 rounded-full blur-md opacity-50"></div>
                                <div className="relative bg-yellow-500/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center space-x-1.5 border border-yellow-400/50">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    <span>Pending</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* ID Badge */}
                    <div className="absolute top-3 left-3">
                        <div className="bg-black/50 backdrop-blur-sm text-cyan-300 px-3 py-1.5 rounded-full text-xs font-mono font-semibold border border-cyan-400/30">
                            #{product.id}
                        </div>
                    </div>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-4">
                    {/* Product Name */}
                    <div>
                        <h3 className="text-xl font-bold text-white mb-1 line-clamp-1 group-hover:text-cyan-300 transition-colors">
                            {product.productName}
                        </h3>
                        <div className="flex items-center space-x-2 text-sm text-blue-200/70">
                            <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                            <span className="font-medium">{product.artisanName}</span>
                        </div>
                    </div>

                    {/* Info Grid */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white/5 border border-white/10 rounded-lg p-2.5">
                            <div className="text-xs text-blue-200/60 mb-1">Technique</div>
                            <div className="text-sm font-semibold text-white line-clamp-1">{product.technique}</div>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-lg p-2.5">
                            <div className="text-xs text-blue-200/60 mb-1">Location</div>
                            <div className="text-sm font-semibold text-cyan-300 line-clamp-1">{product.village}</div>
                        </div>
                    </div>

                    {/* Production Date */}
                    <div className="flex items-center space-x-2 text-sm text-blue-200/70">
                        <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                        <span>Produced: {new Date(Number(product.productionDate) * 1000).toLocaleDateString('id-ID')}</span>
                    </div>

                    {/* View Details Button */}
                    <button
                        onClick={() => onViewDetails(product)}
                        className="relative w-full group/btn overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover/btn:opacity-100 blur transition-opacity"></div>
                        <div className="relative bg-gradient-to-r from-blue-600/50 to-cyan-600/50 hover:from-blue-600 hover:to-cyan-600 border border-blue-400/30 hover:border-cyan-400/50 text-white py-3 rounded-xl font-semibold transition-all flex items-center justify-center space-x-2">
                            <span>View Details</span>
                            <svg className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </div>
                    </button>
                </div>

                {/* Blockchain Badge */}
                <div className="absolute bottom-0 right-0 w-24 h-24 opacity-5 pointer-events-none">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="text-cyan-400">
                        <path d="M13 7H7v6h6V7z" />
                        <path fillRule="evenodd" d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V5a2 2 0 012-2h2V2zM5 5h10v10H5V5z" clipRule="evenodd" />
                    </svg>
                </div>
            </div>
        </div>
    );
};