import { Player } from '../entities/Player';
import { Camera } from '../systems/Camera';
import { InputManager } from '../systems/InputManager';
import { Renderer } from '../systems/Renderer';

/**
 * Main game engine class
 * Handles game loop, updates, and rendering coordination
 */
export class GameEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private player: Player;
  private camera: Camera;
  private inputManager: InputManager;
  private renderer: Renderer;

  private lastFrameTime: number = 0;
  private fps: number = 0;
  private frameCount: number = 0;
  private fpsUpdateTime: number = 0;
  private isRunning: boolean = false;
  private animationFrameId: number | null = null;

  // World configuration
  private readonly WORLD_WIDTH = 2000;
  private readonly WORLD_HEIGHT = 2000;
  private readonly TARGET_FPS = 60;
  private readonly FIXED_TIME_STEP = 1000 / 60; // 16.67ms per frame

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Failed to get 2D context from canvas');
    }
    this.ctx = ctx;

    // Initialize systems
    this.player = new Player(this.WORLD_WIDTH / 2, this.WORLD_HEIGHT / 2);
    this.camera = new Camera(canvas.width, canvas.height, this.WORLD_WIDTH, this.WORLD_HEIGHT);
    this.inputManager = new InputManager();
    this.renderer = new Renderer(this.ctx, this.camera);

    // Set camera to follow player
    this.camera.setTarget(this.player);

    console.log('GameEngine initialized');
    console.log(`World size: ${this.WORLD_WIDTH}x${this.WORLD_HEIGHT}`);
    console.log(`Player spawn: (${this.player.position.x}, ${this.player.position.y})`);
  }

  /**
   * Start the game loop
   */
  public start(): void {
    if (this.isRunning) {
      console.warn('Game is already running');
      return;
    }

    console.log('Starting game loop...');
    this.isRunning = true;
    this.lastFrameTime = performance.now();
    this.fpsUpdateTime = this.lastFrameTime;
    this.gameLoop(this.lastFrameTime);
  }

  /**
   * Stop the game loop
   */
  public stop(): void {
    if (!this.isRunning) return;

    console.log('Stopping game loop...');
    this.isRunning = false;
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  /**
   * Main game loop using requestAnimationFrame
   */
  private gameLoop = (currentTime: number): void => {
    if (!this.isRunning) return;

    // Calculate delta time in seconds
    const deltaTime = (currentTime - this.lastFrameTime) / 1000;
    this.lastFrameTime = currentTime;

    // Update FPS counter
    this.updateFPS(currentTime);

    // Update game state
    this.update(deltaTime);

    // Render frame
    this.render();

    // Schedule next frame
    this.animationFrameId = requestAnimationFrame(this.gameLoop);
  };

  /**
   * Update game logic
   */
  private update(deltaTime: number): void {
    // Get input state
    const input = this.inputManager.getInputState();

    // Update player
    this.player.update(deltaTime, input);

    // Update camera to follow player
    this.camera.update();
  }

  /**
   * Render the game
   */
  private render(): void {
    // Clear canvas
    this.renderer.clear();

    // Draw world background (grass)
    this.renderer.drawWorld(this.WORLD_WIDTH, this.WORLD_HEIGHT);

    // Draw player
    this.renderer.drawPlayer(this.player);

    // Draw UI (FPS counter)
    this.renderer.drawUI(this.fps, this.player);
  }

  /**
   * Calculate and update FPS
   */
  private updateFPS(currentTime: number): void {
    this.frameCount++;

    // Update FPS every second
    if (currentTime - this.fpsUpdateTime >= 1000) {
      this.fps = Math.round(this.frameCount * 1000 / (currentTime - this.fpsUpdateTime));
      this.frameCount = 0;
      this.fpsUpdateTime = currentTime;
    }
  }

  /**
   * Handle canvas resize
   */
  public resize(width: number, height: number): void {
    this.canvas.width = width;
    this.canvas.height = height;
    this.camera.resize(width, height);
    console.log(`Canvas resized to ${width}x${height}`);
  }

  /**
   * Get current FPS
   */
  public getFPS(): number {
    return this.fps;
  }
}