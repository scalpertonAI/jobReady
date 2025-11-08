import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Button } from '@/components/shared/Button';

export default async function PlansPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: plans } = await supabase
    .from('preparation_plans')
    .select(`
      *,
      job_matches!inner(
        job_descriptions(title, company_name)
      )
    `)
    .eq('user_id', user?.id)
    .order('created_at', { ascending: false });

  return (
    <div className="min-h-screen">
      {/* Modern Header */}
      <header className="backdrop-blur-md bg-white/70 shadow-lg sticky top-0 z-50 border-b border-white/20">
        <div className="container mx-auto px-4 py-4">
          <Link href="/dashboard">
            <h1 className="text-3xl font-black bg-gradient-to-r from-primary-600 via-secondary-500 to-accent-500 bg-clip-text text-transparent">
              JobReady.AI ✨
            </h1>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-12 animate-slide-up">
          <div>
            <h2 className="text-5xl font-black bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-2">
              My Prep Plans 📚
            </h2>
            <p className="text-xl text-gray-700 font-medium">Your roadmaps to success!</p>
          </div>
          <Link href="/dashboard">
            <Button variant="outline">← Dashboard</Button>
          </Link>
        </div>

        {plans && plans.length > 0 ? (
          <div className="grid gap-6">
            {plans.map((plan: any, index: number) => {
              const jobData = plan.job_matches?.job_descriptions;
              return (
                <div
                  key={plan.id}
                  className="group bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-card hover:shadow-card-hover transition-all duration-300 border border-white/50 hover:scale-102 animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="text-4xl animate-float" style={{ animationDelay: `${index * 0.5}s` }}>🎯</div>
                        <h3 className="text-2xl font-black text-gray-900">
                          {jobData?.title || 'Preparation Plan'}
                        </h3>
                      </div>
                      {jobData?.company_name && (
                        <p className="text-lg text-gray-700 font-semibold ml-16">{jobData.company_name}</p>
                      )}
                      <p className="text-sm text-gray-500 mt-2 ml-16">
                        Created {new Date(plan.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full blur-lg opacity-30"></div>
                        <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center shadow-lg">
                          <div>
                            <div className="text-3xl font-black text-white">{plan.progress_percentage}%</div>
                            <div className="text-xs text-white/90 font-semibold">Done</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mb-6 ml-16">
                    <span className="px-4 py-2 bg-gradient-to-r from-primary-100 to-accent-100 text-primary-700 text-sm font-bold rounded-xl shadow-sm">
                      {plan.duration_days} days
                    </span>
                    <span className={`
                      px-4 py-2 text-sm font-bold rounded-xl shadow-sm
                      ${plan.status === 'active'
                        ? 'bg-gradient-to-r from-success-100 to-success-200 text-success-700'
                        : 'bg-gray-100 text-gray-600'}
                    `}>
                      {plan.status === 'active' ? '✅ Active' : plan.status}
                    </span>
                  </div>

                  <div className="ml-16">
                    <Link href={`/plans/${plan.id}`}>
                      <Button variant="gradient" className="group-hover:scale-105 transition-transform">
                        View Plan →
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 animate-scale-in">
            <div className="text-8xl mb-8 animate-float">📚</div>
            <h3 className="text-4xl font-black bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-4">
              No prep plans yet!
            </h3>
            <p className="text-xl text-gray-600 mb-10">Create a plan after analyzing a job match 🎯</p>
            <Link href="/dashboard">
              <Button variant="gradient" size="lg">
                Go to Dashboard →
              </Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
