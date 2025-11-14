import { InputManager } from '../InputManager';

// Mock window event listeners
const eventListeners: { [key: string]: ((e: any) => void)[] } = {};

global.window = {
  addEventListener: jest.fn((event: string, callback: (e: any) => void) => {
    if (!eventListeners[event]) {
      eventListeners[event] = [];
    }
    eventListeners[event].push(callback);
  }),
} as any;

describe('InputManager', () => {
  let inputManager: InputManager;

  beforeEach(() => {
    // Clear event listeners
    Object.keys(eventListeners).forEach(key => {
      eventListeners[key] = [];
    });
    
    inputManager = new InputManager();
  });

  it('should initialize with no keys pressed', () => {
    const state = inputManager.getInputState();
    expect(state.up).toBe(false);
    expect(state.down).toBe(false);
    expect(state.left).toBe(false);
    expect(state.right).toBe(false);
  });

  it('should detect W key as up', () => {
    const keydownHandlers = eventListeners['keydown'];
    if (keydownHandlers) {
      keydownHandlers.forEach(handler => handler({ key: 'w', preventDefault: jest.fn() }));
    }
    
    const state = inputManager.getInputState();
    expect(state.up).toBe(true);
  });

  it('should detect ArrowUp as up', () => {
    const keydownHandlers = eventListeners['keydown'];
    if (keydownHandlers) {
      keydownHandlers.forEach(handler => handler({ key: 'ArrowUp', preventDefault: jest.fn() }));
    }
    
    const state = inputManager.getInputState();
    expect(state.up).toBe(true);
  });

  it('should detect multiple simultaneous keys', () => {
    const keydownHandlers = eventListeners['keydown'];
    if (keydownHandlers) {
      keydownHandlers.forEach(handler => {
        handler({ key: 'w', preventDefault: jest.fn() });
        handler({ key: 'd', preventDefault: jest.fn() });
      });
    }
    
    const state = inputManager.getInputState();
    expect(state.up).toBe(true);
    expect(state.right).toBe(true);
  });

  it('should check if specific key is pressed', () => {
    const keydownHandlers = eventListeners['keydown'];
    if (keydownHandlers) {
      keydownHandlers.forEach(handler => handler({ key: 'w', preventDefault: jest.fn() }));
    }
    
    expect(inputManager.isKeyPressed('w')).toBe(true);
    expect(inputManager.isKeyPressed('x')).toBe(false);
  });
});