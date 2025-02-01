import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nvkscblwphptknohqqtc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im52a3NjYmx3cGhwdGtub2hxcXRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgzMjk4NDgsImV4cCI6MjA1MzkwNTg0OH0.0F-RuMDVBmfSO3ItiySXJ_IL2_9pADP7Ge-CN2b08mQ';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;