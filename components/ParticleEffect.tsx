'use client'

import { motion } from 'framer-motion'

interface ParticleProps {
  id: number
  x: number
  y: number
}

export default function ParticleEffect({ particles }: { particles: ParticleProps[] }) {
  return (
    <>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="fixed pointer-events-none text-4xl"
          initial={{ x: p.x, y: p.y, opacity: 1, scale: 1 }}
          animate={{
            y: p.y - 150,
            x: p.x + (Math.random() - 0.5) * 100,
            opacity: 0,
            scale: 0.3,
            rotate: Math.random() * 360,
          }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          💋
        </motion.div>
      ))}
    </>
  )
}
