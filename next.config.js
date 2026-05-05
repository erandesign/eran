/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // 性能优化
    webpack: (config) => {
      config.optimization = {
        splitChunks: {
          chunks: 'all',
        }
      }
      return config;
    },
  },
};

module.exports = nextConfig