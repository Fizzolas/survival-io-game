import { Player } from '../entities/Player';
import { Camera } from './Camera';
/**
 * Rendering system
 * Handles all canvas drawing operations with camera transforms
 */
export class Renderer {
  public ctx: CanvasRenderingContext2D;
  private camera: Camera;

  // Colors
  private readonly COLOR_BACKGROUND = '#1a252f';
  private readonly COLOR_GRASS = '#5d8a3a';
  private readonly COLOR_GRASS_DARK = '#4a6e2e';
  private readonly COLOR_WORLD_BORDER = '#2c3e50';
  private readonly COLOR_GRID = 'rgba(255, 255, 255, 0.05)';
  private readonly COLOR_TEXT = '#f5f5f5';
  private readonly COLOR_TEXT_SHADOW = 'rgba(0, 0, 0, 0.5)';
  // Grid settings
  private readonly GRID_SIZE = 100;
  constructor(ctx: CanvasRenderingContext2D, camera: Camera) {
    this.ctx = ctx;
    this.camera = camera;
    console.log('Renderer initialized');
  }
  /**
   * Clear the canvas
   */
  public clear(): void {
    this.ctx.fillStyle = this.COLOR_BACKGROUND;
    this.ctx.fillRect(0, 0, this.camera.width, this.camera.height);
  }
  /**
   * Draw the game world background
   */
  public drawWorld(worldWidth: number, worldHeight: number): void {
    this.ctx.save();
    this.ctx.translate(-this.camera.position.x, -this.camera.position.y);
    this.ctx.fillStyle = this.COLOR_GRASS;
    this.ctx.fillRect(0, 0, worldWidth, worldHeight);
    this.ctx.fillStyle = this.COLOR_GRASS_DARK;
    const patternSize = 200;
    for (let x = 0; x < worldWidth; x += patternSize) {
      for (let y = 0; y < worldHeight; y += patternSize) {
        if ((x / patternSize + y / patternSize) % 2 === 0) {
          this.ctx.fillRect(x, y, patternSize, patternSize);
        }
      }
    }
    this.drawGrid(worldWidth, worldHeight);
    this.ctx.strokeStyle = this.COLOR_WORLD_BORDER;
    this.ctx.lineWidth = 4;
    this.ctx.strokeRect(0, 0, worldWidth, worldHeight);
    this.ctx.restore();
  }
  /**
   * Draw grid lines
   */
  private drawGrid(worldWidth: number, worldHeight: number): void {
    this.ctx.strokeStyle = this.COLOR_GRID;
    this.ctx.lineWidth = 1;
    for (let x = 0; x <= worldWidth; x += this.GRID_SIZE) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, worldHeight);
      this.ctx.stroke();
    }
    for (let y = 0; y <= worldHeight; y += this.GRID_SIZE) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(worldWidth, y);
      this.ctx.stroke();
    }
  }
  /**
   * Draw the player
   */
  public drawPlayer(player: Player): void {
    this.ctx.save();
    this.ctx.translate(-this.camera.position.x, -this.camera.position.y);
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    this.ctx.beginPath();
    this.ctx.ellipse(
      player.position.x + 3,
      player.position.y + 3,
      player.radius,
      player.radius * 0.5,
      0,
      0,
      Math.PI * 2
    );
    this.ctx.fill();
    this.ctx.fillStyle = player.color;
    this.ctx.beginPath();
    this.ctx.arc(player.position.x, player.position.y, player.radius, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.strokeStyle = '#2c3e50';
    this.ctx.lineWidth = 3;
    this.ctx.stroke();
    if (player.velocity.x !== 0 || player.velocity.y !== 0) {
      const angle = Math.atan2(player.velocity.y, player.velocity.x);
      const indicatorLength = player.radius * 0.6;
      this.ctx.strokeStyle = '#ffffff';
      this.ctx.lineWidth = 3;
      this.ctx.beginPath();
      this.ctx.moveTo(player.position.x, player.position.y);
      this.ctx.lineTo(
        player.position.x + Math.cos(angle) * indicatorLength,
        player.position.y + Math.sin(angle) * indicatorLength
      );
      this.ctx.stroke();
    }
    this.ctx.restore();
  }
  /**
   * Draw UI elements (HUD)
   */
  public drawUI(fps: number, player: Player): void {
    this.drawText(`FPS: ${fps}`, 10, 30, '16px Arial', this.COLOR_TEXT);
    const posX = Math.round(player.position.x);
    const posY = Math.round(player.position.y);
    this.drawText(`Position: (${posX}, ${posY})`, 10, 55, '14px Arial', this.COLOR_TEXT);
    const speed = Math.round(player.getSpeed());
    this.drawText(`Speed: ${speed}`, 10, 75, '14px Arial', this.COLOR_TEXT);
    this.drawText('Controls: WASD or Arrow Keys, E to gather', 10, this.camera.height - 20, '14px Arial', this.COLOR_TEXT);
  }
  /**
   * Draw text with shadow
   */
  private drawText(
    text: string,
    x: number,
    y: number,
    font: string,
    color: string
  ): void {
    this.ctx.font = font;
    this.ctx.textAlign = 'left';
    this.ctx.textBaseline = 'top';
    this.ctx.fillStyle = this.COLOR_TEXT_SHADOW;
    this.ctx.fillText(text, x + 2, y + 2);
    this.ctx.fillStyle = color;
    this.ctx.fillText(text, x, y);
  }
}
