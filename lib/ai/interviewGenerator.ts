/**
 * Mock Interview Generator
 * Creates interview questions and evaluates answers
 */

import { generateStructuredResponse } from './openai';
import { getMockInterviewQuestionsPrompt, getAnswerEvaluationPrompt } from './prompts';
import { ParsedJobDescription, InterviewQuestion } from '@/types';

/**
 * Generate mock interview questions
 */
export async function generateInterviewQuestions(
  jdData: ParsedJobDescription,
  difficulty: 'easy' | 'medium' | 'hard',
  count: number = 5
): Promise<InterviewQuestion[]> {
  try {
    const prompt = getMockInterviewQuestionsPrompt(jdData, difficulty, count);
    const result = await generateStructuredResponse<{ questions: InterviewQuestion[] }>(
      prompt,
      {
        temperature: 0.8, // Higher temperature for diverse questions
      }
    );

    return result.questions || [];
  } catch (error) {
    console.error('Interview question generation error:', error);
    throw new Error('Failed to generate interview questions');
  }
}

/**
 * Evaluate a candidate's answer to an interview question
 */
export async function evaluateAnswer(
  question: string,
  userAnswer: string,
  expectedKeywords: string[]
): Promise<{
  score: number;
  feedback: string;
  suggested_improvements: string[];
  example_answer: string;
  strengths: string[];
  weaknesses: string[];
}> {
  try {
    const prompt = getAnswerEvaluationPrompt(question, userAnswer, expectedKeywords);
    const evaluation = await generateStructuredResponse<{
      score: number;
      feedback: string;
      suggested_improvements: string[];
      example_answer: string;
      strengths: string[];
      weaknesses: string[];
    }>(prompt, {
      temperature: 0.6,
    });

    return evaluation;
  } catch (error) {
    console.error('Answer evaluation error:', error);
    throw new Error('Failed to evaluate answer');
  }
}

/**
 * Calculate overall interview score
 */
export function calculateInterviewScore(questionScores: number[]): {
  average_score: number;
  overall_score: number;
  performance_level: 'excellent' | 'good' | 'fair' | 'needs_improvement';
} {
  if (questionScores.length === 0) {
    return {
      average_score: 0,
      overall_score: 0,
      performance_level: 'needs_improvement',
    };
  }

  const average = questionScores.reduce((a, b) => a + b, 0) / questionScores.length;
  const overall = Math.round(average * 10); // Convert to 0-100 scale

  let performance_level: 'excellent' | 'good' | 'fair' | 'needs_improvement';
  if (overall >= 80) performance_level = 'excellent';
  else if (overall >= 60) performance_level = 'good';
  else if (overall >= 40) performance_level = 'fair';
  else performance_level = 'needs_improvement';

  return {
    average_score: Math.round(average * 10) / 10,
    overall_score: overall,
    performance_level,
  };
}

/**
 * Generate interview feedback summary
 */
export async function generateInterviewSummary(
  questions: InterviewQuestion[],
  scores: number[]
): Promise<{
  strengths: string[];
  areas_to_improve: string[];
  recommended_focus: string[];
}> {
  try {
    const prompt = `Based on these interview questions and scores, provide a summary:

Questions and Scores:
${questions.map((q, i) => `Q${i + 1}: ${q.question_text} - Score: ${scores[i]}/10`).join('\n')}

Provide summary in JSON format:
{
  "strengths": ["array of strengths demonstrated"],
  "areas_to_improve": ["array of areas needing work"],
  "recommended_focus": ["specific topics to study"]
}`;

    const summary = await generateStructuredResponse<{
      strengths: string[];
      areas_to_improve: string[];
      recommended_focus: string[];
    }>(prompt);

    return summary;
  } catch (error) {
    console.error('Interview summary generation error:', error);
    return {
      strengths: [],
      areas_to_improve: [],
      recommended_focus: [],
    };
  }
}

/**
 * Calculate XP reward for interview performance
 */
export function calculateInterviewXP(
  overallScore: number,
  questionCount: number
): number {
  const baseXP = 100;
  const scoreMultiplier = overallScore / 100; // 0 to 1
  const questionBonus = questionCount * 10;

  return Math.round(baseXP * (1 + scoreMultiplier) + questionBonus);
}
