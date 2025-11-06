/**
 * Mock Interview Answer API Route
 * Evaluates user's answer and provides feedback
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { evaluateAnswer } from '@/lib/ai/interviewGenerator';

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
    const { sessionId, questionNumber, questionText, userAnswer, expectedKeywords = [] } = body;

    if (!sessionId || questionNumber === undefined || !questionText || !userAnswer) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Verify session belongs to user
    const { data: session, error: sessionError } = await supabase
      .from('mock_interview_sessions')
      .select('*')
      .eq('id', sessionId)
      .eq('user_id', user.id)
      .single();

    if (sessionError || !session) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 });
    }

    // Evaluate answer with AI
    const evaluation = await evaluateAnswer(questionText, userAnswer, expectedKeywords);

    // Save response to database
    const { data: response, error: responseError } = await supabase
      .from('interview_responses')
      .insert({
        session_id: sessionId,
        question_number: questionNumber,
        question_text: questionText,
        question_type: 'technical',
        user_answer: userAnswer,
        feedback: evaluation.feedback,
        score: evaluation.score,
        suggested_improvements: evaluation.suggested_improvements.join('\n'),
        example_answer: evaluation.example_answer,
      })
      .select()
      .single();

    if (responseError) {
      console.error('Database error:', responseError);
      return NextResponse.json({ error: 'Failed to save response' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      data: {
        ...evaluation,
        response_id: response.id,
      },
      message: 'Answer evaluated successfully',
    });
  } catch (error) {
    console.error('Answer evaluation error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
