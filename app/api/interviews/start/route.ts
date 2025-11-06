/**
 * Mock Interview Start API Route
 * Generates interview questions and creates a session
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { generateInterviewQuestions } from '@/lib/ai/interviewGenerator';
import { ParsedJobDescription } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { jobDescriptionId, preparationPlanId, difficulty = 'medium', questionCount = 5 } = body;

    if (!jobDescriptionId) {
      return NextResponse.json({ error: 'Job description ID is required' }, { status: 400 });
    }

    // Fetch job description
    const { data: jobDescription, error: jdError } = await supabase
      .from('job_descriptions')
      .select('*')
      .eq('id', jobDescriptionId)
      .eq('user_id', user.id)
      .single();

    if (jdError || !jobDescription) {
      return NextResponse.json({ error: 'Job description not found' }, { status: 404 });
    }

    // Generate interview questions
    const jdData = jobDescription.parsed_data as ParsedJobDescription;
    const questions = await generateInterviewQuestions(
      jdData,
      difficulty as 'easy' | 'medium' | 'hard',
      questionCount
    );

    // Create interview session
    const { data: session, error: sessionError } = await supabase
      .from('mock_interview_sessions')
      .insert({
        user_id: user.id,
        preparation_plan_id: preparationPlanId || null,
        interview_type: 'mixed',
        difficulty: difficulty,
        questions_data: questions,
        total_questions: questions.length,
        status: 'in_progress',
      })
      .select()
      .single();

    if (sessionError) {
      console.error('Database error:', sessionError);
      return NextResponse.json({ error: 'Failed to create interview session' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      data: {
        session_id: session.id,
        questions: questions,
        total_questions: questions.length,
      },
      message: 'Interview session started',
    });
  } catch (error) {
    console.error('Interview start error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
