/**
 * Shared type definitions for game entities
 */

export interface Vector2 {
  x: number;
  y: number;
}

export interface Player {
  id: string;
  position: Vector2;
  velocity: Vector2;
  health: number;
  resources: {
    wood: number;
    stone: number;
    food: number;
  };
  equipped: string | null;
}

export interface GameState {
  players: Map<string, Player>;
  timestamp: number;
}