import { createClient, SupabaseClient } from "@supabase/supabase-js";

const nextPublicSupabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const nextPublicSupabaseAnonKey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase: SupabaseClient = createClient(
  nextPublicSupabaseUrl,
  nextPublicSupabaseAnonKey
);

export default supabase;