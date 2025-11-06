-- ============================================
-- Supabase Storage Setup for Resume Uploads
-- Run this AFTER creating the storage bucket
-- ============================================

-- First, make sure the 'resumes' bucket exists in Supabase Storage UI
-- Go to Storage → Create bucket named 'resumes' (make it PRIVATE)

-- ============================================
-- STORAGE POLICIES FOR RESUMES BUCKET
-- ============================================

-- Policy 1: Allow authenticated users to upload resumes to their own folder
CREATE POLICY "Users can upload to own folder"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'resumes'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Policy 2: Allow authenticated users to read their own resumes
CREATE POLICY "Users can read own resumes"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'resumes'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Policy 3: Allow authenticated users to update their own resumes
CREATE POLICY "Users can update own resumes"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'resumes'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Policy 4: Allow authenticated users to delete their own resumes
CREATE POLICY "Users can delete own resumes"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'resumes'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- ============================================
-- VERIFY POLICIES
-- ============================================
-- Run this to check if policies are created:
-- SELECT * FROM storage.policies WHERE bucket_id = 'resumes';

-- ============================================
-- TROUBLESHOOTING
-- ============================================
-- If you still get RLS errors:
-- 1. Make sure the bucket is named exactly 'resumes'
-- 2. Make sure the bucket is PRIVATE (not public)
-- 3. Make sure you're logged in (authenticated)
-- 4. Try deleting old policies and re-running this script
-- 5. Check that auth.uid() returns a value when you're logged in
