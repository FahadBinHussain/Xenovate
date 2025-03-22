/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  poweredByHeader: false,
  images: {
    unoptimized: false,
    minimumCacheTTL: 60,
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': '.',
    };
    
    if (process.env.NODE_ENV === 'production') {
      config.optimization.splitChunks = {
        chunks: 'all',
        maxInitialRequests: 25,
        minSize: 20000,
      };
    }
    
    return config;
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.NODE_ENV === 'production' 
          ? 'https://xenovate-api.onrender.com/api/:path*' 
          : 'http://localhost:8000/api/:path*'
      }
    ];
  },
  // Add output config to optimize for production
  output: 'standalone'
}

module.exports = nextConfig 