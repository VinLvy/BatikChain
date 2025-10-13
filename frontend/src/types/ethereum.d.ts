// Type definitions for MetaMask window.ethereum

interface EthereumProvider {
    request(args: { method: string; params?: any[] }): Promise<any>;
    on(event: string, handler: (...args: any[]) => void): void;
    removeListener(event: string, handler: (...args: any[]) => void): void;
    isMetaMask?: boolean;
    selectedAddress?: string;
    chainId?: string;
}

declare global {
    interface Window {
        ethereum?: EthereumProvider;
    }
}

export { };
