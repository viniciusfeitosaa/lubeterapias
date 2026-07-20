import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/sobre-nos", destination: "/sobre", permanent: true },
      { source: "/sobre-nos/", destination: "/sobre", permanent: true },
      { source: "/home", destination: "/", permanent: true },
      { source: "/home/", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
