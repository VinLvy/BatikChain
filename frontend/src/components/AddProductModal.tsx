// NOT IN USE
'use client';

import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Image from 'next/image';

interface AddProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    signer: ethers.JsonRpcSigner | null;
}

interface FormData {
    productName: string;
    artisanName: string;
    technique: string;
    village: string;
    description: string;
    imageUrl: string;
    productionDate: string;
}

interface FormErrors {
    productName?: string;
    artisanName?: string;
    technique?: string;
    village?: string;
    description?: string;
    imageUrl?: string;
    productionDate?: string;
}

export const AddProductModal = ({ isOpen, onClose, onSuccess, signer }: AddProductModalProps) => {
    const [formData, setFormData] = useState<FormData>({
        productName: '',
        artisanName: '',
        technique: '',
        village: '',
        description: '',
        imageUrl: '',
        productionDate: new Date().toISOString().split('T')[0],
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    // Close on ESC key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && !isSubmitting) onClose();
        };
        if (isOpen) {
            window.addEventListener('keydown', handleEscape);
        }
        return () => window.removeEventListener('keydown', handleEscape);
    }, [isOpen, isSubmitting, onClose]);

    // Reset form when closed
    useEffect(() => {
        if (!isOpen) {
            setFormData({
                productName: '',
                artisanName: '',
                technique: '',
                village: '',
                description: '',
                imageUrl: '',
                productionDate: new Date().toISOString().split('T')[0],
            });
            setErrors({});
            setSubmitError(null);
            setImageFile(null);
            setImagePreview(null);
        }
    }, [isOpen]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user types
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                setErrors(prev => ({ ...prev, imageUrl: 'Please select a valid image file' }));
                return;
            }

            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                setErrors(prev => ({ ...prev, imageUrl: 'Image size must be less than 5MB' }));
                return;
            }

            setImageFile(file);
            
            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);

            // Clear error
            setErrors(prev => ({ ...prev, imageUrl: undefined }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.productName.trim()) {
            newErrors.productName = 'Product name is required';
        } else if (formData.productName.trim().length < 3) {
            newErrors.productName = 'Product name must be at least 3 characters';
        }

        if (!formData.artisanName.trim()) {
            newErrors.artisanName = 'Artisan name is required';
        } else if (formData.artisanName.trim().length < 3) {
            newErrors.artisanName = 'Artisan name must be at least 3 characters';
        }

        if (!formData.technique.trim()) {
            newErrors.technique = 'Technique is required';
        }

        if (!formData.village.trim()) {
            newErrors.village = 'Village/Location is required';
        }

        if (!formData.description.trim()) {
            newErrors.description = 'Description is required';
        } else if (formData.description.trim().length < 10) {
            newErrors.description = 'Description must be at least 10 characters';
        }

        if (!formData.productionDate) {
            newErrors.productionDate = 'Production date is required';
        }

        // Image validation (optional but recommended)
        if (!imageFile && !formData.imageUrl.trim()) {
            newErrors.imageUrl = 'Product image is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const uploadImageToIPFS = async (file: File): Promise<string> => {
        // Simulasi upload ke IPFS - Ganti dengan implementasi IPFS sebenarnya
        // Untuk saat ini, kita gunakan base64 atau placeholder
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                // Dalam production, upload ke IPFS atau cloud storage
                // resolve(`ipfs://${hash}`);
                resolve(reader.result as string);
            };
            reader.readAsDataURL(file);
        });
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

        try {
            // Upload image to IPFS if file selected
            let finalImageUrl = formData.imageUrl;
            if (imageFile) {
                finalImageUrl = await uploadImageToIPFS(imageFile);
            }

            // Get contract instance
            const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || 'YOUR_CONTRACT_ADDRESS';
            const CONTRACT_ABI = [
                // Add your contract ABI here
                "function registerProduct(string memory _productName, string memory _artisanName, string memory _technique, string memory _village, string memory _description, string memory _imageUrl, uint256 _productionDate) public returns (uint256)",
            ];

            const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

            // Convert date to Unix timestamp
            const productionTimestamp = Math.floor(new Date(formData.productionDate).getTime() / 1000);

            // Call smart contract
            const tx = await contract.registerProduct(
                formData.productName.trim(),
                formData.artisanName.trim(),
                formData.technique.trim(),
                formData.village.trim(),
                formData.description.trim(),
                finalImageUrl,
                productionTimestamp
            );

            // Wait for transaction confirmation
            await tx.wait();

            // Success!
            onSuccess();
            onClose();

        } catch (error: unknown) {
            console.error('Error registering product:', error);
            
            if (error instanceof Error) {
                if (error.message.includes('user rejected')) {
                    setSubmitError('Transaction was rejected by user');
                } else if (error.message.includes('insufficient funds')) {
                    setSubmitError('Insufficient funds for transaction');
                } else {
                    setSubmitError(error.message || 'Failed to register product. Please try again.');
                }
            } else {
                setSubmitError('An unexpected error occurred');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    const techniques = [
        'Batik Tulis',
        'Batik Cap',
        'Batik Printing',
        'Batik Kombinasi',
        'Batik Lukis',
    ];

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop */}
            <div 
                className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
                onClick={!isSubmitting ? onClose : undefined}
            ></div>

            {/* Modal */}
            <div className="flex min-h-full items-center justify-center p-4">
                <div className="relative w-full max-w-3xl">
                    {/* Glow Effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 rounded-3xl blur opacity-30 animate-pulse"></div>
                    
                    {/* Content */}
                    <div className="relative backdrop-blur-xl bg-gradient-to-br from-slate-900/95 to-blue-900/95 border border-white/20 rounded-3xl shadow-2xl overflow-hidden">
                        {/* Header */}
                        <div className="relative p-6 border-b border-white/10">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center border border-blue-400/30">
                                        <svg className="w-6 h-6 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-white">Add New Product</h2>
                                        <p className="text-blue-200/70 text-sm mt-0.5">Register a new batik product on blockchain</p>
                                    </div>
                                </div>

                                {/* Close Button */}
                                {!isSubmitting && (
                                    <button
                                        onClick={onClose}
                                        className="group/close"
                                    >
                                        <div className="relative">
                                            <div className="absolute inset-0 bg-red-500 rounded-full blur-lg opacity-0 group-hover/close:opacity-50 transition-opacity"></div>
                                            <div className="relative w-10 h-10 bg-white/10 hover:bg-red-500/20 border border-white/20 hover:border-red-400/40 rounded-full flex items-center justify-center backdrop-blur-sm transition-all">
                                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </div>
                                        </div>
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
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
                                {errors.productName && (
                                    <p className="mt-1.5 text-sm text-red-400 flex items-center space-x-1">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        <span>{errors.productName}</span>
                                    </p>
                                )}
                            </div>

                            {/* Grid: Artisan & Technique */}
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
                                    {errors.artisanName && (
                                        <p className="mt-1.5 text-sm text-red-400 flex items-center space-x-1">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            <span>{errors.artisanName}</span>
                                        </p>
                                    )}
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
                                    {errors.technique && (
                                        <p className="mt-1.5 text-sm text-red-400 flex items-center space-x-1">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            <span>{errors.technique}</span>
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Grid: Village & Production Date */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Village */}
                                <div>
                                    <label className="block text-sm font-semibold text-blue-200/80 mb-2">
                                        Village/Location <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="village"
                                        value={formData.village}
                                        onChange={handleInputChange}
                                        placeholder="e.g., Desa Trusmi, Cirebon"
                                        className={`w-full px-4 py-3 bg-white/5 border ${errors.village ? 'border-red-400/50' : 'border-white/10'} focus:border-cyan-400/50 rounded-xl text-white placeholder-blue-200/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all`}
                                        disabled={isSubmitting}
                                    />
                                    {errors.village && (
                                        <p className="mt-1.5 text-sm text-red-400 flex items-center space-x-1">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            <span>{errors.village}</span>
                                        </p>
                                    )}
                                </div>

                                {/* Production Date */}
                                <div>
                                    <label className="block text-sm font-semibold text-blue-200/80 mb-2">
                                        Production Date <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        name="productionDate"
                                        value={formData.productionDate}
                                        onChange={handleInputChange}
                                        max={new Date().toISOString().split('T')[0]}
                                        className={`w-full px-4 py-3 bg-white/5 border ${errors.productionDate ? 'border-red-400/50' : 'border-white/10'} focus:border-cyan-400/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all`}
                                        disabled={isSubmitting}
                                    />
                                    {errors.productionDate && (
                                        <p className="mt-1.5 text-sm text-red-400 flex items-center space-x-1">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            <span>{errors.productionDate}</span>
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-semibold text-blue-200/80 mb-2">
                                    Description <span className="text-red-400">*</span>
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    placeholder="Describe the product, materials used, unique features, etc..."
                                    rows={4}
                                    className={`w-full px-4 py-3 bg-white/5 border ${errors.description ? 'border-red-400/50' : 'border-white/10'} focus:border-cyan-400/50 rounded-xl text-white placeholder-blue-200/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all resize-none`}
                                    disabled={isSubmitting}
                                />
                                <div className="flex justify-between items-center mt-1.5">
                                    {errors.description ? (
                                        <p className="text-sm text-red-400 flex items-center space-x-1">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            <span>{errors.description}</span>
                                        </p>
                                    ) : (
                                        <span className="text-sm text-blue-200/50">Minimum 10 characters</span>
                                    )}
                                    <span className="text-sm text-blue-200/50">{formData.description.length} characters</span>
                                </div>
                            </div>

                            {/* Image Upload */}
                            <div>
                                <label className="block text-sm font-semibold text-blue-200/80 mb-2">
                                    Product Image <span className="text-red-400">*</span>
                                </label>
                                
                                {/* Image Preview */}
                                {imagePreview && (
                                    <div className="mb-4 relative">
                                        <div className="relative w-full h-48 rounded-xl overflow-hidden border border-white/10">
                                            <Image 
                                                src={imagePreview} 
                                                alt="Preview" 
                                                className="w-full h-full object-cover"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setImageFile(null);
                                                    setImagePreview(null);
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

                                {/* Upload Button */}
                                <label className={`block w-full px-4 py-8 bg-white/5 border-2 ${errors.imageUrl ? 'border-red-400/50' : 'border-dashed border-white/20'} hover:border-cyan-400/50 rounded-xl text-center cursor-pointer transition-all group`}>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
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
                                            <p className="text-white font-medium">Click to upload image</p>
                                            <p className="text-sm text-blue-200/50 mt-1">PNG, JPG, JPEG up to 5MB</p>
                                        </div>
                                    </div>
                                </label>
                                
                                {errors.imageUrl && (
                                    <p className="mt-1.5 text-sm text-red-400 flex items-center space-x-1">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        <span>{errors.imageUrl}</span>
                                    </p>
                                )}
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

                            {/* Action Buttons */}
                            <div className="flex gap-3 pt-4 border-t border-white/10">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    disabled={isSubmitting}
                                    className="flex-1 px-6 py-4 bg-white/5 hover:bg-white/10 disabled:bg-white/5 disabled:opacity-50 border border-white/20 hover:border-white/30 text-white rounded-xl font-semibold transition-all disabled:cursor-not-allowed"
                                >
                                    Cancel
                                </button>
                                
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex-1 relative group/btn"
                                >
                                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl blur opacity-50 group-hover/btn:opacity-75 transition"></div>
                                    <div className="relative bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 disabled:from-blue-800 disabled:to-cyan-800 text-white px-6 py-4 rounded-xl font-bold transition-all flex items-center justify-center space-x-2">
                                        {isSubmitting ? (
                                            <>
                                                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                                                <span>Processing...</span>
                                            </>
                                        ) : (
                                            <>
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                                <span>Register Product</span>
                                            </>
                                        )}
                                    </div>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};