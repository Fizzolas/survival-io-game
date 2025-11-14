import { GameEngine } from './engine/GameEngine';

/**
 * Renderer process entry point
 * Initializes and starts the game engine
 */

console.log('=== Survival IO Game - Phase 2 ===');
console.log('Initializing game engine...');

let gameEngine: GameEngine | null = null;

// Wait for DOM to be ready
window.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded, setting up canvas...');
  
  const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
  
  if (!canvas) {
    console.error('Canvas element not found!');
    return;
  }

  // Set canvas size to window size
  function resizeCanvas(): void {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Update game engine if it exists
    if (gameEngine) {
      gameEngine.resize(canvas.width, canvas.height);
    }
  }

  // Initial resize
  resizeCanvas();

  // Handle window resize
  window.addEventListener('resize', () => {
    resizeCanvas();
  });

  // Initialize game engine
  try {
    gameEngine = new GameEngine(canvas);
    console.log('Game engine created successfully');
    
    // Start the game loop
    gameEngine.start();
    console.log('Game loop started');
    
  } catch (error) {
    console.error('Failed to initialize game engine:', error);
  }
});

// Handle cleanup on unload
window.addEventListener('beforeunload', () => {
  if (gameEngine) {
    gameEngine.stop();
    console.log('Game engine stopped');
  }
});