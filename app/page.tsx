import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex justify-between items-center">
          <div className="text-2xl font-bold text-indigo-600">
            JobReady.AI
          </div>
          <div className="space-x-4">
            <Link
              href="/login"
              className="px-4 py-2 text-gray-700 hover:text-indigo-600"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Get Started
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Prepare for Your Dream Job with{" "}
            <span className="text-indigo-600">AI-Powered</span> Guidance
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Upload your resume and job description to get a personalized 30-day preparation plan,
            resume optimization, and AI-powered mock interviews.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/signup"
              className="px-8 py-4 bg-indigo-600 text-white text-lg rounded-lg hover:bg-indigo-700 transition"
            >
              Start Free Trial
            </Link>
            <Link
              href="#features"
              className="px-8 py-4 bg-white text-indigo-600 text-lg rounded-lg border-2 border-indigo-600 hover:bg-indigo-50 transition"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div id="features" className="mt-32 grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-bold mb-3">Job Match Analysis</h3>
            <p className="text-gray-600">
              Get detailed insights on how your resume matches the job requirements with skill gap analysis.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-xl font-bold mb-3">Personalized Plan</h3>
            <p className="text-gray-600">
              Receive a 30-day roadmap with daily tasks, learning resources, and project ideas tailored to you.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="text-4xl mb-4">🎤</div>
            <h3 className="text-xl font-bold mb-3">Mock Interviews</h3>
            <p className="text-gray-600">
              Practice with AI-powered interviews and get instant feedback to improve your performance.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="text-4xl mb-4">✨</div>
            <h3 className="text-xl font-bold mb-3">Resume Optimizer</h3>
            <p className="text-gray-600">
              Optimize your resume with ATS-friendly keywords and formatting suggestions.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-bold mb-3">Progress Tracking</h3>
            <p className="text-gray-600">
              Track your learning progress with gamification, XP points, and achievement badges.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-xl font-bold mb-3">Project Ideas</h3>
            <p className="text-gray-600">
              Build portfolio-worthy projects that demonstrate the skills employers are looking for.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-32 text-center bg-white p-12 rounded-2xl shadow-xl">
          <h2 className="text-3xl font-bold mb-4">Ready to Land Your Dream Job?</h2>
          <p className="text-gray-600 mb-8">
            Join thousands of job seekers who have successfully prepared with JobReady.AI
          </p>
          <Link
            href="/signup"
            className="inline-block px-8 py-4 bg-indigo-600 text-white text-lg rounded-lg hover:bg-indigo-700 transition"
          >
            Get Started for Free
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 mt-20 border-t">
        <div className="text-center text-gray-600">
          <p>&copy; 2025 JobReady.AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
