import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  images: {
    remotePatterns: [
      {
        hostname: "images.unsplash.com",
        protocol: "https",
        port: ""
      },
      //production
      {
        hostname: "diligent-nightingale-615.convex.cloud",
        protocol: "https",
        port: ""
      }
      // development
      // {
      //   hostname: "giddy-greyhound-267.convex.cloud",
      //   protocol: "https",
      //   port: ""
      // }
    ]
  }
};

export default nextConfig;
