import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://vggiikngauwyrgogycgn.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_mQY_2j27YJ0ewUZQUk0LNQ_K2PD3_hr';

export const supabase = createBrowserClient(supabaseUrl, supabaseKey);
