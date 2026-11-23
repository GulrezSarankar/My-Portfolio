-- ==============================================================================
-- Migration: Testimonials Manager & Project Case Studies
-- Date: 2026-11-22 (Updated for blog-images bucket reuse)
-- Target: Supabase (PostgreSQL)
-- Description:
--   1. Creates public.testimonials table with visibility, ordering, and RLS.
--   2. Extends public.projects table with backward-compatible case study fields.
--   3. Reuses existing 'blog-images' storage bucket for testimonial photos under 'testimonials/'.
--   4. Registers 'project-case-study-images' bucket for case study media.
--   5. Configures secure RLS policies for storage and database tables.
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. MODULE 1: TESTIMONIALS TABLE
-- ------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_name TEXT NOT NULL,
    designation TEXT,
    company TEXT,
    feedback TEXT NOT NULL,
    photo_url TEXT,
    photo_path TEXT,
    is_visible BOOLEAN NOT NULL DEFAULT true,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Indexes for performance and public visibility filtering
CREATE INDEX IF NOT EXISTS idx_testimonials_visible_order 
ON public.testimonials (is_visible, display_order ASC, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_testimonials_created_at 
ON public.testimonials (created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if re-running
DROP POLICY IF EXISTS "Allow public read on visible testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Allow admin full access on testimonials" ON public.testimonials;

-- Public Policy: Anyone can read visible testimonials only
CREATE POLICY "Allow public read on visible testimonials"
ON public.testimonials
FOR SELECT
USING (is_visible = true);

-- Admin Policy: Only authenticated users present in public.admin_users have full access
CREATE POLICY "Allow admin full access on testimonials"
ON public.testimonials
FOR ALL
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.admin_users
        WHERE admin_users.user_id = auth.uid()
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.admin_users
        WHERE admin_users.user_id = auth.uid()
    )
);

-- ------------------------------------------------------------------------------
-- 2. MODULE 2: EXTEND PROJECTS TABLE FOR CASE STUDIES
-- ------------------------------------------------------------------------------

ALTER TABLE public.projects 
ADD COLUMN IF NOT EXISTS overview TEXT,
ADD COLUMN IF NOT EXISTS problem_statement TEXT,
ADD COLUMN IF NOT EXISTS my_role TEXT,
ADD COLUMN IF NOT EXISTS architecture TEXT,
ADD COLUMN IF NOT EXISTS technical_challenges TEXT,
ADD COLUMN IF NOT EXISTS solutions TEXT,
ADD COLUMN IF NOT EXISTS key_features JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS results_outcomes TEXT,
ADD COLUMN IF NOT EXISTS api_docs_url TEXT,
ADD COLUMN IF NOT EXISTS architecture_diagram_url TEXT,
ADD COLUMN IF NOT EXISTS architecture_diagram_path TEXT,
ADD COLUMN IF NOT EXISTS screenshots JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS has_case_study BOOLEAN DEFAULT false;

-- Index for querying projects with case studies
CREATE INDEX IF NOT EXISTS idx_projects_has_case_study 
ON public.projects (has_case_study, status);

-- ------------------------------------------------------------------------------
-- 3. STORAGE POLICIES (Reusing 'blog-images' for Testimonials)
-- ------------------------------------------------------------------------------

-- Ensure 'blog-images' bucket allows public read and admin write
-- (Testimonial photos are stored under the 'testimonials/' folder path)
DROP POLICY IF EXISTS "Allow public read on blog images" ON storage.objects;
CREATE POLICY "Allow public read on blog images"
ON storage.objects FOR SELECT
USING (bucket_id = 'blog-images');

DROP POLICY IF EXISTS "Allow admin manage blog images" ON storage.objects;
CREATE POLICY "Allow admin manage blog images"
ON storage.objects FOR ALL
TO authenticated
USING (
    bucket_id = 'blog-images' AND
    EXISTS (
        SELECT 1 FROM public.admin_users
        WHERE admin_users.user_id = auth.uid()
    )
)
WITH CHECK (
    bucket_id = 'blog-images' AND
    EXISTS (
        SELECT 1 FROM public.admin_users
        WHERE admin_users.user_id = auth.uid()
    )
);

-- Register project case study images bucket if needed
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  (
    'project-case-study-images', 
    'project-case-study-images', 
    true, 
    5242880, 
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/avif']
  )
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 5242880,
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/avif'];

DROP POLICY IF EXISTS "Allow public read on project case study images" ON storage.objects;
CREATE POLICY "Allow public read on project case study images"
ON storage.objects FOR SELECT
USING (bucket_id = 'project-case-study-images');

DROP POLICY IF EXISTS "Allow admin manage project case study images" ON storage.objects;
CREATE POLICY "Allow admin manage project case study images"
ON storage.objects FOR ALL
TO authenticated
USING (
    bucket_id = 'project-case-study-images' AND
    EXISTS (
        SELECT 1 FROM public.admin_users
        WHERE admin_users.user_id = auth.uid()
    )
)
WITH CHECK (
    bucket_id = 'project-case-study-images' AND
    EXISTS (
        SELECT 1 FROM public.admin_users
        WHERE admin_users.user_id = auth.uid()
    )
);
