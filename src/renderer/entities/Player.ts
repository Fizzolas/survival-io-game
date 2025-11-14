import { Vector2 } from '../../shared/types';

/**
 * Input state interface
 */
export interface InputState {
  up: boolean;
  down: boolean;
  left: boolean;
  right: boolean;
}

/**
 * Player entity class
 * Handles player position, movement, and state
 */
export class Player {
  public position: Vector2;
  public velocity: Vector2;
  public radius: number = 20;
  public color: string = '#32b8c6'; // Teal color

  // Movement properties
  private readonly SPEED = 200; // Units per second
  private readonly FRICTION = 0.85; // Deceleration factor
  private readonly ACCELERATION = 800; // Acceleration rate

  constructor(x: number, y: number) {
    this.position = { x, y };
    this.velocity = { x: 0, y: 0 };
    console.log(`Player created at (${x}, ${y})`);
  }

  /**
   * Update player state based on input and delta time
   */
  public update(deltaTime: number, input: InputState): void {
    // Calculate movement direction
    let moveX = 0;
    let moveY = 0;

    if (input.up) moveY -= 1;
    if (input.down) moveY += 1;
    if (input.left) moveX -= 1;
    if (input.right) moveX += 1;

    // Normalize diagonal movement
    if (moveX !== 0 && moveY !== 0) {
      const length = Math.sqrt(moveX * moveX + moveY * moveY);
      moveX /= length;
      moveY /= length;
    }

    // Apply acceleration
    if (moveX !== 0 || moveY !== 0) {
      this.velocity.x += moveX * this.ACCELERATION * deltaTime;
      this.velocity.y += moveY * this.ACCELERATION * deltaTime;

      // Clamp to max speed
      const speed = Math.sqrt(this.velocity.x ** 2 + this.velocity.y ** 2);
      if (speed > this.SPEED) {
        this.velocity.x = (this.velocity.x / speed) * this.SPEED;
        this.velocity.y = (this.velocity.y / speed) * this.SPEED;
      }
    } else {
      // Apply friction when no input
      this.velocity.x *= this.FRICTION;
      this.velocity.y *= this.FRICTION;

      // Stop completely if velocity is very small
      if (Math.abs(this.velocity.x) < 0.1) this.velocity.x = 0;
      if (Math.abs(this.velocity.y) < 0.1) this.velocity.y = 0;
    }

    // Update position
    this.position.x += this.velocity.x * deltaTime;
    this.position.y += this.velocity.y * deltaTime;
  }

  /**
   * Get player's current speed
   */
  public getSpeed(): number {
    return Math.sqrt(this.velocity.x ** 2 + this.velocity.y ** 2);
  }
}