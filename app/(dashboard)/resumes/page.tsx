import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Button } from '@/components/shared/Button';
import { EmptyResumesState } from '@/components/shared/EmptyState';
import { redirect } from 'next/navigation';

export default async function ResumesPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: resumes } = await supabase
    .from('resumes')
    .select('*')
    .eq('user_id', user?.id)
    .order('created_at', { ascending: false });

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/dashboard">
            <h1 className="text-2xl font-bold text-indigo-600">JobReady.AI</h1>
          </Link>
          <Link href="/dashboard">
            <Button variant="ghost">← Back to Dashboard</Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="flex justify-between items-center mb-8 animate-fade-in">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">My Resumes</h2>
            <p className="text-gray-600 mt-1">Manage and track all your uploaded resumes</p>
          </div>
          <Link href="/resumes/upload">
            <Button>+ Upload New Resume</Button>
          </Link>
        </div>

        {resumes && resumes.length > 0 ? (
          <div className="grid gap-4 animate-slide-up">
            {resumes.map((resume, index) => (
              <div
                key={resume.id}
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 card-hover cursor-pointer"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{resume.file_name}</h3>
                        <p className="text-sm text-gray-500">
                          Uploaded {new Date(resume.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>

                    {/* Skills Preview */}
                    {resume.parsed_data?.skills?.technical && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {resume.parsed_data.skills.technical.slice(0, 5).map((skill: string, i: number) => (
                          <span key={i} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                            {skill}
                          </span>
                        ))}
                        {resume.parsed_data.skills.technical.length > 5 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded text-xs">
                            +{resume.parsed_data.skills.technical.length - 5} more
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    {resume.is_primary && (
                      <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full font-medium">
                        ✓ Primary
                      </span>
                    )}
                    <div className="flex gap-2 mt-2">
                      <Button variant="outline" size="sm">View</Button>
                      <Button variant="ghost" size="sm">Delete</Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 animate-fade-in">
            <EmptyResumesState onUpload={() => redirect('/resumes/upload')} />
          </div>
        )}
      </main>
    </div>
  );
}
