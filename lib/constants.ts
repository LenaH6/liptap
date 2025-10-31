// Configuración del juego
export const GAME_CONFIG = {
  INITIAL_ENERGY: 100,
  MAX_ENERGY: 100,
  ENERGY_COST_PER_TAP: 1,
  ENERGY_REGEN_RATE: 1, // puntos por segundo
  TAP_REWARD: 1, // tokens por tap correcto
  GLOW_INTERVAL: 2000, // milisegundos
}

// Tipos de misiones
export const MISSION_TYPES = {
  DAILY_TAPS: 'daily_taps',
  WEEKLY_TAPS: 'weekly_taps',
  PERFECT_STREAK: 'perfect_streak',
}

// Tipos de boosters
export const BOOSTER_TYPES = {
  DOUBLE_KISS: 'double_kiss',
  TIME_FREEZE: 'time_freeze',
  COMBO_RUSH: 'combo_rush',
  LOVE_MAGNET: 'love_magnet',
}

// Precios de boosters (en WLD)
export const BOOSTER_PRICES = {
  [BOOSTER_TYPES.DOUBLE_KISS]: 0.05,
  [BOOSTER_TYPES.TIME_FREEZE]: 0.03,
  [BOOSTER_TYPES.COMBO_RUSH]: 0.04,
  [BOOSTER_TYPES.LOVE_MAGNET]: 0.1,
}

// Conversión tokens a WLD
export const TOKEN_TO_WLD_RATE = 1000 // 1000 tokens = 0.01 WLD
