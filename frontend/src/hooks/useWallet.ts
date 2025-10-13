'use client';

import { useState, useEffect } from 'react';
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

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Check if wallet is already connected
    useEffect(() => {
        const checkConnection = async () => {
            if (typeof window !== 'undefined' && window.ethereum) {
                try {
                    const provider = new ethers.BrowserProvider(window.ethereum);
                    const accounts = await provider.listAccounts();

                    if (accounts.length > 0) {
                        const signer = await provider.getSigner();
                        const network = await provider.getNetwork();
                        const chainId = Number(network.chainId);

                        setWalletState({
                            account: accounts[0].address,
                            chainId,
                            isConnected: true,
                            isCorrectNetwork: chainId === CONTRACT_CONFIG.POLYGON_MUMBAI.chainId,
                            provider,
                            signer,
                        });
                    }
                } catch (err) {
                    console.error('Error checking wallet connection:', err);
                }
            }
        };

        checkConnection();

        // Listen for account changes
        if (window.ethereum) {
            window.ethereum.on('accountsChanged', handleAccountsChanged);
            window.ethereum.on('chainChanged', handleChainChanged);
        }

        return () => {
            if (window.ethereum) {
                window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
                window.ethereum.removeListener('chainChanged', handleChainChanged);
            }
        };
    }, []);

    const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
            setWalletState(prev => ({
                ...prev,
                account: null,
                isConnected: false,
                signer: null,
            }));
        } else {
            setWalletState(prev => ({
                ...prev,
                account: accounts[0],
                isConnected: true,
            }));
        }
    };

    const handleChainChanged = (chainId: string) => {
        const newChainId = parseInt(chainId, 16);
        setWalletState(prev => ({
            ...prev,
            chainId: newChainId,
            isCorrectNetwork: newChainId === CONTRACT_CONFIG.POLYGON_MUMBAI.chainId,
        }));
    };

    const connectWallet = async () => {
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
                isCorrectNetwork: chainId === CONTRACT_CONFIG.POLYGON_MUMBAI.chainId,
                provider,
                signer,
            });
        } catch (err: any) {
            setError(err.message || 'Gagal menghubungkan wallet');
        } finally {
            setIsLoading(false);
        }
    };

    const switchToMumbai = async () => {
        if (!window.ethereum) {
            setError('MetaMask tidak terinstall');
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: `0x${CONTRACT_CONFIG.POLYGON_MUMBAI.chainId.toString(16)}` }],
            });
        } catch (err: any) {
            // If network doesn't exist, add it
            if (err.code === 4902) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [CONTRACT_CONFIG.POLYGON_MUMBAI],
                    });
                } catch (addErr: any) {
                    setError(addErr.message || 'Gagal menambahkan network Mumbai');
                }
            } else {
                setError(err.message || 'Gagal beralih ke network Mumbai');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const disconnectWallet = () => {
        setWalletState({
            account: null,
            chainId: null,
            isConnected: false,
            isCorrectNetwork: false,
            provider: null,
            signer: null,
        });
        setError(null);
    };

    return {
        ...walletState,
        isLoading,
        error,
        connectWallet,
        switchToMumbai,
        disconnectWallet,
    };
};
