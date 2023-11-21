const path = require('path')
const withPWA = require('next-pwa')
const withPlugins = require('next-compose-plugins')

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: [
      "via.placeholder.com",
      "authjs.dev",
      "img.icons8.com",
      "lh3.googleusercontent.com",
      "res.cloudinary.com",
      "img.clerk.com",
    ],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },

  redirects: async () => [
    {
      source: "/:path*",
      has: [{ type: "host", value: "www.rangachat.com" }],
      destination: "https://rangachat.com/:path*",
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
