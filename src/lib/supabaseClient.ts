import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://eqrqufobzwblesdrhtgi.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_938DcrTJsIvVxLWRvkcCxw_XbX0b0dg';

export const supabase = createClient(supabaseUrl, supabaseKey);
