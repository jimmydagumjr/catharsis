import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  import.meta.env.VITE_CATHARSIS_SUPABASE_URL,
  import.meta.env.VITE_CATHARSIS_SUPABASE_ANON_KEY,
);
