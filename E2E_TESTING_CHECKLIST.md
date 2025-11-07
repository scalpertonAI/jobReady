# 🧪 Complete End-to-End Testing Checklist

This guide will walk you through testing the entire JobReady.AI application from start to finish.

---

## ⚠️ BEFORE YOU START - CRITICAL SETUP

### 1. Configure Supabase Storage Policies (REQUIRED)

**Without this, resume uploads will fail with a 403 error!**

1. Open https://app.supabase.com
2. Select your JobReady.AI project
3. Click **SQL Editor** (left sidebar)
4. Click **"New Query"**
5. Copy and paste this script:

```sql
-- ============================================
-- STORAGE POLICIES FIX
-- ============================================

-- 1. Ensure bucket exists
INSERT INTO storage.buckets (id, name, public)
VALUES ('resumes', 'resumes', false)
ON CONFLICT (id) DO NOTHING;

-- 2. Delete old broken policies (if any)
DROP POLICY IF EXISTS "Users can upload to own folder" ON storage.objects;
DROP POLICY IF EXISTS "Users can read own resumes" ON storage.objects;
DROP POLICY IF EXISTS "Users can update own resumes" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete own resumes" ON storage.objects;

-- 3. Create working policies
CREATE POLICY "Users can upload to own folder"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'resumes'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Users can read own resumes"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'resumes'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Users can update own resumes"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'resumes'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Users can delete own resumes"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'resumes'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- 4. Verify (should show 4 policies)
SELECT policyname FROM pg_policies
WHERE schemaname = 'storage'
AND tablename = 'objects'
AND policyname LIKE '%resume%';
```

6. Click **"Run"**
7. You should see: ✅ **Success. No rows returned** (or 4 policy names)

### 2. Verify Environment Variables

Make sure your `.env.local` file has all these variables:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# OpenAI
OPENAI_API_KEY=sk-your-openai-api-key
```

### 3. Server Must Be Running

```bash
npm run dev
```

You should see:
```
✓ Ready in 2-3s
Local: http://localhost:3000
```

---

## 📋 Test Flow 1: User Registration & Onboarding

### Step 1.1: Sign Up
- [ ] Go to http://localhost:3000
- [ ] Click **"Get Started"** or **"Sign Up"**
- [ ] Enter email and password
- [ ] Click **"Sign Up"**
- [ ] **Expected**: Redirected to `/dashboard`
- [ ] **Expected**: User profile created in database

### Step 1.2: Dashboard Load
- [ ] Dashboard page loads successfully
- [ ] See welcome message with user email
- [ ] See 6 quick action cards:
  - Upload Resume
  - Add Job Description
  - View Match Reports
  - Generate Prep Plan
  - Start Mock Interview
  - View Profile
- [ ] **Expected**: No errors in console

---

## 📋 Test Flow 2: Resume Upload & Parsing

### Step 2.1: Navigate to Upload
- [ ] From dashboard, click **"Upload Resume"** card
- [ ] OR navigate to http://localhost:3000/resumes/upload
- [ ] **Expected**: Upload page loads with drag-and-drop area

### Step 2.2: Upload PDF Resume
- [ ] Drag and drop a PDF resume file (or click to browse)
- [ ] **Expected**: File name appears
- [ ] **Expected**: Upload progress bar shows
- [ ] Click **"Upload Resume"**

**What Should Happen**:
1. ✅ File uploads to Supabase Storage (`resumes` bucket)
2. ✅ PDF text extracted using `unpdf` library
3. ✅ AI parses resume to extract:
   - Name, email, phone
   - Skills (technical & soft)
   - Work experience
   - Education
   - Certifications
4. ✅ Resume saved to database (`resumes` table)
5. ✅ Success message shown
6. ✅ User earns **50 XP** (first resume achievement)

**Check For**:
- [ ] No 403 Storage errors (means storage policies work!)
- [ ] No "text.trim is not a function" errors (means text parsing works!)
- [ ] No "DOMMatrix is not defined" errors (means unpdf works!)
- [ ] Success message appears
- [ ] Redirect to resume list or dashboard

**Warnings You Can Ignore**:
- ⚠️ `Warning: TT: undefined function: 32` - This is a PDF font table warning from the library, doesn't affect functionality

### Step 2.3: Verify Resume Saved
- [ ] Go to http://localhost:3000/resumes
- [ ] **Expected**: See your uploaded resume in the list
- [ ] **Expected**: Shows file name, upload date, file size
- [ ] Click on the resume
- [ ] **Expected**: Can view resume details

---

## 📋 Test Flow 3: Job Description & Analysis

### Step 3.1: Add Job Description
- [ ] From dashboard, click **"Add Job Description"**
- [ ] OR navigate to http://localhost:3000/jobs/new
- [ ] Enter job details:
  - Company name (e.g., "Google")
  - Job title (e.g., "Senior Frontend Engineer")
  - Paste job description (copy from LinkedIn/Indeed)
- [ ] Click **"Save Job Description"**

**What Should Happen**:
1. ✅ AI parses job description to extract:
   - Required skills
   - Experience level
   - Responsibilities
   - Qualifications
2. ✅ Job saved to database (`job_descriptions` table)
3. ✅ Success message shown
4. ✅ Option to "Analyze Match" appears

### Step 3.2: Analyze Job Match
- [ ] Click **"Analyze Job Match"** button
- [ ] Select your uploaded resume
- [ ] Click **"Run Analysis"**

**What Should Happen**:
1. ✅ AI compares resume skills vs job requirements
2. ✅ Calculates match percentage (0-100%)
3. ✅ Generates skill gap analysis:
   - Skills you have
   - Skills you're missing
   - Skills to improve
4. ✅ Match report saved to database (`job_matches` table)
5. ✅ User earns **100 XP** (first analysis achievement)
6. ✅ Match report displayed with visual breakdown

**Check For**:
- [ ] Match percentage shows (e.g., "78% Match")
- [ ] Green badges for matching skills
- [ ] Red badges for missing skills
- [ ] Yellow badges for skills to improve
- [ ] Detailed recommendations
- [ ] No API errors from OpenAI

### Step 3.3: View All Jobs
- [ ] Navigate to http://localhost:3000/jobs
- [ ] **Expected**: See list of all job descriptions
- [ ] **Expected**: See match percentage badges if analyzed
- [ ] **Expected**: Can click to view details or analyze

---

## 📋 Test Flow 4: Preparation Plan Generation

### Step 4.1: Generate 30-Day Plan
- [ ] From match report, click **"Generate 30-Day Prep Plan"**
- [ ] OR from dashboard, click **"Generate Prep Plan"**
- [ ] Select a job match (if multiple)
- [ ] Click **"Generate Plan"**

**What Should Happen**:
1. ✅ Progress animation shows (AI is working)
2. ✅ AI generates personalized 30-day roadmap:
   - Daily tasks focused on skill gaps
   - Resources (courses, articles, practice problems)
   - Milestones for each week
   - Time estimates per task
3. ✅ Plan saved to database (`preparation_plans` + `plan_tasks` tables)
4. ✅ User earns **200 XP** (first plan achievement)
5. ✅ Plan displayed with weekly breakdown

**Check For**:
- [ ] Plan shows 30 days of tasks
- [ ] Tasks are specific and actionable (not generic)
- [ ] Each task has time estimate and resources
- [ ] Can expand/collapse weeks
- [ ] Progress tracking UI appears
- [ ] No OpenAI API errors

### Step 4.2: View & Track Plan
- [ ] Navigate to http://localhost:3000/plans
- [ ] **Expected**: See your generated plan(s)
- [ ] Click on a plan to open
- [ ] **Expected**: See full 30-day schedule
- [ ] Click checkbox to mark a task complete
- [ ] **Expected**: Progress percentage updates
- [ ] **Expected**: Earn XP for completing tasks

---

## 📋 Test Flow 5: Mock Interviews

### Step 5.1: Start Mock Interview
- [ ] From dashboard, click **"Start Mock Interview"**
- [ ] OR navigate to http://localhost:3000/interviews/new
- [ ] Select a preparation plan
- [ ] Choose difficulty (Easy/Medium/Hard)
- [ ] Set number of questions (3-10)
- [ ] Click **"Start Mock Interview"**

**What Should Happen**:
1. ✅ AI generates interview questions based on:
   - Your skill gaps
   - Job requirements
   - Selected difficulty
2. ✅ Interview session created (`mock_interview_sessions` table)
3. ✅ Questions displayed one by one
4. ✅ Redirect to interview session page

### Step 5.2: Answer Questions
- [ ] Read the first question
- [ ] Type your answer in the text box
- [ ] Click **"Submit Answer"**

**What Should Happen**:
1. ✅ AI evaluates your answer
2. ✅ Provides:
   - Score (0-100)
   - Feedback on what was good
   - What to improve
   - Model answer for reference
3. ✅ Answer saved (`interview_responses` table)
4. ✅ Earn XP based on performance
5. ✅ Next question appears

**Check For**:
- [ ] Questions are relevant to the job
- [ ] AI feedback is specific and helpful
- [ ] Score reflects answer quality
- [ ] Can see progress (Question 2 of 5)

### Step 5.3: Complete Interview
- [ ] Answer all questions
- [ ] Click **"Finish Interview"**
- [ ] **Expected**: Summary page shows:
  - Overall average score
  - Breakdown per question
  - Strengths and areas to improve
  - XP earned
- [ ] **Expected**: User earns **300 XP** (first interview achievement)

### Step 5.4: View Interview History
- [ ] Navigate to http://localhost:3000/interviews
- [ ] **Expected**: See list of completed interviews
- [ ] **Expected**: See scores and dates
- [ ] Click on an interview
- [ ] **Expected**: Can review questions and answers

---

## 📋 Test Flow 6: Gamification & Profile

### Step 6.1: View Profile
- [ ] Navigate to http://localhost:3000/profile
- [ ] **Expected**: Profile page shows:
  - Total XP earned
  - Current level (calculated from XP)
  - XP needed for next level
  - Current streak (days active)
  - All unlocked achievements with badges

### Step 6.2: Check Achievements
- [ ] Review achievement list
- [ ] **Expected**: See which ones are unlocked:
  - First Resume (50 XP) - Upload first resume
  - First Analysis (100 XP) - Analyze first job match
  - First Plan (200 XP) - Generate first prep plan
  - First Interview (300 XP) - Complete first mock interview
  - Resume Master (200 XP) - Upload 5 resumes
  - Analysis Pro (300 XP) - Analyze 10 jobs
  - Interview Champion (500 XP) - Complete 10 interviews
  - Week Warrior (100 XP) - 7-day streak
  - Month Master (500 XP) - 30-day streak
  - Skill Collector (100 XP) - Track 50+ skills
  - Perfect Score (1000 XP) - Get 100% on interview
  - Speed Runner (200 XP) - Complete plan in 20 days

### Step 6.3: Test Streak Tracking
- [ ] Log in on consecutive days
- [ ] **Expected**: Streak counter increments
- [ ] **Expected**: Earn streak achievements at milestones
- [ ] Skip a day
- [ ] **Expected**: Streak resets to 0 (or 1)

---

## 📋 Test Flow 7: Resume Optimization (Bonus)

### Step 7.1: Get Resume Suggestions
- [ ] From resume details page, click **"Optimize Resume"**
- [ ] Select target job description
- [ ] Click **"Get Suggestions"**

**What Should Happen**:
1. ✅ AI analyzes resume for ATS optimization
2. ✅ Provides specific suggestions:
   - Keywords to add
   - Formatting improvements
   - Content recommendations
   - Achievement quantification tips
3. ✅ Suggestions saved (`resume_improvements` table)
4. ✅ Side-by-side comparison shown

---

## 🐛 Common Issues & Fixes

### Issue 1: "403 Storage Error" on Resume Upload

**Cause**: Supabase Storage policies not configured

**Fix**:
1. Go to Supabase Dashboard → SQL Editor
2. Run the storage policies SQL script (at top of this document)
3. Verify with: `SELECT * FROM storage.buckets WHERE name = 'resumes';`

---

### Issue 2: "Failed to extract text from PDF"

**Possible Causes**:
1. PDF is image-based (scanned document with no text layer)
2. PDF is corrupted
3. unpdf library can't parse the specific PDF format

**Fix**:
1. Try a different PDF file
2. Use a text-based PDF (not scanned image)
3. Check server logs for specific error details

**Warnings You Can Ignore**:
- `Warning: TT: undefined function: 32` - Font table warning, doesn't affect functionality

---

### Issue 3: "OpenAI API Error"

**Cause**: Invalid or missing OpenAI API key

**Fix**:
1. Check `.env.local` has `OPENAI_API_KEY=sk-...`
2. Verify key is valid at https://platform.openai.com/api-keys
3. Check OpenAI account has credits
4. Restart dev server after adding key

---

### Issue 4: "Database Error" on Any Operation

**Cause**: Supabase tables or RLS policies missing

**Fix**:
1. Go to Supabase Dashboard → SQL Editor
2. Run `supabase/migrations/001_initial_schema.sql`
3. Verify tables exist in Table Editor
4. Check RLS is enabled on all tables

---

### Issue 5: Page 404 Errors

**Cause**: Missing page files

**Fix**: All pages should now exist:
- `/dashboard` ✅
- `/resumes` ✅
- `/resumes/upload` ✅
- `/jobs` ✅
- `/jobs/new` ✅
- `/plans` ✅
- `/interviews` ✅
- `/interviews/new` ✅
- `/profile` ✅

If still 404, restart dev server.

---

## ✅ Success Criteria

Your application is working correctly if:

- [x] User can sign up and log in
- [x] Resume uploads successfully (no 403 errors)
- [x] PDF text extraction works (no DOMMatrix errors)
- [x] AI parses resume and extracts skills
- [x] Job descriptions can be added
- [x] Match analysis generates percentage and skill gaps
- [x] 30-day prep plans generate with daily tasks
- [x] Mock interviews work with AI evaluation
- [x] XP and achievements track correctly
- [x] All pages load without 404 errors
- [x] Profile shows correct stats

---

## 🎯 Performance Expectations

- Resume upload: **2-5 seconds**
- PDF text extraction: **1-3 seconds**
- AI resume parsing: **5-10 seconds**
- Job match analysis: **10-15 seconds**
- Plan generation: **15-30 seconds**
- Mock interview question: **3-5 seconds**
- Interview answer evaluation: **5-8 seconds**

---

## 📸 Screenshots to Capture (Optional)

If everything works, take screenshots of:
1. Dashboard with quick action cards
2. Successful resume upload
3. Job match report with percentage
4. Generated 30-day plan
5. Mock interview session
6. Profile with achievements

---

## 🚀 Next Steps After Testing

Once all tests pass:

1. **Deploy to Vercel**:
   ```bash
   vercel --prod
   ```

2. **Configure Production Environment Variables** in Vercel Dashboard

3. **Test Production Deployment** with same checklist

4. **Monitor**:
   - Supabase Dashboard → Logs
   - Vercel Dashboard → Functions
   - OpenAI Dashboard → Usage

5. **Optional Enhancements**:
   - Add Google OAuth login
   - Email notifications for milestones
   - Export plans to PDF
   - Real-time collaboration
   - Mobile app with React Native

---

**Happy Testing! 🎉**

If you encounter any issues not covered here, check:
- Server console output
- Browser console (F12)
- Supabase logs
- OpenAI API status

