'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/shared/Button';
import Card from '@/components/shared/Card';
import { useToast } from '@/components/shared/Toast';
import { Spinner, LoadingOverlay } from '@/components/shared/LoadingSkeleton';

export default function ResumeOptimizePage() {
  const params = useParams();
  const router = useRouter();
  const { showToast } = useToast();
  const resumeId = params.id as string;

  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [improvements, setImprovements] = useState<any[]>([]);
  const [selectedJobId, setSelectedJobId] = useState<string>('');
  const [jobs, setJobs] = useState<any[]>([]);

  useEffect(() => {
    loadImprovements();
    loadJobs();
  }, [resumeId]);

  const loadImprovements = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/resumes/${resumeId}/optimize`);
      const data = await response.json();

      if (data.success) {
        setImprovements(data.data);
      }
    } catch (error) {
      console.error('Failed to load improvements:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadJobs = async () => {
    try {
      const response = await fetch('/api/job-descriptions');
      const data = await response.json();

      if (data.success) {
        setJobs(data.data);
      }
    } catch (error) {
      console.error('Failed to load jobs:', error);
    }
  };

  const generateOptimization = async () => {
    setGenerating(true);
    try {
      const response = await fetch(`/api/resumes/${resumeId}/optimize`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          job_description_id: selectedJobId || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate optimization');
      }

      showToast('success', '✨ Resume optimization complete!');
      loadImprovements();
    } catch (error) {
      console.error('Optimization error:', error);
      showToast('error', `Optimization failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {generating && <LoadingOverlay message="AI is analyzing your resume..." />}

      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/dashboard">
            <h1 className="text-2xl font-bold text-indigo-600">JobReady.AI</h1>
          </Link>
          <Link href="/resumes">
            <Button variant="ghost">← Back to Resumes</Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Page Title */}
        <div className="mb-8 animate-fade-in">
          <h2 className="text-3xl font-bold text-gray-900">Resume Optimization</h2>
          <p className="text-gray-600 mt-1">
            Get AI-powered suggestions to improve your resume and increase your match rate
          </p>
        </div>

        {/* Generate New Optimization */}
        <Card className="mb-8 animate-slide-up">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Generate New Optimization
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Optionally select a target job to get tailored suggestions
            </p>

            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target Job (Optional)
                </label>
                <select
                  value={selectedJobId}
                  onChange={(e) => setSelectedJobId(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  disabled={generating}
                >
                  <option value="">General optimization (no specific job)</option>
                  {jobs.map((job) => (
                    <option key={job.id} value={job.id}>
                      {job.company_name} - {job.job_title}
                    </option>
                  ))}
                </select>
              </div>
              <Button
                onClick={generateOptimization}
                disabled={generating}
                className="whitespace-nowrap"
              >
                {generating ? 'Generating...' : '✨ Generate Suggestions'}
              </Button>
            </div>
          </div>
        </Card>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center py-12">
            <Spinner size="lg" />
          </div>
        ) : improvements.length === 0 ? (
          /* Empty State */
          <Card className="animate-fade-in">
            <div className="p-12 text-center">
              <div className="mx-auto w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No optimizations yet
              </h3>
              <p className="text-gray-600 mb-6">
                Generate your first optimization to get AI-powered suggestions for improving your resume
              </p>
              <Button onClick={generateOptimization} disabled={generating}>
                Generate Optimization
              </Button>
            </div>
          </Card>
        ) : (
          /* Improvements List */
          <div className="space-y-6 animate-slide-up">
            {improvements.map((improvement, index) => (
              <Card key={improvement.id} className="card-hover" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="p-6">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {improvement.job_descriptions
                          ? `${improvement.job_descriptions.company_name} - ${improvement.job_descriptions.job_title}`
                          : 'General Optimization'}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Generated {new Date(improvement.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-sm rounded-full font-medium">
                      AI Generated
                    </span>
                  </div>

                  {/* Suggestions */}
                  {improvement.suggestions && (
                    <div className="space-y-6">
                      {/* Keywords to Add */}
                      {improvement.suggestions.keywords_to_add && improvement.suggestions.keywords_to_add.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                            <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm mr-2">
                              +
                            </span>
                            Keywords to Add
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {improvement.suggestions.keywords_to_add.map((keyword: string, i: number) => (
                              <span
                                key={i}
                                className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm border border-green-200"
                              >
                                {keyword}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* ATS Improvements */}
                      {improvement.suggestions.ats_improvements && improvement.suggestions.ats_improvements.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                            <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm mr-2">
                              🤖
                            </span>
                            ATS Optimization Tips
                          </h4>
                          <ul className="space-y-2">
                            {improvement.suggestions.ats_improvements.map((tip: string, i: number) => (
                              <li key={i} className="flex items-start">
                                <svg
                                  className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                                <span className="text-sm text-gray-700">{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Content Suggestions */}
                      {improvement.suggestions.content_suggestions && improvement.suggestions.content_suggestions.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                            <span className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm mr-2">
                              ✏️
                            </span>
                            Content Improvements
                          </h4>
                          <ul className="space-y-2">
                            {improvement.suggestions.content_suggestions.map((suggestion: string, i: number) => (
                              <li key={i} className="flex items-start">
                                <svg
                                  className="w-5 h-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 10V3L4 14h7v7l9-11h-7z"
                                  />
                                </svg>
                                <span className="text-sm text-gray-700">{suggestion}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Overall Score */}
                      {improvement.suggestions.overall_score !== undefined && (
                        <div className="mt-6 pt-6 border-t border-gray-200">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700">Overall Resume Score</span>
                            <span className="text-2xl font-bold text-indigo-600">
                              {improvement.suggestions.overall_score}/100
                            </span>
                          </div>
                          <div className="mt-2 w-full bg-gray-200 rounded-full h-3">
                            <div
                              className="bg-indigo-600 h-3 rounded-full transition-all duration-500"
                              style={{ width: `${improvement.suggestions.overall_score}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Help Section */}
        <Card className="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
          <div className="p-6">
            <h3 className="font-semibold text-gray-900 mb-3">💡 Tips for Best Results</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <span className="text-indigo-600 mr-2">•</span>
                <span>
                  <strong>Target a specific job</strong> for tailored suggestions that match the job requirements
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-600 mr-2">•</span>
                <span>
                  <strong>Review all suggestions</strong> and implement the ones that fit your experience
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-600 mr-2">•</span>
                <span>
                  <strong>Use action verbs</strong> and quantify achievements with numbers and percentages
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-600 mr-2">•</span>
                <span>
                  <strong>Keep formatting simple</strong> to ensure ATS systems can parse your resume correctly
                </span>
              </li>
            </ul>
          </div>
        </Card>
      </main>
    </div>
  );
}
