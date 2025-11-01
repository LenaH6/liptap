// Configuración del juego
export const GAME_CONFIG = {
  INITIAL_ENERGY: 100,
  MAX_ENERGY: 100,
  ENERGY_COST_PER_TAP: 1,
  ENERGY_REGEN_RATE: 1, // puntos por segundo
  TAP_REWARD: 1, // tokens por tap correcto
  GLOW_INTERVAL: 2000, // milisegundos
  MIN_ENERGY_TO_TAP: 5, // energía mínima requerida
};

// Tipos de misiones
export const MISSION_TYPES = {
  DAILY_TAPS: 'daily_taps',
  WEEKLY_TAPS: 'weekly_taps',
  PERFECT_STREAK: 'perfect_streak',
} as const;

// Tipos de boosters
export const BOOSTER_TYPES = {
  DOUBLE_KISS: 'double_kiss',
  TIME_FREEZE: 'time_freeze',
  COMBO_RUSH: 'combo_rush',
  LOVE_MAGNET: 'love_magnet',
} as const;

// Precios de boosters (en WLD)
export const BOOSTER_PRICES: Record<string, number> = {
  [BOOSTER_TYPES.DOUBLE_KISS]: 0.05,
  [BOOSTER_TYPES.TIME_FREEZE]: 0.03,
  [BOOSTER_TYPES.COMBO_RUSH]: 0.04,
  [BOOSTER_TYPES.LOVE_MAGNET]: 0.1,
};

// Duración de boosters (en segundos)
export const BOOSTER_DURATION: Record<string, number> = {
  [BOOSTER_TYPES.DOUBLE_KISS]: 300, // 5 minutos
  [BOOSTER_TYPES.TIME_FREEZE]: 180, // 3 minutos
  [BOOSTER_TYPES.COMBO_RUSH]: 600, // 10 minutos
  [BOOSTER_TYPES.LOVE_MAGNET]: 300, // 5 minutos
};

// Conversión tokens a WLD
export const TOKEN_TO_WLD_RATE = 1000; // 1000 tokens = 0.01 WLD

// Recompensas de misiones
export const MISSION_REWARDS: Record<string, number> = {
  [MISSION_TYPES.DAILY_TAPS]: 100,
  [MISSION_TYPES.WEEKLY_TAPS]: 500,
  [MISSION_TYPES.PERFECT_STREAK]: 250,
};

// Objetivos de misiones
export const MISSION_TARGETS: Record<string, number> = {
  [MISSION_TYPES.DAILY_TAPS]: 50,
  [MISSION_TYPES.WEEKLY_TAPS]: 300,
  [MISSION_TYPES.PERFECT_STREAK]: 20,
};
