/**
 * Preparation Plans API Routes
 * GET: List all user plans
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch user's plans with related data
    const { data: plans, error } = await supabase
      .from('preparation_plans')
      .select(`
        *,
        job_matches (
          *,
          job_descriptions (title, company_name),
          resumes (file_name)
        )
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Fetch error:', error);
      return NextResponse.json({ error: 'Failed to fetch plans' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      data: plans || [],
    });
  } catch (error) {
    console.error('Get plans error:', error);
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}
