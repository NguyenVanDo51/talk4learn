const path = require('path')

const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self';
  child-src example.com;
  style-src 'self' example.com;
  font-src 'self';
`

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

module.exports = nextConfig
