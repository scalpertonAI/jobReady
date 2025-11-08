/**
 * Question Progress Tracking
 * Track which curated questions users have solved
 */

import { createClient } from '@/lib/supabase/server';
import { CURATED_QUESTIONS, type CuratedQuestion } from '@/lib/data/curatedQuestions';

export interface QuestionProgress {
  user_id: string;
  question_id: string;
  status: 'not_started' | 'attempted' | 'solved';
  attempts: number;
  time_spent_minutes: number;
  solved_at: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface InterviewReadiness {
  overall_score: number; // 0-100
  questions_solved: number;
  questions_total: number;
  by_difficulty: {
    easy: { solved: number; total: number; percentage: number };
    medium: { solved: number; total: number; percentage: number };
    hard: { solved: number; total: number; percentage: number };
  };
  by_category: Record<string, { solved: number; total: number; percentage: number }>;
  weak_areas: string[];
  recommended_focus: string[];
  time_to_ready: string; // e.g., "2-3 weeks"
  percentile: number; // Compared to other users
}

/**
 * Calculate interview readiness based on solved questions
 */
export function calculateInterviewReadiness(
  solvedQuestions: string[],
  targetCompany?: string,
  targetRole?: string
): InterviewReadiness {
  const totalQuestions = CURATED_QUESTIONS.length;
  const solvedCount = solvedQuestions.length;

  // Filter relevant questions for target company
  const relevantQuestions = targetCompany
    ? CURATED_QUESTIONS.filter(q => q.companies.includes(targetCompany))
    : CURATED_QUESTIONS;

  const relevantSolved = solvedQuestions.filter(id =>
    relevantQuestions.some(q => q.id === id)
  );

  // Calculate by difficulty
  const byDifficulty = {
    easy: {
      total: CURATED_QUESTIONS.filter(q => q.difficulty === 'Easy').length,
      solved: solvedQuestions.filter(id =>
        CURATED_QUESTIONS.find(q => q.id === id && q.difficulty === 'Easy')
      ).length,
      percentage: 0,
    },
    medium: {
      total: CURATED_QUESTIONS.filter(q => q.difficulty === 'Medium').length,
      solved: solvedQuestions.filter(id =>
        CURATED_QUESTIONS.find(q => q.id === id && q.difficulty === 'Medium')
      ).length,
      percentage: 0,
    },
    hard: {
      total: CURATED_QUESTIONS.filter(q => q.difficulty === 'Hard').length,
      solved: solvedQuestions.filter(id =>
        CURATED_QUESTIONS.find(q => q.id === id && q.difficulty === 'Hard')
      ).length,
      percentage: 0,
    },
  };

  byDifficulty.easy.percentage = (byDifficulty.easy.solved / byDifficulty.easy.total) * 100;
  byDifficulty.medium.percentage = (byDifficulty.medium.solved / byDifficulty.medium.total) * 100;
  byDifficulty.hard.percentage = (byDifficulty.hard.solved / byDifficulty.hard.total) * 100;

  // Calculate by category
  const categories = Array.from(new Set(CURATED_QUESTIONS.map(q => q.category)));
  const byCategory: Record<string, { solved: number; total: number; percentage: number }> = {};

  categories.forEach(category => {
    const total = CURATED_QUESTIONS.filter(q => q.category === category).length;
    const solved = solvedQuestions.filter(id => {
      const q = CURATED_QUESTIONS.find(q => q.id === id);
      return q && q.category === category;
    }).length;

    byCategory[category] = {
      total,
      solved,
      percentage: (solved / total) * 100,
    };
  });

  // Identify weak areas (< 30% solved)
  const weakAreas = Object.entries(byCategory)
    .filter(([_, stats]) => stats.percentage < 30)
    .map(([category]) => category);

  // Recommended focus areas
  const recommendedFocus = Object.entries(byCategory)
    .filter(([_, stats]) => stats.percentage < 50 && stats.total >= 3)
    .sort((a, b) => a[1].percentage - b[1].percentage)
    .slice(0, 3)
    .map(([category]) => category);

  // Calculate overall score
  // Weighted: Easy 20%, Medium 50%, Hard 30%
  const overallScore = Math.round(
    (byDifficulty.easy.percentage * 0.2) +
    (byDifficulty.medium.percentage * 0.5) +
    (byDifficulty.hard.percentage * 0.3)
  );

  // Estimate time to ready (assuming 3 problems per day)
  const questionsRemaining = targetCompany
    ? relevantQuestions.length - relevantSolved.length
    : Math.max(75 - solvedCount, 0); // Blind 75 as baseline

  const daysNeeded = Math.ceil(questionsRemaining / 3);
  const weeksNeeded = Math.ceil(daysNeeded / 7);

  let timeToReady = '';
  if (overallScore >= 80) timeToReady = 'Interview ready!';
  else if (weeksNeeded === 0) timeToReady = 'Interview ready!';
  else if (weeksNeeded === 1) timeToReady = '1 week';
  else if (weeksNeeded <= 4) timeToReady = `${weeksNeeded} weeks`;
  else timeToReady = `${Math.ceil(weeksNeeded / 4)} months`;

  // Calculate percentile (mock for now - would be real in production)
  let percentile = 50;
  if (overallScore >= 90) percentile = 95;
  else if (overallScore >= 80) percentile = 85;
  else if (overallScore >= 70) percentile = 75;
  else if (overallScore >= 60) percentile = 65;
  else if (overallScore >= 50) percentile = 55;
  else if (overallScore >= 40) percentile = 45;
  else percentile = Math.max(overallScore / 2, 10);

  return {
    overall_score: overallScore,
    questions_solved: solvedCount,
    questions_total: totalQuestions,
    by_difficulty: byDifficulty,
    by_category: byCategory,
    weak_areas: weakAreas,
    recommended_focus: recommendedFocus,
    time_to_ready: timeToReady,
    percentile,
  };
}

/**
 * Get progress summary for a user
 */
export async function getUserProgress(userId: string): Promise<QuestionProgress[]> {
  // This would query the database in production
  // For now, return empty array
  return [];
}

/**
 * Mark question as solved
 */
export async function markQuestionSolved(
  userId: string,
  questionId: string
): Promise<void> {
  // This would update the database in production
  console.log(`User ${userId} solved question ${questionId}`);
}
