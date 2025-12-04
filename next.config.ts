import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Production optimizations for Render */
  output: 'standalone',

  // Image optimization
  images: {
    unoptimized: true, // Disable image optimization for static export compatibility
  },

  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Disable source maps in production for smaller bundle
  productionBrowserSourceMaps: false,
};

export default nextConfig;
