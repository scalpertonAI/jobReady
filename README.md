# 🎯 JobReady.AI

> **AI-Powered Interview Preparation Platform**
> Prepare for your dream job with personalized roadmaps, resume optimization, and AI mock interviews.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Setup](#environment-setup)
- [Database Setup](#database-setup)
- [Development](#development)
- [What's Implemented](#whats-implemented)
- [Roadmap](#roadmap)

---

## 🎯 Overview

**JobReady.AI** is a comprehensive SaaS platform that helps job seekers prepare for interviews by:

1. **Analyzing** their resume against job descriptions
2. **Identifying** skill gaps and areas for improvement
3. **Generating** personalized 30-day preparation plans
4. **Providing** AI-powered mock interviews with feedback
5. **Optimizing** resumes for ATS compatibility
6. **Tracking** progress with gamification (XP, levels, achievements)

---

## ✨ Features

### Core Features

- 📄 **Resume Upload & Parsing** - Upload PDF resumes and extract structured data
- 💼 **Job Description Analysis** - Parse job postings to extract requirements
- 🎯 **Job Match Analysis** - AI-powered comparison showing match %, gaps, and strengths
- 📚 **Personalized Prep Plans** - 30-day roadmaps with daily tasks and resources
- 🎤 **Mock Interviews** - AI-generated questions with instant feedback
- ✨ **Resume Optimizer** - ATS-friendly keyword suggestions
- 📊 **Progress Tracking** - Dashboard with tasks, streaks, and completion stats
- 🏆 **Gamification** - XP points, levels, achievements, and streaks

### User Flow

```
Sign Up → Upload Resume → Add Job Description → Get Match Report →
Generate Prep Plan → Complete Daily Tasks → Mock Interviews → Track Progress
```

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 16 (App Router), React 19, TypeScript, TailwindCSS |
| **Backend** | Next.js API Routes, Server Actions |
| **Database** | Supabase (PostgreSQL) |
| **Auth** | Supabase Auth (Email + OAuth) |
| **Storage** | Supabase Storage (Resume PDFs) |
| **AI** | OpenAI GPT-4 (Analysis, Plan Generation, Interviews) |
| **Deployment** | Vercel (recommended) |

---

## 📂 Project Structure

```
jobready-ai/
├── app/                          # Next.js 13+ App Router
│   ├── (auth)/                   # Auth pages (login, signup)
│   ├── (dashboard)/              # Protected dashboard pages
│   ├── api/                      # API routes
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Landing page
│   └── globals.css               # Global styles
│
├── components/                   # React components
│   ├── auth/                     # Auth components
│   ├── resumes/                  # Resume components
│   ├── jobs/                     # Job description components
│   ├── analysis/                 # Match analysis components
│   ├── plans/                    # Prep plan components
│   ├── interviews/               # Mock interview components
│   ├── gamification/             # XP, levels, achievements
│   └── shared/                   # Reusable UI components
│
├── lib/                          # Core utilities and logic
│   ├── ai/                       # AI integration
│   │   ├── openai.ts            # OpenAI client
│   │   ├── prompts.ts           # AI prompt templates
│   │   ├── analyzer.ts          # Job match analyzer
│   │   ├── planGenerator.ts    # Prep plan generator
│   │   ├── resumeOptimizer.ts  # Resume optimizer
│   │   └── interviewGenerator.ts # Interview Q&A generator
│   │
│   ├── parsers/                  # Data parsers
│   │   ├── pdfParser.ts         # PDF text extraction
│   │   ├── resumeParser.ts      # Resume data extraction
│   │   └── jdParser.ts          # Job description parser
│   │
│   ├── supabase/                 # Supabase clients
│   │   ├── client.ts            # Browser client
│   │   ├── server.ts            # Server client
│   │   └── middleware.ts        # Auth middleware
│   │
│   ├── utils/                    # Utility functions
│   │   ├── gamification.ts      # XP, levels, achievements
│   │   ├── formatters.ts        # Date, number formatting
│   │   └── cn.ts                # Class name utility
│   │
│   └── hooks/                    # React hooks
│
├── types/                        # TypeScript types
│   ├── database.ts               # Supabase types
│   └── index.ts                  # App types
│
├── supabase/                     # Supabase config
│   └── migrations/               # Database migrations
│       └── 001_initial_schema.sql
│
├── middleware.ts                 # Next.js middleware (auth)
├── next.config.ts                # Next.js config
├── tailwind.config.ts            # Tailwind config
└── package.json                  # Dependencies

```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ and npm
- **Supabase Account** ([supabase.com](https://supabase.com))
- **OpenAI API Key** ([platform.openai.com](https://platform.openai.com))

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd jobready
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# OpenAI
OPENAI_API_KEY=your_openai_api_key

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 🗄 Database Setup

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Copy your project URL and keys to `.env.local`

### 2. Run Database Migration

In your Supabase dashboard:

1. Go to **SQL Editor**
2. Create a new query
3. Copy the contents of `supabase/migrations/001_initial_schema.sql`
4. Run the query

This will create:

- **11 tables**: profiles, resumes, job_descriptions, job_matches, preparation_plans, plan_tasks, task_progress, mock_interview_sessions, interview_responses, resume_improvements, user_achievements
- **Row Level Security policies** for all tables
- **Indexes** for performance
- **Triggers** for automatic profile creation

### 3. Set up Storage Bucket

In Supabase dashboard:

1. Go to **Storage**
2. Create a new bucket called `resumes`
3. Set it to **Private**
4. Add policy to allow authenticated users to upload

---

## 💻 Development

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm run start
```

### Lint Code

```bash
npm run lint
```

---

## ✅ What's Implemented

### ✅ Complete

- [x] Project setup (Next.js, TypeScript, TailwindCSS)
- [x] Database schema (11 tables with RLS)
- [x] Supabase integration (auth, client, server)
- [x] TypeScript type definitions
- [x] AI integration layer (OpenAI)
- [x] PDF parser for resume uploads
- [x] Resume parser (AI-powered extraction)
- [x] Job description parser
- [x] Job match analyzer (AI comparison)
- [x] Preparation plan generator (30-day roadmaps)
- [x] Resume optimizer (ATS suggestions)
- [x] Mock interview generator (Q&A with feedback)
- [x] Gamification system (XP, levels, achievements, streaks)
- [x] Utility functions (formatting, calculations)
- [x] Shared UI components (Button, Input, Card)
- [x] Authentication pages (Login, Signup)
- [x] Basic dashboard page
- [x] Landing page

### 🚧 In Progress

- [ ] API routes for all features
- [ ] Resume upload UI and functionality
- [ ] Job description submission form
- [ ] Job match report display
- [ ] Preparation plan UI and task tracking
- [ ] Mock interview interface
- [ ] Resume optimizer interface
- [ ] User profile and stats page

### 📝 Planned

- [ ] Email notifications
- [ ] Payment integration (Stripe)
- [ ] Admin dashboard
- [ ] Analytics and insights
- [ ] Community features
- [ ] Mobile app (React Native)

---

## 🗺 Roadmap

### Phase 1: MVP (Current)
- Core features (upload, analyze, plan, interview)
- Basic UI/UX
- Essential gamification

### Phase 2: Enhancement
- Advanced analytics
- More interview scenarios
- Resource recommendations API
- Social features

### Phase 3: Scale
- Multi-language support
- Industry-specific plans
- Team/Enterprise features
- Mobile apps

---

## 🧩 Core Modules

### 1. Resume Analysis Module

**Files:**
- `lib/parsers/pdfParser.ts` - PDF text extraction
- `lib/parsers/resumeParser.ts` - AI-powered resume parsing
- `lib/ai/prompts.ts` - Resume parsing prompts

**Features:**
- Upload PDF resumes
- Extract text using pdf-parse
- Parse into structured data (personal info, skills, experience, education, projects)
- Store in Supabase

### 2. Job Matching Module

**Files:**
- `lib/parsers/jdParser.ts` - JD parsing
- `lib/ai/analyzer.ts` - Job match analysis
- `lib/ai/prompts.ts` - Analysis prompts

**Features:**
- Parse job descriptions
- Compare resume vs JD
- Calculate match percentage
- Identify skill gaps
- Generate recommendations

### 3. Preparation Plan Module

**Files:**
- `lib/ai/planGenerator.ts` - Plan generation
- `lib/ai/prompts.ts` - Plan prompts

**Features:**
- Generate 30-day plans
- Daily tasks with resources
- Project suggestions
- Milestone tracking
- XP rewards

### 4. Mock Interview Module

**Files:**
- `lib/ai/interviewGenerator.ts` - Interview generation
- `lib/ai/prompts.ts` - Interview prompts

**Features:**
- Generate relevant questions
- Evaluate answers with AI
- Provide feedback
- Track performance
- Award XP

### 5. Gamification Module

**Files:**
- `lib/utils/gamification.ts` - XP, levels, achievements

**Features:**
- XP points for completing tasks
- Level progression
- Achievement unlocks
- Daily streaks
- Leaderboards (planned)

---

## 🔐 Authentication

Uses **Supabase Auth** with:

- Email/Password signup and login
- Google OAuth (configurable)
- Protected routes with middleware
- Row Level Security on all tables

---

## 🤖 AI Integration

### OpenAI Usage

- **Model**: GPT-4o-mini (cost-effective)
- **Use Cases**:
  - Resume parsing
  - Job description analysis
  - Match calculation
  - Plan generation
  - Interview questions
  - Answer evaluation
  - Resume optimization

### Prompt Engineering

All prompts are in `lib/ai/prompts.ts`:

- Structured JSON outputs
- Clear instructions
- Example formats
- Validation rules

---

## 📊 Database Schema

### Core Tables

1. **profiles** - User profiles (extends auth.users)
2. **resumes** - Uploaded resumes with parsed data
3. **job_descriptions** - Job postings with requirements
4. **job_matches** - Analysis results (match %, gaps)
5. **preparation_plans** - 30-day roadmaps
6. **plan_tasks** - Daily tasks within plans
7. **task_progress** - User completion tracking
8. **mock_interview_sessions** - Interview attempts
9. **interview_responses** - Q&A within sessions
10. **resume_improvements** - Optimization suggestions
11. **user_achievements** - Unlocked badges

---

## 🎨 UI/UX

- **Design System**: TailwindCSS with custom config
- **Color Palette**: Indigo primary, with success/warning/danger states
- **Components**: Reusable Button, Input, Card components
- **Responsive**: Mobile-first design
- **Accessibility**: ARIA labels, keyboard navigation

---

## 🧪 Testing

(To be implemented)

- Unit tests: Vitest
- Integration tests: Playwright
- E2E tests: Cypress

---

## 📈 Performance

- **Server Components**: Leverage Next.js 13+ for faster loads
- **Code Splitting**: Automatic with Next.js
- **Image Optimization**: Next.js Image component
- **Database Indexing**: Indexes on frequently queried columns
- **Caching**: React Query (to be added)

---

## 🔒 Security

- **Row Level Security**: All Supabase tables have RLS policies
- **Environment Variables**: Sensitive data in `.env.local`
- **API Key Protection**: Server-side only
- **CSRF Protection**: Built into Next.js
- **XSS Prevention**: React escaping by default

---

## 📝 License

MIT License - See LICENSE file for details

---

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 📧 Support

For questions or issues:

- **Email**: support@jobready.ai (placeholder)
- **GitHub Issues**: [Create an issue](../../issues)
- **Documentation**: [Wiki](../../wiki)

---

## 🙏 Acknowledgments

- **Next.js** - React framework
- **Supabase** - Backend platform
- **OpenAI** - AI capabilities
- **TailwindCSS** - Styling
- **Vercel** - Hosting

---

**Built with ❤️ for job seekers worldwide**

---

## 🚀 Quick Start Checklist

- [ ] Clone repository
- [ ] Install dependencies (`npm install`)
- [ ] Create Supabase project
- [ ] Run database migration
- [ ] Set up environment variables
- [ ] Get OpenAI API key
- [ ] Run dev server (`npm run dev`)
- [ ] Visit http://localhost:3000
- [ ] Sign up and test!

---

*Last updated: 2025-11-06*
