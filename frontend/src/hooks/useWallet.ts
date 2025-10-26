'use client';

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

interface MetaMaskError extends Error {
  code?: number;
  data?: unknown;
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

  // ✅ Disconnect wallet (stable with useCallback)
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
  }, []);

  useEffect(() => {
    type AccountsChangedHandler = (accounts: string[]) => void;
    type ChainChangedHandler = (chainId: string) => void;

    const handleAccountsChanged: AccountsChangedHandler = (accounts) => {
      if (accounts.length === 0) {
        disconnectWallet();
      } else {
        // Update wallet state and ensure provider/signer are available
        const updateWalletState = async () => {
          try {
            if (!window.ethereum) {
              throw new Error('MetaMask not available');
            }
            const provider = new ethers.BrowserProvider(window.ethereum);
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
          } catch (err) {
            console.error('Error updating wallet state:', err);
            setWalletState((prev) => ({
              ...prev,
              account: accounts[0],
              isConnected: true,
            }));
          }
        };
        updateWalletState();
      }
    };

    const handleChainChanged: ChainChangedHandler = () => {
      window.location.reload();
    };

    const checkConnection = async () => {
      if (typeof window !== 'undefined' && window.ethereum) {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const accounts = await provider.send('eth_accounts', []);

          if (accounts.length > 0) {
            const signer = await provider.getSigner();
            const network = await provider.getNetwork();
            const chainId = Number(network.chainId);

            setWalletState({
              account: accounts[0],
              chainId,
              isConnected: true,
              isCorrectNetwork:
                chainId === CONTRACT_CONFIG.ETHEREUM_SEPOLIA.chainId,
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

    if (typeof window !== 'undefined' && window.ethereum) {
      window.ethereum.on(
        'accountsChanged',
        handleAccountsChanged as unknown as (...args: unknown[]) => void
      );
      window.ethereum.on(
        'chainChanged',
        handleChainChanged as unknown as (...args: unknown[]) => void
      );
    }

    return () => {
      if (typeof window !== 'undefined' && window.ethereum) {
        window.ethereum.removeListener(
          'accountsChanged',
          handleAccountsChanged as unknown as (...args: unknown[]) => void
        );
        window.ethereum.removeListener(
          'chainChanged',
          handleChainChanged as unknown as (...args: unknown[]) => void
        );
      }
    };
  }, [disconnectWallet]);

  const connectWallet = useCallback(async () => {
    if (isLoading || walletState.isConnected) return;

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
        isCorrectNetwork:
          chainId === CONTRACT_CONFIG.ETHEREUM_SEPOLIA.chainId,
        provider,
        signer,
      });
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'Gagal menghubungkan wallet';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, walletState.isConnected]);

  const switchToSepolia = useCallback(async () => {
    if (!window.ethereum) {
      setError('MetaMask tidak terinstall');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [
          { chainId: `0x${CONTRACT_CONFIG.ETHEREUM_SEPOLIA.chainId.toString(16)}` },
        ],
      });
    } catch (err: unknown) {
      const metaErr = err as MetaMaskError;
      if (metaErr.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [CONTRACT_CONFIG.ETHEREUM_SEPOLIA],
          });
        } catch (addErr: unknown) {
          const errorMessage =
            addErr instanceof Error ? addErr.message : 'Gagal menambahkan network Sepolia';
          setError(errorMessage);
        }
      } else {
        const errorMessage =
          metaErr instanceof Error ? metaErr.message : 'Gagal beralih ke network Sepolia';
        setError(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    ...walletState,
    isLoading,
    error,
    connectWallet,
    switchToSepolia,
    disconnectWallet,
  };
};
