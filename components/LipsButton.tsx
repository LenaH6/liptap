'use client'

import { motion } from 'framer-motion'

interface LipsButtonProps {
  isGlowing: boolean
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  buttonRef: React.RefObject<HTMLButtonElement>
}

export default function LipsButton({ isGlowing, onClick, buttonRef }: LipsButtonProps) {
  return (
    <div className="relative">
      {/* Glow Background */}
      <motion.div
        className="absolute inset-0 rounded-full blur-3xl"
        animate={{
          scale: isGlowing ? [1, 1.3, 1] : 0.8,
          opacity: isGlowing ? [0.5, 0.8, 0.5] : 0,
          background: isGlowing 
            ? 'radial-gradient(circle, rgba(236, 72, 153, 0.8), rgba(219, 39, 119, 0.6))'
            : 'rgba(236, 72, 153, 0)',
        }}
        transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Button */}
      <motion.button
        ref={buttonRef}
        onClick={onClick}
        className="relative w-48 h-48 rounded-full flex items-center justify-center cursor-pointer focus:outline-none"
        whileTap={{ scale: 0.9 }}
        animate={{
          scale: isGlowing ? [1, 1.05, 1] : 0.95,
          rotate: isGlowing ? [0, 2, -2, 0] : 0,
        }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        style={{
          background: isGlowing
            ? 'linear-gradient(135deg, #ec4899 0%, #db2777 50%, #be185d 100%)'
            : 'linear-gradient(135deg, #9d174d 0%, #831843 50%, #500724 100%)',
          boxShadow: isGlowing
            ? '0 0 60px rgba(236, 72, 153, 0.8), 0 0 100px rgba(236, 72, 153, 0.6), inset 0 0 20px rgba(255, 255, 255, 0.2)'
            : '0 4px 20px rgba(0, 0, 0, 0.5)',
        }}
      >
        {/* SVG Lips */}
        <motion.svg
          width="120"
          height="120"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          animate={{
            scale: isGlowing ? [1, 1.1, 1] : 1,
          }}
          transition={{ duration: 0.8, repeat: Infinity }}
        >
          {/* Upper Lip */}
          <motion.path
            d="M50 80 Q100 60 150 80 T200 90"
            fill="none"
            stroke="#fff"
            strokeWidth="4"
            strokeLinecap="round"
            animate={{
              d: isGlowing
                ? [
                    'M50 80 Q100 60 150 80',
                    'M50 75 Q100 55 150 75',
                    'M50 80 Q100 60 150 80',
                  ]
                : 'M50 80 Q100 60 150 80',
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />

          {/* Lower Lip */}
          <motion.path
            d="M50 80 Q100 110 150 80"
            fill="none"
            stroke="#fff"
            strokeWidth="4"
            strokeLinecap="round"
            animate={{
              d: isGlowing
                ? [
                    'M50 80 Q100 110 150 80',
                    'M50 85 Q100 115 150 85',
                    'M50 80 Q100 110 150 80',
                  ]
                : 'M50 80 Q100 110 150 80',
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />

          {/* Lip Fill */}
          <motion.ellipse
            cx="100"
            cy="95"
            rx="45"
            ry="25"
            fill="url(#lipGradient)"
            animate={{
              opacity: isGlowing ? [0.9, 1, 0.9] : 0.7,
            }}
            transition={{ duration: 1.2, repeat: Infinity }}
          />

          {/* Gradient Definition */}
          <defs>
            <radialGradient id="lipGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#ec4899" stopOpacity="0.9" />
            </radialGradient>
          </defs>

          {/* Sparkles */}
          {isGlowing && (
            <>
              <motion.circle
                cx="70"
                cy="70"
                r="3"
                fill="#fff"
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                }}
                transition={{ duration: 1, repeat: Infinity, delay: 0 }}
              />
              <motion.circle
                cx="130"
                cy="70"
                r="3"
                fill="#fff"
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
              />
              <motion.circle
                cx="100"
                cy="50"
                r="4"
                fill="#fff"
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 2, 0],
                }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.6 }}
              />
            </>
          )}
        </motion.svg>

        {/* Rotating Ring */}
        {isGlowing && (
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-pink-300/50"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />
        )}
      </motion.button>
    </div>
  )
}
