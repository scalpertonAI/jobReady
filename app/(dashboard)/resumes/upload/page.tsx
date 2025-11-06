'use client';

/**
 * Resume Upload Page
 */

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ResumeUploader } from '@/components/resumes/ResumeUploader';
import { Button } from '@/components/shared/Button';

export default function ResumeUploadPage() {
  const router = useRouter();
  const [uploadedResume, setUploadedResume] = useState<any>(null);

  const handleUploadSuccess = (resume: any) => {
    setUploadedResume(resume);
  };

  const handleContinue = () => {
    router.push('/jobs/new');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/dashboard">
            <h1 className="text-2xl font-bold text-indigo-600">JobReady.AI</h1>
          </Link>
          <Link href="/dashboard">
            <Button variant="ghost">← Back to Dashboard</Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Progress Indicator */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
                1
              </div>
              <span className="ml-2 font-medium text-indigo-600">Upload Resume</span>
            </div>
            <div className="w-16 h-1 bg-gray-300"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center font-bold">
                2
              </div>
              <span className="ml-2 text-gray-600">Add Job</span>
            </div>
            <div className="w-16 h-1 bg-gray-300"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center font-bold">
                3
              </div>
              <span className="ml-2 text-gray-600">Get Plan</span>
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Upload Your Resume
          </h2>
          <p className="text-gray-600">
            We'll use AI to extract your skills, experience, and qualifications
          </p>
        </div>

        {/* Uploader */}
        <ResumeUploader
          onUploadSuccess={handleUploadSuccess}
        />

        {/* Success Message */}
        {uploadedResume && (
          <div className="max-w-2xl mx-auto mt-8">
            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="text-4xl">🎉</div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-green-900 mb-2">
                    Resume Uploaded Successfully!
                  </h3>
                  <p className="text-green-700 mb-4">
                    Your resume has been parsed and analyzed. We've extracted your skills, experience, and education.
                  </p>
                  <div className="flex gap-3">
                    <Button onClick={handleContinue}>
                      Continue to Add Job →
                    </Button>
                    <Link href="/dashboard">
                      <Button variant="outline">
                        Back to Dashboard
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Parsed Data Preview */}
            {uploadedResume.parsed_data && (
              <div className="mt-6 bg-white rounded-xl p-6 border border-gray-200">
                <h4 className="font-bold text-gray-900 mb-4">Extracted Information</h4>

                {uploadedResume.parsed_data.skills && (
                  <div className="mb-4">
                    <h5 className="font-semibold text-sm text-gray-700 mb-2">Technical Skills:</h5>
                    <div className="flex flex-wrap gap-2">
                      {uploadedResume.parsed_data.skills.technical?.slice(0, 10).map((skill: string, i: number) => (
                        <span key={i} className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                      {uploadedResume.parsed_data.skills.technical?.length > 10 && (
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                          +{uploadedResume.parsed_data.skills.technical.length - 10} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {uploadedResume.parsed_data.experience && uploadedResume.parsed_data.experience.length > 0 && (
                  <div>
                    <h5 className="font-semibold text-sm text-gray-700 mb-2">Experience:</h5>
                    <p className="text-sm text-gray-600">
                      {uploadedResume.parsed_data.experience.length} positions found
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Info Cards */}
        {!uploadedResume && (
          <div className="max-w-4xl mx-auto mt-12 grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
              <div className="text-3xl mb-3">🔒</div>
              <h4 className="font-semibold mb-2">Secure & Private</h4>
              <p className="text-sm text-gray-600">
                Your resume is stored securely and never shared
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
              <div className="text-3xl mb-3">🤖</div>
              <h4 className="font-semibold mb-2">AI-Powered</h4>
              <p className="text-sm text-gray-600">
                Advanced AI extracts and structures your information
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
              <div className="text-3xl mb-3">⚡</div>
              <h4 className="font-semibold mb-2">Lightning Fast</h4>
              <p className="text-sm text-gray-600">
                Parsing completes in seconds, not minutes
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
