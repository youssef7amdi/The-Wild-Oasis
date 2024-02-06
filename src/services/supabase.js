import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://tdjqpslnsqgsuqlzognc.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkanFwc2xuc3Fnc3VxbHpvZ25jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDIyNjEwMzksImV4cCI6MjAxNzgzNzAzOX0.wNpvScPX1VcMa1aO-JUL6RQx5AZ3SyBkMwzHc8ldJ0M";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
