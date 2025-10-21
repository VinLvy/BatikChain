'use client';

import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import { Product } from '@/config/contract';
import { ProductCard } from './ProductCard';
import { ProductDetail } from './ProductDetail';
import { useContract } from '@/hooks/useContract';

interface ProductListProps {
    provider: ethers.BrowserProvider | null;
    signer: ethers.JsonRpcSigner | null;
}

export const ProductList = ({ provider }: ProductListProps) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterVerified, setFilterVerified] = useState<'all' | 'verified' | 'unverified'>('all');
    const [filterTechnique, setFilterTechnique] = useState('all');

    const { getAllProducts, isLoading, error } = useContract(provider);

    const loadProducts = useCallback(async () => {
        if (!provider) return;
        const allProducts = await getAllProducts();

        if (allProducts && allProducts.length > 0) {
            setProducts(allProducts);
        } else if (allProducts && allProducts.length === 0) {
            console.log("Kontrak terhubung, tetapi tidak ada produk terdaftar.");
        }
    }, [getAllProducts, provider]);

    useEffect(() => {
        if (provider) {
            loadProducts();
        }
    }, [provider, loadProducts]);

    const handleViewDetails = (product: Product) => {
        setSelectedProduct(product);
    };

    const handleCloseDetail = () => {
        setSelectedProduct(null);
    };

    // Filter products
    const filteredProducts = products.filter(product => {
        const matchesSearch = product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.artisanName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.village.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesVerified = filterVerified === 'all' ||
            (filterVerified === 'verified' && product.isVerified) ||
            (filterVerified === 'unverified' && !product.isVerified);

        const matchesTechnique = filterTechnique === 'all' ||
            product.technique.toLowerCase().includes(filterTechnique.toLowerCase());

        return matchesSearch && matchesVerified && matchesTechnique;
    });

    const uniqueTechniques = Array.from(new Set(products.map(p => p.technique)));

    if (isLoading && products.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-64">
                <div className="text-center">
                    <div className="relative inline-block mb-4">
                        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-400/20 border-t-blue-400"></div>
                        <div className="absolute inset-0 animate-ping rounded-full h-16 w-16 border-4 border-blue-400/40"></div>
                    </div>
                    <p className="text-blue-200/70 font-medium">Loading blockchain data...</p>
                    <p className="text-blue-200/50 text-sm mt-2">Fetching products from smart contract</p>
                </div>
            </div>
        );
    }

    if (error && products.length === 0) {
        return (
            <div className="backdrop-blur-xl bg-red-500/5 border border-red-400/20 rounded-2xl p-8 text-center shadow-xl">
                <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                </div>
                <h3 className="text-xl font-bold text-red-300 mb-2">Failed to Load Data</h3>
                <p className="text-red-200/70 mb-6">{error}</p>
                <button
                    onClick={loadProducts}
                    className="relative group/btn inline-flex"
                >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl blur opacity-50 group-hover/btn:opacity-75 transition"></div>
                    <div className="relative bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white px-6 py-3 rounded-xl font-semibold transition-all">
                        Try Again
                    </div>
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-2">
                            Batik Product Catalog
                        </h2>
                        <p className="text-blue-200/70">
                            Showing <span className="text-cyan-400 font-semibold">{filteredProducts.length}</span> of <span className="text-blue-300 font-semibold">{products.length}</span> verified products
                        </p>
                    </div>
                    <div className='flex gap-2 text-center'>
                        <button
                        onClick={loadProducts}
                        disabled={isLoading}
                        className="relative group/btn"
                    >
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl blur opacity-50 group-hover/btn:opacity-75 transition"></div>
                        <div className="relative bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 disabled:from-blue-800 disabled:to-cyan-800 text-white px-6 py-3 rounded-xl transition-all font-semibold flex items-center space-x-2">
                            {isLoading ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                                    <span>Syncing...</span>
                                </>
                            ) : (
                                <>
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                                    </svg>
                                    <span>Refresh</span>
                                </>
                            )}
                        </div>
                    </button>
                    <button
                        className="relative group/btn"
                    >
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-300 to-cyan-300 rounded-xl blur opacity-50 group-hover/btn:opacity-75 transition"></div>
                        <div className="relative bg-gradient-to-r from-blue-400 to-cyan-400 hover:from-blue-300 hover:to-cyan-300 disabled:from-blue-600 disabled:to-cyan-600 text-white px-6 py-3 rounded-xl transition-all font-semibold flex items-center space-x-2">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" />
                            </svg>
                            <span>Add Product</span>
                        </div>
                    </button>
                    </div>
                </div>
            </div>

            {/* Filters Section */}
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center space-x-2 mb-4">
                    <svg className="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h7a1 1 0 100-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z" />
                    </svg>
                    <h3 className="text-lg font-semibold text-white">Filter & Search</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Search */}
                    <div>
                        <label className="block text-sm font-medium text-blue-200/80 mb-2">
                            Search Products
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="w-5 h-5 text-blue-300/50" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                placeholder="Search by name, artisan, or location..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 focus:border-cyan-400/50 rounded-xl text-white placeholder-blue-200/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all"
                            />
                        </div>
                    </div>

                    {/* Verification Filter */}
                    <div>
                        <label className="block text-sm font-medium text-blue-200/80 mb-2">
                            Verification Status
                        </label>
                        <select
                            value={filterVerified}
                            onChange={(e) => setFilterVerified(e.target.value as 'all' | 'verified' | 'unverified')}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 focus:border-cyan-400/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all appearance-none cursor-pointer"
                            style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2393C5FD'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'right 0.75rem center',
                                backgroundSize: '1.25rem'
                            }}
                        >
                            <option value="all" className="bg-slate-800">All Products</option>
                            <option value="verified" className="bg-slate-800">✓ Verified Only</option>
                            <option value="unverified" className="bg-slate-800">⚠ Unverified</option>
                        </select>
                    </div>

                    {/* Technique Filter */}
                    <div>
                        <label className="block text-sm font-medium text-blue-200/80 mb-2">
                            Batik Technique
                        </label>
                        <select
                            value={filterTechnique}
                            onChange={(e) => setFilterTechnique(e.target.value)}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 focus:border-cyan-400/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all appearance-none cursor-pointer"
                            style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2393C5FD'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'right 0.75rem center',
                                backgroundSize: '1.25rem'
                            }}
                        >
                            <option value="all" className="bg-slate-800">All Techniques</option>
                            {uniqueTechniques.map(technique => (
                                <option key={technique} value={technique} className="bg-slate-800">
                                    {technique}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Active Filters */}
                {(searchTerm || filterVerified !== 'all' || filterTechnique !== 'all') && (
                    <div className="mt-4 flex flex-wrap gap-2">
                        <span className="text-sm text-blue-200/60">Active filters:</span>
                        {searchTerm && (
                            <span className="inline-flex items-center space-x-1 px-3 py-1 bg-cyan-500/10 border border-cyan-400/20 rounded-full text-sm text-cyan-300">
                                <span>Search: "{searchTerm}"</span>
                                <button onClick={() => setSearchTerm('')} className="hover:text-cyan-200">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </span>
                        )}
                        {filterVerified !== 'all' && (
                            <span className="inline-flex items-center space-x-1 px-3 py-1 bg-blue-500/10 border border-blue-400/20 rounded-full text-sm text-blue-300">
                                <span>{filterVerified === 'verified' ? 'Verified' : 'Unverified'}</span>
                                <button onClick={() => setFilterVerified('all')} className="hover:text-blue-200">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </span>
                        )}
                        {filterTechnique !== 'all' && (
                            <span className="inline-flex items-center space-x-1 px-3 py-1 bg-purple-500/10 border border-purple-400/20 rounded-full text-sm text-purple-300">
                                <span>{filterTechnique}</span>
                                <button onClick={() => setFilterTechnique('all')} className="hover:text-purple-200">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </span>
                        )}
                    </div>
                )}
            </div>

            {/* Products Grid */}
            {filteredProducts.length === 0 && !isLoading ? (
                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-12 text-center shadow-xl">
                    <div className="relative inline-block mb-6">
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/10">
                            <svg className="w-10 h-10 text-blue-300/50" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">No Products Found</h3>
                    <p className="text-blue-200/70 mb-6 max-w-md mx-auto">
                        {searchTerm || filterVerified !== 'all' || filterTechnique !== 'all'
                            ? 'Try adjusting your filters or search terms to find what you\'re looking for.'
                            : 'No products have been registered in the system yet.'}
                    </p>
                    {(searchTerm || filterVerified !== 'all' || filterTechnique !== 'all') && (
                        <button
                            onClick={() => {
                                setSearchTerm('');
                                setFilterVerified('all');
                                setFilterTechnique('all');
                            }}
                            className="relative group/btn inline-flex"
                        >
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl blur opacity-50 group-hover/btn:opacity-75 transition"></div>
                            <div className="relative bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white px-6 py-3 rounded-xl font-semibold transition-all">
                                Clear All Filters
                            </div>
                        </button>
                    )}
                </div>
            ) : (
                <>
                    {/* Stats Bar */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="backdrop-blur-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-400/20 rounded-xl p-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-white">{products.length}</div>
                                    <div className="text-xs text-blue-200/70">Total Products</div>
                                </div>
                            </div>
                        </div>

                        <div className="backdrop-blur-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-400/20 rounded-xl p-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-white">
                                        {products.filter(p => p.isVerified).length}
                                    </div>
                                    <div className="text-xs text-green-200/70">Verified</div>
                                </div>
                            </div>
                        </div>

                        <div className="backdrop-blur-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-400/20 rounded-xl p-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-white">{uniqueTechniques.length}</div>
                                    <div className="text-xs text-purple-200/70">Techniques</div>
                                </div>
                            </div>
                        </div>

                        <div className="backdrop-blur-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-400/20 rounded-xl p-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11 4a1 1 0 10-2 0v4a1 1 0 102 0V7zm-3 1a1 1 0 10-2 0v3a1 1 0 102 0V8zM8 9a1 1 0 00-2 0v2a1 1 0 102 0V9z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-white">{filteredProducts.length}</div>
                                    <div className="text-xs text-cyan-200/70">Showing</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onViewDetails={handleViewDetails}
                            />
                        ))}
                    </div>
                </>
            )}

            {/* Product Detail Modal */}
            {selectedProduct && (
                <ProductDetail
                    product={selectedProduct}
                    onClose={handleCloseDetail}
                />
            )}
        </div>
    );
};