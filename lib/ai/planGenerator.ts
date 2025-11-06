/**
 * Preparation Plan Generator
 * Creates personalized learning plans based on job match analysis
 */

import { generateStructuredResponse } from './openai';
import { getPreparationPlanPrompt } from './prompts';
import { JobMatchAnalysis, PreparationPlan } from '@/types';

/**
 * Generate a comprehensive preparation plan
 */
export async function generatePreparationPlan(
  matchAnalysis: JobMatchAnalysis,
  durationDays: number = 30
): Promise<Omit<PreparationPlan, 'plan_id' | 'created_at'>> {
  try {
    const prompt = getPreparationPlanPrompt(matchAnalysis, durationDays);
    const plan = await generateStructuredResponse<Omit<PreparationPlan, 'plan_id' | 'created_at'>>(
      prompt,
      {
        temperature: 0.7,
        model: 'gpt-4o', // Use more powerful model for plan generation
      }
    );

    // Validate and ensure all required fields are present
    if (!plan.overview || !plan.daily_tasks || plan.daily_tasks.length === 0) {
      throw new Error('Invalid plan structure returned from AI');
    }

    return plan;
  } catch (error) {
    console.error('Plan generation error:', error);
    throw new Error('Failed to generate preparation plan');
  }
}

/**
 * Generate a quick learning roadmap (simplified version)
 */
export async function generateQuickRoadmap(
  missingSkills: string[],
  durationWeeks: number = 4
): Promise<{ week: number; skills: string[]; focus: string }[]> {
  try {
    const prompt = `Create a ${durationWeeks}-week learning roadmap for these skills: ${missingSkills.join(', ')}

Return JSON format:
{
  "roadmap": [
    {
      "week": 1,
      "skills": ["skill1", "skill2"],
      "focus": "description of what to learn this week"
    }
  ]
}`;

    const result = await generateStructuredResponse<{
      roadmap: { week: number; skills: string[]; focus: string }[];
    }>(prompt);

    return result.roadmap || [];
  } catch (error) {
    console.error('Roadmap generation error:', error);
    return [];
  }
}

/**
 * Calculate XP rewards based on task difficulty
 */
export function calculateTaskXP(
  taskType: string,
  estimatedHours: number
): number {
  const baseXP = {
    learning: 50,
    practice: 75,
    project: 100,
    review: 30,
    mock_interview: 150,
  };

  const base = baseXP[taskType as keyof typeof baseXP] || 50;
  const hourMultiplier = Math.min(estimatedHours, 4); // Cap at 4 hours
  return Math.round(base * (1 + hourMultiplier * 0.2));
}

/**
 * Calculate milestone XP rewards
 */
export function calculateMilestoneXP(dayNumber: number, totalDays: number): number {
  // Higher rewards for later milestones
  const progress = dayNumber / totalDays;
  return Math.round(200 + progress * 300); // 200-500 XP range
}
