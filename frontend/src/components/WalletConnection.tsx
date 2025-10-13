'use client';

import { useWallet } from '@/hooks/useWallet';

export const WalletConnection = () => {
    const {
        account,
        isConnected,
        isCorrectNetwork,
        isLoading,
        error,
        connectWallet,
        switchToMumbai,
        disconnectWallet,
    } = useWallet();

    const formatAddress = (address: string) => {
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };

    if (!isConnected) {
        return (
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Hubungkan Wallet Anda
                </h3>
                <p className="text-gray-600 mb-4">
                    Hubungkan wallet MetaMask Anda untuk melihat dan berinteraksi dengan produk batik
                </p>

                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                        <p className="text-red-700 text-sm">{error}</p>
                    </div>
                )}

                <button
                    onClick={connectWallet}
                    disabled={isLoading}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-md transition-colors font-medium flex items-center space-x-2 mx-auto"
                >
                    {isLoading && <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>}
                    <span>Hubungkan MetaMask</span>
                </button>

                <p className="text-xs text-gray-500 mt-4">
                    Pastikan Anda menggunakan Polygon Mumbai Testnet
                </p>
            </div>
        );
    }

    if (!isCorrectNetwork) {
        return (
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Network Salah
                </h3>
                <p className="text-gray-600 mb-4">
                    Silakan beralih ke Polygon Mumbai Testnet untuk menggunakan aplikasi ini
                </p>

                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                        <p className="text-red-700 text-sm">{error}</p>
                    </div>
                )}

                <button
                    onClick={switchToMumbai}
                    disabled={isLoading}
                    className="bg-yellow-600 hover:bg-yellow-700 disabled:bg-yellow-400 text-white px-6 py-3 rounded-md transition-colors font-medium flex items-center space-x-2 mx-auto"
                >
                    {isLoading && <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>}
                    <span>Beralih ke Mumbai</span>
                </button>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-700">Wallet Terhubung</p>
                        <p className="text-lg font-semibold text-gray-900 font-mono">
                            {account ? formatAddress(account) : ''}
                        </p>
                        <p className="text-xs text-green-600">Polygon Mumbai Testnet</p>
                    </div>
                </div>
                <button
                    onClick={disconnectWallet}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                    title="Disconnect Wallet"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                </button>
            </div>
        </div>
    );
};
