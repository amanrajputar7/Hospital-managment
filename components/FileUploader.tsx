"use client";
import Image from "next/image";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { convertFileToUrl } from "@/lib/utils";

type FileUploaderProps = {
  files: File[] | undefined;
  onChange: (files: File[]) => void;
  maxSize?: number;
  accept?: string[];
};

export const FileUploader = ({ 
  files, 
  onChange, 
  maxSize = 800 * 400, // Default max size (800x400px)
  accept = ['image/png', 'image/gif', 'image/jpeg', 'image/jpg', 'image/svg+xml'] // Default accepted types
}: FileUploaderProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onChange(acceptedFiles);
    },
    [onChange] // Proper dependency array
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: accept.reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
    maxSize,
    multiple: false,
  });

  return (
    <div 
      {...getRootProps()} 
      className="file-upload cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors"
    >
      <input {...getInputProps()} />
      
      {files && files.length > 0 ? (
        <div className="relative w-full h-full">
          <Image
            src={convertFileToUrl(files[0])}
            width={1000}
            height={1000}
            alt="Uploaded preview"
            className="max-h-[400px] w-full object-contain rounded-md"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
            <p className="text-white font-medium">Click to replace</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-4">
          <Image
            src="/assets/icons/upload.svg"
            width={40}
            height={40}
            alt="Upload icon"
            className="opacity-70"
          />
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">
              <span className="text-green-500">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500">
              {accept.join(', ').replace(/image\//g, '').toUpperCase()} (max. {Math.round(maxSize/1024)}KB)
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
