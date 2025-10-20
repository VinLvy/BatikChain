'use client';

// 1. TAMBAHKAN 'useCallback' DI SINI
import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import { CONTRACT_CONFIG } from '@/config/contract';

interface WalletState {
    account: string | null;
    chainId: number | null;
    isConnected: boolean;
    isCorrectNetwork: boolean;
    provider: ethers.BrowserProvider | null;
    signer: ethers.JsonRpcSigner | null;
}

export const useWallet = () => {
    const [walletState, setWalletState] = useState<WalletState>({
        account: null,
        chainId: null,
        isConnected: false,
        isCorrectNetwork: false,
        provider: null,
        signer: null,
    });

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // 2. WRAP 'disconnectWallet' DENGAN 'useCallback'
    const disconnectWallet = useCallback(() => {
        setWalletState({
            account: null,
            chainId: null,
            isConnected: false,
            isCorrectNetwork: false,
            provider: null,
            signer: null,
        });
        setError(null);
    // Dependencies setWalletState dan setError adalah stable function dari React, jadi fungsi disconnectWallet menjadi stabil.
    }, [setWalletState, setError]); 
    
    // Perbaikan 1: Pindahkan handleAccountsChanged & handleChainChanged ke dalam useEffect
    // Pilihan lain (lebih bersih): Gunakan useCallback jika handler ini akan digunakan di tempat lain
    // Namun untuk kasus event listener, yang terbaik adalah definisikan handler di dalam useEffect atau pastikan dependency array-nya kosong

    useEffect(() => {
        
        // Handler untuk akun berubah
        const handleAccountsChanged = (accounts: string[]) => {
            if (accounts.length === 0) {
                // Jika user disconnect, reset semua state
                disconnectWallet();
            } else {
                // Jika user ganti akun, update state
                setWalletState(prev => ({
                    ...prev,
                    account: accounts[0],
                    isConnected: true,
                }));
            }
        };

        // Handler untuk jaringan (chain) berubah
        const handleChainChanged = () => { 
            // Cara paling aman untuk menangani pergantian jaringan adalah me-reload halaman
            window.location.reload();
        };


        const checkConnection = async () => {
            if (typeof window !== 'undefined' && window.ethereum) {
                try {
                    const provider = new ethers.BrowserProvider(window.ethereum);
                    // Gunakan eth_accounts untuk cek koneksi tanpa memicu pop-up
                    const accounts = await provider.send('eth_accounts', []); 

                    if (accounts.length > 0) {
                        const signer = await provider.getSigner();
                        const network = await provider.getNetwork();
                        const chainId = Number(network.chainId);

                        setWalletState({
                            account: signer.address,
                            chainId,
                            isConnected: true,
                            isCorrectNetwork: chainId === CONTRACT_CONFIG.ETHEREUM_SEPOLIA.chainId,
                            provider,
                            signer,
                        });
                    }
                } catch (err) {
                    console.error('Error checking wallet connection:', err);
                }
            }
            setIsLoading(false);
        };

        checkConnection();

        // Listeners
        if (typeof window !== 'undefined' && window.ethereum) {
            window.ethereum.on('accountsChanged', handleAccountsChanged);
            window.ethereum.on('chainChanged', handleChainChanged);
        }

        return () => {
            if (typeof window !== 'undefined' && window.ethereum) {
                window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
                window.ethereum.removeListener('chainChanged', handleChainChanged);
            }
        };
    // Karena disconnectWallet sekarang stabil (wrapped in useCallback), dependency ini valid
    }, [disconnectWallet, setWalletState]); 


    // Fungsi connectWallet dan switchToSepolia juga disarankan menggunakan useCallback 
    // agar lebih konsisten, tetapi tidak akan menyebabkan error jika tidak dipakai.
    // Untuk saat ini, kita fokus pada perbaikan error yang ada.
    
    // ... (Fungsi connectWallet, switchToSepolia, dan return tetap sama)
    const connectWallet = async () => {
        if (isLoading || walletState.isConnected) {
            return;
        }

        if (!window.ethereum) {
            setError('MetaMask tidak terinstall. Silakan install MetaMask terlebih dahulu.');
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const accounts = await provider.send('eth_requestAccounts', []);
            const signer = await provider.getSigner();
            const network = await provider.getNetwork();
            const chainId = Number(network.chainId);

            setWalletState({
                account: accounts[0],
                chainId,
                isConnected: true,
                isCorrectNetwork: chainId === CONTRACT_CONFIG.ETHEREUM_SEPOLIA.chainId,
                provider,
                signer,
            });
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Gagal menghubungkan wallet';
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const switchToSepolia = async () => {
        // ... (Tidak ada perubahan)
        if (!window.ethereum) {
            setError('MetaMask tidak terinstall');
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: `0x${CONTRACT_CONFIG.ETHEREUM_SEPOLIA.chainId.toString(16)}` }],
            });
        } catch (err: unknown) {
            if (err && typeof err === 'object' && 'code' in err && err.code === 4902) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [CONTRACT_CONFIG.ETHEREUM_SEPOLIA],
                    });
                } catch (addErr: unknown) {
                    const errorMessage = addErr instanceof Error ? addErr.message : 'Gagal menambahkan network Sepolia';
                    setError(errorMessage);
                }
            } else {
                const errorMessage = err instanceof Error ? err.message : 'Gagal beralih ke network Sepolia';
                setError(errorMessage);
            }
        } finally {
            setIsLoading(false);
        }
    };


    return {
        ...walletState,
        isLoading,
        error,
        connectWallet,
        switchToSepolia,
        disconnectWallet,
    };
};