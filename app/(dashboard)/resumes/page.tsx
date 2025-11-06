import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Button } from '@/components/shared/Button';

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
        <div className="container mx-auto px-4 py-4">
          <Link href="/dashboard">
            <h1 className="text-2xl font-bold text-indigo-600">JobReady.AI</h1>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">My Resumes</h2>
          <Link href="/resumes/upload">
            <Button>+ Upload New Resume</Button>
          </Link>
        </div>

        {resumes && resumes.length > 0 ? (
          <div className="grid gap-4">
            {resumes.map((resume) => (
              <div key={resume.id} className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold">{resume.file_name}</h3>
                    <p className="text-sm text-gray-500">
                      Uploaded {new Date(resume.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  {resume.is_primary && (
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">
                      Primary
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📄</div>
            <h3 className="text-xl font-bold mb-2">No resumes yet</h3>
            <p className="text-gray-600 mb-6">Upload your first resume to get started</p>
            <Link href="/resumes/upload">
              <Button>Upload Resume</Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
