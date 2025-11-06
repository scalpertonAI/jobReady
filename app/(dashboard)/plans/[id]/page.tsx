'use client';

/**
 * Preparation Plan View Page
 * Displays the 30-day plan with daily tasks
 */

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { Button } from '@/components/shared/Button';

export default function PlanViewPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [plan, setPlan] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedWeek, setSelectedWeek] = useState(1);

  useEffect(() => {
    fetchPlan();
  }, []);

  const fetchPlan = async () => {
    try {
      const response = await fetch('/api/plans');
      const data = await response.json();

      if (data.success) {
        const foundPlan = data.data.find((p: any) => p.id === resolvedParams.id);
        setPlan(foundPlan);
      }
    } catch (err) {
      console.error('Failed to fetch plan:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-spin">⏳</div>
          <p className="text-gray-600">Loading your plan...</p>
        </div>
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📚</div>
          <h2 className="text-2xl font-bold mb-2">Plan Not Found</h2>
          <Link href="/dashboard">
            <Button>Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  const planData = plan.plan_data;
  const weeks = planData.weekly_breakdown || [];
  const currentWeek = weeks[selectedWeek - 1];
  const dailyTasks = planData.daily_tasks || [];
  const weekStart = (selectedWeek - 1) * 7 + 1;
  const weekEnd = Math.min(selectedWeek * 7, plan.duration_days);
  const weekTasks = dailyTasks.filter((task: any) => task.day >= weekStart && task.day <= weekEnd);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/dashboard">
            <h1 className="text-2xl font-bold text-indigo-600">JobReady.AI</h1>
          </Link>
          <div className="flex gap-3">
            <Link href="/interviews/new">
              <Button variant="outline">🎤 Start Mock Interview</Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="ghost">← Dashboard</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Plan Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-8 text-white mb-8">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-2">{planData.overview?.title || '30-Day Preparation Plan'}</h2>
              <p className="text-indigo-100 mb-4">{planData.overview?.description}</p>

              {planData.overview?.focus_areas && (
                <div className="flex flex-wrap gap-2">
                  {planData.overview.focus_areas.map((area: string, i: number) => (
                    <span key={i} className="px-3 py-1 bg-white/20 rounded-full text-sm">
                      {area}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="text-center ml-6">
              <div className="w-32 h-32 rounded-full bg-white/20 flex items-center justify-center mb-2">
                <div>
                  <div className="text-4xl font-bold">{plan.progress_percentage}%</div>
                  <div className="text-xs">Complete</div>
                </div>
              </div>
              <p className="text-sm text-indigo-100">{plan.duration_days} Days</p>
            </div>
          </div>
        </div>

        {/* Week Selector */}
        <div className="mb-8">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {weeks.map((week: any, i: number) => (
              <button
                key={i}
                onClick={() => setSelectedWeek(i + 1)}
                className={`
                  flex-shrink-0 px-6 py-3 rounded-lg font-medium transition-colors
                  ${selectedWeek === i + 1
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                  }
                `}
              >
                Week {week.week}: {week.theme}
              </button>
            ))}
          </div>
        </div>

        {/* Week Overview */}
        {currentWeek && (
          <div className="bg-white rounded-xl p-6 mb-6 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Week {currentWeek.week} Goals</h3>
            <ul className="space-y-2">
              {currentWeek.goals.map((goal: string, i: number) => (
                <li key={i} className="flex items-start gap-2 text-gray-700">
                  <span className="text-indigo-500 mt-0.5">•</span>
                  <span>{goal}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 text-sm text-gray-500">
              ⏱️ Estimated: {currentWeek.estimated_hours} hours this week
            </div>
          </div>
        )}

        {/* Daily Tasks */}
        <div className="grid gap-4">
          {weekTasks.map((task: any) => (
            <div key={task.day} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                      {task.day}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900">{task.title}</h4>
                      <p className="text-sm text-gray-500">{task.description}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`
                    px-3 py-1 rounded-full text-xs font-medium
                    ${task.type === 'learning' ? 'bg-blue-100 text-blue-700' : ''}
                    ${task.type === 'practice' ? 'bg-green-100 text-green-700' : ''}
                    ${task.type === 'project' ? 'bg-purple-100 text-purple-700' : ''}
                    ${task.type === 'review' ? 'bg-yellow-100 text-yellow-700' : ''}
                    ${task.type === 'mock_interview' ? 'bg-red-100 text-red-700' : ''}
                  `}>
                    {task.type}
                  </span>
                  <span className="text-sm text-gray-500">+{task.xp_reward} XP</span>
                </div>
              </div>

              {/* Task Items */}
              {task.tasks && task.tasks.length > 0 && (
                <div className="space-y-2 pl-13">
                  {task.tasks.map((item: any, i: number) => (
                    <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <input type="checkbox" className="mt-1" defaultChecked={item.completed} />
                      <div className="flex-1">
                        <p className="text-sm text-gray-700">{item.task}</p>
                        {item.resource_url && (
                          <a
                            href={item.resource_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-indigo-600 hover:underline mt-1 inline-block"
                          >
                            📎 Resource Link →
                          </a>
                        )}
                        <p className="text-xs text-gray-500 mt-1">⏱️ {item.duration_minutes} min</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Resources Section */}
        {planData.resources && planData.resources.length > 0 && (
          <div className="mt-8 bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">📚 Recommended Resources</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {planData.resources.slice(0, 6).map((resource: any, i: number) => (
                <div key={i} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">{resource.title}</h4>
                    <span className={`
                      px-2 py-1 rounded text-xs
                      ${resource.is_free ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}
                    `}>
                      {resource.is_free ? 'Free' : `$${resource.cost}`}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Skill: {resource.skill}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{resource.type} • {resource.difficulty}</span>
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-indigo-600 hover:underline"
                    >
                      View →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects Section */}
        {planData.projects && planData.projects.length > 0 && (
          <div className="mt-8 bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">🚀 Project Suggestions</h3>
            <div className="space-y-4">
              {planData.projects.map((project: any, i: number) => (
                <div key={i} className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-bold text-blue-900">{project.title}</h4>
                    <span className={`
                      px-2 py-1 rounded-full text-xs font-medium
                      ${project.priority === 'high' ? 'bg-red-200 text-red-800' : ''}
                      ${project.priority === 'medium' ? 'bg-yellow-200 text-yellow-800' : ''}
                      ${project.priority === 'low' ? 'bg-green-200 text-green-800' : ''}
                    `}>
                      {project.priority}
                    </span>
                  </div>
                  <p className="text-sm text-blue-800 mb-3">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.skills_covered.map((skill: string, j: number) => (
                      <span key={j} className="px-2 py-1 bg-blue-200 text-blue-800 rounded text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-blue-700">⏱️ Est. {project.estimated_hours} hours</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
