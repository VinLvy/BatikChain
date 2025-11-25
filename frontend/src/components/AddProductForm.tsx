'use client';

import { useState } from 'react';
import { ethers } from 'ethers';
import Image from 'next/image';

interface AddProductFormProps {
    signer: ethers.JsonRpcSigner | null;
    onSuccess: () => void;
}

interface FormData {
    id: string;
    productName: string;
    artisanName: string;
    artisanAddress: string;
    village: string;
    district: string;
    regency: string;
    province: string;
    coordinates: string;
    technique: string;
    materials: string;
    description: string;
}

interface FormErrors {
    [key: string]: string;
}

export const AddProductForm = ({ signer, onSuccess }: AddProductFormProps) => {
    const [formData, setFormData] = useState<FormData>({
        id: '',
        productName: '',
        artisanName: '',
        artisanAddress: '',
        village: '',
        district: '',
        regency: '',
        province: '',
        coordinates: '',
        technique: '',
        materials: '',
        description: '',
    });

    const [productImage, setProductImage] = useState<File | null>(null);
    const [productImagePreview, setProductImagePreview] = useState<string | null>(null);
    const [artisanImage, setArtisanImage] = useState<File | null>(null);
    const [artisanImagePreview, setArtisanImagePreview] = useState<string | null>(null);
    const [video, setVideo] = useState<File | null>(null);
    const [videoPreview, setVideoPreview] = useState<string | null>(null);

    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const techniques = [
        'Batik Tulis',
        'Batik Cap',
        'Batik Printing',
        'Batik Kombinasi',
        'Batik Lukis',
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'product' | 'artisan') => {
        const file = e.target.files?.[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                setErrors(prev => ({ ...prev, [`${type}Image`]: 'Please select a valid image file' }));
                return;
            }
            if (file.size > 5 * 1024 * 1024) {
                setErrors(prev => ({ ...prev, [`${type}Image`]: 'Image size must be less than 5MB' }));
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                if (type === 'product') {
                    setProductImage(file);
                    setProductImagePreview(reader.result as string);
                } else {
                    setArtisanImage(file);
                    setArtisanImagePreview(reader.result as string);
                }
            };
            reader.readAsDataURL(file);
            setErrors(prev => ({ ...prev, [`${type}Image`]: '' }));
        }
    };

    const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (!file.type.startsWith('video/')) {
                setErrors(prev => ({ ...prev, video: 'Please select a valid video file' }));
                return;
            }
            if (file.size > 50 * 1024 * 1024) {
                setErrors(prev => ({ ...prev, video: 'Video size must be less than 50MB' }));
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setVideo(file);
                setVideoPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
            setErrors(prev => ({ ...prev, video: '' }));
        }
    };

    const uploadToIPFS = async (file: File): Promise<string> => {
        // Placeholder for IPFS upload
        // In production, integrate with Pinata, NFT.Storage, or Web3.Storage
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                // Simulate IPFS hash
                const hash = `ipfs://Qm${Math.random().toString(36).substring(2, 15)}`;
                resolve(hash);
            };
            reader.readAsDataURL(file);
        });
    };

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.id.trim() || isNaN(Number(formData.id)) || Number(formData.id) <= 0) {
            newErrors.id = 'Valid product ID is required (must be a positive number)';
        }
        if (!formData.productName.trim()) newErrors.productName = 'Product name is required';
        if (!formData.artisanName.trim()) newErrors.artisanName = 'Artisan name is required';
        if (!formData.village.trim()) newErrors.village = 'Village is required';
        if (!formData.technique) newErrors.technique = 'Technique is required';
        if (!formData.description.trim() || formData.description.trim().length < 10) {
            newErrors.description = 'Description must be at least 10 characters';
        }
        if (!productImage) newErrors.productImage = 'Product image is required';
        if (!artisanImage) newErrors.artisanImage = 'Artisan image is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        if (!signer) {
            setSubmitError('Wallet not connected. Please connect your wallet first.');
            return;
        }

        setIsSubmitting(true);
        setSubmitError(null);
        setSubmitSuccess(false);

        try {
            // Upload files to IPFS
            const productImageHash = productImage ? await uploadToIPFS(productImage) : '';
            const artisanImageHash = artisanImage ? await uploadToIPFS(artisanImage) : '';
            const videoHash = video ? await uploadToIPFS(video) : '';

            // Get contract instance
            const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '';
            const CONTRACT_ABI = [
                "function addProduct(uint256 _id, string memory _productName, string memory _artisanName, string memory _artisanAddress, string memory _village, string memory _district, string memory _regency, string memory _province, string memory _coordinates, string memory _technique, string memory _materials, string memory _description, string memory _imageHash, string memory _artisanImageHash, string memory _videoHash) external",
            ];

            const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

            // Call smart contract
            const tx = await contract.addProduct(
                Number(formData.id),
                formData.productName.trim(),
                formData.artisanName.trim(),
                formData.artisanAddress.trim(),
                formData.village.trim(),
                formData.district.trim(),
                formData.regency.trim(),
                formData.province.trim(),
                formData.coordinates.trim(),
                formData.technique.trim(),
                formData.materials.trim(),
                formData.description.trim(),
                productImageHash,
                artisanImageHash,
                videoHash
            );

            // Wait for transaction confirmation
            await tx.wait();

            // Success!
            setSubmitSuccess(true);
            setTimeout(() => {
                onSuccess();
            }, 2000);

        } catch (error: unknown) {
            console.error('Error adding product:', error);

            if (error instanceof Error) {
                if (error.message.includes('user rejected')) {
                    setSubmitError('Transaction was rejected by user');
                } else if (error.message.includes('insufficient funds')) {
                    setSubmitError('Insufficient funds for transaction');
                } else if (error.message.includes('already exists')) {
                    setSubmitError('Product ID already exists. Please use a different ID.');
                } else {
                    setSubmitError(error.message || 'Failed to add product. Please try again.');
                }
            } else {
                setSubmitError('An unexpected error occurred');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            {/* Success Message */}
            {submitSuccess && (
                <div className="bg-green-500/10 border border-green-400/30 rounded-xl p-4">
                    <div className="flex items-start space-x-3">
                        <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <p className="text-green-300 text-sm">Product added successfully! Redirecting...</p>
                    </div>
                </div>
            )}

            {/* Product Information Section */}
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                    <svg className="w-6 h-6 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                    </svg>
                    <span>Product Information</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Product ID */}
                    <div>
                        <label className="block text-sm font-semibold text-blue-200/80 mb-2">
                            Product ID <span className="text-red-400">*</span>
                        </label>
                        <input
                            type="number"
                            name="id"
                            value={formData.id}
                            onChange={handleInputChange}
                            placeholder="e.g., 1001"
                            className={`w-full px-4 py-3 bg-white/5 border ${errors.id ? 'border-red-400/50' : 'border-white/10'} focus:border-cyan-400/50 rounded-xl text-white placeholder-blue-200/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all`}
                            disabled={isSubmitting}
                        />
                        {errors.id && <p className="mt-1.5 text-sm text-red-400">{errors.id}</p>}
                    </div>

                    {/* Product Name */}
                    <div>
                        <label className="block text-sm font-semibold text-blue-200/80 mb-2">
                            Product Name <span className="text-red-400">*</span>
                        </label>
                        <input
                            type="text"
                            name="productName"
                            value={formData.productName}
                            onChange={handleInputChange}
                            placeholder="e.g., Batik Mega Mendung Premium"
                            className={`w-full px-4 py-3 bg-white/5 border ${errors.productName ? 'border-red-400/50' : 'border-white/10'} focus:border-cyan-400/50 rounded-xl text-white placeholder-blue-200/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all`}
                            disabled={isSubmitting}
                        />
                        {errors.productName && <p className="mt-1.5 text-sm text-red-400">{errors.productName}</p>}
                    </div>

                    {/* Technique */}
                    <div>
                        <label className="block text-sm font-semibold text-blue-200/80 mb-2">
                            Technique <span className="text-red-400">*</span>
                        </label>
                        <select
                            name="technique"
                            value={formData.technique}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 bg-white/5 border ${errors.technique ? 'border-red-400/50' : 'border-white/10'} focus:border-cyan-400/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all appearance-none cursor-pointer`}
                            style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2393C5FD'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'right 0.75rem center',
                                backgroundSize: '1.25rem'
                            }}
                            disabled={isSubmitting}
                        >
                            <option value="" className="bg-slate-800">Select Technique</option>
                            {techniques.map(tech => (
                                <option key={tech} value={tech} className="bg-slate-800">{tech}</option>
                            ))}
                        </select>
                        {errors.technique && <p className="mt-1.5 text-sm text-red-400">{errors.technique}</p>}
                    </div>

                    {/* Materials */}
                    <div>
                        <label className="block text-sm font-semibold text-blue-200/80 mb-2">
                            Materials
                        </label>
                        <input
                            type="text"
                            name="materials"
                            value={formData.materials}
                            onChange={handleInputChange}
                            placeholder="e.g., Cotton, Natural Dyes"
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 focus:border-cyan-400/50 rounded-xl text-white placeholder-blue-200/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all"
                            disabled={isSubmitting}
                        />
                    </div>
                </div>

                {/* Description */}
                <div className="mt-4">
                    <label className="block text-sm font-semibold text-blue-200/80 mb-2">
                        Description <span className="text-red-400">*</span>
                    </label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Describe the product, unique features, cultural significance..."
                        rows={4}
                        className={`w-full px-4 py-3 bg-white/5 border ${errors.description ? 'border-red-400/50' : 'border-white/10'} focus:border-cyan-400/50 rounded-xl text-white placeholder-blue-200/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all resize-none`}
                        disabled={isSubmitting}
                    />
                    {errors.description && <p className="mt-1.5 text-sm text-red-400">{errors.description}</p>}
                </div>
            </div>

            {/* Artisan Information Section */}
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                    <svg className="w-6 h-6 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                    <span>Artisan Information</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Artisan Name */}
                    <div>
                        <label className="block text-sm font-semibold text-blue-200/80 mb-2">
                            Artisan Name <span className="text-red-400">*</span>
                        </label>
                        <input
                            type="text"
                            name="artisanName"
                            value={formData.artisanName}
                            onChange={handleInputChange}
                            placeholder="e.g., Ibu Siti Aminah"
                            className={`w-full px-4 py-3 bg-white/5 border ${errors.artisanName ? 'border-red-400/50' : 'border-white/10'} focus:border-cyan-400/50 rounded-xl text-white placeholder-blue-200/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all`}
                            disabled={isSubmitting}
                        />
                        {errors.artisanName && <p className="mt-1.5 text-sm text-red-400">{errors.artisanName}</p>}
                    </div>

                    {/* Artisan Address */}
                    <div>
                        <label className="block text-sm font-semibold text-blue-200/80 mb-2">
                            Artisan Address
                        </label>
                        <input
                            type="text"
                            name="artisanAddress"
                            value={formData.artisanAddress}
                            onChange={handleInputChange}
                            placeholder="e.g., Jl. Batik No. 123"
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 focus:border-cyan-400/50 rounded-xl text-white placeholder-blue-200/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all"
                            disabled={isSubmitting}
                        />
                    </div>
                </div>
            </div>

            {/* Location Information Section */}
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                    <svg className="w-6 h-6 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span>Location Information</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Village */}
                    <div>
                        <label className="block text-sm font-semibold text-blue-200/80 mb-2">
                            Village <span className="text-red-400">*</span>
                        </label>
                        <input
                            type="text"
                            name="village"
                            value={formData.village}
                            onChange={handleInputChange}
                            placeholder="e.g., Desa Trusmi"
                            className={`w-full px-4 py-3 bg-white/5 border ${errors.village ? 'border-red-400/50' : 'border-white/10'} focus:border-cyan-400/50 rounded-xl text-white placeholder-blue-200/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all`}
                            disabled={isSubmitting}
                        />
                        {errors.village && <p className="mt-1.5 text-sm text-red-400">{errors.village}</p>}
                    </div>

                    {/* District */}
                    <div>
                        <label className="block text-sm font-semibold text-blue-200/80 mb-2">
                            District
                        </label>
                        <input
                            type="text"
                            name="district"
                            value={formData.district}
                            onChange={handleInputChange}
                            placeholder="e.g., Plered"
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 focus:border-cyan-400/50 rounded-xl text-white placeholder-blue-200/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all"
                            disabled={isSubmitting}
                        />
                    </div>

                    {/* Regency */}
                    <div>
                        <label className="block text-sm font-semibold text-blue-200/80 mb-2">
                            Regency
                        </label>
                        <input
                            type="text"
                            name="regency"
                            value={formData.regency}
                            onChange={handleInputChange}
                            placeholder="e.g., Cirebon"
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 focus:border-cyan-400/50 rounded-xl text-white placeholder-blue-200/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all"
                            disabled={isSubmitting}
                        />
                    </div>

                    {/* Province */}
                    <div>
                        <label className="block text-sm font-semibold text-blue-200/80 mb-2">
                            Province
                        </label>
                        <input
                            type="text"
                            name="province"
                            value={formData.province}
                            onChange={handleInputChange}
                            placeholder="e.g., Jawa Barat"
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 focus:border-cyan-400/50 rounded-xl text-white placeholder-blue-200/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all"
                            disabled={isSubmitting}
                        />
                    </div>

                    {/* Coordinates */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-blue-200/80 mb-2">
                            GPS Coordinates
                        </label>
                        <input
                            type="text"
                            name="coordinates"
                            value={formData.coordinates}
                            onChange={handleInputChange}
                            placeholder="e.g., -6.7063, 108.5571"
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 focus:border-cyan-400/50 rounded-xl text-white placeholder-blue-200/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all"
                            disabled={isSubmitting}
                        />
                        <p className="mt-1.5 text-xs text-blue-200/50">Format: latitude, longitude</p>
                    </div>
                </div>
            </div>

            {/* Media Upload Section */}
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                    <svg className="w-6 h-6 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                    </svg>
                    <span>Media Upload</span>
                </h3>

                <div className="space-y-4">
                    {/* Product Image */}
                    <div>
                        <label className="block text-sm font-semibold text-blue-200/80 mb-2">
                            Product Image <span className="text-red-400">*</span>
                        </label>
                        {productImagePreview && (
                            <div className="mb-4 relative">
                                <div className="relative w-full h-48 rounded-xl overflow-hidden border border-white/10">
                                    <Image src={productImagePreview} alt="Product Preview" fill className="object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setProductImage(null);
                                            setProductImagePreview(null);
                                        }}
                                        className="absolute top-2 right-2 p-2 bg-red-500/80 hover:bg-red-500 rounded-lg transition-colors"
                                    >
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        )}
                        <label className={`block w-full px-4 py-8 bg-white/5 border-2 ${errors.productImage ? 'border-red-400/50' : 'border-dashed border-white/20'} hover:border-cyan-400/50 rounded-xl text-center cursor-pointer transition-all group`}>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageChange(e, 'product')}
                                className="hidden"
                                disabled={isSubmitting}
                            />
                            <div className="flex flex-col items-center space-y-3">
                                <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center group-hover:bg-cyan-500/30 transition-colors">
                                    <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-white font-medium">Upload Product Image</p>
                                    <p className="text-sm text-blue-200/50 mt-1">PNG, JPG, JPEG up to 5MB</p>
                                </div>
                            </div>
                        </label>
                        {errors.productImage && <p className="mt-1.5 text-sm text-red-400">{errors.productImage}</p>}
                    </div>

                    {/* Artisan Image */}
                    <div>
                        <label className="block text-sm font-semibold text-blue-200/80 mb-2">
                            Artisan Image <span className="text-red-400">*</span>
                        </label>
                        {artisanImagePreview && (
                            <div className="mb-4 relative">
                                <div className="relative w-full h-48 rounded-xl overflow-hidden border border-white/10">
                                    <Image src={artisanImagePreview} alt="Artisan Preview" fill className="object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setArtisanImage(null);
                                            setArtisanImagePreview(null);
                                        }}
                                        className="absolute top-2 right-2 p-2 bg-red-500/80 hover:bg-red-500 rounded-lg transition-colors"
                                    >
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        )}
                        <label className={`block w-full px-4 py-8 bg-white/5 border-2 ${errors.artisanImage ? 'border-red-400/50' : 'border-dashed border-white/20'} hover:border-cyan-400/50 rounded-xl text-center cursor-pointer transition-all group`}>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageChange(e, 'artisan')}
                                className="hidden"
                                disabled={isSubmitting}
                            />
                            <div className="flex flex-col items-center space-y-3">
                                <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center group-hover:bg-cyan-500/30 transition-colors">
                                    <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-white font-medium">Upload Artisan Photo</p>
                                    <p className="text-sm text-blue-200/50 mt-1">PNG, JPG, JPEG up to 5MB</p>
                                </div>
                            </div>
                        </label>
                        {errors.artisanImage && <p className="mt-1.5 text-sm text-red-400">{errors.artisanImage}</p>}
                    </div>

                    {/* Video Upload */}
                    <div>
                        <label className="block text-sm font-semibold text-blue-200/80 mb-2">
                            Process Video (Optional)
                        </label>
                        {videoPreview && (
                            <div className="mb-4 relative">
                                <div className="relative w-full h-48 rounded-xl overflow-hidden border border-white/10 bg-black">
                                    <video src={videoPreview} controls className="w-full h-full object-contain" />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setVideo(null);
                                            setVideoPreview(null);
                                        }}
                                        className="absolute top-2 right-2 p-2 bg-red-500/80 hover:bg-red-500 rounded-lg transition-colors"
                                    >
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        )}
                        <label className={`block w-full px-4 py-8 bg-white/5 border-2 ${errors.video ? 'border-red-400/50' : 'border-dashed border-white/20'} hover:border-cyan-400/50 rounded-xl text-center cursor-pointer transition-all group`}>
                            <input
                                type="file"
                                accept="video/*"
                                onChange={handleVideoChange}
                                className="hidden"
                                disabled={isSubmitting}
                            />
                            <div className="flex flex-col items-center space-y-3">
                                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center group-hover:bg-purple-500/30 transition-colors">
                                    <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-white font-medium">Upload Process Video</p>
                                    <p className="text-sm text-blue-200/50 mt-1">MP4, MOV, AVI up to 50MB</p>
                                </div>
                            </div>
                        </label>
                        {errors.video && <p className="mt-1.5 text-sm text-red-400">{errors.video}</p>}
                    </div>
                </div>
            </div>

            {/* Submit Error */}
            {submitError && (
                <div className="bg-red-500/10 border border-red-400/30 rounded-xl p-4">
                    <div className="flex items-start space-x-3">
                        <svg className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        <p className="text-red-300 text-sm">{submitError}</p>
                    </div>
                </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="relative group/btn px-8 py-4"
                >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl blur opacity-50 group-hover/btn:opacity-75 transition"></div>
                    <div className="relative bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 disabled:from-blue-800 disabled:to-cyan-800 text-white px-8 py-4 rounded-xl font-bold transition-all flex items-center justify-center space-x-2">
                        {isSubmitting ? (
                            <>
                                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                                <span>Adding to Blockchain...</span>
                            </>
                        ) : (
                            <>
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>Add Product to Blockchain</span>
                            </>
                        )}
                    </div>
                </button>
            </div>
        </form>
    );
};
