import { Player } from '../Player';
import { InputState } from '../Player';

describe('Player', () => {
  let player: Player;

  beforeEach(() => {
    player = new Player(100, 100);
  });

  it('should initialize at correct position', () => {
    expect(player.position.x).toBe(100);
    expect(player.position.y).toBe(100);
  });

  it('should start with zero velocity', () => {
    expect(player.velocity.x).toBe(0);
    expect(player.velocity.y).toBe(0);
  });

  it('should move right when right input is pressed', () => {
    const input: InputState = { up: false, down: false, left: false, right: true };
    player.update(0.016, input); // One frame at 60fps
    expect(player.velocity.x).toBeGreaterThan(0);
  });

  it('should move left when left input is pressed', () => {
    const input: InputState = { up: false, down: false, left: true, right: false };
    player.update(0.016, input);
    expect(player.velocity.x).toBeLessThan(0);
  });

  it('should move up when up input is pressed', () => {
    const input: InputState = { up: true, down: false, left: false, right: false };
    player.update(0.016, input);
    expect(player.velocity.y).toBeLessThan(0);
  });

  it('should move down when down input is pressed', () => {
    const input: InputState = { up: false, down: true, left: false, right: false };
    player.update(0.016, input);
    expect(player.velocity.y).toBeGreaterThan(0);
  });

  it('should normalize diagonal movement', () => {
    const input: InputState = { up: true, down: false, left: false, right: true };
    player.update(0.016, input);
    
    // Diagonal speed should not exceed normal speed
    const speed = player.getSpeed();
    expect(speed).toBeLessThanOrEqual(200 * 0.016 * 2); // Allow some margin
  });

  it('should apply friction when no input', () => {
    // Give player some velocity
    player.velocity.x = 100;
    player.velocity.y = 100;
    
    const input: InputState = { up: false, down: false, left: false, right: false };
    player.update(0.016, input);
    
    // Velocity should decrease
    expect(player.velocity.x).toBeLessThan(100);
    expect(player.velocity.y).toBeLessThan(100);
  });

  it('should update position based on velocity', () => {
    const initialX = player.position.x;
    player.velocity.x = 100; // 100 units/sec
    
    const input: InputState = { up: false, down: false, left: false, right: false };
    player.update(1.0, input); // 1 second
    
    expect(player.position.x).toBeGreaterThan(initialX);
  });

  it('should calculate speed correctly', () => {
    player.velocity.x = 3;
    player.velocity.y = 4;
    expect(player.getSpeed()).toBe(5); // 3-4-5 triangle
  });
});