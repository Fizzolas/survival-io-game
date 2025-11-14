/**
 * Basic test to verify Jest is working
 */

import { Vector2 } from '../types';

describe('Types', () => {
  it('should define Vector2 interface', () => {
    const vector: Vector2 = { x: 10, y: 20 };
    expect(vector.x).toBe(10);
    expect(vector.y).toBe(20);
  });
});