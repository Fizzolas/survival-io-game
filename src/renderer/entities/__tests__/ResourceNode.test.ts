import { ResourceNode } from '../ResourceNode';

describe('ResourceNode', () => {
  it('should be gathered after required hits', () => {
    const node = new ResourceNode({
      id: 'test',
      type: 'wood',
      position: { x: 10, y: 20 },
      biome: 'forest',
      hitsRequired: 3,
      currentHits: 0,
      isGathered: false,
    });
    expect(node.isGathered).toBe(false);
    // Hit three times
    node.hit(); node.hit();
    expect(node.isGathered).toBe(false);
    node.hit();
    expect(node.isGathered).toBe(true);
  });
});
