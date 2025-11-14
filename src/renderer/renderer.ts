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
  function render(): void {
    // Clear canvas
    ctx.fillStyle = '#1a252f';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw title
    ctx.fillStyle = '#32b8c6';
    ctx.font = 'bold 72px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Hello World', canvas.width / 2, canvas.height / 2 - 50);

    // Draw subtitle
    ctx.fillStyle = '#a7a9a9';
    ctx.font = '24px Arial';
    ctx.fillText('Survival IO Game - Phase 1', canvas.width / 2, canvas.height / 2 + 20);

    ctx.fillStyle = '#77787c';
    ctx.font = '18px Arial';
    ctx.fillText('Electron + TypeScript + Canvas', canvas.width / 2, canvas.height / 2 + 60);
  }

  // Animation loop
  function gameLoop(): void {
    render();
    requestAnimationFrame(gameLoop);
  }

  gameLoop();
});