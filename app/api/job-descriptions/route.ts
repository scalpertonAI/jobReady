/**
 * Job Descriptions API Routes
 * POST: Create new job description
 * GET: List all job descriptions
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { parseJobDescription, extractJobTitle, cleanJobDescription } from '@/lib/parsers/jdParser';

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
    const { rawText, title, companyName, url } = body;

    if (!rawText || rawText.trim().length === 0) {
      return NextResponse.json({ error: 'Job description text is required' }, { status: 400 });
    }

    // Clean the text
    const cleanedText = cleanJobDescription(rawText);

    // Extract title if not provided
    const jobTitle = title || extractJobTitle(cleanedText);

    // Parse job description with AI
    const parsedData = await parseJobDescription(cleanedText);

    // Save to database
    const { data: jobDescription, error: dbError } = await supabase
      .from('job_descriptions')
      .insert({
        user_id: user.id,
        title: jobTitle,
        company_name: companyName || parsedData.company || null,
        raw_text: cleanedText,
        parsed_data: parsedData,
        url: url || null,
        status: 'active',
      })
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json({ error: 'Failed to save job description' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      data: jobDescription,
      message: 'Job description saved successfully',
    });
  } catch (error) {
    console.error('Job description creation error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch user's job descriptions
    const { data: jobDescriptions, error } = await supabase
      .from('job_descriptions')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Fetch error:', error);
      return NextResponse.json({ error: 'Failed to fetch job descriptions' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      data: jobDescriptions || [],
    });
  } catch (error) {
    console.error('Get job descriptions error:', error);
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}
