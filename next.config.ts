import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'pub-cc461a5ef1d74c9981f6cba26292c8e3.r2.dev',
            },
        ],
    } /* config options here */,
}

export default nextConfig
