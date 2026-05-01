import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Whitelist non-default quality values used by hero/pillar imagery.
    // Without this, Next.js 16+ refuses to serve quality={95} and the
    // image silently fails to render. Default 75 stays available.
    qualities: [75, 95],
  },
};

export default nextConfig;
