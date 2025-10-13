'use client';

import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { CONTRACT_CONFIG, Product, ProductBasicInfo } from '@/config/contract';

export const useContract = (provider: ethers.BrowserProvider | null, signer: ethers.JsonRpcSigner | null) => {
    const [contract, setContract] = useState<ethers.Contract | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (provider && CONTRACT_CONFIG.CONTRACT_ADDRESS) {
            const contractInstance = new ethers.Contract(
                CONTRACT_CONFIG.CONTRACT_ADDRESS,
                CONTRACT_CONFIG.CONTRACT_ABI,
                provider
            );
            setContract(contractInstance);
        }
    }, [provider]);

    const getProduct = async (id: number): Promise<Product | null> => {
        if (!contract) {
            setError('Contract belum terhubung');
            return null;
        }

        setIsLoading(true);
        setError(null);

        try {
            const product = await contract.getProduct(id);
            return {
                id: Number(product.id),
                productName: product.productName,
                artisanName: product.artisanName,
                artisanAddress: product.artisanAddress,
                village: product.village,
                district: product.district,
                regency: product.regency,
                province: product.province,
                coordinates: product.coordinates,
                technique: product.technique,
                materials: product.materials,
                description: product.description,
                imageHash: product.imageHash,
                artisanImageHash: product.artisanImageHash,
                videoHash: product.videoHash,
                mintDate: Number(product.mintDate),
                isVerified: product.isVerified,
                verifiedBy: product.verifiedBy,
            };
        } catch (err: any) {
            setError(err.message || 'Gagal mengambil data produk');
            return null;
        } finally {
            setIsLoading(false);
        }
    };

    const getProductBasicInfo = async (id: number): Promise<ProductBasicInfo | null> => {
        if (!contract) {
            setError('Contract belum terhubung');
            return null;
        }

        setIsLoading(true);
        setError(null);

        try {
            const info = await contract.getProductBasicInfo(id);
            return {
                id: Number(info.id),
                productName: info.productName,
                artisanName: info.artisanName,
                village: info.village,
                technique: info.technique,
                isVerified: info.isVerified,
            };
        } catch (err: any) {
            setError(err.message || 'Gagal mengambil informasi dasar produk');
            return null;
        } finally {
            setIsLoading(false);
        }
    };

    const getTotalProducts = async (): Promise<number> => {
        if (!contract) {
            setError('Contract belum terhubung');
            return 0;
        }

        setIsLoading(true);
        setError(null);

        try {
            const total = await contract.getTotalProducts();
            return Number(total);
        } catch (err: any) {
            setError(err.message || 'Gagal mengambil jumlah total produk');
            return 0;
        } finally {
            setIsLoading(false);
        }
    };

    const getAllProductIds = async (): Promise<number[]> => {
        if (!contract) {
            setError('Contract belum terhubung');
            return [];
        }

        setIsLoading(true);
        setError(null);

        try {
            const total = await contract.getTotalProducts();
            const productIds: number[] = [];

            for (let i = 0; i < Number(total); i++) {
                const id = await contract.getProductIdByIndex(i);
                productIds.push(Number(id));
            }

            return productIds;
        } catch (err: any) {
            setError(err.message || 'Gagal mengambil daftar ID produk');
            return [];
        } finally {
            setIsLoading(false);
        }
    };

    const getAllProducts = async (): Promise<Product[]> => {
        if (!contract) {
            setError('Contract belum terhubung');
            return [];
        }

        setIsLoading(true);
        setError(null);

        try {
            const productIds = await getAllProductIds();
            const products: Product[] = [];

            for (const id of productIds) {
                const product = await getProduct(id);
                if (product) {
                    products.push(product);
                }
            }

            return products;
        } catch (err: any) {
            setError(err.message || 'Gagal mengambil semua produk');
            return [];
        } finally {
            setIsLoading(false);
        }
    };

    const getAllProductsBasicInfo = async (): Promise<ProductBasicInfo[]> => {
        if (!contract) {
            setError('Contract belum terhubung');
            return [];
        }

        setIsLoading(true);
        setError(null);

        try {
            const productIds = await getAllProductIds();
            const products: ProductBasicInfo[] = [];

            for (const id of productIds) {
                const product = await getProductBasicInfo(id);
                if (product) {
                    products.push(product);
                }
            }

            return products;
        } catch (err: any) {
            setError(err.message || 'Gagal mengambil informasi dasar semua produk');
            return [];
        } finally {
            setIsLoading(false);
        }
    };

    const isProductVerified = async (id: number): Promise<boolean> => {
        if (!contract) {
            setError('Contract belum terhubung');
            return false;
        }

        setIsLoading(true);
        setError(null);

        try {
            const verified = await contract.isProductVerified(id);
            return verified;
        } catch (err: any) {
            setError(err.message || 'Gagal memeriksa status verifikasi produk');
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        contract,
        isLoading,
        error,
        getProduct,
        getProductBasicInfo,
        getTotalProducts,
        getAllProductIds,
        getAllProducts,
        getAllProductsBasicInfo,
        isProductVerified,
    };
};
