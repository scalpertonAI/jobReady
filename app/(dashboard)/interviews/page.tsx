'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Card from '@/components/shared/Card';
import Button from '@/components/shared/Button';

interface InterviewSession {
  id: string;
  plan_id: string;
  difficulty: string;
  total_questions: number;
  questions_answered: number;
  average_score: number;
  status: 'in_progress' | 'completed';
  created_at: string;
}

export default function InterviewsPage() {
  const router = useRouter();
  const [sessions, setSessions] = useState<InterviewSession[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch user's interview sessions
    setLoading(false);
    // Placeholder data
    setSessions([]);
  }, []);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'completed'
      ? 'bg-green-100 text-green-800'
      : 'bg-blue-100 text-blue-800';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-500">Loading interviews...</div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mock Interviews</h1>
          <p className="mt-2 text-gray-600">
            Practice technical interviews and track your progress
          </p>
        </div>
        <Button
          variant="primary"
          onClick={() => router.push('/interviews/new')}
        >
          Start New Interview
        </Button>
      </div>

      {/* Interview Sessions List */}
      {sessions.length === 0 ? (
        <Card>
          <div className="p-12 text-center">
            <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-primary-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No mock interviews yet
            </h3>
            <p className="text-gray-600 mb-6">
              Start practicing with AI-powered technical interviews
            </p>
            <Button
              variant="primary"
              onClick={() => router.push('/interviews/new')}
            >
              Start Your First Interview
            </Button>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {sessions.map((session) => (
            <Card key={session.id}>
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Interview Session
                      </h3>
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(
                          session.difficulty
                        )}`}
                      >
                        {session.difficulty}
                      </span>
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                          session.status
                        )}`}
                      >
                        {session.status === 'completed' ? 'Completed' : 'In Progress'}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-500">Questions</p>
                        <p className="text-lg font-semibold text-gray-900">
                          {session.questions_answered} / {session.total_questions}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Average Score</p>
                        <p className="text-lg font-semibold text-gray-900">
                          {session.average_score}%
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Date</p>
                        <p className="text-lg font-semibold text-gray-900">
                          {new Date(session.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary-600 h-2 rounded-full transition-all"
                        style={{
                          width: `${(session.questions_answered / session.total_questions) * 100}%`,
                        }}
                      />
                    </div>
                  </div>

                  <div className="ml-6">
                    <Button
                      variant={session.status === 'completed' ? 'outline' : 'primary'}
                      onClick={() => router.push(`/interviews/${session.id}`)}
                    >
                      {session.status === 'completed' ? 'View Results' : 'Continue'}
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Stats Card */}
      <Card>
        <div className="p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Your Interview Stats</h3>
          <div className="grid grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600">0</div>
              <div className="text-sm text-gray-500 mt-1">Total Interviews</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">0%</div>
              <div className="text-sm text-gray-500 mt-1">Avg. Score</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">0</div>
              <div className="text-sm text-gray-500 mt-1">Questions Answered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">0h</div>
              <div className="text-sm text-gray-500 mt-1">Practice Time</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
