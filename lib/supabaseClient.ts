import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types para tu base de datos
export type User = {
  id: string;
  wallet_address: string;
  username: string | null;
  profile_image: string | null;
  tokens: number;
  energy: number;
  created_at: string;
  updated_at: string;
};

export type Tap = {
  id: string;
  user_id: string;
  tokens_earned: number;
  created_at: string;
};

export type Mission = {
  id: string;
  user_id: string;
  type: string;
  progress: number;
  target: number;
  reward: number;
  claimed: boolean;
  created_at: string;
  updated_at: string;
};

export type Booster = {
  id: string;
  user_id: string;
  type: string;
  expires_at: string;
  active: boolean;
  created_at: string;
};

export type Leaderboard = {
  id: string;
  user_id: string;
  username: string | null;
  total_taps: number;
  total_tokens: number;
  updated_at: string;
};
