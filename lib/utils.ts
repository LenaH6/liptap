import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Utilidad para combinar clases de Tailwind
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Formatear números con comas
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num)
}

// Convertir tokens a WLD
export function tokensToWLD(tokens: number): number {
  return tokens / 1000 * 0.01
}

// Calcular tiempo restante
export function getTimeRemaining(expiresAt: string): string {
  const now = new Date().getTime()
  const expiry = new Date(expiresAt).getTime()
  const diff = expiry - now

  if (diff <= 0) return 'Expirado'

  const minutes = Math.floor(diff / 60000)
  const seconds = Math.floor((diff % 60000) / 1000)

  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}
