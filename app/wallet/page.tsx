'use client'

import { useState, useEffect } from 'react'
import { Coins, TrendingUp } from 'lucide-react'
import Link from 'next/link'

export default function WalletPage() {
  const [tokens, setTokens] = useState(3)
  const [wldValue, setWldValue] = useState(0)

  useEffect(() => {
    setWldValue((tokens / 1000) * 0.01)
  }, [tokens])

  const handleConvertToWLD = () => {
    alert(`Convertir ${tokens} tokens a ${wldValue.toFixed(6)} WLD`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black p-4 pb-32">
      <div className="max-w-sm mx-auto mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-6">
          💼 Wallet
        </h1>

        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-pink-500/30 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Coins className="text-pink-400" size={24} />
            <span className="text-gray-400 text-sm">Saldo Total</span>
          </div>
          <p className="text-5xl font-bold text-white mb-2">{tokens}</p>
          <p className="text-gray-500 text-sm">≈ {wldValue.toFixed(6)} WLD</p>
        </div>

        <div className="bg-gray-800 rounded-lg p-4 border border-purple-500/30 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={18} className="text-purple-400" />
            <span className="text-sm font-semibold text-purple-400">Tasa de Conversión</span>
          </div>
          <p className="text-gray-300">1,000 Tokens = 0.01 WLD</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            onClick={handleConvertToWLD}
            disabled={tokens < 1000}
            className={`
              py-3 rounded-lg font-semibold transition-all
              ${
                tokens >= 1000
                  ? 'bg-pink-600 hover:bg-pink-700 text-white cursor-pointer'
                  : 'bg-gray-700 text-gray-500 cursor-not-allowed'
              }
            `}
          >
            ⬆️ Convertir
          </button>

          <button
            disabled
            className="py-3 rounded-lg font-semibold bg-gray-700 text-gray-500 cursor-not-allowed"
          >
            ⬇️ Claim
          </button>
        </div>

        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <h3 className="text-sm font-semibold text-white mb-4">Historial</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-400">Taps completados</span>
              <span className="text-green-400 font-semibold">+3</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-400">Hoy</span>
              <span className="text-gray-500 text-xs">Ahora</span>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 p-4">
        <div className="max-w-sm mx-auto grid grid-cols-4 gap-2">
          <Link href="/tap" className="text-center py-2 px-2 bg-gray-700 hover:bg-gray-600 rounded text-xs font-bold text-white">🎮 Tap</Link>
          <Link href="/wallet" className="text-center py-2 px-2 bg-pink-600 hover:bg-pink-700 rounded text-xs font-bold text-white">💼 Wallet</Link>
          <Link href="/missions" className="text-center py-2 px-2 bg-gray-700 hover:bg-gray-600 rounded text-xs font-bold text-white">📋 Misiones</Link>
          <Link href="/ranking" className="text-center py-2 px-2 bg-gray-700 hover:bg-gray-600 rounded text-xs font-bold text-white">📊 Top</Link>
        </div>
      </div>
    </div>
  );
}
