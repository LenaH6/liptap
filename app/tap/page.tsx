'use client';

import { useEffect, useRef, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/lib/useAuth';
import { GAME_CONFIG } from '@/lib/constants';
import Nav from '@/components/Nav';

export default function TapPage() {
  const { user, loading } = useAuth();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [tokens, setTokens] = useState(0);
  const [energy, setEnergy] = useState(GAME_CONFIG.INITIAL_ENERGY);
  const [isGlowing, setIsGlowing] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (!user) return;

    const loadUserData = async () => {
      try {
        const { data } = await supabase
          .from('users')
          .select('tokens, energy')
          .eq('id', user.id)
          .single();

        if (data) {
          setTokens(data.tokens);
          setEnergy(data.energy);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    loadUserData();
  }, [user]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlowing(true);
      setTimeout(() => setIsGlowing(false), 500);
    }, GAME_CONFIG.GLOW_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (energy >= GAME_CONFIG.MAX_ENERGY) return;
    const interval = setInterval(() => {
      setEnergy((prev) => Math.min(prev + GAME_CONFIG.ENERGY_REGEN_RATE, GAME_CONFIG.MAX_ENERGY));
    }, 1000);
    return () => clearInterval(interval);
  }, [energy]);

  const handleTap = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!user || energy < GAME_CONFIG.MIN_ENERGY_TO_TAP) return;

    const isCorrect = isGlowing;
    const newEnergy = energy - GAME_CONFIG.ENERGY_COST_PER_TAP;
    setEnergy(newEnergy);

    if (isCorrect) {
      const newTokens = tokens + GAME_CONFIG.TAP_REWARD;
      setTokens(newTokens);
      setScore((prev) => prev + 1);

      try {
        await supabase.from('taps').insert([{ user_id: user.id, tokens_earned: GAME_CONFIG.TAP_REWARD }]);
        await supabase.from('users').update({ tokens: newTokens, energy: newEnergy }).eq('id', user.id);
      } catch (err) {
        console.error('Error:', err);
      }
    } else {
      try {
        await supabase.from('users').update({ energy: newEnergy }).eq('id', user.id);
      } catch (err) {
        console.error('Error:', err);
      }
    }
  };

  const canTap = energy >= GAME_CONFIG.MIN_ENERGY_TO_TAP && isGlowing;

  if (loading) return <div className="w-full h-screen bg-black flex items-center justify-center text-white">Loading...</div>;
  if (!user) return <div className="w-full h-screen bg-black flex items-center justify-center text-white">Error</div>;

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-gray-950 to-black flex flex-col items-center justify-between pb-24">
      <div className="w-full pt-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-white">Earn & Tap</h1>
          <div className="text-right">
            <p className="text-xs text-gray-400">Tokens</p>
            <p className="text-2xl font-bold text-pink-500">{tokens}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-900/50 rounded-lg p-4">
            <p className="text-xs text-gray-400 mb-2">Energy</p>
            <div className="w-full bg-gray-800 rounded-full h-2 mb-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-pink-500 to-rose-400 h-2 rounded-full transition-all"
                style={{ width: `${(energy / GAME_CONFIG.MAX_ENERGY) * 100}%` }}
              />
            </div>
            <p className="text-sm font-bold text-white">{Math.floor(energy)}/{GAME_CONFIG.MAX_ENERGY}</p>
          </div>

          <div className="bg-gray-900/50 rounded-lg p-4">
            <p className="text-xs text-gray-400 mb-1">Combo</p>
            <p className={`text-2xl font-bold ${score > 5 ? 'text-pink-400' : 'text-gray-500'}`}>{score}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-6">
        <button
          ref={buttonRef}
          onClick={handleTap}
          className={`w-32 h-32 rounded-full font-bold text-3xl transition-all duration-300 ${
            isGlowing
              ? 'bg-gradient-to-br from-pink-500 to-rose-600 shadow-2xl shadow-pink-500/50 scale-110'
              : 'bg-gradient-to-br from-gray-700 to-gray-800 shadow-lg'
          }`}
        >
          💋
        </button>
        <p className={`text-sm font-semibold ${energy < GAME_CONFIG.MIN_ENERGY_TO_TAP ? 'text-rose-400' : canTap ? 'text-green-400' : 'text-gray-600'}`}>
          {energy < GAME_CONFIG.MIN_ENERGY_TO_TAP ? '⚡ Charging...' : canTap ? '✨ Blow a Kiss ✨' : '⏳ Wait...'}
        </p>
      </div>

      <Nav />
    </div>
  );
}
