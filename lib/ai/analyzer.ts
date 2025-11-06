/**
 * Job Match Analyzer
 * Compares resume against job description and generates match report
 */

import { generateStructuredResponse } from './openai';
import { getJobMatchAnalysisPrompt } from './prompts';
import { JobMatchAnalysis, ParsedResume, ParsedJobDescription } from '@/types';

/**
 * Analyze how well a resume matches a job description
 */
export async function analyzeJobMatch(
  resumeData: ParsedResume,
  jdData: ParsedJobDescription
): Promise<JobMatchAnalysis> {
  try {
    const prompt = getJobMatchAnalysisPrompt(resumeData, jdData);
    const analysis = await generateStructuredResponse<JobMatchAnalysis>(prompt, {
      temperature: 0.5, // Lower temperature for more consistent analysis
    });

    return analysis;
  } catch (error) {
    console.error('Job match analysis error:', error);
    throw new Error('Failed to analyze job match');
  }
}

/**
 * Quick skill comparison (without full AI analysis)
 */
export function quickSkillComparison(
  resumeSkills: string[],
  requiredSkills: string[]
): {
  matched: string[];
  missing: string[];
  matchPercentage: number;
} {
  const normalizedResumeSkills = resumeSkills.map(s => s.toLowerCase().trim());
  const normalizedRequiredSkills = requiredSkills.map(s => s.toLowerCase().trim());

  const matched: string[] = [];
  const missing: string[] = [];

  for (const skill of requiredSkills) {
    const normalizedSkill = skill.toLowerCase().trim();
    const isMatched = normalizedResumeSkills.some(rs =>
      rs.includes(normalizedSkill) || normalizedSkill.includes(rs)
    );

    if (isMatched) {
      matched.push(skill);
    } else {
      missing.push(skill);
    }
  }

  const matchPercentage = requiredSkills.length > 0
    ? Math.round((matched.length / requiredSkills.length) * 100)
    : 0;

  return {
    matched,
    missing,
    matchPercentage,
  };
}

/**
 * Calculate ATS score based on keyword matching
 */
export function calculateATSScore(
  resumeText: string,
  jdKeywords: string[]
): number {
  const resumeLower = resumeText.toLowerCase();
  let matchedKeywords = 0;

  for (const keyword of jdKeywords) {
    if (resumeLower.includes(keyword.toLowerCase())) {
      matchedKeywords++;
    }
  }

  return jdKeywords.length > 0
    ? Math.round((matchedKeywords / jdKeywords.length) * 100)
    : 0;
}
