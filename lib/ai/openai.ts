/**
 * OpenAI Client Configuration
 * Handles all AI interactions for JobReady.AI
 */

import OpenAI from 'openai';

// Initialize OpenAI client
export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Default model configuration
 */
export const AI_CONFIG = {
  model: 'gpt-4o-mini', // Cost-effective model for most tasks
  temperature: 0.7,
  max_tokens: 4000,
};

/**
 * Generate AI completion with retry logic
 */
export async function generateCompletion(
  prompt: string,
  options?: {
    model?: string;
    temperature?: number;
    max_tokens?: number;
    responseFormat?: 'text' | 'json';
  }
): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: options?.model || AI_CONFIG.model,
      messages: [
        {
          role: 'system',
          content: 'You are an expert career coach and technical recruiter helping job seekers prepare for interviews.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: options?.temperature || AI_CONFIG.temperature,
      max_tokens: options?.max_tokens || AI_CONFIG.max_tokens,
      response_format: options?.responseFormat === 'json' ? { type: 'json_object' } : undefined,
    });

    return response.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw new Error('Failed to generate AI response');
  }
}

/**
 * Generate structured JSON response from AI
 */
export async function generateStructuredResponse<T>(
  prompt: string,
  options?: {
    model?: string;
    temperature?: number;
  }
): Promise<T> {
  const response = await generateCompletion(prompt, {
    ...options,
    responseFormat: 'json',
  });

  try {
    return JSON.parse(response) as T;
  } catch (error) {
    console.error('Failed to parse AI JSON response:', error);
    throw new Error('Invalid JSON response from AI');
  }
}
