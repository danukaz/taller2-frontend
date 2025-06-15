import type { NextConfig } from "next";
import { hostname } from "os";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [ 
      {
        protocol: "http",
        hostname: process.env.DOMAIN || "localhost",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
    domains: [
      "res.cloudinary.com",
    ]
  }
};

export default nextConfig;
