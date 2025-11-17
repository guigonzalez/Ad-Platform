/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/Ad-Platform' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/Ad-Platform/' : '',
};

export default nextConfig;
