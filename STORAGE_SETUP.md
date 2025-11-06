# 🗄️ Supabase Storage Setup - Complete Guide

This guide fixes the **"new row violates row-level security policy"** error when uploading resumes.

---

## 🎯 The Problem

Supabase Storage has **Row Level Security (RLS)** enabled by default. Without proper policies, users can't upload files even when authenticated.

**Error you're seeing:**
```
Error [StorageApiError]: new row violates row-level security policy
status: 403
```

---

## ✅ Step-by-Step Fix

### **Step 1: Create the Storage Bucket**

1. Go to your **Supabase Dashboard**
2. Click **Storage** in the left sidebar
3. Click **"New Bucket"**
4. Enter these settings:
   - **Name:** `resumes` (EXACTLY this name)
   - **Public bucket:** ❌ **NO** (must be PRIVATE)
   - **File size limit:** 10 MB
   - **Allowed MIME types:** Leave empty or add `application/pdf`
5. Click **"Create bucket"**

---

### **Step 2: Add Storage Policies**

#### **Option A: Using SQL Editor (Recommended)**

1. In Supabase Dashboard, go to **SQL Editor**
2. Click **"New Query"**
3. Copy and paste this **ENTIRE** script:

```sql
-- ============================================
-- STORAGE POLICIES FOR RESUMES BUCKET
-- Delete existing policies first (if any)
-- ============================================

-- Remove old policies if they exist
DROP POLICY IF EXISTS "Users can upload to own folder" ON storage.objects;
DROP POLICY IF EXISTS "Users can read own resumes" ON storage.objects;
DROP POLICY IF EXISTS "Users can update own resumes" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete own resumes" ON storage.objects;

-- Create new policies
-- Policy 1: Upload
CREATE POLICY "Users can upload to own folder"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'resumes'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Policy 2: Read
CREATE POLICY "Users can read own resumes"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'resumes'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Policy 3: Update
CREATE POLICY "Users can update own resumes"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'resumes'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Policy 4: Delete
CREATE POLICY "Users can delete own resumes"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'resumes'
  AND (storage.foldername(name))[1] = auth.uid()::text
);
```

4. Click **"Run"** or press `Ctrl+Enter`
5. You should see: ✅ **"Success. No rows returned"**

---

#### **Option B: Using the UI (Alternative)**

1. Go to **Storage** → Click on **`resumes`** bucket
2. Go to **Policies** tab
3. Click **"New Policy"**

**For Upload (INSERT):**
- Name: `Users can upload to own folder`
- Policy Command: `INSERT`
- Target Roles: `authenticated`
- USING expression: Leave empty
- WITH CHECK expression:
```sql
(bucket_id = 'resumes'::text) AND ((storage.foldername(name))[1] = (auth.uid())::text)
```

**Repeat for SELECT, UPDATE, DELETE** with:
- SELECT: Name = `Users can read own resumes`, use USING expression (same as WITH CHECK)
- UPDATE: Name = `Users can update own resumes`, use USING expression
- DELETE: Name = `Users can delete own resumes`, use USING expression

---

### **Step 3: Verify Setup**

Run this query in SQL Editor to check your policies:

```sql
SELECT
  policyname,
  cmd,
  roles
FROM pg_policies
WHERE schemaname = 'storage'
  AND tablename = 'objects'
  AND policyname LIKE '%resume%';
```

You should see **4 policies** (INSERT, SELECT, UPDATE, DELETE)

---

### **Step 4: Test Upload**

1. Restart your Next.js server:
   - Press `Ctrl+C` to stop
   - Run `npm run dev` again

2. Go to http://localhost:3000
3. Login to your account
4. Try uploading a PDF resume
5. It should work now! ✅

---

## 🔍 Troubleshooting

### **Still Getting 403 Error?**

#### **Check 1: Bucket Name**
```sql
-- Run this to see your buckets
SELECT id, name, public FROM storage.buckets;
```
- Make sure `resumes` bucket exists
- Make sure it's NOT public (public = false)

#### **Check 2: User is Authenticated**
```sql
-- Check if auth is working
SELECT auth.uid();
```
- Should return your user ID (UUID)
- If returns NULL, you're not logged in

#### **Check 3: Policies Exist**
```sql
-- Check policies
SELECT * FROM storage.policies WHERE bucket_id = 'resumes';
```
- Should show 4 policies
- All should have `bucket_id = 'resumes'`

#### **Check 4: File Path Format**
The code uploads files as: `{user_id}/{timestamp}_{filename}.pdf`

Example: `123e4567-e89b-12d3-a456-426614174000/1699999999_resume.pdf`

Make sure the policy can parse this format.

---

## 🚨 Nuclear Option (If Nothing Works)

If policies are messed up, delete and recreate:

```sql
-- DELETE ALL POLICIES FOR RESUMES BUCKET
DROP POLICY IF EXISTS "Users can upload to own folder" ON storage.objects;
DROP POLICY IF EXISTS "Users can read own resumes" ON storage.objects;
DROP POLICY IF EXISTS "Users can update own resumes" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete own resumes" ON storage.objects;

-- DELETE THE BUCKET (WARNING: Deletes all files!)
DELETE FROM storage.buckets WHERE id = 'resumes';

-- CREATE NEW BUCKET
INSERT INTO storage.buckets (id, name, public)
VALUES ('resumes', 'resumes', false);

-- ADD POLICIES AGAIN (run the policy script from Step 2)
```

Then re-run the policies from **Step 2, Option A**.

---

## 📝 Understanding the Policy

```sql
bucket_id = 'resumes'                           -- Only for resumes bucket
AND
(storage.foldername(name))[1] = auth.uid()::text  -- User folder matches user ID
```

This means:
- ✅ User `abc-123` can upload to `resumes/abc-123/file.pdf`
- ❌ User `abc-123` CANNOT upload to `resumes/xyz-789/file.pdf`
- ✅ Each user has their own folder
- ✅ Privacy is maintained

---

## 🎯 Quick Test Script

Run this in SQL Editor to test if everything is working:

```sql
-- 1. Check bucket exists
SELECT * FROM storage.buckets WHERE name = 'resumes';

-- 2. Check policies exist
SELECT policyname FROM pg_policies
WHERE schemaname = 'storage' AND tablename = 'objects'
AND policyname LIKE '%resume%';

-- 3. Check your user ID
SELECT auth.uid();

-- 4. Check if you can theoretically upload
-- (This doesn't actually upload, just checks permissions)
SELECT
  CASE
    WHEN auth.uid() IS NOT NULL THEN 'You are logged in ✅'
    ELSE 'You are NOT logged in ❌'
  END as login_status;
```

---

## ✅ Success Checklist

- [ ] Storage bucket `resumes` created
- [ ] Bucket is PRIVATE (not public)
- [ ] 4 policies created (INSERT, SELECT, UPDATE, DELETE)
- [ ] Policies reference `resumes` bucket
- [ ] Policies use `auth.uid()` for folder matching
- [ ] SQL verification queries return expected results
- [ ] Dev server restarted
- [ ] Logged in to application
- [ ] Test PDF upload succeeds

---

## 🆘 Still Not Working?

1. **Check browser console** (F12) for detailed errors
2. **Check server logs** in your terminal
3. **Verify `.env.local`** has correct Supabase keys
4. **Try with a new account** (sometimes cached auth causes issues)
5. **Check Supabase Dashboard → Logs** for storage errors

---

## 💡 Alternative: Disable RLS (NOT RECOMMENDED)

**⚠️ ONLY FOR TESTING - DO NOT USE IN PRODUCTION**

If you just want to test quickly:

```sql
-- Disable RLS on storage.objects (INSECURE!)
ALTER TABLE storage.objects DISABLE ROW LEVEL SECURITY;
```

This allows ANYONE to upload ANYTHING. Only use for local testing, then re-enable:

```sql
-- Re-enable RLS
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;
```

---

## 📚 Additional Resources

- [Supabase Storage Docs](https://supabase.com/docs/guides/storage)
- [RLS Policies Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Storage Policies](https://supabase.com/docs/guides/storage/security/access-control)

---

**Once storage is working, your app will be fully functional!** 🎉
