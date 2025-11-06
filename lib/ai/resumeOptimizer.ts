/**
 * Resume Optimizer
 * Generates suggestions to improve resumes for specific jobs
 */

import { generateStructuredResponse } from './openai';
import { getResumeOptimizationPrompt } from './prompts';
import { ResumeImprovement, ParsedResume, ParsedJobDescription } from '@/types';

/**
 * Generate resume optimization suggestions
 */
export async function generateResumeImprovements(
  resumeData: ParsedResume,
  jdData: ParsedJobDescription
): Promise<Omit<ResumeImprovement, 'improvement_id' | 'created_at'>> {
  try {
    const prompt = getResumeOptimizationPrompt(resumeData, jdData);
    const improvements = await generateStructuredResponse<
      Omit<ResumeImprovement, 'improvement_id' | 'created_at'>
    >(prompt, {
      temperature: 0.6,
    });

    return improvements;
  } catch (error) {
    console.error('Resume optimization error:', error);
    throw new Error('Failed to generate resume improvements');
  }
}

/**
 * Generate ATS-friendly keywords for a specific role
 */
export async function generateATSKeywords(
  jobTitle: string,
  requiredSkills: string[]
): Promise<string[]> {
  try {
    const prompt = `Generate ATS-friendly keywords for a ${jobTitle} position requiring: ${requiredSkills.join(', ')}

Return a JSON array of important keywords that should appear in a resume:
{"keywords": ["keyword1", "keyword2", ...]}

Include variations and related terms.`;

    const result = await generateStructuredResponse<{ keywords: string[] }>(prompt);
    return result.keywords || [];
  } catch (error) {
    console.error('Keyword generation error:', error);
    return [];
  }
}

/**
 * Suggest action verbs for resume bullet points
 */
export const RESUME_ACTION_VERBS = {
  leadership: [
    'Led', 'Directed', 'Managed', 'Coordinated', 'Supervised', 'Mentored',
    'Guided', 'Orchestrated', 'Spearheaded', 'Championed'
  ],
  achievement: [
    'Achieved', 'Exceeded', 'Delivered', 'Accomplished', 'Attained',
    'Surpassed', 'Outperformed', 'Completed', 'Finished'
  ],
  improvement: [
    'Improved', 'Enhanced', 'Optimized', 'Streamlined', 'Modernized',
    'Upgraded', 'Refined', 'Strengthened', 'Increased', 'Reduced'
  ],
  creation: [
    'Created', 'Developed', 'Built', 'Designed', 'Engineered', 'Architected',
    'Implemented', 'Established', 'Launched', 'Introduced'
  ],
  analysis: [
    'Analyzed', 'Evaluated', 'Assessed', 'Investigated', 'Researched',
    'Identified', 'Diagnosed', 'Examined', 'Tested'
  ],
  collaboration: [
    'Collaborated', 'Partnered', 'Cooperated', 'Contributed', 'Supported',
    'Assisted', 'Facilitated', 'Enabled', 'Coordinated'
  ],
};

/**
 * Get random action verb for a category
 */
export function getActionVerb(category: keyof typeof RESUME_ACTION_VERBS): string {
  const verbs = RESUME_ACTION_VERBS[category];
  return verbs[Math.floor(Math.random() * verbs.length)];
}
