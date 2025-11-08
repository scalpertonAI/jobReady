/**
 * Core application types for JobReady.AI
 */

// ============================================
// RESUME TYPES
// ============================================

export interface ParsedResume {
  personal_info: {
    name?: string;
    email?: string;
    phone?: string;
    location?: string;
    linkedin?: string;
    github?: string;
    portfolio?: string;
  };
  summary?: string;
  skills: {
    technical: string[];
    soft: string[];
    tools: string[];
    languages: string[];
  };
  experience: ExperienceItem[];
  education: EducationItem[];
  projects: ProjectItem[];
  certifications: CertificationItem[];
}

export interface ExperienceItem {
  company: string;
  title: string;
  location?: string;
  start_date: string;
  end_date: string | 'Present';
  description: string;
  achievements: string[];
  technologies?: string[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  field: string;
  start_date?: string;
  end_date?: string;
  gpa?: string;
}

export interface ProjectItem {
  name: string;
  description: string;
  technologies: string[];
  url?: string;
  github?: string;
}

export interface CertificationItem {
  name: string;
  issuer: string;
  date: string;
  url?: string;
}

// ============================================
// JOB DESCRIPTION TYPES
// ============================================

export interface ParsedJobDescription {
  title: string;
  company?: string;
  location?: string;
  job_type?: string; // full-time, part-time, contract
  experience_level?: string; // entry, mid, senior
  required_skills: SkillRequirement[];
  preferred_skills: SkillRequirement[];
  responsibilities: string[];
  qualifications: string[];
  benefits?: string[];
  salary_range?: {
    min?: number;
    max?: number;
    currency?: string;
  };
  years_of_experience?: number;
}

export interface SkillRequirement {
  skill: string;
  proficiency?: 'basic' | 'intermediate' | 'advanced' | 'expert';
  priority: 'required' | 'preferred' | 'nice-to-have';
}

// ============================================
// ANALYSIS & MATCHING TYPES
// ============================================

export interface JobMatchAnalysis {
  match_percentage: number;
  skills_matched: SkillMatch[];
  skills_missing: MissingSkill[];
  skills_weak: WeakSkill[];
  experience_analysis: ExperienceAnalysis;
  strengths: string[];
  weaknesses: string[];
  recommendations: Recommendation[];
  keyword_analysis: KeywordAnalysis;
}

export interface SkillMatch {
  skill: string;
  proficiency_user: string;
  proficiency_required: string;
  match: 'strong' | 'exact' | 'partial' | 'weak';
}

export interface MissingSkill {
  skill: string;
  proficiency_required: string;
  priority: 'high' | 'medium' | 'low';
  reason: string;
}

export interface WeakSkill {
  skill: string;
  proficiency_user: string;
  proficiency_required: string;
  gap: string;
  priority: 'high' | 'medium' | 'low';
}

export interface ExperienceAnalysis {
  years_user: number;
  years_required: number;
  gap: string;
  assessment: string;
}

export interface Recommendation {
  category: 'skills' | 'resume' | 'interview_prep' | 'project' | 'certification';
  priority: 'high' | 'medium' | 'low';
  action: string;
  reason: string;
  estimated_time?: string;
}

export interface KeywordAnalysis {
  jd_keywords: string[];
  resume_keywords_matched: string[];
  resume_keywords_missing: string[];
  ats_score: number;
  ats_notes: string;
}

// ============================================
// PREPARATION PLAN TYPES
// ============================================

export interface PreparationPlan {
  plan_id: string;
  created_at: string;
  duration_days: number;
  target_job: string;
  overview: PlanOverview;
  weekly_breakdown: WeeklyPlan[];
  daily_tasks: DailyTask[];
  projects: ProjectSuggestion[];
  resources: LearningResource[];
  mock_interview_questions: MockInterviewQuestions;
  milestones: Milestone[];
  coding_problems?: CodingProblem[];
  system_design_topics?: SystemDesignTopic[];
  learning_modules?: LearningModule[];
}

export interface PlanOverview {
  title: string;
  description: string;
  focus_areas: string[];
  estimated_daily_hours: number;
}

export interface WeeklyPlan {
  week: number;
  theme: string;
  goals: string[];
  estimated_hours: number;
}

export interface DailyTask {
  day: number;
  title: string;
  description: string;
  type: 'learning' | 'practice' | 'project' | 'review' | 'mock_interview';
  tasks: TaskItem[];
  xp_reward: number;
}

export interface TaskItem {
  task: string;
  duration_minutes: number;
  resource_url?: string | null;
  completed: boolean;
}

export interface ProjectSuggestion {
  title: string;
  description: string;
  skills_covered: string[];
  estimated_hours: number;
  deliverables: string[];
  priority: 'high' | 'medium' | 'low';
}

export interface LearningResource {
  skill: string;
  type: 'video' | 'course' | 'article' | 'documentation' | 'tutorial' | 'book';
  title: string;
  url: string;
  duration_minutes?: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  is_free: boolean;
  cost?: number;
}

export interface MockInterviewQuestions {
  technical: TechnicalQuestion[];
  behavioral: BehavioralQuestion[];
}

export interface TechnicalQuestion {
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  keywords: string[];
}

export interface BehavioralQuestion {
  category: string;
  question: string;
  hints: string[];
}

export interface Milestone {
  day: number;
  title: string;
  description: string;
  xp_reward: number;
}

export interface CodingProblem {
  id: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  problem_statement: string;
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  constraints: string[];
  hints: string[];
  solution_approach: string;
  code_template?: string;
  optimal_solution?: string;
  time_complexity: string;
  space_complexity: string;
  related_topics: string[];
  practice_day: number;
}

export interface SystemDesignTopic {
  id: string;
  title: string;
  description: string;
  key_concepts: string[];
  components: {
    name: string;
    purpose: string;
    considerations: string[];
  }[];
  scalability_considerations: string[];
  trade_offs: string[];
  example_systems: string[];
  diagrams_description: string;
  practice_day: number;
}

export interface LearningModule {
  id: string;
  title: string;
  skill: string;
  day: number;
  content: {
    theory: string;
    key_points: string[];
    code_examples: {
      title: string;
      code: string;
      explanation: string;
    }[];
    practice_exercises: {
      question: string;
      difficulty: 'easy' | 'medium' | 'hard';
      solution_hint: string;
    }[];
  };
  duration_minutes: number;
  quiz: {
    question: string;
    options: string[];
    correct_answer: number;
    explanation: string;
  }[];
}

// ============================================
// MOCK INTERVIEW TYPES
// ============================================

export interface MockInterviewSession {
  session_id: string;
  started_at: string;
  interview_type: 'technical' | 'behavioral' | 'mixed';
  difficulty: 'easy' | 'medium' | 'hard';
  status: 'in_progress' | 'completed';
  questions: InterviewQuestion[];
  summary?: InterviewSummary;
  xp_earned: number;
}

export interface InterviewQuestion {
  question_number: number;
  question_text: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  user_answer?: string;
  ai_feedback?: string;
  score?: number;
  suggested_improvements?: string[];
  example_answer?: string;
}

export interface InterviewSummary {
  total_questions: number;
  average_score: number;
  overall_score: number;
  time_taken_minutes: number;
  strengths: string[];
  areas_to_improve: string[];
  recommended_focus: string[];
}

// ============================================
// RESUME OPTIMIZATION TYPES
// ============================================

export interface ResumeImprovement {
  improvement_id: string;
  created_at: string;
  ats_analysis: ATSAnalysis;
  keyword_suggestions: KeywordSuggestion[];
  section_improvements: SectionImprovement;
  formatting_tips: string[];
  overall_suggestions: OverallSuggestion[];
}

export interface ATSAnalysis {
  current_score: number;
  potential_score: number;
  missing_keywords: string[];
}

export interface KeywordSuggestion {
  keyword: string;
  where_to_add: string;
  priority: 'high' | 'medium' | 'low';
  context: string;
}

export interface SectionImprovement {
  technical_skills?: {
    current: string;
    suggested: string;
    reason: string;
  };
  experience?: ExperienceImprovement[];
}

export interface ExperienceImprovement {
  section: string;
  improvement_type: 'add_metrics' | 'add_keywords' | 'restructure' | 'enhance';
  current: string;
  suggested: string;
  reason: string;
}

export interface OverallSuggestion {
  category: string;
  suggestion: string;
  priority: 'high' | 'medium' | 'low';
}

// ============================================
// GAMIFICATION TYPES
// ============================================

export interface UserStats {
  total_xp: number;
  level: number;
  xp_to_next_level: number;
  streak_days: number;
  achievements_unlocked: number;
  total_tasks_completed: number;
  total_interviews_completed: number;
}

export interface Achievement {
  id: string;
  achievement_type: string;
  title: string;
  description: string;
  badge_icon: string;
  xp_reward: number;
  unlocked_at: string;
  is_unlocked: boolean;
}

// ============================================
// UTILITY TYPES
// ============================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}
