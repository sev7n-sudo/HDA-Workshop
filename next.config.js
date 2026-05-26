module.exports = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'example.com' },
    ],
  },
  env: {
    API_URL: process.env.API_URL || 'http://localhost:3000/api',
  },
  turbopack: {},
};