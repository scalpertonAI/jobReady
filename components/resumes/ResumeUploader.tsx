'use client';

/**
 * Resume Uploader Component
 * Drag-and-drop or click to upload resume
 */

import { useState, useCallback } from 'react';
import { Button } from '@/components/shared/Button';

interface ResumeUploaderProps {
  onUploadSuccess?: (resume: any) => void;
  onUploadError?: (error: string) => void;
}

export function ResumeUploader({ onUploadSuccess, onUploadError }: ResumeUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === 'application/pdf') {
      setFile(droppedFile);
      setError('');
    } else {
      setError('Please upload a PDF file');
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type === 'application/pdf') {
        setFile(selectedFile);
        setError('');
      } else {
        setError('Please upload a PDF file');
      }
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);
    setError('');

    try {
      const formData = new FormData();
      formData.append('resume', file);
      formData.append('isPrimary', 'true');

      // Simulate progress (since we can't track actual upload progress easily)
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => Math.min(prev + 10, 90));
      }, 200);

      const response = await fetch('/api/resumes/upload', {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      // Success
      setFile(null);
      if (onUploadSuccess) {
        onUploadSuccess(data.data);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Upload failed';
      setError(errorMessage);
      if (onUploadError) {
        onUploadError(errorMessage);
      }
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          border-2 border-dashed rounded-xl p-12 text-center transition-colors
          ${isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 bg-white'}
          ${file ? 'border-green-500 bg-green-50' : ''}
        `}
      >
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileSelect}
          className="hidden"
          id="resume-upload"
        />

        <div className="flex flex-col items-center">
          <div className="text-6xl mb-4">
            {file ? '✅' : '📄'}
          </div>

          {file ? (
            <>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {file.name}
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
              <Button onClick={() => setFile(null)} variant="outline" size="sm">
                Change File
              </Button>
            </>
          ) : (
            <>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Drop your resume here
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                or click to browse (PDF only, max 10MB)
              </p>
              <label htmlFor="resume-upload">
                <span className="inline-block px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 cursor-pointer">
                  Choose File
                </span>
              </label>
            </>
          )}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Upload Progress */}
      {isUploading && (
        <div className="mt-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Uploading and parsing...</span>
            <span className="font-medium text-indigo-600">{uploadProgress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">
            We're extracting text and analyzing your resume with AI...
          </p>
        </div>
      )}

      {/* Upload Button */}
      {file && !isUploading && (
        <div className="mt-6">
          <Button
            onClick={handleUpload}
            className="w-full"
            size="lg"
          >
            Upload & Parse Resume
          </Button>
          <p className="text-xs text-gray-500 mt-2 text-center">
            Your resume will be parsed using AI to extract skills, experience, and education
          </p>
        </div>
      )}
    </div>
  );
}
