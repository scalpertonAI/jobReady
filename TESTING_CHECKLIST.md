# ✅ Complete Testing Checklist - JobReady.AI

Use this checklist to systematically test and verify everything works.

---

## 📋 Pre-Testing Setup

### ✅ Environment Setup
- [ ] Node.js 18+ installed
- [ ] Repository cloned
- [ ] `npm install` completed successfully
- [ ] `.env.local` created with all 5 variables
- [ ] Supabase project created
- [ ] OpenAI API key obtained

### ✅ Database Setup
- [ ] SQL migration `001_initial_schema.sql` executed
- [ ] All 11 tables created (check in Supabase Table Editor)
- [ ] RLS policies enabled on all tables
- [ ] Test query: `SELECT * FROM profiles LIMIT 1` works

### ✅ Storage Setup (CRITICAL!)
- [ ] Storage bucket `resumes` created
- [ ] Bucket is PRIVATE (not public)
- [ ] Storage policies SQL executed (`002_storage_policies.sql`)
- [ ] 4 policies visible in storage.policies table
- [ ] Test query shows policies: `SELECT * FROM storage.policies WHERE bucket_id = 'resumes'`

### ✅ Server Running
- [ ] `npm run dev` starts without errors
- [ ] Server shows "Ready in X.Xs"
- [ ] No build errors in terminal
- [ ] Port 3000 accessible

---

## 🧪 Feature Testing

### 1️⃣ Landing Page
- [ ] Navigate to http://localhost:3000
- [ ] Page loads without errors
- [ ] TailwindCSS styles applied correctly
- [ ] Hero section visible
- [ ] Features grid displays 6 cards
- [ ] "Get Started" button works
- [ ] Navigation links work

**Expected Result:** Beautiful landing page with gradient background

---

### 2️⃣ User Authentication

#### Sign Up
- [ ] Click "Sign Up" or "Get Started"
- [ ] Form displays correctly
- [ ] Fill in:
  - Full Name: "Test User"
  - Email: "test@example.com"
  - Password: "password123"
  - Confirm Password: "password123"
- [ ] Check terms checkbox
- [ ] Click "Create Account"
- [ ] Redirects to /dashboard
- [ ] No errors in console

**Expected Result:** Account created, redirected to dashboard

#### Verify Profile Created
- [ ] Go to Supabase → Table Editor → profiles
- [ ] Your profile row exists
- [ ] `total_xp` = 0, `level` = 1

#### Logout & Login
- [ ] Logout (if button available) or open incognito window
- [ ] Go to /login
- [ ] Enter email: "test@example.com"
- [ ] Enter password: "password123"
- [ ] Click "Login"
- [ ] Redirects to /dashboard

**Expected Result:** Successfully logged in

---

### 3️⃣ Dashboard
- [ ] Dashboard loads at /dashboard
- [ ] Welcome message shows your name
- [ ] XP and level display (Level 1 • 0 XP)
- [ ] 6 quick action cards visible:
  - Upload Resume
  - Add Job Description
  - My Prep Plans
  - Mock Interview
  - Optimize Resume
  - My Profile
- [ ] Getting Started guide visible
- [ ] Header shows "JobReady.AI"
- [ ] Sign Out button visible

**Expected Result:** Clean dashboard with all features accessible

---

### 4️⃣ Resume Upload (CRITICAL TEST!)

#### Navigate to Upload
- [ ] Click "Upload Resume" card
- [ ] Redirects to /resumes/upload
- [ ] Progress indicator shows Step 1 active
- [ ] Drop zone visible with upload icon

#### Upload PDF
- [ ] Drag & drop a PDF file OR click to browse
- [ ] File name displays after selection
- [ ] File size shows (e.g., "0.25 MB")
- [ ] "Upload & Parse Resume" button appears
- [ ] Click the button
- [ ] Progress bar shows 0% → 100%
- [ ] "Uploading and parsing..." message visible
- [ ] Wait 10-30 seconds

**Expected Result:** ✅ Success message appears

#### Verify Upload Success
- [ ] Success box shows: "Resume Uploaded Successfully!"
- [ ] "Continue to Add Job" button visible
- [ ] "Extracted Information" section shows:
  - Technical skills (tags)
  - Experience count
- [ ] No errors in browser console
- [ ] No errors in server terminal

#### Verify in Database
- [ ] Go to Supabase → Table Editor → resumes
- [ ] Your resume row exists
- [ ] `file_url` has Supabase URL
- [ ] `parsed_data` has JSON content
- [ ] `is_primary` = true

#### Verify in Storage
- [ ] Go to Supabase → Storage → resumes bucket
- [ ] Folder with your user ID exists
- [ ] PDF file visible inside folder
- [ ] File size matches uploaded file

**Expected Result:** Resume stored and parsed successfully

**If Failed:** See QUICK_FIX.md and STORAGE_SETUP.md

---

### 5️⃣ Job Description Submission

#### Navigate to Job Form
- [ ] Click "Continue to Add Job" OR go to /jobs/new
- [ ] Progress indicator shows Step 2 active
- [ ] Form displays with 4 fields:
  - Job Title (optional)
  - Company Name (optional)
  - Job URL (optional)
  - Job Description (required)

#### Submit Job Description
- [ ] Paste this test JD:

```
Senior Software Engineer

Required Skills:
- 5+ years with Python
- React and Node.js
- PostgreSQL
- Docker containers
- AWS cloud platform

Responsibilities:
- Build scalable APIs
- Lead technical decisions
- Mentor team members
```

- [ ] Click "Analyze Job Match →"
- [ ] "Analyzing..." message shows
- [ ] Wait 10-30 seconds

**Expected Result:** Redirects to analysis page

#### Verify in Database
- [ ] Go to Supabase → job_descriptions table
- [ ] Your JD row exists
- [ ] `parsed_data` has structured JSON

**Expected Result:** Job saved successfully

---

### 6️⃣ Job Match Analysis

#### Analysis Page Loads
- [ ] At /jobs/[id]/analyze
- [ ] Resume selection shows your uploaded resume
- [ ] Resume is pre-selected (primary resume)
- [ ] "Start Analysis" button visible

#### Run Analysis
- [ ] Click "Start Analysis"
- [ ] "Analyzing..." shows with spinner
- [ ] Wait 10-30 seconds (AI processing)

**Expected Result:** Match report displays

#### Verify Match Report
- [ ] Large circular percentage displays (e.g., "72%")
- [ ] "Job Match Report" heading visible
- [ ] **Skills Matched** section shows:
  - Green checkmark ✅
  - List of matched skills as tags
- [ ] **Skills Missing** section shows:
  - Red warning ⚠️
  - List of missing skills with priority tags
- [ ] **Your Strengths** section lists positives
- [ ] **Recommendations** section shows action items with priority
- [ ] "Generate 30-Day Prep Plan →" button visible

#### Verify in Database
- [ ] Go to Supabase → job_matches table
- [ ] Your match row exists
- [ ] `match_percentage` is a number (0-100)
- [ ] `analysis_data` has full JSON

#### Verify XP Awarded
- [ ] Go to profiles table
- [ ] `total_xp` increased (should be 100)
- [ ] Check user_achievements table
- [ ] Achievement "first_analysis" exists

**Expected Result:** Detailed match report with actionable insights

---

### 7️⃣ Preparation Plan Generation

#### Start Plan Generation
- [ ] Click "Generate 30-Day Prep Plan →"
- [ ] Redirects to /plans/generate?matchId=...
- [ ] Loading animation shows (robot emoji bouncing)
- [ ] Progress bar 0% → 100%
- [ ] Progress steps show:
  - Analyzing skill gaps ✓
  - Creating daily tasks ✓
  - Finding resources ✓
  - Generating questions ✓
  - Finalizing roadmap ✓
- [ ] Wait 20-60 seconds (complex AI generation)

**Expected Result:** Redirects to plan view page

#### Verify Plan Display
- [ ] At /plans/[id]
- [ ] Header shows:
  - Plan title: "30-Day Preparation Plan"
  - Progress circle (0%)
  - Duration: "30 Days"
- [ ] Gradient header with focus areas tags
- [ ] Week selector buttons (Week 1, 2, 3, 4)
- [ ] Week 1 is selected by default
- [ ] Week 1 Goals section visible
- [ ] Daily tasks for Week 1 visible (Day 1-7)

#### Verify Daily Tasks
Each task should show:
- [ ] Day number badge
- [ ] Task title
- [ ] Task description
- [ ] Task type badge (learning/practice/project)
- [ ] XP reward
- [ ] Subtasks with checkboxes
- [ ] Resource links (if available)
- [ ] Duration estimates

#### Switch Weeks
- [ ] Click "Week 2" button
- [ ] Tasks update to days 8-14
- [ ] Click "Week 3" → days 15-21
- [ ] Click "Week 4" → days 22-30

#### Verify Resources Section
- [ ] "Recommended Resources" section visible
- [ ] Shows 6+ resource cards
- [ ] Each has: title, skill, type, difficulty, free/paid tag
- [ ] Links are clickable

#### Verify Projects Section
- [ ] "Project Suggestions" section visible
- [ ] Shows 2-3 project ideas
- [ ] Each has: title, description, skills, priority, hours

#### Verify in Database
- [ ] Go to Supabase → preparation_plans table
- [ ] Your plan exists
- [ ] `plan_data` has full JSON structure
- [ ] Go to plan_tasks table
- [ ] ~30 task rows exist for your plan

#### Verify XP & Achievement
- [ ] profiles table: `total_xp` increased (+150, now 250)
- [ ] user_achievements: "first_plan" achievement exists

**Expected Result:** Complete 30-day plan with daily tasks, resources, and projects

---

### 8️⃣ Mock Interview (API Test)

#### Test Interview API
Since we don't have the full UI yet, test the API:

```bash
# Get your job description ID from Supabase
# Then run this curl command:

curl -X POST http://localhost:3000/api/interviews/start \
  -H "Content-Type: application/json" \
  -d '{
    "jobDescriptionId": "YOUR_JD_ID_HERE",
    "difficulty": "medium",
    "questionCount": 3
  }'
```

**Expected Result:** JSON response with session_id and questions array

---

### 9️⃣ Navigation & UX

#### Test Navigation
- [ ] Click "JobReady.AI" logo → goes to dashboard
- [ ] Back buttons work on all pages
- [ ] Progress indicators update correctly
- [ ] All links are clickable

#### Test Responsiveness
- [ ] Resize browser window
- [ ] Mobile view works (use Dev Tools device emulation)
- [ ] Cards stack properly on small screens
- [ ] No horizontal scroll

#### Test Error Handling
- [ ] Try uploading non-PDF file → shows error
- [ ] Try uploading 11MB file → shows error
- [ ] Submit empty JD form → shows validation error
- [ ] Network errors show user-friendly messages

**Expected Result:** Smooth, error-free experience

---

## 🎯 Performance Checks

### Server Performance
- [ ] Resume upload completes in < 30 seconds
- [ ] JD parsing completes in < 10 seconds
- [ ] Job analysis completes in < 30 seconds
- [ ] Plan generation completes in < 60 seconds
- [ ] Page loads are fast (< 2 seconds)

### Cost Tracking
After full flow:
- [ ] Check OpenAI usage at platform.openai.com
- [ ] Cost should be < $0.50 for complete test
- [ ] Supabase usage well within free tier

---

## 🐛 Known Issues Checklist

### If Resume Upload Fails (403 Error):
- [ ] Follow QUICK_FIX.md
- [ ] Run storage policies SQL
- [ ] Verify bucket exists and is private
- [ ] Check 4 policies exist
- [ ] Restart dev server

### If AI Features Don't Work:
- [ ] Verify OPENAI_API_KEY in .env.local
- [ ] Check OpenAI account has credits
- [ ] Look at server terminal for specific errors
- [ ] Try shorter inputs to test

### If Database Errors:
- [ ] Verify all tables exist (11 total)
- [ ] Check RLS policies are enabled
- [ ] Try running migrations again
- [ ] Check Supabase logs

---

## ✅ Success Criteria

### Complete Flow Success
You've successfully tested everything if:

- [x] Signed up and logged in
- [x] Uploaded PDF resume
- [x] Added job description
- [x] Got match analysis with percentage
- [x] Generated 30-day prep plan
- [x] Viewed daily tasks and resources
- [x] No errors in console or terminal
- [x] Data visible in Supabase tables
- [x] XP increased, achievements unlocked

**If all boxes checked:** 🎉 **Application is fully working!**

---

## 📊 Final Verification

Run these SQL queries to verify everything:

```sql
-- 1. Check your data exists
SELECT
  (SELECT count(*) FROM profiles) as profiles,
  (SELECT count(*) FROM resumes) as resumes,
  (SELECT count(*) FROM job_descriptions) as jobs,
  (SELECT count(*) FROM job_matches) as matches,
  (SELECT count(*) FROM preparation_plans) as plans,
  (SELECT count(*) FROM plan_tasks) as tasks,
  (SELECT count(*) FROM user_achievements) as achievements;

-- 2. Check storage policies
SELECT count(*) FROM storage.policies WHERE bucket_id = 'resumes';
-- Should return 4

-- 3. Check your XP progress
SELECT full_name, total_xp, level, streak_days
FROM profiles
WHERE email = 'YOUR_EMAIL_HERE';
```

---

## 🆘 Still Having Issues?

1. **Check all 3 guides:**
   - SETUP_GUIDE.md - Initial setup
   - QUICK_FIX.md - Storage issues
   - STORAGE_SETUP.md - Detailed storage config

2. **Check logs:**
   - Browser console (F12)
   - Server terminal
   - Supabase Dashboard → Logs

3. **Verify credentials:**
   - .env.local has all 5 variables
   - Keys are correct (no extra spaces)
   - Supabase project is active
   - OpenAI account has credits

4. **Nuclear option:**
   - Delete node_modules: `rm -rf node_modules`
   - Reinstall: `npm install`
   - Restart server: `npm run dev`

---

**Once everything passes, your SaaS is production-ready!** 🚀
