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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">JobReady.AI</h1>
          <div className="flex items-center gap-4">
            <div className="text-sm">
              <p className="font-medium">{profile?.full_name || user.email}</p>
              <p className="text-gray-500">Level {profile?.level || 1} • {profile?.total_xp || 0} XP</p>
            </div>
            <form action="/api/auth/signout" method="POST">
              <button
                type="submit"
                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                Sign Out
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {profile?.full_name?.split(' ')[0] || 'there'}! 👋
          </h2>
          <p className="text-gray-600">Ready to continue your interview preparation journey?</p>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Link href="/resumes/upload" className="block">
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border-2 border-transparent hover:border-indigo-500">
              <div className="text-4xl mb-3">📄</div>
              <h3 className="text-lg font-bold mb-2">Upload Resume</h3>
              <p className="text-gray-600 text-sm">Upload your resume to get started with job matching</p>
            </div>
          </Link>

          <Link href="/jobs/new" className="block">
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border-2 border-transparent hover:border-indigo-500">
              <div className="text-4xl mb-3">💼</div>
              <h3 className="text-lg font-bold mb-2">Add Job Description</h3>
              <p className="text-gray-600 text-sm">Paste a job description to analyze your match</p>
            </div>
          </Link>

          <Link href="/plans" className="block">
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border-2 border-transparent hover:border-indigo-500">
              <div className="text-4xl mb-3">📚</div>
              <h3 className="text-lg font-bold mb-2">My Prep Plans</h3>
              <p className="text-gray-600 text-sm">View your personalized preparation plans</p>
            </div>
          </Link>

          <Link href="/interviews/new" className="block">
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border-2 border-transparent hover:border-indigo-500">
              <div className="text-4xl mb-3">🎤</div>
              <h3 className="text-lg font-bold mb-2">Mock Interview</h3>
              <p className="text-gray-600 text-sm">Practice with AI-powered mock interviews</p>
            </div>
          </Link>

          <Link href="/optimize" className="block">
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border-2 border-transparent hover:border-indigo-500">
              <div className="text-4xl mb-3">✨</div>
              <h3 className="text-lg font-bold mb-2">Optimize Resume</h3>
              <p className="text-gray-600 text-sm">Get ATS-friendly resume suggestions</p>
            </div>
          </Link>

          <Link href="/profile" className="block">
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border-2 border-transparent hover:border-indigo-500">
              <div className="text-4xl mb-3">👤</div>
              <h3 className="text-lg font-bold mb-2">My Profile</h3>
              <p className="text-gray-600 text-sm">View stats, achievements, and progress</p>
            </div>
          </Link>
        </div>

        {/* Getting Started Guide */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl p-8">
          <h3 className="text-2xl font-bold mb-4">🚀 Getting Started</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="bg-white text-indigo-600 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">1</div>
              <div>
                <p className="font-semibold">Upload Your Resume</p>
                <p className="text-indigo-100 text-sm">We'll extract your skills and experience</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-white text-indigo-600 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">2</div>
              <div>
                <p className="font-semibold">Add a Job Description</p>
                <p className="text-indigo-100 text-sm">Paste the job posting you're interested in</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-white text-indigo-600 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">3</div>
              <div>
                <p className="font-semibold">Get Your Personalized Plan</p>
                <p className="text-indigo-100 text-sm">Receive a 30-day roadmap to interview success</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
