'use client';

import { Product } from '@/config/contract';

interface ProductDetailProps {
    product: Product;
    onClose: () => void;
}

export const ProductDetail = ({ product, onClose }: ProductDetailProps) => {
    const formatDate = (timestamp: number) => {
        return new Date(timestamp * 1000).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const formatAddress = (verifiedBy: string) => {
        if (!verifiedBy || verifiedBy === '0x0000000000000000000000000000000000000000') {
            return 'Belum diverifikasi';
        }
        return `${verifiedBy.slice(0, 6)}...${verifiedBy.slice(-4)}`;
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-900">{product.productName}</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    {/* Status Verification */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-gray-700">Status Verifikasi:</span>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${product.isVerified
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                {product.isVerified ? 'Terverifikasi' : 'Belum Verifikasi'}
                            </span>
                        </div>
                        <span className="text-sm text-gray-500">ID: #{product.id}</span>
                    </div>

                    {/* Images Section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-gray-100 rounded-lg p-4 text-center">
                            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <h4 className="font-medium text-gray-900">Foto Produk</h4>
                            <p className="text-sm text-gray-600 mt-1">
                                {product.imageHash ? 'Tersedia' : 'Belum tersedia'}
                            </p>
                        </div>

                        <div className="bg-gray-100 rounded-lg p-4 text-center">
                            <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-2">
                                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <h4 className="font-medium text-gray-900">Foto Pengrajin</h4>
                            <p className="text-sm text-gray-600 mt-1">
                                {product.artisanImageHash ? 'Tersedia' : 'Belum tersedia'}
                            </p>
                        </div>

                        <div className="bg-gray-100 rounded-lg p-4 text-center">
                            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <h4 className="font-medium text-gray-900">Video Proses</h4>
                            <p className="text-sm text-gray-600 mt-1">
                                {product.videoHash ? 'Tersedia' : 'Belum tersedia'}
                            </p>
                        </div>
                    </div>

                    {/* Product Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Informasi Produk</h3>
                                <div className="space-y-3">
                                    <div>
                                        <span className="text-sm font-medium text-gray-700">Nama Produk:</span>
                                        <p className="text-gray-900">{product.productName}</p>
                                    </div>
                                    <div>
                                        <span className="text-sm font-medium text-gray-700">Teknik Pembuatan:</span>
                                        <p className="text-gray-900">{product.technique}</p>
                                    </div>
                                    <div>
                                        <span className="text-sm font-medium text-gray-700">Bahan yang Digunakan:</span>
                                        <p className="text-gray-900">{product.materials}</p>
                                    </div>
                                    <div>
                                        <span className="text-sm font-medium text-gray-700">Tanggal Minting:</span>
                                        <p className="text-gray-900">{formatDate(product.mintDate)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Informasi Pengrajin</h3>
                                <div className="space-y-3">
                                    <div>
                                        <span className="text-sm font-medium text-gray-700">Nama Pengrajin:</span>
                                        <p className="text-gray-900">{product.artisanName}</p>
                                    </div>
                                    <div>
                                        <span className="text-sm font-medium text-gray-700">Alamat:</span>
                                        <p className="text-gray-900">{product.artisanAddress}</p>
                                    </div>
                                    <div>
                                        <span className="text-sm font-medium text-gray-700">Lokasi:</span>
                                        <p className="text-gray-900">
                                            {product.village}, {product.district}<br />
                                            {product.regency}, {product.province}
                                        </p>
                                    </div>
                                    {product.coordinates && (
                                        <div>
                                            <span className="text-sm font-medium text-gray-700">Koordinat GPS:</span>
                                            <p className="text-gray-900 font-mono text-sm">{product.coordinates}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    {product.description && (
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">Deskripsi Produk</h3>
                            <p className="text-gray-700 leading-relaxed">{product.description}</p>
                        </div>
                    )}

                    {/* Verification Info */}
                    {product.isVerified && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <h3 className="text-lg font-semibold text-green-900 mb-2">Informasi Verifikasi</h3>
                            <div className="space-y-2">
                                <div>
                                    <span className="text-sm font-medium text-green-700">Diverifikasi oleh:</span>
                                    <p className="text-green-900 font-mono">{formatAddress(product.verifiedBy)}</p>
                                </div>
                                <div>
                                    <span className="text-sm font-medium text-green-700">Status:</span>
                                    <p className="text-green-900">Produk telah diverifikasi dan terjamin keasliannya</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
