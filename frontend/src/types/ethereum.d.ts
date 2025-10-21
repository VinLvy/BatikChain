// src/types/ethereum.d.ts

interface EthereumProvider {
  request<T = unknown>(args: {
    method: string;
    params?: unknown[] | Record<string, unknown>;
  }): Promise<T>;

  on(
    event: 'accountsChanged' | 'chainChanged' | string,
    handler: (...args: unknown[]) => void
  ): void;

  removeListener(
    event: 'accountsChanged' | 'chainChanged' | string,
    handler: (...args: unknown[]) => void
  ): void;

  isMetaMask?: boolean;
  selectedAddress?: string;
  chainId?: string;
}

declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}

export {};
