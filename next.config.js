/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  // Temporarily disabled static export due to dynamic routes
  // output: 'export',
  // basePath: process.env.NODE_ENV === 'production' ? '/Ad-Platform' : '',
  // assetPrefix: process.env.NODE_ENV === 'production' ? '/Ad-Platform/' : '',
};

export default nextConfig;
