const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['via.placeholder.com'],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  // assetPrefix: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
}

module.exports = nextConfig
