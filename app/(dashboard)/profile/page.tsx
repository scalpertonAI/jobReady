import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Button } from '@/components/shared/Button';

export default async function ProfilePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user?.id)
    .single();

  const { data: achievements } = await supabase
    .from('user_achievements')
    .select('*')
    .eq('user_id', user?.id)
    .order('unlocked_at', { ascending: false });

  const { data: stats } = await supabase
    .from('resumes')
    .select('id')
    .eq('user_id', user?.id);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Link href="/dashboard">
            <h1 className="text-2xl font-bold text-indigo-600">JobReady.AI</h1>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <h2 className="text-3xl font-bold mb-8">My Profile</h2>

        {/* Profile Card */}
        <div className="bg-white rounded-xl p-8 shadow-sm border mb-8">
          <div className="flex items-start gap-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold">
              {profile?.full_name?.charAt(0) || user?.email?.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-1">{profile?.full_name || 'User'}</h3>
              <p className="text-gray-600 mb-4">{user?.email}</p>
              <div className="flex gap-4">
                <div>
                  <div className="text-3xl font-bold text-indigo-600">{profile?.level || 1}</div>
                  <div className="text-sm text-gray-600">Level</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600">{profile?.total_xp || 0}</div>
                  <div className="text-sm text-gray-600">Total XP</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600">{profile?.streak_days || 0}</div>
                  <div className="text-sm text-gray-600">Day Streak</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg border">
            <div className="text-4xl mb-2">📄</div>
            <div className="text-2xl font-bold">{stats?.length || 0}</div>
            <div className="text-sm text-gray-600">Resumes</div>
          </div>
          <div className="bg-white p-6 rounded-lg border">
            <div className="text-4xl mb-2">🏆</div>
            <div className="text-2xl font-bold">{achievements?.length || 0}</div>
            <div className="text-sm text-gray-600">Achievements</div>
          </div>
          <div className="bg-white p-6 rounded-lg border">
            <div className="text-4xl mb-2">📚</div>
            <div className="text-2xl font-bold">0</div>
            <div className="text-sm text-gray-600">Plans Completed</div>
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white rounded-xl p-8 shadow-sm border">
          <h3 className="text-xl font-bold mb-6">Achievements</h3>
          {achievements && achievements.length > 0 ? (
            <div className="grid gap-4">
              {achievements.map((achievement) => (
                <div key={achievement.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="text-4xl">{achievement.badge_icon}</div>
                  <div className="flex-1">
                    <h4 className="font-bold">{achievement.title}</h4>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-indigo-600">+{achievement.xp_reward} XP</div>
                    <div className="text-xs text-gray-500">
                      {new Date(achievement.unlocked_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No achievements unlocked yet. Keep learning to earn badges!
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
