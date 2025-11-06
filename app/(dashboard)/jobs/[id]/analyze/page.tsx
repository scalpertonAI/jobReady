'use client';

/**
 * Job Analysis Page
 * Analyze resume vs job description
 */

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/shared/Button';

export default function AnalyzeJobPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [resumes, setResumes] = useState<any[]>([]);
  const [selectedResumeId, setSelectedResumeId] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState('');
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const response = await fetch('/api/resumes');
      const data = await response.json();

      if (data.success && data.data.length > 0) {
        setResumes(data.data);
        // Auto-select primary resume or first resume
        const primaryResume = data.data.find((r: any) => r.is_primary);
        setSelectedResumeId(primaryResume?.id || data.data[0].id);
      }
    } catch (err) {
      console.error('Failed to fetch resumes:', err);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedResumeId) {
      setError('Please select a resume');
      return;
    }

    setError('');
    setIsAnalyzing(true);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resumeId: selectedResumeId,
          jobDescriptionId: resolvedParams.id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Analysis failed');
      }

      setAnalysisResult(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleGeneratePlan = async () => {
    if (!analysisResult) return;

    router.push(`/plans/generate?matchId=${analysisResult.id}`);
  };

  if (resumes.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📄</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No Resume Found</h2>
          <p className="text-gray-600 mb-6">Please upload a resume first</p>
          <Link href="/resumes/upload">
            <Button>Upload Resume</Button>
          </Link>
        </div>
      </div>
    );
  }

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
        {!analysisResult ? (
          <>
            {/* Title */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Analyze Job Match
              </h2>
              <p className="text-gray-600">
                Select a resume to compare against this job
              </p>
            </div>

            {/* Resume Selection */}
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Select Resume
                </label>

                <div className="space-y-3">
                  {resumes.map((resume) => (
                    <div
                      key={resume.id}
                      onClick={() => setSelectedResumeId(resume.id)}
                      className={`
                        p-4 rounded-lg border-2 cursor-pointer transition-colors
                        ${selectedResumeId === resume.id
                          ? 'border-indigo-500 bg-indigo-50'
                          : 'border-gray-200 hover:border-gray-300'
                        }
                      `}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">{resume.file_name}</h4>
                          <p className="text-sm text-gray-500">
                            Uploaded {new Date(resume.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        {resume.is_primary && (
                          <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                            Primary
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {error && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                <Button
                  onClick={handleAnalyze}
                  className="w-full mt-6"
                  size="lg"
                  isLoading={isAnalyzing}
                >
                  {isAnalyzing ? 'Analyzing...' : 'Start Analysis'}
                </Button>

                <p className="text-xs text-gray-500 text-center mt-3">
                  This may take 10-30 seconds as we analyze with AI
                </p>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Analysis Results */}
            <div className="max-w-4xl mx-auto">
              {/* Match Percentage */}
              <div className="text-center mb-8">
                <div className="inline-block">
                  <div className="w-40 h-40 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-4">
                    <div className="text-center">
                      <div className="text-5xl font-bold text-white">
                        {analysisResult.match_percentage}%
                      </div>
                      <div className="text-white text-sm">Match</div>
                    </div>
                  </div>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Job Match Report
                </h2>
                <p className="text-gray-600">
                  Here's how your profile matches this role
                </p>
              </div>

              {/* Analysis Data */}
              <div className="grid gap-6 mb-8">
                {/* Skills Matched */}
                {analysisResult.analysis_data.skills_matched && analysisResult.analysis_data.skills_matched.length > 0 && (
                  <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <h3 className="text-xl font-bold text-green-600 mb-4 flex items-center gap-2">
                      ✅ Skills Matched ({analysisResult.analysis_data.skills_matched.length})
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {analysisResult.analysis_data.skills_matched.slice(0, 15).map((skill: any, i: number) => (
                        <span key={i} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                          {skill.skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Skills Missing */}
                {analysisResult.analysis_data.skills_missing && analysisResult.analysis_data.skills_missing.length > 0 && (
                  <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <h3 className="text-xl font-bold text-red-600 mb-4 flex items-center gap-2">
                      ⚠️ Skills Missing ({analysisResult.analysis_data.skills_missing.length})
                    </h3>
                    <div className="space-y-2">
                      {analysisResult.analysis_data.skills_missing.slice(0, 10).map((skill: any, i: number) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                          <span className="font-medium text-red-900">{skill.skill}</span>
                          <span className={`
                            px-2 py-1 text-xs rounded-full
                            ${skill.priority === 'high' ? 'bg-red-200 text-red-800' : ''}
                            ${skill.priority === 'medium' ? 'bg-orange-200 text-orange-800' : ''}
                            ${skill.priority === 'low' ? 'bg-yellow-200 text-yellow-800' : ''}
                          `}>
                            {skill.priority} priority
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Strengths */}
                {analysisResult.analysis_data.strengths && analysisResult.analysis_data.strengths.length > 0 && (
                  <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">💪 Your Strengths</h3>
                    <ul className="space-y-2">
                      {analysisResult.analysis_data.strengths.map((strength: string, i: number) => (
                        <li key={i} className="flex items-start gap-2 text-gray-700">
                          <span className="text-green-500">✓</span>
                          <span>{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Recommendations */}
                {analysisResult.analysis_data.recommendations && analysisResult.analysis_data.recommendations.length > 0 && (
                  <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">🎯 Recommendations</h3>
                    <div className="space-y-3">
                      {analysisResult.analysis_data.recommendations.slice(0, 5).map((rec: any, i: number) => (
                        <div key={i} className="p-4 bg-blue-50 rounded-lg">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-semibold text-blue-900">{rec.action}</h4>
                            <span className={`
                              px-2 py-1 text-xs rounded-full
                              ${rec.priority === 'high' ? 'bg-red-200 text-red-800' : ''}
                              ${rec.priority === 'medium' ? 'bg-yellow-200 text-yellow-800' : ''}
                              ${rec.priority === 'low' ? 'bg-green-200 text-green-800' : ''}
                            `}>
                              {rec.priority}
                            </span>
                          </div>
                          <p className="text-sm text-blue-800">{rec.reason}</p>
                          {rec.estimated_time && (
                            <p className="text-xs text-blue-600 mt-1">⏱️ {rec.estimated_time}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 justify-center">
                <Button onClick={handleGeneratePlan} size="lg">
                  Generate 30-Day Prep Plan →
                </Button>
                <Link href="/dashboard">
                  <Button variant="outline" size="lg">
                    Back to Dashboard
                  </Button>
                </Link>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
