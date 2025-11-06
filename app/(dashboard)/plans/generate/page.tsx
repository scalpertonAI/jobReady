'use client';

/**
 * Preparation Plan Generation Page
 */

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/shared/Button';

export default function GeneratePlanPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const matchId = searchParams.get('matchId');

  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (matchId) {
      generatePlan();
    }
  }, [matchId]);

  const generatePlan = async () => {
    if (!matchId) {
      setError('No match ID provided');
      return;
    }

    setIsGenerating(true);
    setError('');
    setProgress(0);

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => Math.min(prev + 5, 90));
    }, 500);

    try {
      const response = await fetch('/api/plans/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobMatchId: matchId,
          durationDays: 30,
        }),
      });

      clearInterval(progressInterval);
      setProgress(100);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate plan');
      }

      // Wait a moment to show 100% then redirect
      setTimeout(() => {
        router.push(`/plans/${data.data.id}`);
      }, 1000);
    } catch (err) {
      clearInterval(progressInterval);
      setError(err instanceof Error ? err.message : 'Plan generation failed');
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-2xl w-full mx-4">
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          {!error ? (
            <>
              {/* Generating State */}
              <div className="text-6xl mb-6 animate-bounce">🤖</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Generating Your Preparation Plan
              </h2>
              <p className="text-gray-600 mb-8">
                Our AI is creating a personalized 30-day roadmap tailored to your needs...
              </p>

              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-medium text-indigo-600">{progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Loading Steps */}
              <div className="space-y-3 text-left max-w-md mx-auto">
                <div className={`flex items-center gap-3 transition-opacity ${progress > 20 ? 'opacity-100' : 'opacity-30'}`}>
                  <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs">✓</div>
                  <span className="text-sm text-gray-700">Analyzing skill gaps</span>
                </div>
                <div className={`flex items-center gap-3 transition-opacity ${progress > 40 ? 'opacity-100' : 'opacity-30'}`}>
                  <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs">✓</div>
                  <span className="text-sm text-gray-700">Creating daily learning tasks</span>
                </div>
                <div className={`flex items-center gap-3 transition-opacity ${progress > 60 ? 'opacity-100' : 'opacity-30'}`}>
                  <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs">✓</div>
                  <span className="text-sm text-gray-700">Finding learning resources</span>
                </div>
                <div className={`flex items-center gap-3 transition-opacity ${progress > 80 ? 'opacity-100' : 'opacity-30'}`}>
                  <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs">✓</div>
                  <span className="text-sm text-gray-700">Generating interview questions</span>
                </div>
                <div className={`flex items-center gap-3 transition-opacity ${progress === 100 ? 'opacity-100' : 'opacity-30'}`}>
                  <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs">✓</div>
                  <span className="text-sm text-gray-700">Finalizing your roadmap</span>
                </div>
              </div>

              {progress === 100 && (
                <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-700 font-medium">✨ Plan generated! Redirecting...</p>
                </div>
              )}
            </>
          ) : (
            <>
              {/* Error State */}
              <div className="text-6xl mb-6">❌</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Generation Failed
              </h2>
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700">{error}</p>
              </div>
              <div className="flex gap-4 justify-center">
                <Button onClick={generatePlan}>
                  Try Again
                </Button>
                <Link href="/dashboard">
                  <Button variant="outline">
                    Back to Dashboard
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
