/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Mobile optimization
  compress: true,
  poweredByHeader: false,
  // Reduce bundle size for mobile
  experimental: {
    optimizeCss: true,
  },
}

module.exports = nextConfig 