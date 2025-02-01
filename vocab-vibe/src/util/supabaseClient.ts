import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hgspdrbdeyxqesykoseu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhnc3BkcmJkZXl4cWVzeWtvc2V1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgzNzY5MzYsImV4cCI6MjA1Mzk1MjkzNn0.VUEspcYgnkapnxVdlIYdaSOULM1uloQ78FaF_tQwTuo';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;