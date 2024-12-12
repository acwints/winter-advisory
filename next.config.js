/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['media1.tenor.com', 'images.squarespace-cdn.com']
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-eval' 'unsafe-inline' https://js.stripe.com https://assets.calendly.com;
              style-src 'self' 'unsafe-inline';
              font-src 'self' data: https://js.stripe.com;
              img-src 'self' data: blob: https: https://media1.tenor.com;
              frame-src 'self' https://js.stripe.com https://calendly.com;
              connect-src 'self' https://api.stripe.com https://assets.calendly.com;
            `.replace(/\s{2,}/g, ' ').trim()
          }
        ]
      }
    ]
  }
}

module.exports = nextConfig 