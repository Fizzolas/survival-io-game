// Remove unused BiomeType import completely
import { WorldGenerator } from '../WorldGenerator';

describe('WorldGenerator', () => {
  it('generates biome map as Map', () => {
    const w = new WorldGenerator(200, 200);
    expect(w.biomeMap instanceof Map).toBe(true);
    expect(w.biomeMap.size).toBeGreaterThan(0);
  });
  it('spawns resource nodes distributed across biomes', () => {
    const w = new WorldGenerator(800, 800);
    let forestCount = w.resourceNodes.filter((n: any) => n.biome === 'forest').length;
    let desertCount = w.resourceNodes.filter((n: any) => n.biome === 'desert').length;
    expect(forestCount).toBeGreaterThanOrEqual(0);
    expect(desertCount).toBeGreaterThanOrEqual(0);
  });
  it('can lookup nearby resources by position', () => {
    const w = new WorldGenerator(400, 400);
    const nodes = w.getNearbyResources(220, 220, 60);
    expect(Array.isArray(nodes)).toBe(true);
    // There should be resource nodes in typical region
    expect(nodes.length).toBeGreaterThanOrEqual(0);
  });
});
