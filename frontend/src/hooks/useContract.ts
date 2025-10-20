'use client';

import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import { CONTRACT_CONFIG, Product, ProductBasicInfo } from '@/config/contract';

const CONTRACT_ADDRESS = CONTRACT_CONFIG.CONTRACT_ADDRESS;
const CONTRACT_ABI = CONTRACT_CONFIG.CONTRACT_ABI;

export const useContract = (provider: ethers.BrowserProvider | null) => { 
    const [contract, setContract] = useState<ethers.Contract | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // HANYA provider yang dimasukkan sebagai dependency
        if (provider && CONTRACT_ADDRESS) { 
            const contractInstance = new ethers.Contract(
                CONTRACT_ADDRESS, // Menggunakan variabel lokal yang stabil
                CONTRACT_ABI,     // Menggunakan variabel lokal yang stabil
                provider
            );
            setContract(contractInstance);
        } else {
            setContract(null);
        }
    // Hapus CONTRACT_ADDRESS dari dependency array
    // Provider adalah satu-satunya dependency yang diperlukan di sini
    }, [provider]); 

    const getProduct = useCallback(async (id: number): Promise<Product | null> => {
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
        } catch (err: unknown) { // Perbaikan: Menggunakan unknown
            const message = err instanceof Error ? err.message : 'Gagal mengambil data produk';
            setError(message);
            return null;
        } finally {
            setIsLoading(false);
        }
    }, [contract, setError, setIsLoading]);

    const getProductBasicInfo = useCallback(async (id: number): Promise<ProductBasicInfo | null> => {
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
        } catch (err: unknown) { // Perbaikan: Menggunakan unknown
            const message = err instanceof Error ? err.message : 'Gagal mengambil informasi dasar produk';
            setError(message);
            return null;
        } finally {
            setIsLoading(false);
        }
    }, [contract, setError, setIsLoading]);

    const getTotalProducts = useCallback(async (): Promise<number> => {
        if (!contract) {
            setError('Contract belum terhubung');
            return 0;
        }

        setIsLoading(true);
        setError(null);

        try {
            const total = await contract.getTotalProducts();
            return Number(total);
        } catch (err: unknown) { // Perbaikan: Menggunakan unknown
            const message = err instanceof Error ? err.message : 'Gagal mengambil jumlah total produk';
            setError(message);
            return 0;
        } finally {
            setIsLoading(false);
        }
    }, [contract, setError, setIsLoading]);

    const getAllProductIds = useCallback(async (): Promise<number[]> => {
        if (!contract) {
            setError('Contract belum terhubung');
            return [];
        }

        setIsLoading(true);
        setError(null);

        try {
            const total = await contract.getTotalProducts();
            const totalCount = Number(total);

            // Peningkatan Performa: Ambil semua ID secara konkuren
            const indexPromises = [];
            for (let i = 0; i < totalCount; i++) {
                indexPromises.push(contract.getProductIdByIndex(i));
            }
            
            const rawIds = await Promise.all(indexPromises);
            // Gunakan map untuk mengubah BigInt menjadi Number
            return rawIds.map((id: bigint) => Number(id));

        } catch (err: unknown) { // Perbaikan: Menggunakan unknown
            const message = err instanceof Error ? err.message : 'Gagal mengambil daftar ID produk';
            setError(message);
            return [];
        } finally {
            setIsLoading(false);
        }
    }, [contract, setError, setIsLoading]);

    const getAllProducts = useCallback(async (): Promise<Product[]> => {
        if (!contract) {
            setError('Contract belum terhubung');
            return [];
        }

        setIsLoading(true);
        setError(null);

        try {
            const productIds = await getAllProductIds();
            
            // Peningkatan Performa: Ambil semua detail produk secara konkuren
            const productPromises = productIds.map(id => getProduct(id));
            const products = await Promise.all(productPromises);
            
            return products.filter((product): product is Product => product !== null);

        } catch (err: unknown) { // Perbaikan: Menggunakan unknown
            const message = err instanceof Error ? err.message : 'Gagal mengambil semua produk';
            setError(message);
            return [];
        } finally {
            setIsLoading(false);
        }
    }, [contract, getAllProductIds, getProduct, setError, setIsLoading]);

    const getAllProductsBasicInfo = useCallback(async (): Promise<ProductBasicInfo[]> => {
        if (!contract) {
            setError('Contract belum terhubung');
            return [];
        }

        setIsLoading(true);
        setError(null);

        try {
            const productIds = await getAllProductIds();
            
            // Peningkatan Performa: Ambil semua info dasar secara konkuren
            const infoPromises = productIds.map(id => getProductBasicInfo(id));
            const products = await Promise.all(infoPromises);

            return products.filter((product): product is ProductBasicInfo => product !== null);
        } catch (err: unknown) { // Perbaikan: Menggunakan unknown
            const message = err instanceof Error ? err.message : 'Gagal mengambil informasi dasar semua produk';
            setError(message);
            return [];
        } finally {
            setIsLoading(false);
        }
    }, [contract, getAllProductIds, getProductBasicInfo, setError, setIsLoading]);

    const isProductVerified = useCallback(async (id: number): Promise<boolean> => {
        if (!contract) {
            setError('Contract belum terhubung');
            return false;
        }

        setIsLoading(true);
        setError(null);

        try {
            const verified = await contract.isProductVerified(id);
            return verified;
        } catch (err: unknown) { // Perbaikan: Menggunakan unknown
            const message = err instanceof Error ? err.message : 'Gagal memeriksa status verifikasi produk';
            setError(message);
            return false;
        } finally {
            setIsLoading(false);
        }
    }, [contract, setError, setIsLoading]);

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