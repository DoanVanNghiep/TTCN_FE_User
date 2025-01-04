/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["192.168.1.29", "sununi.edu.vn", "storage.googleapis.com"],
  },
  output: "standalone"
};

module.exports = nextConfig;
