'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Card from '@/components/shared/Card';
import Button from '@/components/shared/Button';

export default function NewInterviewPage() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [numQuestions, setNumQuestions] = useState(5);
  const [loading, setLoading] = useState(false);

  const handleStartInterview = async () => {
    if (!selectedPlan) {
      alert('Please select a preparation plan first');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/interviews/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan_id: selectedPlan,
          difficulty,
          num_questions: numQuestions,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to start interview');
      }

      const { session_id } = await response.json();
      router.push(`/interviews/${session_id}`);
    } catch (error) {
      console.error('Interview start error:', error);
      alert('Failed to start mock interview. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Start Mock Interview</h1>
        <p className="mt-2 text-gray-600">
          Practice with AI-powered interview questions tailored to your preparation plan
        </p>
      </div>

      <Card>
        <div className="p-6 space-y-6">
          {/* Plan Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Preparation Plan
            </label>
            <select
              value={selectedPlan}
              onChange={(e) => setSelectedPlan(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">Choose a plan...</option>
              {/* TODO: Fetch and populate user's plans */}
              <option value="plan-1">Frontend Developer - Google (30 days)</option>
              <option value="plan-2">Backend Engineer - Microsoft (30 days)</option>
            </select>
            <p className="mt-2 text-sm text-gray-500">
              Interview questions will be based on the skills in your selected plan
            </p>
          </div>

          {/* Difficulty Level */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Difficulty Level
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(['easy', 'medium', 'hard'] as const).map((level) => (
                <button
                  key={level}
                  onClick={() => setDifficulty(level)}
                  className={`px-4 py-3 rounded-lg border-2 font-medium transition-all ${
                    difficulty === level
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Number of Questions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Questions
            </label>
            <input
              type="number"
              min={3}
              max={10}
              value={numQuestions}
              onChange={(e) => setNumQuestions(parseInt(e.target.value) || 5)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
            <p className="mt-2 text-sm text-gray-500">
              Recommended: 5-7 questions for a focused practice session
            </p>
          </div>

          {/* Interview Format Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">What to Expect:</h3>
            <ul className="space-y-1 text-sm text-blue-800">
              <li>• AI will ask you {numQuestions} technical questions</li>
              <li>• Type your answer for each question</li>
              <li>• Get instant feedback and scoring</li>
              <li>• Earn XP for completing the interview</li>
              <li>• Review your performance summary at the end</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="primary"
              onClick={handleStartInterview}
              disabled={!selectedPlan || loading}
              className="flex-1"
            >
              {loading ? 'Starting Interview...' : 'Start Mock Interview'}
            </Button>
            <Button
              variant="outline"
              onClick={() => router.back()}
              disabled={loading}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Card>

      {/* Tips Card */}
      <Card>
        <div className="p-6">
          <h3 className="font-semibold text-gray-900 mb-3">Interview Tips:</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>✓ Find a quiet place where you won't be interrupted</li>
            <li>✓ Take your time to think before answering</li>
            <li>✓ Explain your thought process, not just the answer</li>
            <li>✓ Use specific examples from your experience when possible</li>
            <li>✓ Don't worry about perfect answers - focus on learning</li>
          </ul>
        </div>
      </Card>
    </div>
  );
}
