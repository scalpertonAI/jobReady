'use client';

/**
 * Resume Uploader Component
 * Drag-and-drop or click to upload resume with enhanced UX
 */

import { useState, useCallback } from 'react';
import { Button } from '@/components/shared/Button';
import { useToast } from '@/components/shared/Toast';

interface ResumeUploaderProps {
  onUploadSuccess?: (resume: any) => void;
  onUploadError?: (error: string) => void;
}

export function ResumeUploader({ onUploadSuccess, onUploadError }: ResumeUploaderProps) {
  const { showToast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');
  const [uploadStage, setUploadStage] = useState<string>('');

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
      showToast('success', `${droppedFile.name} selected`, 2000);
    } else {
      setError('Please upload a PDF file');
      showToast('error', 'Only PDF files are supported');
    }
  }, [showToast]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type === 'application/pdf') {
        setFile(selectedFile);
        setError('');
        showToast('success', `${selectedFile.name} selected`, 2000);
      } else {
        setError('Please upload a PDF file');
        showToast('error', 'Only PDF files are supported');
      }
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);
    setError('');
    setUploadStage('Uploading file...');

    try {
      const formData = new FormData();
      formData.append('resume', file);
      formData.append('isPrimary', 'true');

      // Enhanced progress simulation with stages
      const stages = [
        { progress: 20, message: 'Uploading file...' },
        { progress: 40, message: 'Extracting PDF text...' },
        { progress: 60, message: 'AI analyzing resume...' },
        { progress: 80, message: 'Extracting skills & experience...' },
        { progress: 90, message: 'Finalizing...' },
      ];

      let stageIndex = 0;
      const progressInterval = setInterval(() => {
        if (stageIndex < stages.length) {
          setUploadProgress(stages[stageIndex].progress);
          setUploadStage(stages[stageIndex].message);
          stageIndex++;
        }
      }, 1000);

      const response = await fetch('/api/resumes/upload', {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);
      setUploadProgress(100);
      setUploadStage('Complete!');

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      // Success
      showToast('success', '🎉 Resume uploaded and parsed successfully!');
      setFile(null);
      if (onUploadSuccess) {
        onUploadSuccess(data.data);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Upload failed';
      setError(errorMessage);
      showToast('error', `Upload failed: ${errorMessage}`);
      if (onUploadError) {
        onUploadError(errorMessage);
      }
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
      setUploadStage('');
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
        <div className="mt-6 animate-fade-in">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-700 font-medium">{uploadStage}</span>
            <span className="font-bold text-indigo-600">{uploadProgress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-indigo-500 to-indigo-600 h-3 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
          <div className="mt-3 flex items-center text-sm text-gray-600">
            <svg className="animate-spin h-4 w-4 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>This usually takes 5-10 seconds...</span>
          </div>
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
