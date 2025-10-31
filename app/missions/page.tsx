'use client'

import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'

const missions = [
  { id: 1, title: 'Primeros 100 Taps', progress: 85, target: 100, reward: 50, completed: false },
  { id: 2, title: 'Racha de 10 Taps', progress: 10, target: 10, reward: 20, completed: true },
  { id: 3, title: 'Ganar 500 Tokens', progress: 200, target: 500, reward: 100, completed: false },
]

export default function MissionsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black p-4 pb-32">
      <div className="max-w-sm mx-auto">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-6">
          📋 Misiones Diarias
        </h1>

        <div className="space-y-4">
          {missions.map((mission) => (
            <div key={mission.id} className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-pink-500/50 transition">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-white">{mission.title}</h3>
                  <p className="text-sm text-gray-400">+{mission.reward} Tokens</p>
                </div>
                {mission.completed && (
                  <CheckCircle2 className="text-green-400" size={24} />
                )}
              </div>

              <div className="mb-2">
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>Progreso</span>
                  <span>{mission.progress} / {mission.target}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-pink-500 to-pink-600 h-full transition-all"
                    style={{ width: `${(mission.progress / mission.target) * 100}%` }}
                  />
                </div>
              </div>

              <button
                disabled={!mission.completed}
                className={`
                  w-full py-2 rounded font-semibold text-sm transition
                  ${
                    mission.completed
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  }
                `}
              >
                {mission.completed ? '✅ Reclamar' : '🔒 Bloqueada'}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 p-4">
        <div className="max-w-sm mx-auto grid grid-cols-4 gap-2">
          <Link href="/tap" className="text-center py-2 px-2 bg-gray-700 hover:bg-gray-600 rounded text-xs font-bold text-white">🎮 Tap</Link>
          <Link href="/wallet" className="text-center py-2 px-2 bg-gray-700 hover:bg-gray-600 rounded text-xs font-bold text-white">💼 Wallet</Link>
          <Link href="/missions" className="text-center py-2 px-2 bg-pink-600 hover:bg-pink-700 rounded text-xs font-bold text-white">📋 Misiones</Link>
          <Link href="/ranking" className="text-center py-2 px-2 bg-gray-700 hover:bg-gray-600 rounded text-xs font-bold text-white">📊 Top</Link>
        </div>
      </div>
    </div>
  );
}
