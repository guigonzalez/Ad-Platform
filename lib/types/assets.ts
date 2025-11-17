export type AssetFormat =
  | "feed_image"        // 1080x1080 (Square)
  | "feed_video"        // 1080x1080 (Square)
  | "story"             // 1080x1920 (9:16)
  | "reel"              // 1080x1920 (9:16)
  | "banner"            // 1200x628 (Landscape)
  | "carousel"          // 1080x1080 (Square)
  | "display_ad";       // Variable sizes

export interface AssetRequirements {
  format: AssetFormat;
  dimensions: {
    width: number;
    height: number;
  };
  aspectRatio: string;
  maxSize: number; // in MB
  fileTypes: string[];
  platform: "GOOGLE" | "META" | "BOTH";
}

export const ASSET_FORMATS: Record<AssetFormat, AssetRequirements> = {
  feed_image: {
    format: "feed_image",
    dimensions: { width: 1080, height: 1080 },
    aspectRatio: "1:1",
    maxSize: 10,
    fileTypes: ["image/jpeg", "image/png", "image/webp"],
    platform: "BOTH",
  },
  feed_video: {
    format: "feed_video",
    dimensions: { width: 1080, height: 1080 },
    aspectRatio: "1:1",
    maxSize: 100,
    fileTypes: ["video/mp4", "video/quicktime"],
    platform: "BOTH",
  },
  story: {
    format: "story",
    dimensions: { width: 1080, height: 1920 },
    aspectRatio: "9:16",
    maxSize: 10,
    fileTypes: ["image/jpeg", "image/png", "image/webp"],
    platform: "META",
  },
  reel: {
    format: "reel",
    dimensions: { width: 1080, height: 1920 },
    aspectRatio: "9:16",
    maxSize: 100,
    fileTypes: ["video/mp4"],
    platform: "META",
  },
  banner: {
    format: "banner",
    dimensions: { width: 1200, height: 628 },
    aspectRatio: "1.91:1",
    maxSize: 5,
    fileTypes: ["image/jpeg", "image/png"],
    platform: "BOTH",
  },
  carousel: {
    format: "carousel",
    dimensions: { width: 1080, height: 1080 },
    aspectRatio: "1:1",
    maxSize: 10,
    fileTypes: ["image/jpeg", "image/png", "image/webp"],
    platform: "BOTH",
  },
  display_ad: {
    format: "display_ad",
    dimensions: { width: 1200, height: 1200 },
    aspectRatio: "Variable",
    maxSize: 5,
    fileTypes: ["image/jpeg", "image/png", "image/gif"],
    platform: "GOOGLE",
  },
};

export interface CreativeAsset {
  id: string;
  name: string;
  format: AssetFormat;
  file?: File;
  url?: string;
  preview: string;
  type: "image" | "video";
  size: number;
  dimensions?: {
    width: number;
    height: number;
  };
  uploadedAt: string;
}
