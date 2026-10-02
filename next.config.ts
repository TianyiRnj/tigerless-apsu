import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow any device on the current 10.0.0.x LAN to use the development server.
  allowedDevOrigins: ["10.0.0.*"],
};

export default nextConfig;
