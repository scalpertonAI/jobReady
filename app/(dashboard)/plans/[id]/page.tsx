'use client';

/**
 * Comprehensive Preparation Plan View - Everything You Need to Succeed
 */

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { Button } from '@/components/shared/Button';

export default function PlanViewPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [plan, setPlan] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState('overview');
  const [selectedDay, setSelectedDay] = useState(1);

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
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-600">Loading your comprehensive plan...</p>
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Plan Not Found</h2>
          <Link href="/dashboard">
            <Button>Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  const planData = plan.plan_data;
  const dailyTasks = planData.daily_tasks || [];
  const codingProblems = planData.coding_problems || [];
  const systemDesignTopics = planData.system_design_topics || [];
  const learningModules = planData.learning_modules || [];
  const resources = planData.resources || [];
  const mockQuestions = planData.mock_interview_questions || { technical: [], behavioral: [] };

  const currentDayTasks = dailyTasks.find((task: any) => task.day === selectedDay);
  const currentDayCodingProblems = codingProblems.filter((p: any) => p.practice_day === selectedDay);
  const currentDaySystemDesign = systemDesignTopics.filter((t: any) => t.practice_day === selectedDay);
  const currentDayLearning = learningModules.filter((m: any) => m.day === selectedDay);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/dashboard">
            <h1 className="text-xl font-semibold text-gray-900">JobReady.AI</h1>
          </Link>
          <Link href="/plans">
            <Button variant="ghost">← All Plans</Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Plan Header */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            {planData.overview?.title || '30-Day Interview Preparation Plan'}
          </h2>
          <p className="text-lg text-gray-600 mb-4">{planData.overview?.description}</p>

          {planData.overview?.focus_areas && (
            <div className="flex flex-wrap gap-2 mb-4">
              {planData.overview.focus_areas.map((area: string, i: number) => (
                <span key={i} className="px-3 py-1 bg-primary-100 text-primary-700 text-sm font-medium rounded">
                  {area}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center gap-6 text-sm text-gray-600">
            <span>{plan.duration_days} Days</span>
            <span>•</span>
            <span>{planData.overview?.estimated_daily_hours || 2-3} hours/day</span>
            <span>•</span>
            <span>{plan.progress_percentage}% Complete</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="flex gap-8">
            {['overview', 'daily', 'coding', 'system-design', 'learning', 'mock-interview', 'projects', 'resources'].map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`pb-4 text-sm font-medium transition-colors ${
                  selectedTab === tab
                    ? 'border-b-2 border-gray-900 text-gray-900'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1).replace('-', ' ')}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="max-w-5xl">
          {/* Overview Tab */}
          {selectedTab === 'overview' && (
            <div className="space-y-6">
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Weekly Breakdown</h3>
                {planData.weekly_breakdown?.map((week: any, i: number) => (
                  <div key={i} className="mb-6 pb-6 border-b last:border-0">
                    <h4 className="text-lg font-bold mb-2">Week {week.week}: {week.theme}</h4>
                    <ul className="space-y-2">
                      {week.goals?.map((goal: string, j: number) => (
                        <li key={j} className="flex items-start gap-2 text-gray-700">
                          <span className="text-success-600 mt-1">✓</span>
                          <span>{goal}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="text-sm text-gray-500 mt-2">{week.estimated_hours} hours this week</p>
                  </div>
                ))}
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">What You&apos;ll Get</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold mb-2">{codingProblems.length} Coding Problems</h4>
                    <p className="text-sm text-gray-600">With complete solutions and explanations</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold mb-2">{systemDesignTopics.length} System Design Topics</h4>
                    <p className="text-sm text-gray-600">Detailed architecture discussions</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold mb-2">{learningModules.length} Learning Modules</h4>
                    <p className="text-sm text-gray-600">With examples and practice</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold mb-2">{mockQuestions.technical?.length + mockQuestions.behavioral?.length} Interview Questions</h4>
                    <p className="text-sm text-gray-600">Technical and behavioral prep</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Daily Tasks Tab */}
          {selectedTab === 'daily' && (
            <div>
              {/* Day Selector */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-3">Select Day:</label>
                <select
                  value={selectedDay}
                  onChange={(e) => setSelectedDay(Number(e.target.value))}
                  className="px-4 py-2 border border-gray-300 rounded-md"
                >
                  {Array.from({ length: plan.duration_days }, (_, i) => i + 1).map((day) => (
                    <option key={day} value={day}>Day {day}</option>
                  ))}
                </select>
              </div>

              {currentDayTasks && (
                <div className="border border-gray-200 rounded-lg p-6 mb-6">
                  <h3 className="text-2xl font-bold mb-2">{currentDayTasks.title}</h3>
                  <p className="text-gray-600 mb-4">{currentDayTasks.description}</p>
                  <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 text-sm font-medium rounded mb-4">
                    {currentDayTasks.type}
                  </span>

                  {currentDayTasks.tasks && (
                    <div className="space-y-3">
                      {currentDayTasks.tasks.map((task: any, i: number) => (
                        <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded">
                          <input type="checkbox" className="mt-1" />
                          <div className="flex-1">
                            <p className="text-gray-900">{task.task}</p>
                            <p className="text-sm text-gray-500 mt-1">{task.duration_minutes} minutes</p>
                            {task.resource_url && (
                              <a href={task.resource_url} target="_blank" rel="noopener noreferrer" className="text-sm text-primary-600 hover:underline mt-1 inline-block">
                                View Resource →
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Show what else is available this day */}
              {(currentDayLearning.length > 0 || currentDayCodingProblems.length > 0 || currentDaySystemDesign.length > 0) && (
                <div className="border border-gray-200 rounded-lg p-6">
                  <h4 className="font-semibold mb-4">Also Available on Day {selectedDay}:</h4>
                  <div className="space-y-2">
                    {currentDayLearning.length > 0 && (
                      <p className="text-sm text-gray-700">• {currentDayLearning.length} Learning Module(s) - See &quot;Learning&quot; tab</p>
                    )}
                    {currentDayCodingProblems.length > 0 && (
                      <p className="text-sm text-gray-700">• {currentDayCodingProblems.length} Coding Problem(s) - See &quot;Coding&quot; tab</p>
                    )}
                    {currentDaySystemDesign.length > 0 && (
                      <p className="text-sm text-gray-700">• {currentDaySystemDesign.length} System Design Topic(s) - See &quot;System Design&quot; tab</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Coding Problems Tab */}
          {selectedTab === 'coding' && (
            <div className="space-y-6">
              {codingProblems.length > 0 ? (
                codingProblems.map((problem: any, i: number) => (
                  <div key={i} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold mb-1">{problem.title}</h3>
                        <div className="flex items-center gap-3 text-sm">
                          <span className={`px-2 py-1 rounded ${
                            problem.difficulty === 'easy' ? 'bg-success-100 text-success-700' :
                            problem.difficulty === 'medium' ? 'bg-warning-100 text-warning-700' :
                            'bg-danger-100 text-danger-700'
                          }`}>
                            {problem.difficulty}
                          </span>
                          <span className="text-gray-600">{problem.category}</span>
                          <span className="text-gray-600">Day {problem.practice_day}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Problem:</h4>
                        <p className="text-gray-700">{problem.problem_statement}</p>
                      </div>

                      {problem.examples && problem.examples.length > 0 && (
                        <div>
                          <h4 className="font-semibold mb-2">Examples:</h4>
                          {problem.examples.map((ex: any, j: number) => (
                            <div key={j} className="mb-3 p-3 bg-gray-50 rounded">
                              <p className="text-sm"><strong>Input:</strong> {ex.input}</p>
                              <p className="text-sm"><strong>Output:</strong> {ex.output}</p>
                              {ex.explanation && <p className="text-sm text-gray-600 mt-1">{ex.explanation}</p>}
                            </div>
                          ))}
                        </div>
                      )}

                      {problem.constraints && (
                        <div>
                          <h4 className="font-semibold mb-2">Constraints:</h4>
                          <ul className="list-disc list-inside text-sm text-gray-700">
                            {problem.constraints.map((c: string, j: number) => (
                              <li key={j}>{c}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {problem.hints && (
                        <div>
                          <h4 className="font-semibold mb-2">Hints:</h4>
                          <ol className="list-decimal list-inside text-sm text-gray-700 space-y-1">
                            {problem.hints.map((h: string, j: number) => (
                              <li key={j}>{h}</li>
                            ))}
                          </ol>
                        </div>
                      )}

                      {problem.solution_approach && (
                        <div>
                          <h4 className="font-semibold mb-2">Solution Approach:</h4>
                          <p className="text-gray-700 whitespace-pre-line">{problem.solution_approach}</p>
                        </div>
                      )}

                      {problem.optimal_solution && (
                        <div>
                          <h4 className="font-semibold mb-2">Complete Solution:</h4>
                          <pre className="p-4 bg-gray-900 text-gray-100 rounded-lg overflow-x-auto text-sm">
                            <code>{problem.optimal_solution}</code>
                          </pre>
                        </div>
                      )}

                      <div className="flex gap-4 text-sm">
                        <span className="text-gray-600"><strong>Time:</strong> {problem.time_complexity}</span>
                        <span className="text-gray-600"><strong>Space:</strong> {problem.space_complexity}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No coding problems available yet. They will be generated in your next plan.</p>
              )}
            </div>
          )}

          {/* System Design Tab */}
          {selectedTab === 'system-design' && (
            <div className="space-y-6">
              {systemDesignTopics.length > 0 ? (
                systemDesignTopics.map((topic: any, i: number) => (
                  <div key={i} className="border border-gray-200 rounded-lg p-6">
                    <h3 className="text-2xl font-bold mb-2">{topic.title}</h3>
                    <p className="text-gray-700 mb-4">{topic.description}</p>
                    <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 text-sm font-medium rounded mb-4">
                      Day {topic.practice_day}
                    </span>

                    <div className="space-y-4">
                      {topic.key_concepts && (
                        <div>
                          <h4 className="font-semibold mb-2">Key Concepts:</h4>
                          <div className="flex flex-wrap gap-2">
                            {topic.key_concepts.map((concept: string, j: number) => (
                              <span key={j} className="px-3 py-1 bg-gray-100 text-gray-800 rounded text-sm">
                                {concept}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {topic.components && topic.components.length > 0 && (
                        <div>
                          <h4 className="font-semibold mb-2">Components:</h4>
                          {topic.components.map((comp: any, j: number) => (
                            <div key={j} className="mb-3 p-4 bg-gray-50 rounded">
                              <h5 className="font-semibold text-gray-900">{comp.name}</h5>
                              <p className="text-sm text-gray-700 mt-1">{comp.purpose}</p>
                              {comp.considerations && comp.considerations.length > 0 && (
                                <ul className="mt-2 space-y-1">
                                  {comp.considerations.map((c: string, k: number) => (
                                    <li key={k} className="text-sm text-gray-600">• {c}</li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {topic.scalability_considerations && (
                        <div>
                          <h4 className="font-semibold mb-2">Scalability:</h4>
                          <ul className="space-y-1">
                            {topic.scalability_considerations.map((s: string, j: number) => (
                              <li key={j} className="text-gray-700 text-sm">• {s}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {topic.trade_offs && (
                        <div>
                          <h4 className="font-semibold mb-2">Trade-offs:</h4>
                          <ul className="space-y-1">
                            {topic.trade_offs.map((t: string, j: number) => (
                              <li key={j} className="text-gray-700 text-sm">• {t}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {topic.diagrams_description && (
                        <div>
                          <h4 className="font-semibold mb-2">Architecture:</h4>
                          <p className="text-gray-700 whitespace-pre-line">{topic.diagrams_description}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No system design topics available yet. They will be generated in your next plan.</p>
              )}
            </div>
          )}

          {/* Learning Modules Tab */}
          {selectedTab === 'learning' && (
            <div className="space-y-6">
              {learningModules.length > 0 ? (
                learningModules.map((module: any, i: number) => (
                  <div key={i} className="border border-gray-200 rounded-lg p-6">
                    <h3 className="text-2xl font-bold mb-2">{module.title}</h3>
                    <div className="flex items-center gap-3 mb-4 text-sm">
                      <span className="px-3 py-1 bg-primary-100 text-primary-700 font-medium rounded">{module.skill}</span>
                      <span className="text-gray-600">Day {module.day}</span>
                      <span className="text-gray-600">{module.duration_minutes} minutes</span>
                    </div>

                    <div className="space-y-4">
                      {module.content?.theory && (
                        <div>
                          <h4 className="font-semibold mb-2">Theory:</h4>
                          <p className="text-gray-700 whitespace-pre-line">{module.content.theory}</p>
                        </div>
                      )}

                      {module.content?.key_points && (
                        <div>
                          <h4 className="font-semibold mb-2">Key Points:</h4>
                          <ul className="space-y-1">
                            {module.content.key_points.map((point: string, j: number) => (
                              <li key={j} className="flex items-start gap-2 text-gray-700">
                                <span className="text-primary-600 mt-1">•</span>
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {module.content?.code_examples && module.content.code_examples.length > 0 && (
                        <div>
                          <h4 className="font-semibold mb-2">Code Examples:</h4>
                          {module.content.code_examples.map((example: any, j: number) => (
                            <div key={j} className="mb-4">
                              <h5 className="text-sm font-semibold mb-2">{example.title}</h5>
                              <pre className="p-4 bg-gray-900 text-gray-100 rounded-lg overflow-x-auto text-sm mb-2">
                                <code>{example.code}</code>
                              </pre>
                              <p className="text-sm text-gray-600">{example.explanation}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {module.content?.practice_exercises && module.content.practice_exercises.length > 0 && (
                        <div>
                          <h4 className="font-semibold mb-2">Practice Exercises:</h4>
                          {module.content.practice_exercises.map((ex: any, j: number) => (
                            <div key={j} className="p-3 bg-gray-50 rounded mb-2">
                              <p className="text-gray-900">{ex.question}</p>
                              <p className="text-sm text-gray-600 mt-1"><strong>Hint:</strong> {ex.solution_hint}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {module.quiz && module.quiz.length > 0 && (
                        <div>
                          <h4 className="font-semibold mb-2">Quiz:</h4>
                          {module.quiz.map((q: any, j: number) => (
                            <div key={j} className="p-4 bg-gray-50 rounded mb-3">
                              <p className="font-medium mb-2">{j + 1}. {q.question}</p>
                              <div className="space-y-1 ml-4">
                                {q.options.map((opt: string, k: number) => (
                                  <p key={k} className={`text-sm ${k === q.correct_answer ? 'text-success-700 font-medium' : 'text-gray-700'}`}>
                                    {String.fromCharCode(65 + k)}. {opt}
                                  </p>
                                ))}
                              </div>
                              <p className="text-sm text-gray-600 mt-2"><strong>Answer:</strong> {q.explanation}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No learning modules available yet. They will be generated in your next plan.</p>
              )}
            </div>
          )}

          {/* Mock Interview Tab */}
          {selectedTab === 'mock-interview' && (
            <div className="space-y-6">
              {mockQuestions.technical && mockQuestions.technical.length > 0 && (
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-2xl font-bold mb-4">Technical Questions ({mockQuestions.technical.length})</h3>
                  <div className="space-y-4">
                    {mockQuestions.technical.map((q: any, i: number) => (
                      <div key={i} className="p-4 bg-gray-50 rounded">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold">Q{i + 1}. {q.question}</h4>
                          <span className={`px-2 py-1 text-xs rounded ${
                            q.difficulty === 'easy' ? 'bg-success-100 text-success-700' :
                            q.difficulty === 'medium' ? 'bg-warning-100 text-warning-700' :
                            'bg-danger-100 text-danger-700'
                          }`}>
                            {q.difficulty}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{q.category}</p>
                        {q.keywords && q.keywords.length > 0 && (
                          <div>
                            <p className="text-sm font-medium text-gray-700 mb-1">Key points to cover:</p>
                            <div className="flex flex-wrap gap-2">
                              {q.keywords.map((kw: string, j: number) => (
                                <span key={j} className="px-2 py-1 bg-white text-gray-700 text-xs rounded">{kw}</span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {mockQuestions.behavioral && mockQuestions.behavioral.length > 0 && (
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-2xl font-bold mb-4">Behavioral Questions ({mockQuestions.behavioral.length})</h3>
                  <div className="space-y-4">
                    {mockQuestions.behavioral.map((q: any, i: number) => (
                      <div key={i} className="p-4 bg-gray-50 rounded">
                        <h4 className="font-semibold mb-2">Q{i + 1}. {q.question}</h4>
                        <p className="text-sm text-gray-600 mb-2">{q.category}</p>
                        {q.hints && q.hints.length > 0 && (
                          <div>
                            <p className="text-sm font-medium text-gray-700 mb-1">STAR Method Hints:</p>
                            <ul className="text-sm text-gray-600 space-y-1">
                              {q.hints.map((hint: string, j: number) => (
                                <li key={j}>• {hint}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Projects Tab */}
          {selectedTab === 'projects' && (
            <div className="space-y-6">
              {planData.projects && planData.projects.length > 0 ? (
                planData.projects.map((project: any, i: number) => (
                  <div key={i} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-2xl font-bold">{project.title}</h3>
                      <span className={`px-3 py-1 text-sm font-medium rounded ${
                        project.priority === 'high' ? 'bg-danger-100 text-danger-700' :
                        project.priority === 'medium' ? 'bg-warning-100 text-warning-700' :
                        'bg-success-100 text-success-700'
                      }`}>
                        {project.priority} priority
                      </span>
                    </div>
                    <p className="text-gray-700 mb-4">{project.description}</p>

                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold mb-2">Skills Covered:</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.skills_covered.map((skill: string, j: number) => (
                            <span key={j} className="px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {project.deliverables && (
                        <div>
                          <h4 className="font-semibold mb-2">Deliverables:</h4>
                          <ul className="space-y-1">
                            {project.deliverables.map((d: string, j: number) => (
                              <li key={j} className="text-gray-700 text-sm">• {d}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <p className="text-sm text-gray-600">Estimated: {project.estimated_hours} hours</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No projects suggested.</p>
              )}
            </div>
          )}

          {/* Resources Tab */}
          {selectedTab === 'resources' && (
            <div className="space-y-4">
              {resources.length > 0 ? (
                resources.map((resource: any, i: number) => (
                  <div key={i} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900">{resource.title}</h4>
                        <p className="text-sm text-gray-600">{resource.skill} • {resource.type}</p>
                      </div>
                      <span className={`px-3 py-1 text-sm rounded ${
                        resource.is_free ? 'bg-success-100 text-success-700' : 'bg-warning-100 text-warning-700'
                      }`}>
                        {resource.is_free ? 'Free' : `$${resource.cost}`}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-sm text-gray-500">{resource.difficulty}</span>
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary-600 hover:underline"
                      >
                        View Resource →
                      </a>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No resources available.</p>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
