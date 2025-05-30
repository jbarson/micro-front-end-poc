import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self' http://127.0.0.1:5500"
          }
        ]
      }
    ];
  }
};

export default nextConfig;
