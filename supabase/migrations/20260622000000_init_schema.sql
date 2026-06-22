-- Enable UUID generation extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

---------------------------------------------------------
-- CONTACT MESSAGES TABLE
---------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'unread', -- 'unread', 'read', 'archived'
    ip_address VARCHAR(45),              -- To prevent spam abuse
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index for descending chronological message sorting
CREATE INDEX IF NOT EXISTS idx_contact_created_at ON public.contact_messages(created_at DESC);

-- Enable RLS for contact messages
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts only (public submissions)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'contact_messages' AND policyname = 'Allow anonymous message inserts'
    ) THEN
        CREATE POLICY "Allow anonymous message inserts" 
            ON public.contact_messages 
            FOR INSERT 
            WITH CHECK (true);
    END IF;
END
$$;

-- Deny all public select/update/delete modifications
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'contact_messages' AND policyname = 'Deny public select on messages'
    ) THEN
        CREATE POLICY "Deny public select on messages" 
            ON public.contact_messages 
            FOR SELECT 
            USING (false);
    END IF;
END
$$;
