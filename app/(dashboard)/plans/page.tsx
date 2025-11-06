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
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Link href="/dashboard">
            <h1 className="text-2xl font-bold text-indigo-600">JobReady.AI</h1>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">My Preparation Plans</h2>
          <Link href="/dashboard">
            <Button variant="outline">← Back to Dashboard</Button>
          </Link>
        </div>

        {plans && plans.length > 0 ? (
          <div className="grid gap-4">
            {plans.map((plan: any) => {
              const jobData = plan.job_matches?.job_descriptions;
              return (
                <div key={plan.id} className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold">
                        {jobData?.title || 'Preparation Plan'}
                      </h3>
                      {jobData?.company_name && (
                        <p className="text-gray-600">{jobData.company_name}</p>
                      )}
                      <p className="text-sm text-gray-500 mt-1">
                        Created {new Date(plan.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-indigo-600">
                        {plan.progress_percentage}%
                      </div>
                      <div className="text-xs text-gray-500">Complete</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mb-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                      {plan.duration_days} days
                    </span>
                    <span className={`
                      px-3 py-1 text-sm rounded-full
                      ${plan.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}
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
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-bold mb-2">No preparation plans yet</h3>
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
