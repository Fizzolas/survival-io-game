import { Camera } from '../Camera';
import { Player } from '../../entities/Player';

describe('Camera', () => {
  let camera: Camera;
  let player: Player;

  beforeEach(() => {
    camera = new Camera(800, 600, 2000, 2000);
    player = new Player(1000, 1000);
  });

  it('should initialize with correct dimensions', () => {
    expect(camera.width).toBe(800);
    expect(camera.height).toBe(600);
  });

  it('should center on target when set', () => {
    camera.setTarget(player);
    // Camera should center on player
    expect(camera.position.x).toBe(player.position.x - camera.width / 2);
    expect(camera.position.y).toBe(player.position.y - camera.height / 2);
  });

  it('should convert world to screen coordinates', () => {
    camera.position = { x: 100, y: 100 };
    const worldPos = { x: 150, y: 150 };
    const screenPos = camera.worldToScreen(worldPos);
    
    expect(screenPos.x).toBe(50);
    expect(screenPos.y).toBe(50);
  });

  it('should convert screen to world coordinates', () => {
    camera.position = { x: 100, y: 100 };
    const screenPos = { x: 50, y: 50 };
    const worldPos = camera.screenToWorld(screenPos);
    
    expect(worldPos.x).toBe(150);
    expect(worldPos.y).toBe(150);
  });

  it('should respect world boundaries', () => {
    player.position = { x: 100, y: 100 }; // Near edge
    camera.setTarget(player);
    camera.update();
    
    // Camera should not go below 0
    expect(camera.position.x).toBeGreaterThanOrEqual(0);
    expect(camera.position.y).toBeGreaterThanOrEqual(0);
  });

  it('should detect visible objects', () => {
    camera.position = { x: 0, y: 0 };
    
    const visiblePos = { x: 400, y: 300 }; // Middle of screen
    const invisiblePos = { x: 2000, y: 2000 }; // Far away
    
    expect(camera.isVisible(visiblePos)).toBe(true);
    expect(camera.isVisible(invisiblePos)).toBe(false);
  });

  it('should handle resize', () => {
    camera.resize(1024, 768);
    expect(camera.width).toBe(1024);
    expect(camera.height).toBe(768);
  });
});