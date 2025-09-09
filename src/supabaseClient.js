import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gehwsxrjtgjecjikhhut.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlaHdzeHJqdGdqZWNqaWtoaHV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTczODA5MzEsImV4cCI6MjA3Mjk1NjkzMX0.0sm4L2l3r8vsrg8S8Xy85ugwrTS5ilBIj_pZoLLeGVY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
