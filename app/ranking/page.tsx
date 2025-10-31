'use client'

import Link from 'next/link'
import { Medal, TrendingUp } from 'lucide-react'

const leaderboard = [
  { rank: 1, name: 'LipMaster', tokens: 50000, change: 'up' },
  { rank: 2, name: 'TapKing', tokens: 45000, change: 'up' },
  { rank: 3, name: 'KissQueen', tokens: 40000, change: 'down' },
  { rank: 4, name: 'You', tokens: 3, change: 'new' },
  { rank: 5, name: 'LipLover', tokens: 2500, change: 'up' },
]

export default function RankingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black p-4 pb-32">
      <div className="max-w-sm mx-auto">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-6">
          📊 Ranking Global
        </h1>

        <div className="space-y-2">
          {leaderboard.map((player) => (
            <div key={player.rank} className={`flex items-center gap-3 p-4 rounded-lg border ${player.name === 'You' ? 'bg-pink-900/30 border-pink-500' : 'bg-gray-800 border-gray-700'}`}>
              <div className="text-2xl font-bold w-8 text-center">
                {player.rank === 1 ? '🥇' : player.rank === 2 ? '🥈' : player.rank === 3 ? '🥉' : player.rank}
              </div>

              <div className="flex-1">
                <p className="font-semibold text-white">{player.name}</p>
                <p className="text-sm text-gray-400">{player.tokens.toLocaleString()} tokens</p>
              </div>

              <div className="text-right">
                {player.change === 'up' && <TrendingUp className="text-green-400" size={20} />}
                {player.change === 'down' && <TrendingUp className="text-red-400 rotate-180" size={20} />}
                {player.change === 'new' && <span className="text-xs font-bold text-pink-400">NUEVO</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 p-4">
        <div className="max-w-sm mx-auto grid grid-cols-4 gap-2">
          <Link href="/tap" className="text-center py-2 px-2 bg-gray-700 hover:bg-gray-600 rounded text-xs font-bold text-white">🎮 Tap</Link>
          <Link href="/wallet" className="text-center py-2 px-2 bg-gray-700 hover:bg-gray-600 rounded text-xs font-bold text-white">💼 Wallet</Link>
          <Link href="/missions" className="text-center py-2 px-2 bg-gray-700 hover:bg-gray-600 rounded text-xs font-bold text-white">📋 Misiones</Link>
          <Link href="/ranking" className="text-center py-2 px-2 bg-pink-600 hover:bg-pink-700 rounded text-xs font-bold text-white">📊 Top</Link>
        </div>
      </div>
    </div>
  );
}
