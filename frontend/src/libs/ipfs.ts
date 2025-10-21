/**
 * IPFS Upload Helper
 * 
 * Untuk production, gunakan salah satu provider:
 * 1. Pinata (https://pinata.cloud)
 * 2. NFT.Storage (https://nft.storage)
 * 3. Web3.Storage (https://web3.storage)
 * 4. Infura IPFS (https://infura.io)
 */

// ===== OPTION 1: Using Pinata =====
export const uploadToPinata = async (file: File): Promise<string> => {
    const PINATA_API_KEY = process.env.NEXT_PUBLIC_PINATA_API_KEY;
    const PINATA_SECRET_KEY = process.env.NEXT_PUBLIC_PINATA_SECRET_KEY;

    if (!PINATA_API_KEY || !PINATA_SECRET_KEY) {
        throw new Error('Pinata API keys not configured');
    }

    const formData = new FormData();
    formData.append('file', file);

    const metadata = JSON.stringify({
        name: file.name,
        keyvalues: {
            uploadedBy: 'BatikChain',
            timestamp: Date.now().toString()
        }
    });
    formData.append('pinataMetadata', metadata);

    const options = JSON.stringify({
        cidVersion: 1,
    });
    formData.append('pinataOptions', options);

    try {
        const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
            method: 'POST',
            headers: {
                'pinata_api_key': PINATA_API_KEY,
                'pinata_secret_api_key': PINATA_SECRET_KEY,
            },
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Failed to upload to Pinata');
        }

        const data = await response.json();
        return `ipfs://${data.IpfsHash}`;
    } catch (error) {
        console.error('Pinata upload error:', error);
        throw error;
    }
};

// ===== OPTION 2: Using NFT.Storage =====
export const uploadToNFTStorage = async (file: File): Promise<string> => {
    const NFT_STORAGE_KEY = process.env.NEXT_PUBLIC_NFT_STORAGE_KEY;

    if (!NFT_STORAGE_KEY) {
        throw new Error('NFT.Storage API key not configured');
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch('https://api.nft.storage/upload', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${NFT_STORAGE_KEY}`,
            },
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Failed to upload to NFT.Storage');
        }

        const data = await response.json();
        return `ipfs://${data.value.cid}`;
    } catch (error) {
        console.error('NFT.Storage upload error:', error);
        throw error;
    }
};

// ===== OPTION 3: Using Web3.Storage =====
export const uploadToWeb3Storage = async (file: File): Promise<string> => {
    const WEB3_STORAGE_KEY = process.env.NEXT_PUBLIC_WEB3_STORAGE_KEY;

    if (!WEB3_STORAGE_KEY) {
        throw new Error('Web3.Storage API key not configured');
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch('https://api.web3.storage/upload', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${WEB3_STORAGE_KEY}`,
            },
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Failed to upload to Web3.Storage');
        }

        const data = await response.json();
        return `ipfs://${data.cid}`;
    } catch (error) {
        console.error('Web3.Storage upload error:', error);
        throw error;
    }
};

// ===== OPTION 4: Local Base64 (Development Only) =====
export const convertToBase64 = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            resolve(reader.result as string);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

// ===== Main Upload Function =====
export const uploadImage = async (file: File): Promise<string> => {
    // Validate file
    if (!file.type.startsWith('image/')) {
        throw new Error('File must be an image');
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB
        throw new Error('File size must be less than 5MB');
    }

    try {
        // Choose your preferred method:
        // return await uploadToPinata(file);
        // return await uploadToNFTStorage(file);
        // return await uploadToWeb3Storage(file);
        
        // For development, use base64
        return await convertToBase64(file);
    } catch (error) {
        console.error('Image upload failed:', error);
        throw new Error('Failed to upload image. Please try again.');
    }
};

// ===== IPFS Gateway URL Converter =====
export const getIPFSUrl = (ipfsUrl: string): string => {
    if (!ipfsUrl) return '';
    
    // If already HTTP URL, return as is
    if (ipfsUrl.startsWith('http')) {
        return ipfsUrl;
    }
    
    // Convert ipfs:// to HTTP gateway
    if (ipfsUrl.startsWith('ipfs://')) {
        const hash = ipfsUrl.replace('ipfs://', '');
        
        // Choose your preferred IPFS gateway:
        // return `https://ipfs.io/ipfs/${hash}`;
        // return `https://cloudflare-ipfs.com/ipfs/${hash}`;
        // return `https://gateway.pinata.cloud/ipfs/${hash}`;
        return `https://ipfs.io/ipfs/${hash}`;
    }
    
    // If base64, return as is
    if (ipfsUrl.startsWith('data:')) {
        return ipfsUrl;
    }
    
    return ipfsUrl;
};

// ===== Compress Image Before Upload =====
export const compressImage = async (file: File, maxWidth: number = 1200): Promise<File> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target?.result as string;
            
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;
                
                // Calculate new dimensions
                if (width > maxWidth) {
                    height = (height * maxWidth) / width;
                    width = maxWidth;
                }
                
                canvas.width = width;
                canvas.height = height;
                
                const ctx = canvas.getContext('2d');
                if (!ctx) {
                    reject(new Error('Failed to get canvas context'));
                    return;
                }
                
                ctx.drawImage(img, 0, 0, width, height);
                
                canvas.toBlob(
                    (blob) => {
                        if (!blob) {
                            reject(new Error('Failed to compress image'));
                            return;
                        }
                        
                        const compressedFile = new File([blob], file.name, {
                            type: file.type,
                            lastModified: Date.now(),
                        });
                        
                        resolve(compressedFile);
                    },
                    file.type,
                    0.8 // Quality 80%
                );
            };
            
            img.onerror = () => reject(new Error('Failed to load image'));
        };
        
        reader.onerror = () => reject(new Error('Failed to read file'));
    });
};