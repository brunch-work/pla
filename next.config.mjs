/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: import.meta.dirname,
  experimental: {
    globalNotFound: true,
    viewTransition: true,
  }
};

export default nextConfig;
