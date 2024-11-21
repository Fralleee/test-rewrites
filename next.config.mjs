/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  crossOrigin: "anonymous",
  devIndicators: {
    buildActivity: false,
  },
  async rewrites() {
    return [
      {
        source: "/knowledge/:slug{/}?",
        destination: "/public-platform/knowledge/:slug/",
      },
    ];
  },
};

export default nextConfig;
