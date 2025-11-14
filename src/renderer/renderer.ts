/**
 * Renderer process entry point
 * Handles game client logic and canvas rendering
 */

console.log('Survival IO Game - Renderer initialized');

// Wait for DOM to be ready
window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    console.error('Failed to get canvas context');
    return;
  }

  // Set canvas size
  function resizeCanvas(): void {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Render Hello World
  function render(context: CanvasRenderingContext2D): void {
    // Clear canvas
    context.fillStyle = '#1a252f';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Draw title
    context.fillStyle = '#32b8c6';
    context.font = 'bold 72px Arial';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText('Hello World', canvas.width / 2, canvas.height / 2 - 50);

    // Draw subtitle
    context.fillStyle = '#a7a9a9';
    context.font = '24px Arial';
    context.fillText('Survival IO Game - Phase 1', canvas.width / 2, canvas.height / 2 + 20);

    context.fillStyle = '#77787c';
    context.font = '18px Arial';
    context.fillText('Electron + TypeScript + Canvas', canvas.width / 2, canvas.height / 2 + 60);
  }

  // Animation loop
  function gameLoop(): void {
    render(ctx);
    requestAnimationFrame(gameLoop);
  }

  gameLoop();
});