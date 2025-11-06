/**
 * Job Description Parser
 * Uses AI to extract structured data from job descriptions
 */

import { generateStructuredResponse } from '@/lib/ai/openai';
import { getJobDescriptionParsingPrompt } from '@/lib/ai/prompts';
import { ParsedJobDescription } from '@/types';

/**
 * Parse job description text into structured data using AI
 */
export async function parseJobDescription(jdText: string): Promise<ParsedJobDescription> {
  try {
    const prompt = getJobDescriptionParsingPrompt(jdText);
    const parsedData = await generateStructuredResponse<ParsedJobDescription>(prompt);

    return parsedData;
  } catch (error) {
    console.error('Job description parsing error:', error);
    throw new Error('Failed to parse job description');
  }
}

/**
 * Extract required skills from job description (quick extraction)
 */
export async function extractRequiredSkills(jdText: string): Promise<string[]> {
  try {
    const prompt = `Extract all required technical skills and technologies from this job description. Return as a JSON array.

Job Description:
${jdText}

Return format: {"skills": ["skill1", "skill2", ...]}`;

    const result = await generateStructuredResponse<{ skills: string[] }>(prompt);
    return result.skills || [];
  } catch (error) {
    console.error('Skill extraction error:', error);
    return [];
  }
}

/**
 * Extract job title from raw text
 */
export function extractJobTitle(jdText: string): string {
  // Try to find common patterns for job titles
  const lines = jdText.split('\n').filter(line => line.trim().length > 0);

  // Usually the job title is in the first few lines
  for (let i = 0; i < Math.min(5, lines.length); i++) {
    const line = lines[i].trim();

    // Skip very long lines (likely not a title)
    if (line.length > 100) continue;

    // Common job title patterns
    const titlePatterns = [
      /^(senior|junior|lead|staff|principal)?\s*(software|backend|frontend|full.?stack|web|mobile|devops|data|ml|ai|cloud)/i,
      /^(developer|engineer|architect|designer|manager|analyst|scientist|administrator)/i,
    ];

    for (const pattern of titlePatterns) {
      if (pattern.test(line)) {
        return line;
      }
    }
  }

  // Fallback to first non-empty line
  return lines[0] || 'Untitled Position';
}

/**
 * Clean and normalize job description text
 */
export function cleanJobDescription(jdText: string): string {
  return jdText
    .replace(/\r\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/\t+/g, ' ')
    .replace(/ {2,}/g, ' ')
    .trim();
}

/**
 * Validate parsed job description data
 */
export function validateParsedJD(data: any): data is ParsedJobDescription {
  return (
    data &&
    typeof data === 'object' &&
    typeof data.title === 'string' &&
    Array.isArray(data.required_skills) &&
    Array.isArray(data.responsibilities)
  );
}
