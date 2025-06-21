import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qbvvzfgkrydazkhbqmfj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFidnZ6ZmdrcnlkYXpraGJxbWZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ3MzE5NDUsImV4cCI6MjA1MDMwNzk0NX0.lRIqOyOOX8xHyYkVR2hZrM5L2fKHMZJH-8KF3VBvNhw';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});