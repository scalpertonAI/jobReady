import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { optimizeResume } from '@/lib/ai/resumeOptimizer';

/**
 * POST /api/resumes/[id]/optimize
 * Generate optimization suggestions for a resume
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient();

    // Get current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    const body = await request.json();
    const { job_description_id } = body;

    // Get resume
    const { data: resume, error: resumeError } = await supabase
      .from('resumes')
      .select('*')
      .eq('id', id)
      .eq('user_id', user.id)
      .single();

    if (resumeError || !resume) {
      return NextResponse.json({ error: 'Resume not found' }, { status: 404 });
    }

    // Get job description if provided
    let jobDescription = null;
    if (job_description_id) {
      const { data: jd } = await supabase
        .from('job_descriptions')
        .select('*')
        .eq('id', job_description_id)
        .eq('user_id', user.id)
        .single();

      jobDescription = jd;
    }

    // Generate optimization suggestions using AI
    const suggestions = await optimizeResume(
      resume.parsed_data,
      resume.raw_text,
      jobDescription?.parsed_data || null
    );

    // Save suggestions to database
    const { data: improvement, error: saveError } = await supabase
      .from('resume_improvements')
      .insert({
        resume_id: id,
        job_description_id: job_description_id || null,
        suggestions: suggestions,
        user_id: user.id,
      })
      .select()
      .single();

    if (saveError) {
      console.error('Error saving resume improvements:', saveError);
      return NextResponse.json(
        { error: 'Failed to save improvements' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: improvement,
    });
  } catch (error) {
    console.error('Resume optimization error:', error);
    return NextResponse.json(
      {
        error: 'Failed to optimize resume',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/resumes/[id]/optimize
 * Get optimization suggestions for a resume
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient();

    // Get current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;

    // Get all optimization suggestions for this resume
    const { data: improvements, error } = await supabase
      .from('resume_improvements')
      .select('*, job_descriptions(company_name, job_title)')
      .eq('resume_id', id)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching improvements:', error);
      return NextResponse.json(
        { error: 'Failed to fetch improvements' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: improvements || [],
    });
  } catch (error) {
    console.error('Fetch improvements error:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch improvements',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
