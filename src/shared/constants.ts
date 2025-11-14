/**
 * Shared constants used across client and server
 */

export const GAME_CONFIG = {
  TICK_RATE: 60, // Server ticks per second
  CLIENT_FPS: 60, // Target client FPS
  WORLD_SIZE: 5000, // Map dimensions
} as const;

export const PLAYER_CONFIG = {
  SPEED: 5,
  MAX_HEALTH: 100,
  START_RESOURCES: {
    wood: 0,
    stone: 0,
    food: 0,
  },
} as const;