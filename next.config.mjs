/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['fustudy.azurewebsites.net'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.google.com",
        port: "",
        pathname: "/**", // Allow any path under www.google.com
      },
      {
        // Add this new pattern for Firebase Storage
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        port: "",
        pathname: "/**", // Allow any path under firebasestorage.googleapis.com
      },
      {
        // Add this new pattern for Firebase Storage
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "**", // Allow any path under firebasestorage.googleapis.com
      },
    ],
  },
};

export default nextConfig;
