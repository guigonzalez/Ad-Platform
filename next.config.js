/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  // Static export disabled - using Vercel for deployment
  // This app requires dynamic routes and SSR features
};

export default nextConfig;
