/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "pub-bbdb2d33edfb41be8fc4feb226b98557.r2.dev",
            },
        ],
    },
    experimental : {
        serverComponentsExternalPackages: ['@aws-sdk']
    }
};

export default nextConfig;
