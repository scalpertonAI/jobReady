/**
 * Job Match Analysis API Route
 * Analyzes resume vs job description and creates match report
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { analyzeJobMatch } from '@/lib/ai/analyzer';
import { ParsedResume, ParsedJobDescription } from '@/types';

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
    const { resumeId, jobDescriptionId } = body;

    if (!resumeId || !jobDescriptionId) {
      return NextResponse.json({ error: 'Resume ID and Job Description ID are required' }, { status: 400 });
    }

    // Fetch resume
    const { data: resume, error: resumeError } = await supabase
      .from('resumes')
      .select('*')
      .eq('id', resumeId)
      .eq('user_id', user.id)
      .single();

    if (resumeError || !resume) {
      return NextResponse.json({ error: 'Resume not found' }, { status: 404 });
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

    // Check if analysis already exists
    const { data: existingMatch } = await supabase
      .from('job_matches')
      .select('*')
      .eq('resume_id', resumeId)
      .eq('job_description_id', jobDescriptionId)
      .single();

    if (existingMatch) {
      return NextResponse.json({
        success: true,
        data: existingMatch,
        message: 'Analysis already exists',
      });
    }

    // Perform AI analysis
    const resumeData = resume.parsed_data as ParsedResume;
    const jdData = jobDescription.parsed_data as ParsedJobDescription;

    const analysis = await analyzeJobMatch(resumeData, jdData);

    // Save analysis to database
    const { data: jobMatch, error: matchError } = await supabase
      .from('job_matches')
      .insert({
        user_id: user.id,
        resume_id: resumeId,
        job_description_id: jobDescriptionId,
        match_percentage: analysis.match_percentage,
        analysis_data: analysis,
      })
      .select()
      .single();

    if (matchError) {
      console.error('Database error:', matchError);
      return NextResponse.json({ error: 'Failed to save analysis' }, { status: 500 });
    }

    // Award XP for first analysis
    const { data: profile } = await supabase
      .from('profiles')
      .select('total_xp')
      .eq('id', user.id)
      .single();

    if (profile) {
      await supabase
        .from('profiles')
        .update({ total_xp: (profile.total_xp || 0) + 100 })
        .eq('id', user.id);

      // Check for first analysis achievement
      const { data: existingAchievement } = await supabase
        .from('user_achievements')
        .select('*')
        .eq('user_id', user.id)
        .eq('achievement_type', 'first_analysis')
        .single();

      if (!existingAchievement) {
        await supabase.from('user_achievements').insert({
          user_id: user.id,
          achievement_type: 'first_analysis',
          title: 'Job Hunter',
          description: 'Completed your first job match analysis',
          badge_icon: '🎯',
          xp_reward: 100,
        });
      }
    }

    return NextResponse.json({
      success: true,
      data: jobMatch,
      message: 'Analysis completed successfully',
    });
  } catch (error) {
    console.error('Analysis error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
