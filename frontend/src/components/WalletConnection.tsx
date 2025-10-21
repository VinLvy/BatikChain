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
        switchToSepolia,
        disconnectWallet,
    } = useWallet();

    const formatAddress = (address: string) => {
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };

    if (!isConnected) {
        return (
            <div className="relative group">
                {/* Glow Effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
                
                <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 text-center shadow-2xl">
                    {/* Icon with Animation */}
                    <div className="relative inline-block mb-6">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur-xl opacity-50 animate-pulse"></div>
                        <div className="relative w-20 h-20 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20">
                            <svg className="w-10 h-10 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                        </div>
                        
                        {/* Rotating Ring */}
                        <div className="absolute inset-0 border-2 border-t-cyan-400 border-r-transparent border-b-blue-400 border-l-transparent rounded-2xl animate-spin-slow"></div>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-3">
                        Connect Web3 Wallet
                    </h3>
                    <p className="text-blue-200/70 mb-6 max-w-md mx-auto">
                        Hubungkan wallet MetaMask Anda untuk mengakses produk batik terverifikasi di blockchain
                    </p>

                    {error && (
                        <div className="bg-red-500/10 border border-red-400/30 backdrop-blur-sm rounded-xl p-4 mb-6">
                            <div className="flex items-start space-x-3">
                                <svg className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                                <p className="text-red-300 text-sm text-left">{error}</p>
                            </div>
                        </div>
                    )}

                    <button
                        onClick={connectWallet}
                        disabled={isLoading}
                        className="relative group/btn w-full sm:w-auto"
                    >
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl blur opacity-50 group-hover/btn:opacity-75 transition duration-300"></div>
                        <div className="relative bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 disabled:from-blue-800 disabled:to-cyan-800 text-white px-8 py-4 rounded-xl transition-all font-semibold flex items-center justify-center space-x-3 min-w-[200px]">
                            {isLoading ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                                    <span>Connecting...</span>
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                                    </svg>
                                    <span>Connect MetaMask</span>
                                </>
                            )}
                        </div>
                    </button>

                    {/* Info Pills */}
                    <div className="mt-6 flex flex-wrap justify-center gap-2">
                        <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-blue-500/10 border border-blue-400/20 rounded-full text-xs text-blue-300">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>Secure Connection</span>
                        </span>
                        <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-cyan-500/10 border border-cyan-400/20 rounded-full text-xs text-cyan-300">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                            </svg>
                            <span>Sepolia Testnet</span>
                        </span>
                    </div>

                    <p className="text-xs text-blue-200/50 mt-6">
                        Pastikan Anda menggunakan <span className="text-cyan-400 font-semibold">Ethereum Sepolia Testnet</span>
                    </p>
                </div>
            </div>
        );
    }

    if (!isCorrectNetwork) {
        return (
            <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
                
                <div className="relative backdrop-blur-xl bg-white/5 border border-yellow-400/20 rounded-2xl p-8 text-center shadow-2xl">
                    {/* Warning Icon */}
                    <div className="relative inline-block mb-6">
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl blur-xl opacity-50 animate-pulse"></div>
                        <div className="relative w-20 h-20 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-yellow-400/30">
                            <svg className="w-10 h-10 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-3">
                        Wrong Network Detected
                    </h3>
                    <p className="text-yellow-200/70 mb-6 max-w-md mx-auto">
                        Aplikasi ini memerlukan <span className="text-yellow-300 font-semibold">Ethereum Sepolia Testnet</span>. Silakan beralih jaringan untuk melanjutkan.
                    </p>

                    {error && (
                        <div className="bg-red-500/10 border border-red-400/30 backdrop-blur-sm rounded-xl p-4 mb-6">
                            <div className="flex items-start space-x-3">
                                <svg className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                                <p className="text-red-300 text-sm text-left">{error}</p>
                            </div>
                        </div>
                    )}

                    <button
                        onClick={switchToSepolia}
                        disabled={isLoading}
                        className="relative group/btn w-full sm:w-auto"
                    >
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl blur opacity-50 group-hover/btn:opacity-75 transition duration-300"></div>
                        <div className="relative bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 disabled:from-yellow-800 disabled:to-orange-800 text-white px-8 py-4 rounded-xl transition-all font-semibold flex items-center justify-center space-x-3 min-w-[200px]">
                            {isLoading ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                                    <span>Switching...</span>
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                                    </svg>
                                    <span>Switch to Sepolia</span>
                                </>
                            )}
                        </div>
                    </button>

                    <div className="mt-6 bg-yellow-500/10 border border-yellow-400/20 rounded-xl p-4">
                        <p className="text-xs text-yellow-200/70">
                            <span className="font-semibold text-yellow-300">Note:</span> Jika network Sepolia belum ada di wallet Anda, sistem akan otomatis menambahkannya.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
            
            <div className="relative backdrop-blur-xl bg-white/5 border border-green-400/20 rounded-2xl p-6 shadow-2xl">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center space-x-4">
                        {/* Status Icon */}
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl blur-lg opacity-50"></div>
                            <div className="relative w-14 h-14 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-green-400/30">
                                <svg className="w-7 h-7 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            </div>
                            {/* Pulse Animation */}
                            <div className="absolute inset-0 bg-green-400 rounded-2xl animate-ping opacity-20"></div>
                        </div>

                        {/* Wallet Info */}
                        <div>
                            <div className="flex items-center space-x-2 mb-1">
                                <span className="text-xs font-semibold text-green-300 uppercase tracking-wider">Connected</span>
                                <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                            </div>
                            <div className="font-mono text-xl font-bold text-white mb-1">
                                {account ? formatAddress(account) : ''}
                            </div>
                            <div className="flex items-center space-x-2">
                                <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span className="text-sm text-cyan-300 font-medium">Ethereum Sepolia Testnet</span>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-3">
                        {/* Copy Address */}
                        <button
                            onClick={() => account && navigator.clipboard.writeText(account)}
                            className="group/copy p-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-400/30 rounded-xl transition-all"
                            title="Copy Address"
                        >
                            <svg className="w-5 h-5 text-blue-300 group-hover/copy:text-cyan-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                        </button>

                        {/* Disconnect */}
                        <button
                            onClick={disconnectWallet}
                            className="group/disconnect p-3 bg-red-500/10 hover:bg-red-500/20 border border-red-400/20 hover:border-red-400/40 rounded-xl transition-all"
                            title="Disconnect Wallet"
                        >
                            <svg className="w-5 h-5 text-red-400 group-hover/disconnect:text-red-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Stats Bar */}
                <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-3 gap-4">
                    <div className="text-center">
                        <div className="text-xs text-blue-200/60 mb-1">Balance</div>
                        <div className="text-sm font-semibold text-white">-- ETH</div>
                    </div>
                    <div className="text-center">
                        <div className="text-xs text-blue-200/60 mb-1">Network</div>
                        <div className="text-sm font-semibold text-cyan-400">Sepolia</div>
                    </div>
                    <div className="text-center">
                        <div className="text-xs text-blue-200/60 mb-1">Status</div>
                        <div className="flex items-center justify-center space-x-1">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <div className="text-sm font-semibold text-green-400">Active</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};