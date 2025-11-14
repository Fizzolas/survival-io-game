import { GameEngine } from '../GameEngine';

// Mock canvas and context
const mockContext = {
  fillStyle: '',
  strokeStyle: '',
  lineWidth: 0,
  font: '',
  textAlign: '',
  textBaseline: '',
  fillRect: jest.fn(),
  strokeRect: jest.fn(),
  fillText: jest.fn(),
  beginPath: jest.fn(),
  moveTo: jest.fn(),
  lineTo: jest.fn(),
  arc: jest.fn(),
  ellipse: jest.fn(),
  stroke: jest.fn(),
  fill: jest.fn(),
  save: jest.fn(),
  restore: jest.fn(),
  translate: jest.fn(),
};

const mockCanvas = {
  width: 800,
  height: 600,
  getContext: jest.fn(() => mockContext),
} as any;

// Mock requestAnimationFrame
let animationFrameCallback: ((time: number) => void) | null = null;
global.requestAnimationFrame = jest.fn((callback) => {
  animationFrameCallback = callback;
  return 1;
});

global.cancelAnimationFrame = jest.fn();

// Mock performance.now()
global.performance = {
  now: jest.fn(() => Date.now()),
} as any;

describe('GameEngine Integration', () => {
  let gameEngine: GameEngine;

  beforeEach(() => {
    jest.clearAllMocks();
    gameEngine = new GameEngine(mockCanvas);
  });

  it('should initialize with canvas', () => {
    expect(mockCanvas.getContext).toHaveBeenCalledWith('2d');
  });

  it('should start the game loop', () => {
    gameEngine.start();
    expect(requestAnimationFrame).toHaveBeenCalled();
  });

  it('should stop the game loop', () => {
    gameEngine.start();
    gameEngine.stop();
    expect(cancelAnimationFrame).toHaveBeenCalled();
  });

  it('should not start twice', () => {
    const spy = jest.spyOn(console, 'warn').mockImplementation();
    gameEngine.start();
    gameEngine.start(); // Try to start again
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it('should render on game loop tick', () => {
    gameEngine.start();
    
    // Trigger animation frame
    if (animationFrameCallback) {
      animationFrameCallback(16.67); // One frame at 60fps
    }
    
    // Check that rendering methods were called
    expect(mockContext.fillRect).toHaveBeenCalled();
  });

  it('should handle resize', () => {
    gameEngine.resize(1024, 768);
    expect(mockCanvas.width).toBe(1024);
    expect(mockCanvas.height).toBe(768);
  });

  it('should calculate FPS', () => {
    gameEngine.start();
    
    // Simulate multiple frames
    for (let i = 0; i < 60; i++) {
      if (animationFrameCallback) {
        animationFrameCallback(i * 16.67);
      }
    }
    
    const fps = gameEngine.getFPS();
    expect(fps).toBeGreaterThan(0);
  });
});