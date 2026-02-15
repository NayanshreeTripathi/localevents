import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Event {
  id: string;
  title: string;
  type: string;
  date: string;
  location: string;
  host: string;
  description: string;
  created_at: string;
}

export interface RSVP {
  id: string;
  event_id: string;
  user_name: string;
  user_email: string;
  created_at: string;
}
