import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Button } from '@/components/shared/Button';

export default async function JobsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: jobs } = await supabase
    .from('job_descriptions')
    .select('*')
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
          <h2 className="text-3xl font-bold">Job Descriptions</h2>
          <Link href="/jobs/new">
            <Button>+ Add New Job</Button>
          </Link>
        </div>

        {jobs && jobs.length > 0 ? (
          <div className="grid gap-4">
            {jobs.map((job) => (
              <div key={job.id} className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-bold">{job.title}</h3>
                    {job.company_name && (
                      <p className="text-gray-600">{job.company_name}</p>
                    )}
                    <p className="text-sm text-gray-500 mt-1">
                      Added {new Date(job.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`
                    px-3 py-1 text-sm rounded-full
                    ${job.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}
                  `}>
                    {job.status}
                  </span>
                </div>
                <Link href={`/jobs/${job.id}/analyze`}>
                  <Button variant="outline" size="sm">Analyze Match</Button>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">💼</div>
            <h3 className="text-xl font-bold mb-2">No job descriptions yet</h3>
            <p className="text-gray-600 mb-6">Add a job description to start analyzing</p>
            <Link href="/jobs/new">
              <Button>Add Job Description</Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
