'use client'

import Link from 'next/link'

export default function Navigation() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.98), rgba(0,0,0,0.92))', backdropFilter: 'blur(20px)', borderTop: '1px solid rgba(236, 72, 153, 0.15)', paddingBottom: 'max(env(safe-area-inset-bottom), 16px)' }}>
      <div className="py-4 px-4">
        <div className="flex justify-center gap-4 max-w-lg mx-auto">
          {/* TAP */}
          <Link href="/tap" className="p-3 rounded-full transition-all active:scale-90" style={{ background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.3), rgba(219, 39, 119, 0.15))', border: '2px solid rgba(236, 72, 153, 0.4)' }}>
            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#ec4899' }}>
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </Link>
          
          {/* WALLET */}
          <Link href="/wallet" className="p-3 rounded-full transition-all active:scale-90" style={{ background: 'rgba(255,255,255,0.05)', border: '2px solid rgba(255,255,255,0.1)' }}>
            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#9ca3af' }}>
              <rect x="3" y="6" width="18" height="13" rx="2" />
              <path d="M3 10h18" />
            </svg>
          </Link>
          
          {/* MISSIONS */}
          <Link href="/missions" className="p-3 rounded-full transition-all active:scale-90" style={{ background: 'rgba(255,255,255,0.05)', border: '2px solid rgba(255,255,255,0.1)' }}>
            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#9ca3af' }}>
              <path d="M9 11l3 3L22 4" />
              <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
            </svg>
          </Link>
          
          {/* RANKING */}
          <Link href="/ranking" className="p-3 rounded-full transition-all active:scale-90" style={{ background: 'rgba(255,255,255,0.05)', border: '2px solid rgba(255,255,255,0.1)' }}>
            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#9ca3af' }}>
              <path d="M6 9H4.5a2.5 2.5 0 010-5H6" />
              <path d="M18 9h1.5a2.5 2.5 0 000-5H18" />
              <path d="M4 22h16" />
              <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
              <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
              <path d="M18 2H6v7a6 6 0 0012 0V2z" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}
