-- Add user_id column to job_applications (nullable for existing rows)
ALTER TABLE job_applications 
ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Create index for faster user-specific queries
CREATE INDEX IF NOT EXISTS idx_job_applications_user_id ON job_applications(user_id);

-- Drop the old permissive policy
DROP POLICY IF EXISTS "Allow all operations on job_applications" ON job_applications;

-- RLS: Users can only see their own applications
CREATE POLICY "Users can view own applications"
  ON job_applications
  FOR SELECT
  USING (auth.uid() = user_id);

-- RLS: Users can only insert their own applications
CREATE POLICY "Users can insert own applications"
  ON job_applications
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- RLS: Users can only update their own applications
CREATE POLICY "Users can update own applications"
  ON job_applications
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- RLS: Users can only delete their own applications
CREATE POLICY "Users can delete own applications"
  ON job_applications
  FOR DELETE
  USING (auth.uid() = user_id);
