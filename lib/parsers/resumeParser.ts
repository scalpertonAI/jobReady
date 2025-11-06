/**
 * Resume Parser
 * Uses AI to extract structured data from resume text
 */

import { generateStructuredResponse } from '@/lib/ai/openai';
import { getResumeParsingPrompt } from '@/lib/ai/prompts';
import { ParsedResume } from '@/types';

/**
 * Parse resume text into structured data using AI
 */
export async function parseResume(resumeText: string): Promise<ParsedResume> {
  try {
    const prompt = getResumeParsingPrompt(resumeText);
    const parsedData = await generateStructuredResponse<ParsedResume>(prompt);

    return parsedData;
  } catch (error) {
    console.error('Resume parsing error:', error);
    throw new Error('Failed to parse resume');
  }
}

/**
 * Extract skills from resume (quick extraction without full parsing)
 */
export async function extractSkillsFromResume(resumeText: string): Promise<string[]> {
  try {
    const prompt = `Extract all technical skills, tools, and technologies mentioned in this resume. Return as a JSON array of strings.

Resume:
${resumeText}

Return format: {"skills": ["skill1", "skill2", ...]}`;

    const result = await generateStructuredResponse<{ skills: string[] }>(prompt);
    return result.skills || [];
  } catch (error) {
    console.error('Skill extraction error:', error);
    return [];
  }
}

/**
 * Calculate years of experience from parsed resume
 */
export function calculateYearsOfExperience(parsedResume: ParsedResume): number {
  if (!parsedResume.experience || parsedResume.experience.length === 0) {
    return 0;
  }

  let totalMonths = 0;

  for (const exp of parsedResume.experience) {
    const startDate = new Date(exp.start_date);
    const endDate = exp.end_date === 'Present' ? new Date() : new Date(exp.end_date);

    if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
      const months = (endDate.getFullYear() - startDate.getFullYear()) * 12 +
        (endDate.getMonth() - startDate.getMonth());
      totalMonths += months;
    }
  }

  return Math.round((totalMonths / 12) * 10) / 10; // Round to 1 decimal
}

/**
 * Validate parsed resume data
 */
export function validateParsedResume(data: any): data is ParsedResume {
  return (
    data &&
    typeof data === 'object' &&
    data.skills &&
    Array.isArray(data.skills.technical) &&
    Array.isArray(data.experience)
  );
}
