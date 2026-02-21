import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
console.log("🔗 Supabase Config Check:", {
  url: import.meta.env.VITE_SUPABASE_URL ? "Defined" : "MISSING",
  key: import.meta.env.VITE_SUPABASE_ANON_KEY ? "Defined" : "MISSING"
});
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase credentials missing. Check your .env file.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
