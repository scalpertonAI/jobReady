'use client';

/**
 * Modern Job Analysis Page - Gen Z Design
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center animate-scale-in">
          <div className="text-8xl mb-6 animate-float">📄</div>
          <h2 className="text-3xl font-black bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-3">
            No Resume Found
          </h2>
          <p className="text-gray-600 mb-8 text-lg">Please upload a resume first to get started!</p>
          <Link href="/resumes/upload">
            <Button variant="gradient" size="lg">Upload Resume ✨</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Modern Header */}
      <header className="backdrop-blur-md bg-white/70 shadow-lg sticky top-0 z-50 border-b border-white/20">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/dashboard">
            <h1 className="text-3xl font-black bg-gradient-to-r from-primary-600 via-secondary-500 to-accent-500 bg-clip-text text-transparent">
              JobReady.AI ✨
            </h1>
          </Link>
          <Link href="/dashboard">
            <Button variant="ghost">← Dashboard</Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {!analysisResult ? (
          <>
            {/* Title Section */}
            <div className="text-center mb-12 animate-slide-up">
              <div className="text-6xl mb-4 animate-float">🎯</div>
              <h2 className="text-5xl font-black bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-4">
                Analyze Job Match
              </h2>
              <p className="text-xl text-gray-700 font-medium">
                Let&apos;s see how well you match this role!
              </p>
            </div>

            {/* Resume Selection Card */}
            <div className="max-w-3xl mx-auto">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-card p-8 border border-white/50 animate-scale-in">
                <label className="block text-lg font-bold text-gray-800 mb-6">
                  Select Resume 📄
                </label>

                <div className="space-y-4">
                  {resumes.map((resume) => (
                    <div
                      key={resume.id}
                      onClick={() => setSelectedResumeId(resume.id)}
                      className={`
                        relative overflow-hidden p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 group
                        ${selectedResumeId === resume.id
                          ? 'border-primary-500 bg-gradient-to-r from-primary-50 to-secondary-50 shadow-glow scale-105'
                          : 'border-gray-200 bg-white/60 hover:border-primary-300 hover:scale-102'
                        }
                      `}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-bold text-gray-900 text-lg">{resume.file_name}</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            Uploaded {new Date(resume.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          {resume.is_primary && (
                            <span className="px-4 py-2 bg-gradient-to-r from-success-500 to-success-600 text-white text-sm font-semibold rounded-full shadow-lg">
                              ⭐ Primary
                            </span>
                          )}
                          {selectedResumeId === resume.id && (
                            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center shadow-lg">
                              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {error && (
                  <div className="mt-6 p-4 bg-danger-50 border-2 border-danger-200 text-danger-700 rounded-xl text-sm font-semibold animate-slide-down">
                    {error}
                  </div>
                )}

                <Button
                  onClick={handleAnalyze}
                  className="w-full mt-8"
                  variant="gradient"
                  size="lg"
                  isLoading={isAnalyzing}
                >
                  {isAnalyzing ? '✨ Analyzing with AI...' : '🚀 Start Analysis'}
                </Button>

                <p className="text-sm text-gray-500 text-center mt-4">
                  This may take 10-30 seconds as we analyze with AI magic ✨
                </p>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Analysis Results */}
            <div className="max-w-5xl mx-auto">
              {/* Match Percentage - Big Hero Section */}
              <div className="text-center mb-12 animate-scale-in">
                <div className="inline-block relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full blur-2xl opacity-30 animate-pulse-slow"></div>
                  <div className="relative w-52 h-52 rounded-full bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500 flex items-center justify-center mb-6 shadow-glow-lg">
                    <div className="text-center">
                      <div className="text-7xl font-black text-white drop-shadow-lg">
                        {analysisResult.match_percentage}%
                      </div>
                      <div className="text-white text-lg font-bold">Match</div>
                    </div>
                  </div>
                </div>
                <h2 className="text-5xl font-black bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-3">
                  Job Match Report
                </h2>
                <p className="text-xl text-gray-700 font-medium">
                  Here&apos;s how your profile stacks up! 📊
                </p>
              </div>

              {/* Analysis Data Grid */}
              <div className="grid gap-6 mb-8">
                {/* Skills Matched */}
                {analysisResult.analysis_data.skills_matched && analysisResult.analysis_data.skills_matched.length > 0 && (
                  <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-white/50 shadow-card animate-slide-up">
                    <h3 className="text-2xl font-black bg-gradient-to-r from-success-600 to-success-500 bg-clip-text text-transparent mb-6 flex items-center gap-3">
                      <span className="text-3xl">✅</span>
                      Skills Matched ({analysisResult.analysis_data.skills_matched.length})
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {analysisResult.analysis_data.skills_matched.slice(0, 15).map((skill: any, i: number) => (
                        <span key={i} className="px-4 py-2 bg-gradient-to-r from-success-100 to-success-200 text-success-800 rounded-xl text-sm font-semibold shadow-sm hover:scale-105 transition-transform">
                          {skill.skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Skills Missing */}
                {analysisResult.analysis_data.skills_missing && analysisResult.analysis_data.skills_missing.length > 0 && (
                  <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-white/50 shadow-card animate-slide-up" style={{ animationDelay: '0.1s' }}>
                    <h3 className="text-2xl font-black bg-gradient-to-r from-danger-600 to-warning-500 bg-clip-text text-transparent mb-6 flex items-center gap-3">
                      <span className="text-3xl">⚠️</span>
                      Skills to Level Up ({analysisResult.analysis_data.skills_missing.length})
                    </h3>
                    <div className="space-y-3">
                      {analysisResult.analysis_data.skills_missing.slice(0, 10).map((skill: any, i: number) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-gradient-to-r from-danger-50 to-warning-50 rounded-xl border border-danger-200 hover:shadow-md transition-shadow">
                          <span className="font-bold text-danger-900">{skill.skill}</span>
                          <span className={`
                            px-4 py-1.5 text-xs font-bold rounded-full shadow-sm
                            ${skill.priority === 'high' ? 'bg-gradient-to-r from-danger-500 to-danger-600 text-white' : ''}
                            ${skill.priority === 'medium' ? 'bg-gradient-to-r from-warning-500 to-warning-600 text-white' : ''}
                            ${skill.priority === 'low' ? 'bg-gradient-to-r from-success-500 to-success-600 text-white' : ''}
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
                  <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-white/50 shadow-card animate-slide-up" style={{ animationDelay: '0.2s' }}>
                    <h3 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
                      <span className="text-3xl">💪</span>
                      Your Superpowers
                    </h3>
                    <ul className="space-y-3">
                      {analysisResult.analysis_data.strengths.map((strength: string, i: number) => (
                        <li key={i} className="flex items-start gap-3 text-gray-800 p-3 bg-primary-50 rounded-xl">
                          <span className="text-success-500 text-xl">✓</span>
                          <span className="font-medium">{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Recommendations */}
                {analysisResult.analysis_data.recommendations && analysisResult.analysis_data.recommendations.length > 0 && (
                  <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-white/50 shadow-card animate-slide-up" style={{ animationDelay: '0.3s' }}>
                    <h3 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
                      <span className="text-3xl">🎯</span>
                      Action Plan
                    </h3>
                    <div className="space-y-4">
                      {analysisResult.analysis_data.recommendations.slice(0, 5).map((rec: any, i: number) => (
                        <div key={i} className="p-5 bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl border border-primary-200 hover:shadow-lg transition-shadow">
                          <div className="flex items-start justify-between mb-3">
                            <h4 className="font-bold text-primary-900 text-lg">{rec.action}</h4>
                            <span className={`
                              px-4 py-1.5 text-xs font-bold rounded-full shadow-sm
                              ${rec.priority === 'high' ? 'bg-gradient-to-r from-danger-500 to-danger-600 text-white' : ''}
                              ${rec.priority === 'medium' ? 'bg-gradient-to-r from-warning-500 to-warning-600 text-white' : ''}
                              ${rec.priority === 'low' ? 'bg-gradient-to-r from-success-500 to-success-600 text-white' : ''}
                            `}>
                              {rec.priority}
                            </span>
                          </div>
                          <p className="text-sm text-primary-800 mb-2">{rec.reason}</p>
                          {rec.estimated_time && (
                            <p className="text-xs text-primary-600 font-semibold flex items-center gap-2">
                              <span>⏱️</span> {rec.estimated_time}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.4s' }}>
                <Button onClick={handleGeneratePlan} variant="gradient" size="lg">
                  🚀 Generate 30-Day Prep Plan
                </Button>
                <Link href="/dashboard">
                  <Button variant="outline" size="lg">
                    ← Back to Dashboard
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
