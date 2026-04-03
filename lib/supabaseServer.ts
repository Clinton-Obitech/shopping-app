import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl: string = process.env.SUPABASE_URL!;
const supabaseServiceRoleKey: string = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export const supabase: SupabaseClient = createClient(
  supabaseUrl,
  supabaseServiceRoleKey
);

export default supabase;