const path = require('path')
const withPWA = require('next-pwa')
const withPlugins = require('next-compose-plugins')

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['via.placeholder.com', 'authjs.dev'],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  redirects: async () => [
    {
      source: '/:path*',
      has: [{ type: 'host', value: 'www.rangachat.com' }],
      destination: 'https://rangachat.com/:path*',
      permanent: true,
    },
  ],
}

module.exports = withPlugins(
  [
    withPWA({
      dest: 'public',
      register: true,
      skipWaiting: true,
      disable: process.env.NODE_ENV === 'development',
    }),
  ],
  nextConfig
)
