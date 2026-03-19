import type { NextConfig } from 'next';

const isStaging = process.env.NEXT_PUBLIC_SITE_URL?.includes('staging');

const nextConfig: NextConfig = {
  reactStrictMode: true,
  ...(isStaging && { output: 'export' }),
};

export default nextConfig;
