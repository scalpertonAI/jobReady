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
    <div className="min-h-screen">
      {/* Header with Glassmorphism */}
      <header className="backdrop-blur-md bg-white/70 shadow-lg sticky top-0 z-50 border-b border-white/20">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-black bg-gradient-to-r from-primary-600 via-secondary-500 to-accent-500 bg-clip-text text-transparent animate-gradient bg-[length:200%_200%]">
            JobReady.AI ✨
          </h1>
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-[2px] rounded-xl">
              <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl">
                <p className="font-bold text-gray-800">{profile?.full_name || user.email?.split('@')[0]}</p>
                <p className="text-sm bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent font-semibold">
                  Level {profile?.level || 1} • {profile?.total_xp || 0} XP 🔥
                </p>
              </div>
            </div>
            <form action="/api/auth/signout" method="POST">
              <button
                type="submit"
                className="px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-white/60 rounded-xl backdrop-blur-sm bg-white/40 border border-white/30 transition-all hover:scale-105"
              >
                Sign Out
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section with Animation */}
        <div className="mb-12 animate-slide-up">
          <h2 className="text-5xl font-black bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-3">
            Hey {profile?.full_name?.split(' ')[0] || 'there'}! 👋
          </h2>
          <p className="text-xl text-gray-700 font-medium">Let&apos;s crush those interview goals today! 💪</p>
        </div>

        {/* Quick Actions Grid with Modern Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Link href="/resumes/upload" className="block group animate-scale-in" style={{ animationDelay: '0.1s' }}>
            <div className="relative overflow-hidden bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 border border-white/50 group-hover:scale-105 group-hover:-translate-y-2">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-200/50 to-transparent rounded-full blur-2xl"></div>
              <div className="relative">
                <div className="text-5xl mb-4 animate-float">📄</div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">Upload Resume</h3>
                <p className="text-gray-600 text-sm">Upload your resume to get started with job matching</p>
              </div>
            </div>
          </Link>

          <Link href="/jobs/new" className="block group animate-scale-in" style={{ animationDelay: '0.2s' }}>
            <div className="relative overflow-hidden bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 border border-white/50 group-hover:scale-105 group-hover:-translate-y-2">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-secondary-200/50 to-transparent rounded-full blur-2xl"></div>
              <div className="relative">
                <div className="text-5xl mb-4 animate-float" style={{ animationDelay: '0.5s' }}>💼</div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">Add Job Description</h3>
                <p className="text-gray-600 text-sm">Paste a job description to analyze your match</p>
              </div>
            </div>
          </Link>

          <Link href="/plans" className="block group animate-scale-in" style={{ animationDelay: '0.3s' }}>
            <div className="relative overflow-hidden bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 border border-white/50 group-hover:scale-105 group-hover:-translate-y-2">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent-200/50 to-transparent rounded-full blur-2xl"></div>
              <div className="relative">
                <div className="text-5xl mb-4 animate-float" style={{ animationDelay: '1s' }}>📚</div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">My Prep Plans</h3>
                <p className="text-gray-600 text-sm">View your personalized preparation plans</p>
              </div>
            </div>
          </Link>

          <Link href="/interviews/new" className="block group animate-scale-in" style={{ animationDelay: '0.4s' }}>
            <div className="relative overflow-hidden bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 border border-white/50 group-hover:scale-105 group-hover:-translate-y-2">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-warning-200/50 to-transparent rounded-full blur-2xl"></div>
              <div className="relative">
                <div className="text-5xl mb-4 animate-float" style={{ animationDelay: '1.5s' }}>🎤</div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">Mock Interview</h3>
                <p className="text-gray-600 text-sm">Practice with AI-powered mock interviews</p>
              </div>
            </div>
          </Link>

          <Link href="/optimize" className="block group animate-scale-in" style={{ animationDelay: '0.5s' }}>
            <div className="relative overflow-hidden bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 border border-white/50 group-hover:scale-105 group-hover:-translate-y-2">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-success-200/50 to-transparent rounded-full blur-2xl"></div>
              <div className="relative">
                <div className="text-5xl mb-4 animate-float" style={{ animationDelay: '2s' }}>✨</div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">Optimize Resume</h3>
                <p className="text-gray-600 text-sm">Get ATS-friendly resume suggestions</p>
              </div>
            </div>
          </Link>

          <Link href="/profile" className="block group animate-scale-in" style={{ animationDelay: '0.6s' }}>
            <div className="relative overflow-hidden bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 border border-white/50 group-hover:scale-105 group-hover:-translate-y-2">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-danger-200/50 to-transparent rounded-full blur-2xl"></div>
              <div className="relative">
                <div className="text-5xl mb-4 animate-float" style={{ animationDelay: '2.5s' }}>👤</div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">My Profile</h3>
                <p className="text-gray-600 text-sm">View stats, achievements, and progress</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Getting Started Guide - Modern Gradient Card */}
        <div className="relative overflow-hidden bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 rounded-3xl p-8 shadow-glow-lg animate-slide-up">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative">
            <h3 className="text-3xl font-black text-white mb-6 flex items-center gap-3">
              <span className="text-4xl">🚀</span>
              Getting Started
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all">
                <div className="bg-white text-primary-600 rounded-full w-10 h-10 flex items-center justify-center font-black text-lg flex-shrink-0 shadow-lg">1</div>
                <div>
                  <p className="font-bold text-white text-lg">Upload Your Resume</p>
                  <p className="text-white/90 text-sm">We&apos;ll extract your skills and experience using AI magic ✨</p>
                </div>
              </div>
              <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all">
                <div className="bg-white text-secondary-600 rounded-full w-10 h-10 flex items-center justify-center font-black text-lg flex-shrink-0 shadow-lg">2</div>
                <div>
                  <p className="font-bold text-white text-lg">Add a Job Description</p>
                  <p className="text-white/90 text-sm">Paste the job posting you&apos;re interested in 🎯</p>
                </div>
              </div>
              <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all">
                <div className="bg-white text-accent-600 rounded-full w-10 h-10 flex items-center justify-center font-black text-lg flex-shrink-0 shadow-lg">3</div>
                <div>
                  <p className="font-bold text-white text-lg">Get Your Personalized Plan</p>
                  <p className="text-white/90 text-sm">Receive a 30-day roadmap to interview success 🏆</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
