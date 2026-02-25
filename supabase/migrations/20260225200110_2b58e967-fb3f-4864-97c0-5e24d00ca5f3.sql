ALTER TABLE public.quiz_submissions ADD COLUMN result_id TEXT UNIQUE DEFAULT encode(gen_random_bytes(6), 'hex');

-- Update existing rows
UPDATE public.quiz_submissions SET result_id = encode(gen_random_bytes(6), 'hex') WHERE result_id IS NULL;

-- Make it not null after backfill
ALTER TABLE public.quiz_submissions ALTER COLUMN result_id SET NOT NULL;

-- Add RLS policy to allow public reads by result_id
CREATE POLICY "Public read by result_id" ON public.quiz_submissions FOR SELECT USING (true);