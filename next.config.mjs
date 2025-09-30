/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'aiworkeditprotips.net' }], // 非 www
        destination: 'https://www.aiworkeditprotips.net/:path*',
        permanent: true,
      },
    ];
  },
}

export default nextConfig
