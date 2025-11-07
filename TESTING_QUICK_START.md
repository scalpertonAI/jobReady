# 🚀 Quick Start Testing Guide

## The Correct URL Structure

The optimization feature is at:
```
http://localhost:3000/resumes/{RESUME_ID}/optimize
```

NOT at `/optimize` directly.

---

## Step-by-Step Testing Path

### Step 1: Run Storage SQL (CRITICAL!)

Go to Supabase Dashboard → SQL Editor → Run this:

```sql
INSERT INTO storage.buckets (id, name, public)
VALUES ('resumes', 'resumes', false)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Users can upload to own folder"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'resumes' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "Users can read own resumes"
ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'resumes' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "Users can update own resumes"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'resumes' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "Users can delete own resumes"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'resumes' AND (storage.foldername(name))[1] = auth.uid()::text);
```

### Step 2: Start at Dashboard

1. Go to: http://localhost:3000
2. Sign up or log in

### Step 3: Upload Resume

1. Click **"Upload Resume"** card on dashboard
2. Or go to: http://localhost:3000/resumes/upload
3. Select a PDF file
4. Click "Upload & Parse Resume"
5. Wait for success toast 🎉

### Step 4: Access Optimization

**Option A - From Resumes List** (Recommended):
1. Go to: http://localhost:3000/resumes
2. Find your uploaded resume
3. Click **"✨ Optimize"** button
4. You'll be at: `/resumes/{id}/optimize`

**Option B - Manual URL**:
1. Go to: http://localhost:3000/resumes
2. Open browser DevTools (F12)
3. Look at the resume card HTML to find the ID
4. Navigate to: `http://localhost:3000/resumes/{that-id}/optimize`

### Step 5: Generate Optimization

1. Leave dropdown as "General optimization"
2. Click **"✨ Generate Suggestions"**
3. Wait 10-20 seconds
4. See optimization results!

---

## All Available Routes

### Auth
- `/` - Landing page
- `/login` - Login
- `/signup` - Sign up

### Dashboard
- `/dashboard` - Main dashboard

### Resumes
- `/resumes` - List of resumes ✅
- `/resumes/upload` - Upload new resume ✅
- `/resumes/{id}/optimize` - Optimize specific resume ✅ **NEW!**

### Jobs
- `/jobs` - List of job descriptions ✅
- `/jobs/new` - Add new job ✅
- `/jobs/{id}/analyze` - Analyze job match ✅

### Plans
- `/plans` - List of prep plans ✅
- `/plans/generate` - Generate new plan ✅
- `/plans/{id}` - View specific plan ✅

### Interviews
- `/interviews` - List of interviews ✅
- `/interviews/new` - Start new interview ✅
- `/interviews/{id}` - View interview session ✅

### Profile
- `/profile` - User profile ✅

---

## Quick Debug: Check if Resume Exists

Open browser console (F12) and run:

```javascript
// Fetch your resumes
fetch('/api/resumes')
  .then(r => r.json())
  .then(data => {
    console.log('Your resumes:', data);
    if (data.data && data.data.length > 0) {
      const firstResume = data.data[0];
      console.log('First resume ID:', firstResume.id);
      console.log('Optimization URL:', `/resumes/${firstResume.id}/optimize`);
    }
  });
```

This will show you the correct URL to use!

---

## Common Mistakes

❌ **Wrong**: `http://localhost:3000/optimize`
✅ **Correct**: `http://localhost:3000/resumes/{resume-id}/optimize`

❌ **Wrong**: Going directly to URL without resume
✅ **Correct**: Upload resume first, then navigate from list

❌ **Wrong**: Using random UUID
✅ **Correct**: Use actual resume ID from database

---

## Still Getting 404?

If you're still getting 404 after following the correct path:

1. **Check if resume exists**:
   - Go to `/resumes`
   - Do you see any resumes?
   - If not, upload one first!

2. **Check the URL**:
   - Is it `/resumes/{id}/optimize`?
   - Not `/resumes/optimize`?
   - Not just `/optimize`?

3. **Check server output**:
   ```bash
   # Look for compilation errors
   npm run dev
   ```

4. **Try restarting server**:
   ```bash
   # Ctrl+C to stop
   npm run dev
   ```

---

## Testing Complete Flow (5 Minutes)

1. **Storage SQL** → Supabase (1 min)
2. **Sign up** → http://localhost:3000 (30 sec)
3. **Upload resume** → Dashboard → Upload Resume (2 min)
4. **View resumes** → http://localhost:3000/resumes (10 sec)
5. **Click Optimize** → "✨ Optimize" button (10 sec)
6. **Generate** → Click generate (1 min)
7. **Done!** → See your optimization suggestions ✅

---

Need help? The issue is likely:
1. You haven't uploaded a resume yet
2. You're trying to access `/optimize` instead of `/resumes/{id}/optimize`
3. Storage policies aren't configured (run SQL first!)

Happy Testing! 🚀
