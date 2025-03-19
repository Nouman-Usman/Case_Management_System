"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { storage, BUCKET_ID, ID } from '@/lib/appwrite.config';

export default function FileUploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragIn = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragOut = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files && files.length > 0) {
      setFile(files[0]);
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    
    try {
      const fileId = ID.unique();
      
      const fileRef = await storage.createFile(
        BUCKET_ID,
        fileId,
        file
      );

      // Get the file URL after successful upload
      const fileUrl = storage.getFileView(BUCKET_ID, fileId);
      console.log("File uploaded successfully. URL:", fileUrl);
      
      // Reset the file input
      setFile(null);
      if (document.getElementById('file') as HTMLInputElement) {
        (document.getElementById('file') as HTMLInputElement).value = '';
      }
    } catch (error) {
      console.error("Upload failed:", error);
      // Show error to user
    }
  };

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <div
          className={`border-2 border-dashed rounded-lg flex flex-col gap-1 p-6 items-center
            ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-200"}`}
          onDragEnter={handleDragIn}
          onDragLeave={handleDragOut}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <FileIcon className="w-12 h-12" />
          <span className="text-sm font-medium text-gray-500">
            {file ? file.name : "Drag and drop a file or click to browse"}
          </span>
          <span className="text-xs text-gray-500">PDF, image, video, or audio</span>
        </div>
        <div className="space-y-2 text-sm">
          <Label htmlFor="file" className="text-sm font-medium">
            File
          </Label>
          <Input 
            id="file" 
            type="file" 
            onChange={handleFileChange}
            accept="image/*,video/*,audio/*,.pdf"
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          size="lg" 
          onClick={handleUpload}
          disabled={!file}
        >
          Upload
        </Button>
      </CardFooter>
    </Card>
  );
}

function FileIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    </svg>
  );
}
