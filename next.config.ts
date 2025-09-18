import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensure Turbopack uses the project directory as the workspace root.
  // This avoids the warning about Next.js inferring a parent workspace root
  // when multiple lockfiles exist on the machine.
  turbopack: {
    root: path.resolve(__dirname),
  },

  // Added this block to allow images from 'placehold.co'
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'static.nike.com', // <-- The correct hostname
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;