/**
 * Preparation Plan Generation API Route
 * Generates a personalized 30-day prep plan based on job match analysis
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { generatePreparationPlan } from '@/lib/ai/planGenerator';
import { JobMatchAnalysis } from '@/types';

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
    const { jobMatchId, durationDays = 30 } = body;

    if (!jobMatchId) {
      return NextResponse.json({ error: 'Job match ID is required' }, { status: 400 });
    }

    // Fetch job match
    const { data: jobMatch, error: matchError } = await supabase
      .from('job_matches')
      .select('*')
      .eq('id', jobMatchId)
      .eq('user_id', user.id)
      .single();

    if (matchError || !jobMatch) {
      return NextResponse.json({ error: 'Job match not found' }, { status: 404 });
    }

    // Check if plan already exists for this job match
    const { data: existingPlan } = await supabase
      .from('preparation_plans')
      .select('*')
      .eq('job_match_id', jobMatchId)
      .eq('status', 'active')
      .single();

    if (existingPlan) {
      return NextResponse.json({
        success: true,
        data: existingPlan,
        message: 'Plan already exists for this job match',
      });
    }

    // Generate plan with AI
    const analysisData = jobMatch.analysis_data as JobMatchAnalysis;
    const planData = await generatePreparationPlan(analysisData, durationDays);

    // Save plan to database
    const { data: plan, error: planError } = await supabase
      .from('preparation_plans')
      .insert({
        user_id: user.id,
        job_match_id: jobMatchId,
        duration_days: durationDays,
        difficulty_level: 'intermediate',
        plan_data: planData,
        status: 'active',
        progress_percentage: 0,
      })
      .select()
      .single();

    if (planError) {
      console.error('Database error:', planError);
      return NextResponse.json({ error: 'Failed to save plan' }, { status: 500 });
    }

    // Create plan tasks
    if (planData.daily_tasks && planData.daily_tasks.length > 0) {
      const tasks = planData.daily_tasks.map((task, index) => ({
        preparation_plan_id: plan.id,
        day_number: task.day,
        title: task.title,
        description: task.description,
        task_type: task.type,
        content: { tasks: task.tasks },
        estimated_hours: task.tasks.reduce((sum, t) => sum + (t.duration_minutes / 60), 0),
        order_index: index,
      }));

      const { error: tasksError } = await supabase.from('plan_tasks').insert(tasks);

      if (tasksError) {
        console.error('Tasks creation error:', tasksError);
      }
    }

    // Award XP for first plan
    const { data: profile } = await supabase
      .from('profiles')
      .select('total_xp')
      .eq('id', user.id)
      .single();

    if (profile) {
      await supabase
        .from('profiles')
        .update({ total_xp: (profile.total_xp || 0) + 150 })
        .eq('id', user.id);

      // Check for first plan achievement
      const { data: existingAchievement } = await supabase
        .from('user_achievements')
        .select('*')
        .eq('user_id', user.id)
        .eq('achievement_type', 'first_plan')
        .single();

      if (!existingAchievement) {
        await supabase.from('user_achievements').insert({
          user_id: user.id,
          achievement_type: 'first_plan',
          title: 'Planner',
          description: 'Generated your first preparation plan',
          badge_icon: '📚',
          xp_reward: 150,
        });
      }
    }

    return NextResponse.json({
      success: true,
      data: plan,
      message: 'Preparation plan generated successfully',
    });
  } catch (error) {
    console.error('Plan generation error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
