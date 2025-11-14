import { Player } from '../entities/Player';
import { Vector2 } from '../../shared/types';

/**
 * Camera system for viewport management
 * Follows the player and handles world boundaries
 */
export class Camera {
  public position: Vector2;
  public width: number;
  public height: number;

  private target: Player | null = null;
  private worldWidth: number;
  private worldHeight: number;

  // Camera smoothing
  private readonly LERP_FACTOR = 0.1;

  constructor(width: number, height: number, worldWidth: number, worldHeight: number) {
    this.width = width;
    this.height = height;
    this.worldWidth = worldWidth;
    this.worldHeight = worldHeight;
    this.position = { x: 0, y: 0 };

    console.log(`Camera initialized: ${width}x${height}`);
  }

  /**
   * Set the entity for the camera to follow
   */
  public setTarget(target: Player): void {
    this.target = target;
    // Immediately center on target
    if (this.target) {
      this.position.x = this.target.position.x - this.width / 2;
      this.position.y = this.target.position.y - this.height / 2;
    }
  }

  /**
   * Update camera position to follow target
   */
  public update(): void {
    if (!this.target) return;

    // Calculate desired camera position (centered on target)
    const desiredX = this.target.position.x - this.width / 2;
    const desiredY = this.target.position.y - this.height / 2;

    // Smooth camera movement (lerp)
    this.position.x += (desiredX - this.position.x) * this.LERP_FACTOR;
    this.position.y += (desiredY - this.position.y) * this.LERP_FACTOR;

    // Clamp camera to world boundaries
    this.position.x = Math.max(0, Math.min(this.position.x, this.worldWidth - this.width));
    this.position.y = Math.max(0, Math.min(this.position.y, this.worldHeight - this.height));
  }

  /**
   * Convert world coordinates to screen coordinates
   */
  public worldToScreen(worldPos: Vector2): Vector2 {
    return {
      x: worldPos.x - this.position.x,
      y: worldPos.y - this.position.y,
    };
  }

  /**
   * Convert screen coordinates to world coordinates
   */
  public screenToWorld(screenPos: Vector2): Vector2 {
    return {
      x: screenPos.x + this.position.x,
      y: screenPos.y + this.position.y,
    };
  }

  /**
   * Handle canvas resize
   */
  public resize(width: number, height: number): void {
    this.width = width;
    this.height = height;
  }

  /**
   * Check if a point is visible in the camera viewport
   */
  public isVisible(worldPos: Vector2, margin: number = 0): boolean {
    return (
      worldPos.x >= this.position.x - margin &&
      worldPos.x <= this.position.x + this.width + margin &&
      worldPos.y >= this.position.y - margin &&
      worldPos.y <= this.position.y + this.height + margin
    );
  }
}