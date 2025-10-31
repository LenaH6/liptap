'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const GLOW_INTERVAL = 2000, TAP_WINDOW = 500, INITIAL_ENERGY = 100, MIN_ENERGY_TO_TAP = 5

interface Particle { id: number; x: number; y: number; emoji: string }

export default function TapGame() {
  const [tokens, setTokens] = useState(0), [energy, setEnergy] = useState(INITIAL_ENERGY), [isGlowing, setIsGlowing] = useState(false), [canTap, setCanTap] = useState(false), [message, setMessage] = useState(''), [score, setScore] = useState(0), [particles, setParticles] = useState<Particle[]>([])
  const glowTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null), tapWindowTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null), messageTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null), particleIdRef = useRef(0)

  useEffect(() => {
    const interval = setInterval(() => { setIsGlowing(true); setCanTap(true); tapWindowTimeoutRef.current = setTimeout(() => setCanTap(false), TAP_WINDOW); glowTimeoutRef.current = setTimeout(() => setIsGlowing(false), GLOW_INTERVAL) }, GLOW_INTERVAL + 500)
    return () => { clearInterval(interval); if (glowTimeoutRef.current) clearTimeout(glowTimeoutRef.current); if (tapWindowTimeoutRef.current) clearTimeout(tapWindowTimeoutRef.current) }
  }, [])

  useEffect(() => { if (energy >= INITIAL_ENERGY) return; const interval = setInterval(() => setEnergy((prev) => Math.min(prev + 1, INITIAL_ENERGY)), 1000); return () => clearInterval(interval) }, [energy])

  const createParticles = (x: number, y: number, success: boolean) => {
    const emojis = success ? ['💕', '💖', '✨', '💝'] : ['💔', '😔']
    for (let i = 0; i < (success ? 8 : 3); i++) {
      const newParticle = { id: particleIdRef.current++, x: x + (Math.random() - 0.5) * 80, y: y + (Math.random() - 0.5) * 80, emoji: emojis[Math.floor(Math.random() * emojis.length)] }
      setParticles((prev) => [...prev, newParticle])
      setTimeout(() => setParticles((prev) => prev.filter((p) => p.id !== newParticle.id)), 1500)
    }
  }

  const handleTap = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (energy < MIN_ENERGY_TO_TAP) { setMessage('Need 5+ energy'); return }
    const rect = e.currentTarget.getBoundingClientRect(), x = rect.left + rect.width / 2, y = rect.top + rect.height / 2
    if ('vibrate' in navigator) navigator.vibrate(50)
    if (canTap) { setTokens((prev) => prev + 1); setScore((prev) => prev + 1); setEnergy((prev) => Math.max(prev - 1, 0)); setMessage('Perfect!'); createParticles(x, y, true) }
    else { setEnergy((prev) => Math.max(prev - 10, 0)); setScore(0); setMessage('Missed'); createParticles(x, y, false) }
    setTimeout(() => setMessage(''), 800)
  }

  const energyPercentage = (energy / INITIAL_ENERGY) * 100

  return (
    <div className="h-screen w-screen bg-gradient-to-b from-purple-950 via-black to-black overflow-hidden relative flex flex-col">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-900/20 via-transparent to-transparent pointer-events-none" />
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div key={p.id} className="fixed pointer-events-none text-4xl z-50" initial={{ x: p.x, y: p.y, opacity: 1, scale: 1 }} animate={{ y: p.y - 150, x: p.x + (Math.random() - 0.5) * 120, opacity: 0, scale: 0.2, rotate: (Math.random() - 0.5) * 720 }} exit={{ opacity: 0 }} transition={{ duration: 1.5 }}>{p.emoji}</motion.div>
        ))}
      </AnimatePresence>

      <div className="flex-1 overflow-y-auto pb-24 flex flex-col">
        <div className="pt-5 px-4 z-10"><h1 className="text-5xl font-black text-center mb-1" style={{ background: 'linear-gradient(135deg, #ff6bb5, #ec4899, #d946ef)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>💋 LipTap</h1><p className="text-[9px] text-pink-300/60 uppercase tracking-[0.3em] font-bold text-center mb-5">Kiss to Earn</p><div className="flex justify-center gap-6 mb-4"><div className="flex items-center gap-2"><span className="text-2xl">💰</span><div><p className="text-[8px] text-yellow-400 uppercase font-bold">Tokens</p><p className="text-3xl font-black" style={{ background: 'linear-gradient(135deg, #fbbf24, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{tokens}</p></div></div><div className="h-10 w-px bg-pink-500/20" /><div className="flex items-center gap-2"><div><p className={`text-[8px] uppercase font-bold ${score > 5 ? 'text-orange-400' : 'text-gray-500'}`}>Combo</p><p className="text-3xl font-black" style={{ background: score > 5 ? 'linear-gradient(135deg, #f97316, #ea580c)' : 'linear-gradient(135deg, #6b7280, #4b5563)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{score}</p></div>{score > 5 && <span className="text-xl">🔥</span>}</div></div></div>

        <div className="flex-1 flex flex-col items-center justify-center px-4"><p className={`text-sm font-black uppercase mb-6 ${canTap && energy >= MIN_ENERGY_TO_TAP ? 'text-pink-400' : 'text-gray-700'}`}>{energy < MIN_ENERGY_TO_TAP ? '⚡ Charging...' : canTap ? '✨ Blow a Kiss ✨' : '⏳ Wait...'}</p><div className="relative mb-8"><motion.div className="absolute inset-0 rounded-full blur-3xl" animate={{ scale: isGlowing ? [1, 1.8, 1] : 0.5, opacity: isGlowing ? [0.3, 0.9, 0.3] : 0 }} style={{ background: 'radial-gradient(circle, rgba(236, 72, 153, 0.9), rgba(219, 39, 119, 0.3))' }} transition={{ duration: 1.5, repeat: Infinity }} /><motion.button onClick={handleTap} disabled={energy < MIN_ENERGY_TO_TAP} className="relative rounded-full flex items-center justify-center focus:outline-none overflow-hidden disabled:cursor-not-allowed disabled:opacity-40" style={{ width: 'min(70vw, 260px)', height: 'min(70vw, 260px)', background: 'linear-gradient(145deg, #1f1f1f, #0a0a0a)', border: `6px solid ${isGlowing ? '#ec4899' : '#2a2a2a'}`, boxShadow: isGlowing ? '0 0 60px rgba(236, 72, 153, 1), inset 0 6px 20px rgba(0, 0, 0, 0.95)' : '0 10px 40px rgba(0, 0, 0, 0.95), inset 0 6px 20px rgba(0, 0, 0, 0.95)' }} whileTap={{ scale: energy >= MIN_ENERGY_TO_TAP ? 0.85 : 1 }} animate={{ scale: isGlowing ? [1, 1.05, 1] : 0.96 }} transition={{ duration: 0.7 }}><svg width="100%" height="100%" viewBox="0 0 200 200" className="max-w-[60%] max-h-[60%]"><defs><radialGradient id="lipGrad" cx="50%" cy="40%"><stop offset="0%" stopColor="#ff6bb5" /><stop offset="60%" stopColor="#ec4899" /><stop offset="100%" stopColor="#be185d" /></radialGradient><radialGradient id="highlight" cx="30%" cy="30%"><stop offset="0%" stopColor="rgba(255, 255, 255, 0.7)" /><stop offset="100%" stopColor="rgba(255, 255, 255, 0)" /></radialGradient></defs><ellipse cx="100" cy="125" rx="65" ry="38" fill="rgba(0,0,0,0.5)" /><ellipse cx="100" cy="110" rx="62" ry="36" fill="url(#lipGrad)" /><path d="M 38 95 Q 58 68, 78 73 Q 88 76, 100 80 Q 112 76, 122 73 Q 142 68, 162 95 L 100 100 Z" fill="url(#lipGrad)" /><path d="M 43 100 Q 100 106, 157 100" stroke="#9d174d" strokeWidth="3" fill="none" opacity="0.7" /><ellipse cx="68" cy="84" rx="22" ry="11" fill="url(#highlight)" /><ellipse cx="132" cy="84" rx="22" ry="11" fill="url(#highlight)" /><ellipse cx="100" cy="116" rx="38" ry="13" fill="url(#highlight)" /></svg></motion.button></div><AnimatePresence>{message && <motion.div className={`text-4xl font-black ${message.includes('Perfect') ? 'text-pink-400' : 'text-red-400'}`} initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }}>{message}</motion.div>}</AnimatePresence><div className="w-full max-w-[80vw] mt-6"><div className="flex items-center justify-between mb-2"><span className="text-xs font-black text-yellow-300 uppercase flex items-center gap-2"><span className="text-xl">⚡</span>Energy</span><span className="text-lg font-black" style={{ color: energy < MIN_ENERGY_TO_TAP ? '#ef4444' : '#fbbf24' }}>{energy}</span></div><div className="relative w-full h-3 bg-gray-900/80 rounded-full overflow-hidden border-2 border-yellow-500/50"><motion.div className="h-full" style={{ background: energy < MIN_ENERGY_TO_TAP ? 'linear-gradient(90deg, #ef4444, #dc2626)' : 'linear-gradient(90deg, #fbbf24, #f59e0b)', boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.3)' }} animate={{ width: `${energyPercentage}%` }} transition={{ type: 'spring', stiffness: 100 }} /></div>{energy < MIN_ENERGY_TO_TAP && <p className="text-[9px] text-red-400 text-center mt-1 font-bold">Need 5 energy</p>}</div></div>
      </div>
          <div className="w-full bg-black border-t border-gray-700 py-4 px-2">
        <div className="flex justify-around max-w-md mx-auto">
          <Link href="/tap" className="w-12 h-12 rounded-full bg-pink-600/40 flex items-center justify-center text-2xl hover:bg-pink-600/60 transition-all">💋</Link>
          <Link href="/wallet" className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-2xl hover:bg-gray-600 transition-all">💼</Link>
          <Link href="/missions" className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-2xl hover:bg-gray-600 transition-all">🎯</Link>
          <Link href="/ranking" className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-2xl hover:bg-gray-600 transition-all">🏆</Link>
        </div>
      </div>

    </div>
  )
}
