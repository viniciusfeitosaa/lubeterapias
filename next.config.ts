import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/sobre-nos", destination: "/sobre", permanent: true },
      { source: "/sobre-nos/", destination: "/sobre", permanent: true },
      { source: "/home", destination: "/", permanent: true },
      { source: "/home/", destination: "/", permanent: true },
      { source: "/unidades", destination: "/contato", permanent: true },
      { source: "/unidades/", destination: "/contato", permanent: true },
    ];
  },
};

export default nextConfig;
