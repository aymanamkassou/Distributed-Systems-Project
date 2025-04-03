/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['images.unsplash.com', 'localhost'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'image-service',
        port: '3001',
        pathname: '/api/images/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3001',
        pathname: '/api/images/**',
      },
    ],
  },
};

module.exports = nextConfig; 