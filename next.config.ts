import type { NextConfig } from "next";
import { hostname } from "os";

const nextConfig: NextConfig = {
  /* config options here */
  Images: {
    remotePatterns: [ 
      {
        protocol: "http",
        hostname: process.env.DOMAIN || "localhost",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ]
  }
};

export default nextConfig;
