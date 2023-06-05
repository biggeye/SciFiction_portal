/** @type {import('next').NextConfig} */
const nextConfig = {
    rewrites: async () => {
      return [
        {
          source: '/api/xilabs/:path*',
          destination:
            process.env.NODE_ENV === 'development'
              ? 'http://127.0.0.1:5000/api/xilabs/:path*'
              : '/api/xilabs/',
        },
      ]
    },
  }
  
  module.exports = nextConfig