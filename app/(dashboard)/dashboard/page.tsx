import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Fetch user profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-900">JobReady.AI</h1>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 text-sm">
              <div className="text-right">
                <p className="font-medium text-gray-900">{profile?.full_name || user.email?.split('@')[0]}</p>
                <p className="text-gray-500">Level {profile?.level || 1} • {profile?.total_xp || 0} XP</p>
              </div>
            </div>
            <form action="/api/auth/signout" method="POST">
              <button
                type="submit"
                className="px-3 py-1.5 text-sm text-gray-700 hover:text-gray-900 transition-colors"
              >
                Sign Out
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome back, {profile?.full_name?.split(' ')[0] || 'there'}
          </h2>
          <p className="text-lg text-gray-600">Ready to ace your next interview?</p>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          <Link href="/resumes/upload" className="group">
            <div className="border border-gray-200 rounded-lg p-6 hover:border-gray-900 hover:shadow-md transition-all bg-white">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900">Upload Resume</h3>
                <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-900 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <p className="text-sm text-gray-600">Upload your resume to get started with job matching</p>
            </div>
          </Link>

          <Link href="/jobs/new" className="group">
            <div className="border border-gray-200 rounded-lg p-6 hover:border-gray-900 hover:shadow-md transition-all bg-white">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900">Add Job Description</h3>
                <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-900 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <p className="text-sm text-gray-600">Paste a job description to analyze your match</p>
            </div>
          </Link>

          <Link href="/plans" className="group">
            <div className="border border-gray-200 rounded-lg p-6 hover:border-gray-900 hover:shadow-md transition-all bg-white">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900">My Prep Plans</h3>
                <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-900 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <p className="text-sm text-gray-600">View your personalized preparation plans</p>
            </div>
          </Link>

          <Link href="/interviews/new" className="group">
            <div className="border border-gray-200 rounded-lg p-6 hover:border-gray-900 hover:shadow-md transition-all bg-white">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900">Mock Interview</h3>
                <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-900 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <p className="text-sm text-gray-600">Practice with AI-powered mock interviews</p>
            </div>
          </Link>

          <Link href="/optimize" className="group">
            <div className="border border-gray-200 rounded-lg p-6 hover:border-gray-900 hover:shadow-md transition-all bg-white">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900">Optimize Resume</h3>
                <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-900 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <p className="text-sm text-gray-600">Get ATS-friendly resume suggestions</p>
            </div>
          </Link>

          <Link href="/profile" className="group">
            <div className="border border-gray-200 rounded-lg p-6 hover:border-gray-900 hover:shadow-md transition-all bg-white">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900">My Profile</h3>
                <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-900 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <p className="text-sm text-gray-600">View stats, achievements, and progress</p>
            </div>
          </Link>
        </div>

        {/* Getting Started Guide */}
        <div className="bg-gray-900 text-white rounded-lg p-8">
          <h3 className="text-2xl font-bold mb-6">Getting Started</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white text-gray-900 flex items-center justify-center font-semibold text-sm">
                1
              </div>
              <div>
                <p className="font-semibold mb-1">Upload Your Resume</p>
                <p className="text-gray-300 text-sm">We&apos;ll extract your skills and experience</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white text-gray-900 flex items-center justify-center font-semibold text-sm">
                2
              </div>
              <div>
                <p className="font-semibold mb-1">Add a Job Description</p>
                <p className="text-gray-300 text-sm">Paste the job posting you&apos;re interested in</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white text-gray-900 flex items-center justify-center font-semibold text-sm">
                3
              </div>
              <div>
                <p className="font-semibold mb-1">Get Your Personalized Plan</p>
                <p className="text-gray-300 text-sm">Receive a 30-day roadmap to interview success</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
