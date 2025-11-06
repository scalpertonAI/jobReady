# ⚡ QUICK FIX - Resume Upload Error (403)

**Error:** "new row violates row-level security policy"

## 🚀 5-Minute Fix

### **Step 1: Go to Supabase Dashboard**

1. Open [app.supabase.com](https://app.supabase.com)
2. Select your project
3. Go to **SQL Editor** (left sidebar)

### **Step 2: Run This SQL Script**

Click **"New Query"** and paste this:

```sql
-- ============================================
-- QUICK FIX FOR STORAGE UPLOAD ERROR
-- ============================================

-- 1. Make sure bucket exists
INSERT INTO storage.buckets (id, name, public)
VALUES ('resumes', 'resumes', false)
ON CONFLICT (id) DO NOTHING;

-- 2. Delete old broken policies
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

### **Step 3: Click "Run"**

You should see: ✅ **Success**

### **Step 4: Restart Your App**

In your terminal:
```bash
# Press Ctrl+C to stop the server
# Then restart:
npm run dev
```

### **Step 5: Test Upload**

1. Go to http://localhost:3000
2. Login
3. Upload a PDF resume
4. It should work! ✅

---

## 🎯 Still Not Working?

Run this in SQL Editor to diagnose:

```sql
-- Check 1: Bucket exists?
SELECT * FROM storage.buckets WHERE name = 'resumes';
-- Should show 1 row with public = false

-- Check 2: Policies exist?
SELECT count(*) FROM storage.policies WHERE bucket_id = 'resumes';
-- Should show 4

-- Check 3: You're logged in?
SELECT auth.uid();
-- Should show your user ID (UUID), not null
```

---

## 🆘 Nuclear Option (Delete Everything)

If nothing works, start fresh:

```sql
-- Delete bucket and all files
DELETE FROM storage.objects WHERE bucket_id = 'resumes';
DELETE FROM storage.buckets WHERE id = 'resumes';

-- Now run the main script above from Step 2
```

---

**Need more help?** See **STORAGE_SETUP.md** for detailed troubleshooting.
