"use client";

import { useCallback, useState } from "react";
import { Upload, X, Image as ImageIcon, Video, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

export interface UploadedFile {
  id: string;
  file: File;
  preview: string;
  type: "image" | "video" | "document";
}

interface FileUploadProps {
  accept?: string;
  maxSize?: number; // in MB
  maxFiles?: number;
  value?: UploadedFile[];
  onChange?: (files: UploadedFile[]) => void;
  label?: string;
  description?: string;
}

export function FileUpload({
  accept = "image/*,video/*",
  maxSize = 10,
  maxFiles = 5,
  value = [],
  onChange,
  label,
  description,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getFileType = (file: File): "image" | "video" | "document" => {
    if (file.type.startsWith("image/")) return "image";
    if (file.type.startsWith("video/")) return "video";
    return "document";
  };

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files) return;

      setError(null);

      const newFiles: UploadedFile[] = [];
      const currentFileCount = value.length;

      Array.from(files).forEach((file) => {
        // Check max files
        if (currentFileCount + newFiles.length >= maxFiles) {
          setError(`Maximum ${maxFiles} files allowed`);
          return;
        }

        // Check file size
        if (file.size > maxSize * 1024 * 1024) {
          setError(`File size must be less than ${maxSize}MB`);
          return;
        }

        const fileType = getFileType(file);
        const preview = URL.createObjectURL(file);

        newFiles.push({
          id: Math.random().toString(36).substring(7),
          file,
          preview,
          type: fileType,
        });
      });

      if (newFiles.length > 0 && onChange) {
        onChange([...value, ...newFiles]);
      }
    },
    [value, maxFiles, maxSize, onChange]
  );

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleFiles(e.target.files);
    },
    [handleFiles]
  );

  const removeFile = useCallback(
    (id: string) => {
      const fileToRemove = value.find((f) => f.id === id);
      if (fileToRemove) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      if (onChange) {
        onChange(value.filter((f) => f.id !== id));
      }
    },
    [value, onChange]
  );

  const getFileIcon = (type: UploadedFile["type"]) => {
    switch (type) {
      case "image":
        return <ImageIcon className="w-4 h-4" />;
      case "video":
        return <Video className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-4">
      {label && <label className="block text-sm font-bold text-black uppercase tracking-wide">{label}</label>}

      {/* Upload Area */}
      <div
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "relative border-2 border-dashed p-8 transition-all rounded-2xl",
          isDragging
            ? "border-purple-500 bg-purple-50 neo-shadow-purple"
            : "border-black bg-white neo-shadow"
        )}
      >
        <input
          type="file"
          accept={accept}
          multiple
          onChange={handleInputChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={value.length >= maxFiles}
        />

        <div className="flex flex-col items-center justify-center text-center">
          <Upload className="w-12 h-12 mb-4 text-black" />
          <p className="text-sm font-bold text-black mb-1 uppercase">
            {isDragging ? "Drop files here" : "Click to upload or drag and drop"}
          </p>
          {description && <p className="text-xs text-black font-medium mb-2">{description}</p>}
          <p className="text-xs text-black font-medium">
            {maxFiles - value.length} of {maxFiles} files remaining • Max {maxSize}MB per file
          </p>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-3 bg-pink-500 border-2 border-black rounded-xl neo-shadow-pink">
          <p className="text-sm text-white font-bold">{error}</p>
        </div>
      )}

      {/* Uploaded Files */}
      {value.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {value.map((uploadedFile) => (
            <div
              key={uploadedFile.id}
              className="relative group overflow-hidden border-2 border-black bg-white rounded-2xl neo-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
            >
              {/* Preview */}
              <div className="aspect-square bg-gray-100 flex items-center justify-center border-b-2 border-black">
                {uploadedFile.type === "image" ? (
                  <img
                    src={uploadedFile.preview}
                    alt={uploadedFile.file.name}
                    className="w-full h-full object-cover"
                  />
                ) : uploadedFile.type === "video" ? (
                  <video src={uploadedFile.preview} className="w-full h-full object-cover" />
                ) : (
                  <FileText className="w-12 h-12 text-black" />
                )}
              </div>

              {/* File Info */}
              <div className="p-2 bg-white">
                <div className="flex items-center gap-2">
                  {getFileIcon(uploadedFile.type)}
                  <p className="text-xs text-black font-medium truncate flex-1">
                    {uploadedFile.file.name}
                  </p>
                </div>
                <p className="text-xs text-gray-600 mt-1 font-medium">
                  {(uploadedFile.file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => removeFile(uploadedFile.id)}
                className="absolute top-2 right-2 p-1.5 bg-pink-500 text-white border-2 border-black rounded-lg neo-shadow-sm opacity-0 group-hover:opacity-100 hover:bg-pink-600 transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
