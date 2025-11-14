import { InputState } from '../entities/Player';

/**
 * Input management system
 * Tracks keyboard state for player movement
 */
export class InputManager {
  private keys: Set<string> = new Set();

  // Key mappings
  private readonly KEY_UP = ['w', 'W', 'ArrowUp'];
  private readonly KEY_DOWN = ['s', 'S', 'ArrowDown'];
  private readonly KEY_LEFT = ['a', 'A', 'ArrowLeft'];
  private readonly KEY_RIGHT = ['d', 'D', 'ArrowRight'];

  constructor() {
    this.setupEventListeners();
    console.log('InputManager initialized');
    console.log('Controls: WASD or Arrow keys to move');
  }

  /**
   * Set up keyboard event listeners
   */
  private setupEventListeners(): void {
    window.addEventListener('keydown', (e: KeyboardEvent) => {
      this.keys.add(e.key);
      
      // Prevent default behavior for game keys
      if (this.isGameKey(e.key)) {
        e.preventDefault();
      }
    });

    window.addEventListener('keyup', (e: KeyboardEvent) => {
      this.keys.delete(e.key);
    });

    // Clear all keys when window loses focus
    window.addEventListener('blur', () => {
      this.keys.clear();
    });
  }

  /**
   * Check if a key is a game control key
   */
  private isGameKey(key: string): boolean {
    return [
      ...this.KEY_UP,
      ...this.KEY_DOWN,
      ...this.KEY_LEFT,
      ...this.KEY_RIGHT,
    ].includes(key);
  }

  /**
   * Check if any key in an array is pressed
   */
  private isAnyKeyPressed(keyArray: string[]): boolean {
    return keyArray.some(key => this.keys.has(key));
  }

  /**
   * Get current input state
   */
  public getInputState(): InputState {
    return {
      up: this.isAnyKeyPressed(this.KEY_UP),
      down: this.isAnyKeyPressed(this.KEY_DOWN),
      left: this.isAnyKeyPressed(this.KEY_LEFT),
      right: this.isAnyKeyPressed(this.KEY_RIGHT),
    };
  }

  /**
   * Check if a specific key is pressed
   */
  public isKeyPressed(key: string): boolean {
    return this.keys.has(key);
  }

  /**
   * Get all currently pressed keys
   */
  public getPressedKeys(): string[] {
    return Array.from(this.keys);
  }
}