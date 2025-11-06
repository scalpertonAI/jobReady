# 🚀 JobReady.AI - Complete Setup Guide

## ⚡ Quick Start (5 Minutes)

### 1. Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier works)
- An OpenAI API key

### 2. Clone and Install

```bash
git clone <your-repo-url>
cd jobready
npm install
```

### 3. Set Up Supabase

#### A. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Choose organization and create project
4. Wait for project to initialize (2-3 minutes)

#### B. Get Your Credentials

1. In Supabase dashboard, go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (looks like: `https://xyz.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)
   - **service_role key** (starts with `eyJ...`)

#### C. Run Database Migration

1. In Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy entire content from `supabase/migrations/001_initial_schema.sql`
4. Paste and click "Run"
5. You should see "Success. No rows returned"

#### D. Create Storage Bucket

1. In Supabase dashboard, go to **Storage**
2. Click "New Bucket"
3. Name it `resumes`
4. Set it to **Private**
5. Click "Create bucket"

#### E. Add Storage Policy

Still in Storage:
1. Click on `resumes` bucket
2. Go to **Policies** tab
3. Click "New Policy"
4. Choose "Custom policy"
5. Add this policy:

**Name**: `Allow authenticated users to upload`

**Target roles**: `authenticated`

**Policy definition**:
```sql
((bucket_id = 'resumes') AND (auth.uid() = (storage.foldername(name))[1]))
```

**Allowed operations**: `INSERT`, `SELECT`, `DELETE`

6. Save

### 4. Get OpenAI API Key

1. Go to [platform.openai.com](https://platform.openai.com)
2. Sign up or log in
3. Go to **API Keys**
4. Click "Create new secret key"
5. Copy the key (starts with `sk-...`)
6. **IMPORTANT**: Save it somewhere - you can't see it again!

### 5. Configure Environment Variables

Create `.env.local` file:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your credentials:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# OpenAI
OPENAI_API_KEY=sk-your_openai_key_here

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 6. Run the Application

```bash
npm run dev
```

Open http://localhost:3000

---

## ✅ Testing the Application

### Step 1: Sign Up

1. Go to http://localhost:3000
2. Click "Get Started" or "Sign Up"
3. Enter your details
4. You'll be redirected to the dashboard

### Step 2: Upload a Resume

1. Click "Upload Resume" card on dashboard
2. Drag and drop a PDF resume (or click to browse)
3. Click "Upload & Parse Resume"
4. Wait 10-30 seconds for AI parsing
5. You'll see extracted skills and experience

**Don't have a resume?** Create a simple PDF with:
- Your name and contact info
- A few technical skills (Python, React, etc.)
- One or two job experiences

### Step 3: Add a Job Description

1. Click "Continue to Add Job" (or go to dashboard → "Add Job Description")
2. Paste a job posting from LinkedIn, Indeed, or any job board
3. Click "Analyze Job Match"

**Don't have a JD?** Use this example:

```
Senior Software Engineer

We are looking for a Senior Software Engineer with:

Required Skills:
- 5+ years of experience with Java and Spring Boot
- Strong knowledge of microservices architecture
- Experience with Docker and Kubernetes
- Proficiency in PostgreSQL
- REST API design and development

Preferred Skills:
- AWS cloud platform experience
- CI/CD pipeline knowledge
- React or Angular experience

Responsibilities:
- Design and build scalable backend services
- Lead technical architecture decisions
- Mentor junior developers
- Collaborate with product team
```

### Step 4: View Match Report

After analysis completes (10-30 seconds):
- See your match percentage
- View matched skills (green) ✅
- View missing skills (red) ⚠️
- Read personalized recommendations
- Click "Generate 30-Day Prep Plan"

### Step 5: Get Your Prep Plan

1. Plan generation takes 20-60 seconds
2. You'll see a progress bar with steps
3. Once complete, you'll see:
   - Weekly themes and goals
   - Daily tasks with resources
   - Project suggestions
   - Recommended learning materials

### Step 6: Explore Features

**Mock Interview** (if you have time):
- Go to dashboard → "Mock Interview"
- Select difficulty
- Answer AI-generated questions
- Get instant feedback

---

## 🐛 Troubleshooting

### "Unauthorized" Error

**Problem**: Getting 401 errors

**Solution**:
1. Make sure you're logged in
2. Check that environment variables are correct
3. Restart the dev server

### Resume Upload Fails (Storage RLS Error)

**Problem**: Getting "new row violates row-level security policy" (403 error)

**Solution**:
⚠️ **This is the most common issue!** See **STORAGE_SETUP.md** for complete fix.

**Quick Fix:**
1. Go to Supabase Dashboard → Storage
2. Make sure `resumes` bucket exists and is PRIVATE
3. Go to SQL Editor and run the script from `supabase/migrations/002_storage_policies.sql`
4. Restart your dev server
5. Try uploading again

**Detailed Guide:** Read **STORAGE_SETUP.md** for step-by-step instructions.

### OpenAI API Errors

**Problem**: "Failed to generate" or AI errors

**Solution**:
1. Verify OpenAI API key is correct
2. Check you have credits in OpenAI account
3. Try a shorter resume/JD to test
4. Check server logs for specific errors

### Database Errors

**Problem**: Supabase errors, "Failed to save"

**Solution**:
1. Make sure migration ran successfully
2. Check all 11 tables were created
3. Verify RLS policies are enabled
4. Try running migration again

### Dev Server Won't Start

**Problem**: npm run dev fails

**Solution**:
1. Delete `node_modules` and `package-lock.json`
2. Run `npm install` again
3. Make sure Node.js version is 18+
4. Check for port 3000 conflicts

---

## 📊 What Should Work

After setup, you should be able to:

✅ Sign up and log in
✅ Upload PDF resumes
✅ Parse resumes with AI
✅ Add job descriptions
✅ Get job match analysis with % and gaps
✅ Generate 30-day preparation plans
✅ View daily tasks and resources
✅ See XP and level progression
✅ Start mock interviews
✅ Get AI feedback on answers

---

## 💰 Cost Estimates

### OpenAI Usage

For testing (1 full flow):
- Resume parsing: ~$0.02
- JD parsing: ~$0.01
- Match analysis: ~$0.05
- Plan generation: ~$0.10
- Mock interview (5 questions): ~$0.10

**Total per test**: ~$0.30

**Tip**: Start with `gpt-4o-mini` (already configured) to minimize costs

### Supabase

Free tier includes:
- 500MB database
- 1GB file storage
- 50MB file uploads

**This is plenty for testing!**

---

## 🔐 Security Notes

1. **Never commit `.env.local`** - It's in `.gitignore`
2. **Never share your API keys** publicly
3. **Use service_role key carefully** - It bypasses RLS
4. **Keep dependencies updated** - Run `npm audit`

---

## 🎓 Learning the Codebase

### Key Files to Understand

1. **Database**: `supabase/migrations/001_initial_schema.sql`
2. **Types**: `types/index.ts` and `types/database.ts`
3. **AI Prompts**: `lib/ai/prompts.ts`
4. **API Routes**: `app/api/**/route.ts`
5. **Main Pages**: `app/(dashboard)/**/page.tsx`

### Code Flow

```
User uploads resume
  → API: /api/resumes/upload
    → pdfParser extracts text
    → resumeParser uses AI to structure data
    → Saved to Supabase
  ← Returns parsed resume

User adds JD
  → API: /api/job-descriptions
    → jdParser uses AI to extract requirements
    → Saved to Supabase
  ← Returns parsed JD

User clicks "Analyze"
  → API: /api/analyze
    → analyzer compares resume vs JD with AI
    → Generates match %, gaps, recommendations
    → Awards XP
  ← Returns match report

User generates plan
  → API: /api/plans/generate
    → planGenerator creates 30-day roadmap with AI
    → Creates daily tasks in database
    → Awards achievement
  ← Returns prep plan
```

---

## 🚀 Next Steps

After successful setup:

1. **Test the full flow** with your own resume
2. **Try different job descriptions** to see variety
3. **Explore the code** to understand how it works
4. **Customize the prompts** in `lib/ai/prompts.ts`
5. **Add new features** based on your needs

---

## 📞 Getting Help

If you're stuck:

1. Check browser console for errors
2. Check server logs in terminal
3. Review this guide again
4. Check the main README.md
5. Look at code comments
6. Create a GitHub issue

---

**You're all set! Enjoy JobReady.AI! 🎉**
