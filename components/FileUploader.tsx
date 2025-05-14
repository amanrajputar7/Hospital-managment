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
      className="file-upload cursor-pointer rounded-lg border-2 border-dashed border-gray-300 p-6 text-center transition-colors hover:border-gray-400"
    >
      <input {...getInputProps()} />
      
      {files && files.length > 0 ? (
        <div className="relative h-full w-full">
          <Image
            src={convertFileToUrl(files[0])}
            width={1000}
            height={1000}
            alt="Uploaded preview"
            className="max-h-[400px] w-full rounded-md object-contain"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity hover:opacity-100">
            <p className="font-medium text-white">Click to replace</p>
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