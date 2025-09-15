import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rccxjlmaygshklepjdiw.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJjY3hqbG1heWdzaGtsZXBqZGl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIxOTY5OTIsImV4cCI6MjA2Nzc3Mjk5Mn0.8jp4U6U8IssKmMSFzGk17MdDOhXm0EW9zo-xWViYQK8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);