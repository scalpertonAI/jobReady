-- ============================================
-- JobReady.AI Database Schema
-- Migration 001: Initial Schema Setup
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- PROFILES (extends Supabase auth.users)
-- ============================================
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Gamification
  total_xp INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  streak_days INTEGER DEFAULT 0,
  last_activity_date DATE
);

-- Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- ============================================
-- RESUMES
-- ============================================
CREATE TABLE resumes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,

  -- File info
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_size INTEGER,

  -- Parsed content
  raw_text TEXT,
  parsed_data JSONB,

  -- Metadata
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security
ALTER TABLE resumes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own resumes" ON resumes
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own resumes" ON resumes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own resumes" ON resumes
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own resumes" ON resumes
  FOR DELETE USING (auth.uid() = user_id);

-- Index for faster queries
CREATE INDEX resumes_user_id_idx ON resumes(user_id);
CREATE INDEX resumes_is_primary_idx ON resumes(user_id, is_primary) WHERE is_primary = true;

-- ============================================
-- JOB DESCRIPTIONS
-- ============================================
CREATE TABLE job_descriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,

  -- JD Content
  title TEXT NOT NULL,
  company_name TEXT,
  raw_text TEXT NOT NULL,
  parsed_data JSONB,

  -- Metadata
  url TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security
ALTER TABLE job_descriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own job descriptions" ON job_descriptions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own job descriptions" ON job_descriptions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own job descriptions" ON job_descriptions
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own job descriptions" ON job_descriptions
  FOR DELETE USING (auth.uid() = user_id);

-- Index
CREATE INDEX job_descriptions_user_id_idx ON job_descriptions(user_id);

-- ============================================
-- JOB MATCHES (Analysis Results)
-- ============================================
CREATE TABLE job_matches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  resume_id UUID REFERENCES resumes(id) ON DELETE CASCADE NOT NULL,
  job_description_id UUID REFERENCES job_descriptions(id) ON DELETE CASCADE NOT NULL,

  -- Analysis Results
  match_percentage INTEGER,
  analysis_data JSONB NOT NULL,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  UNIQUE(resume_id, job_description_id)
);

-- Row Level Security
ALTER TABLE job_matches ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own job matches" ON job_matches
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own job matches" ON job_matches
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own job matches" ON job_matches
  FOR DELETE USING (auth.uid() = user_id);

-- Index
CREATE INDEX job_matches_user_id_idx ON job_matches(user_id);
CREATE INDEX job_matches_resume_id_idx ON job_matches(resume_id);

-- ============================================
-- PREPARATION PLANS
-- ============================================
CREATE TABLE preparation_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_match_id UUID REFERENCES job_matches(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,

  -- Plan Config
  duration_days INTEGER DEFAULT 30,
  difficulty_level TEXT DEFAULT 'intermediate',

  -- Plan Content
  plan_data JSONB NOT NULL,

  -- Status
  status TEXT DEFAULT 'active',
  progress_percentage INTEGER DEFAULT 0,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security
ALTER TABLE preparation_plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own plans" ON preparation_plans
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own plans" ON preparation_plans
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own plans" ON preparation_plans
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own plans" ON preparation_plans
  FOR DELETE USING (auth.uid() = user_id);

-- Index
CREATE INDEX preparation_plans_user_id_idx ON preparation_plans(user_id);

-- ============================================
-- PLAN TASKS
-- ============================================
CREATE TABLE plan_tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  preparation_plan_id UUID REFERENCES preparation_plans(id) ON DELETE CASCADE NOT NULL,

  -- Task Info
  day_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  task_type TEXT NOT NULL,

  -- Task Content
  content JSONB,
  estimated_hours DECIMAL(3,1),

  -- Ordering
  order_index INTEGER,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security
ALTER TABLE plan_tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view tasks of own plans" ON plan_tasks
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM preparation_plans
      WHERE preparation_plans.id = plan_tasks.preparation_plan_id
      AND preparation_plans.user_id = auth.uid()
    )
  );

-- Index
CREATE INDEX plan_tasks_plan_id_idx ON plan_tasks(preparation_plan_id);

-- ============================================
-- TASK PROGRESS
-- ============================================
CREATE TABLE task_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  plan_task_id UUID REFERENCES plan_tasks(id) ON DELETE CASCADE NOT NULL,

  -- Progress
  status TEXT DEFAULT 'pending',
  completion_percentage INTEGER DEFAULT 0,

  -- User Notes
  notes TEXT,
  user_rating INTEGER,

  -- Timestamps
  started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,

  -- XP Reward
  xp_earned INTEGER DEFAULT 0,

  UNIQUE(user_id, plan_task_id)
);

-- Row Level Security
ALTER TABLE task_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own task progress" ON task_progress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own task progress" ON task_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own task progress" ON task_progress
  FOR UPDATE USING (auth.uid() = user_id);

-- Index
CREATE INDEX task_progress_user_id_idx ON task_progress(user_id);

-- ============================================
-- MOCK INTERVIEW SESSIONS
-- ============================================
CREATE TABLE mock_interview_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  preparation_plan_id UUID REFERENCES preparation_plans(id),

  -- Session Config
  interview_type TEXT,
  difficulty TEXT,

  -- Session Data
  questions_data JSONB,
  total_questions INTEGER,

  -- Results
  score INTEGER,
  feedback_summary TEXT,

  -- Status
  status TEXT DEFAULT 'in_progress',
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,

  -- XP
  xp_earned INTEGER DEFAULT 0
);

-- Row Level Security
ALTER TABLE mock_interview_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own interview sessions" ON mock_interview_sessions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own interview sessions" ON mock_interview_sessions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own interview sessions" ON mock_interview_sessions
  FOR UPDATE USING (auth.uid() = user_id);

-- Index
CREATE INDEX interview_sessions_user_id_idx ON mock_interview_sessions(user_id);

-- ============================================
-- INTERVIEW RESPONSES
-- ============================================
CREATE TABLE interview_responses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID REFERENCES mock_interview_sessions(id) ON DELETE CASCADE NOT NULL,

  -- Question
  question_number INTEGER NOT NULL,
  question_text TEXT NOT NULL,
  question_type TEXT,

  -- User Answer
  user_answer TEXT NOT NULL,

  -- AI Feedback
  feedback TEXT,
  score INTEGER,

  -- Suggestions
  suggested_improvements TEXT,
  example_answer TEXT,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security
ALTER TABLE interview_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view responses of own sessions" ON interview_responses
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM mock_interview_sessions
      WHERE mock_interview_sessions.id = interview_responses.session_id
      AND mock_interview_sessions.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert responses to own sessions" ON interview_responses
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM mock_interview_sessions
      WHERE mock_interview_sessions.id = interview_responses.session_id
      AND mock_interview_sessions.user_id = auth.uid()
    )
  );

-- Index
CREATE INDEX interview_responses_session_id_idx ON interview_responses(session_id);

-- ============================================
-- RESUME IMPROVEMENTS
-- ============================================
CREATE TABLE resume_improvements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  resume_id UUID REFERENCES resumes(id) ON DELETE CASCADE NOT NULL,
  job_description_id UUID REFERENCES job_descriptions(id),

  -- Suggestions
  improvements_data JSONB NOT NULL,

  -- Status
  applied BOOLEAN DEFAULT false,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security
ALTER TABLE resume_improvements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own resume improvements" ON resume_improvements
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own resume improvements" ON resume_improvements
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Index
CREATE INDEX resume_improvements_user_id_idx ON resume_improvements(user_id);
CREATE INDEX resume_improvements_resume_id_idx ON resume_improvements(resume_id);

-- ============================================
-- USER ACHIEVEMENTS
-- ============================================
CREATE TABLE user_achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,

  achievement_type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  badge_icon TEXT,
  xp_reward INTEGER DEFAULT 0,

  unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  UNIQUE(user_id, achievement_type)
);

-- Row Level Security
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own achievements" ON user_achievements
  FOR SELECT USING (auth.uid() = user_id);

-- Index
CREATE INDEX user_achievements_user_id_idx ON user_achievements(user_id);

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for profiles
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger for job_descriptions
CREATE TRIGGER update_job_descriptions_updated_at
  BEFORE UPDATE ON job_descriptions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function to create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to auto-create profile
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();
