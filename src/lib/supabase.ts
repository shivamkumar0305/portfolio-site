import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";

// If we are on the server, we might also want to check for the Service Role key
// but for standard client inserts, the anon key is perfect when RLS is configured.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
