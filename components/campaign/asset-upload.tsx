"use client";

import { useState } from "react";
import { FileUpload, UploadedFile } from "@/components/ui/file-upload";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AssetFormat,
  ASSET_FORMATS,
  CreativeAsset,
  AssetRequirements
} from "@/lib/types/assets";
import {
  Image as ImageIcon,
  Video,
  Instagram,
  Facebook,
  Youtube,
  Smartphone,
  Monitor
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AssetUploadProps {
  platform?: "GOOGLE" | "META" | "BOTH";
  value?: CreativeAsset[];
  onChange?: (assets: CreativeAsset[]) => void;
}

export function AssetUpload({ platform = "BOTH", value = [], onChange }: AssetUploadProps) {
  const [selectedFormat, setSelectedFormat] = useState<AssetFormat>("feed_image");
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const formatConfig = ASSET_FORMATS[selectedFormat];

  // Filter formats by platform
  const availableFormats = Object.entries(ASSET_FORMATS).filter(
    ([_, config]) => platform === "BOTH" || config.platform === "BOTH" || config.platform === platform
  );

  const getFormatIcon = (format: AssetFormat) => {
    switch (format) {
      case "story":
      case "reel":
        return <Smartphone className="w-4 h-4" />;
      case "banner":
      case "display_ad":
        return <Monitor className="w-4 h-4" />;
      case "feed_video":
      case "reel":
        return <Video className="w-4 h-4" />;
      default:
        return <ImageIcon className="w-4 h-4" />;
    }
  };

  const getFormatLabel = (format: AssetFormat): string => {
    const labels: Record<AssetFormat, string> = {
      feed_image: "Feed Image",
      feed_video: "Feed Video",
      story: "Story",
      reel: "Reel",
      banner: "Banner",
      carousel: "Carousel",
      display_ad: "Display Ad",
    };
    return labels[format];
  };

  const handleFilesChange = (files: UploadedFile[]) => {
    setUploadedFiles(files);

    // Convert to CreativeAsset
    const assets: CreativeAsset[] = files.map((f) => ({
      id: f.id,
      name: f.file.name,
      format: selectedFormat,
      file: f.file,
      preview: f.preview,
      type: f.type === "image" ? "image" : "video",
      size: f.file.size,
      uploadedAt: new Date().toISOString(),
    }));

    if (onChange) {
      onChange([...value, ...assets]);
    }
  };

  const handleFormatChange = (format: AssetFormat) => {
    setSelectedFormat(format);
    setUploadedFiles([]);
  };

  return (
    <div className="space-y-6">
      {/* Format Selection */}
      <div>
        <h3 className="text-sm font-bold text-black mb-3 uppercase tracking-wide">Select Asset Format</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {availableFormats.map(([format, config]) => (
            <button
              key={format}
              onClick={() => handleFormatChange(format as AssetFormat)}
              className={cn(
                "p-4 border-2 text-left transition-all rounded-xl",
                selectedFormat === format
                  ? "border-black bg-purple-500 text-white neo-shadow-purple"
                  : "border-black bg-white hover:bg-gray-50 neo-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              )}
            >
              <div className="flex items-center gap-2 mb-2">
                {getFormatIcon(format as AssetFormat)}
                <span className={cn(
                  "text-sm font-bold uppercase",
                  selectedFormat === format ? "text-white" : "text-black"
                )}>
                  {getFormatLabel(format as AssetFormat)}
                </span>
              </div>
              <p className={cn(
                "text-xs font-medium",
                selectedFormat === format ? "text-white" : "text-black"
              )}>{config.aspectRatio}</p>
              <p className={cn(
                "text-xs font-medium",
                selectedFormat === format ? "text-gray-300" : "text-gray-600"
              )}>
                {config.dimensions.width}x{config.dimensions.height}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Format Info */}
      <Card className="bg-gradient-to-br from-purple-50 to-pink-50">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-purple-500 border-2 border-black rounded-xl neo-shadow-sm">
              <div className="text-white">
                {getFormatIcon(selectedFormat)}
              </div>
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-bold text-black mb-1 uppercase">
                {getFormatLabel(selectedFormat)} Requirements
              </h4>
              <div className="grid grid-cols-2 gap-4 text-xs text-black">
                <div>
                  <span className="font-bold">Dimensions:</span>{" "}
                  <span className="font-medium">{formatConfig.dimensions.width}x{formatConfig.dimensions.height}</span>
                </div>
                <div>
                  <span className="font-bold">Aspect Ratio:</span>{" "}
                  <span className="font-medium">{formatConfig.aspectRatio}</span>
                </div>
                <div>
                  <span className="font-bold">Max Size:</span>{" "}
                  <span className="font-medium">{formatConfig.maxSize}MB</span>
                </div>
                <div>
                  <span className="font-bold">Formats:</span>{" "}
                  <span className="font-medium">{formatConfig.fileTypes.map((type) => type.split("/")[1]).join(", ")}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* File Upload */}
      <FileUpload
        accept={formatConfig.fileTypes.join(",")}
        maxSize={formatConfig.maxSize}
        maxFiles={selectedFormat === "carousel" ? 10 : 5}
        value={uploadedFiles}
        onChange={handleFilesChange}
        label="Upload Assets"
        description={`Upload ${getFormatLabel(selectedFormat).toLowerCase()} files (${formatConfig.aspectRatio})`}
      />

      {/* Uploaded Assets Library */}
      {value.length > 0 && (
        <div>
          <h3 className="text-sm font-bold text-black mb-3 uppercase tracking-wide">
            Uploaded Assets ({value.length})
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {value.map((asset) => (
              <Card key={asset.id} className="overflow-hidden">
                <div className="aspect-square bg-gray-100 relative border-b-2 border-black">
                  {asset.type === "image" ? (
                    <img
                      src={asset.preview}
                      alt={asset.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <video
                      src={asset.preview}
                      className="w-full h-full object-cover"
                    />
                  )}
                  <Badge
                    className="absolute top-2 right-2"
                    variant="default"
                  >
                    {getFormatLabel(asset.format)}
                  </Badge>
                </div>
                <CardContent className="p-3">
                  <p className="text-xs text-black font-medium truncate">{asset.name}</p>
                  <p className="text-xs text-gray-600 mt-1 font-medium">
                    {(asset.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
