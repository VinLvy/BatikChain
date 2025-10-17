'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/config/contract';
import { ProductCard } from './ProductCard';
import { ProductDetail } from './ProductDetail';
import { useContract } from '@/hooks/useContract';

interface ProductListProps {
    provider: any;
    signer: any;
}

export const ProductList = ({ provider, signer }: ProductListProps) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterVerified, setFilterVerified] = useState<'all' | 'verified' | 'unverified'>('all');
    const [filterTechnique, setFilterTechnique] = useState('all');

    const { getAllProducts, isLoading, error } = useContract(provider, signer);

    useEffect(() => {
        loadProducts();
    }, [provider]);

    const loadProducts = async () => {
        const allProducts = await getAllProducts();
        setProducts(allProducts);
    };

    const handleViewDetails = (product: Product) => {
        setSelectedProduct(product);
    };

    const handleCloseDetail = () => {
        setSelectedProduct(null);
    };

    // Filter products based on search and filters
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

    // Get unique techniques for filter
    const uniqueTechniques = Array.from(new Set(products.map(p => p.technique)));

    if (isLoading && products.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-64">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Memuat data produk...</p>
                </div>
            </div>
        );
    }

    if (error && products.length === 0) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                <div className="text-red-600 mb-2">
                    <svg className="w-12 h-12 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                </div>
                <h3 className="text-lg font-semibold text-red-900 mb-2">Gagal Memuat Data</h3>
                <p className="text-red-700 mb-4">{error}</p>
                <button
                    onClick={loadProducts}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors"
                >
                    Coba Lagi
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Katalog Produk Batik</h2>
                    <p className="text-gray-600 mt-1">
                        Menampilkan {filteredProducts.length} dari {products.length} produk
                    </p>
                </div>
                <button
                    onClick={loadProducts}
                    disabled={isLoading}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-md transition-colors flex items-center space-x-2"
                >
                    {isLoading && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>}
                    <span>Refresh</span>
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-lg shadow-sm border space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Search */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Pencarian
                        </label>
                        <input
                            type="text"
                            placeholder="Cari produk, pengrajin, atau lokasi..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Verification Filter */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Status Verifikasi
                        </label>
                        <select
                            value={filterVerified}
                            onChange={(e) => setFilterVerified(e.target.value as any)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="all">Semua</option>
                            <option value="verified">Terverifikasi</option>
                            <option value="unverified">Belum Verifikasi</option>
                        </select>
                    </div>

                    {/* Technique Filter */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Teknik Pembuatan
                        </label>
                        <select
                            value={filterTechnique}
                            onChange={(e) => setFilterTechnique(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="all">Semua Teknik</option>
                            {uniqueTechniques.map(technique => (
                                <option key={technique} value={technique}>
                                    {technique}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
                <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Tidak ada produk ditemukan</h3>
                    <p className="text-gray-600">
                        {searchTerm || filterVerified !== 'all' || filterTechnique !== 'all'
                            ? 'Coba ubah filter atau kata kunci pencarian Anda'
                            : 'Belum ada produk yang terdaftar dalam sistem'}
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onViewDetails={handleViewDetails}
                        />
                    ))}
                </div>
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

