import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Konfigurasi Anda yang sudah ada
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Konfigurasi yang perlu ditambahkan
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gateway.pinata.cloud', // <-- Izin untuk Pinata Gateway
        port: '',
        pathname: '/ipfs/**',
      },
      // Anda juga bisa menambahkan gateway ipfs.io jika diperlukan
      {
        protocol: 'https',
        hostname: 'ipfs.io',
        port: '',
        pathname: '/ipfs/**',
      },
    ],
  },
};

export default nextConfig;