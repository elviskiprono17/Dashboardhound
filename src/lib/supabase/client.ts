import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://fdexlempneuywaunqaxe.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZkZXhsZW1wbmV1eXdhdW5xYXhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkxMzAzMjAsImV4cCI6MjEwNDcwNjMyMH0.qH-wvn_uf7r0108nwy_eFht1RqiyEodg-lztU1gf9yo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
