import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import type { User } from './supabaseClient';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getWalletAddress = () => {
    if (typeof window !== 'undefined') {
      return (
        localStorage.getItem('wallet_address') ||
        'user_' + Math.random().toString(36).substr(2, 9)
      );
    }
    return null;
  };

  const initializeUser = async (walletAddress: string) => {
    try {
      setLoading(true);

      let { data: existingUser, error: fetchError } = await supabase
        .from('users')
        .select('*')
        .eq('wallet_address', walletAddress)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') {
        throw fetchError;
      }

      if (!existingUser) {
        const { data: newUser, error: createError } = await supabase
          .from('users')
          .insert([
            {
              wallet_address: walletAddress,
              username: `User_${walletAddress.slice(-4)}`,
              tokens: 0,
              energy: 100,
            },
          ])
          .select()
          .single();

        if (createError) throw createError;
        setUser(newUser);
        localStorage.setItem('wallet_address', walletAddress);
      } else {
        setUser(existingUser);
        localStorage.setItem('wallet_address', walletAddress);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error initializing user';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const wallet = getWalletAddress();
    if (wallet) {
      initializeUser(wallet);
    }
  }, []);

  return {
    user,
    loading,
    error,
    initializeUser,
  };
}
