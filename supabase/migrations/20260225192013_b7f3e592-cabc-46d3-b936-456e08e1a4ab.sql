-- Create quiz_submissions table (public, no auth needed)
CREATE TABLE public.quiz_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  email TEXT NOT NULL,
  raw_scores JSONB NOT NULL,
  top_two_archetypes TEXT[] NOT NULL,
  answers JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.quiz_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (quiz takers aren't authenticated)
CREATE POLICY "Anyone can submit quiz results"
  ON public.quiz_submissions
  FOR INSERT
  WITH CHECK (true);

-- Only allow reading via backend/admin (no public reads)
CREATE POLICY "No public reads"
  ON public.quiz_submissions
  FOR SELECT
  USING (false);