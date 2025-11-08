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
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <Link href="/dashboard">
            <h1 className="text-xl font-semibold text-gray-900">JobReady.AI</h1>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-2">
              My Preparation Plans
            </h2>
            <p className="text-lg text-gray-600">Your roadmaps to success</p>
          </div>
          <Link href="/dashboard">
            <Button variant="outline">← Dashboard</Button>
          </Link>
        </div>

        {plans && plans.length > 0 ? (
          <div className="space-y-4">
            {plans.map((plan: any) => {
              const jobData = plan.job_matches?.job_descriptions;
              return (
                <div
                  key={plan.id}
                  className="border border-gray-200 rounded-lg p-6 hover:border-gray-900 hover:shadow-md transition-all"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {jobData?.title || 'Preparation Plan'}
                      </h3>
                      {jobData?.company_name && (
                        <p className="text-gray-700 font-medium">{jobData.company_name}</p>
                      )}
                      <p className="text-sm text-gray-500 mt-2">
                        Created {new Date(plan.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-center ml-6">
                      <div className="w-20 h-20 rounded-full bg-gray-900 text-white flex items-center justify-center">
                        <div>
                          <div className="text-2xl font-bold">{plan.progress_percentage}%</div>
                          <div className="text-xs">Done</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-primary-100 text-primary-700 text-sm font-medium rounded">
                      {plan.duration_days} days
                    </span>
                    <span className={`
                      px-3 py-1 text-sm font-medium rounded
                      ${plan.status === 'active'
                        ? 'bg-success-100 text-success-700'
                        : 'bg-gray-100 text-gray-600'}
                    `}>
                      {plan.status}
                    </span>
                  </div>

                  <Link href={`/plans/${plan.id}`}>
                    <Button>View Plan</Button>
                  </Link>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No preparation plans yet
            </h3>
            <p className="text-gray-600 mb-6">Create a plan after analyzing a job match</p>
            <Link href="/dashboard">
              <Button>Go to Dashboard</Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
