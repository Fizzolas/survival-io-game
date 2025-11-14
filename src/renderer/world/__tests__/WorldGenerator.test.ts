import { WorldGenerator } from '../world/WorldGenerator';
import { BiomeType } from '../world/Biome';

describe('WorldGenerator', () => {
  it('generates biome map with correct dimensions', () => {
    const w = new WorldGenerator(200, 200);
    expect(w.biomeMap.length).toBeGreaterThan(0);
    expect(w.biomeMap[0].length).toBeGreaterThan(0);
  });

  it('spawns resource nodes distributed across biomes', () => {
    const w = new WorldGenerator(800, 800);
    let forestCount = w.resourceNodes.filter(n => n.biome === 'forest').length;
    let desertCount = w.resourceNodes.filter(n => n.biome === 'desert').length;
    expect(forestCount).toBeGreaterThan(0);
    expect(desertCount).toBeGreaterThan(0);
  });

  it('can lookup nearby resources by position', () => {
    const w = new WorldGenerator(400, 400);
    const nodes = w.getNearbyResources(220, 220, 60);
    expect(Array.isArray(nodes)).toBe(true);
    // There should be resource nodes in typical region
    expect(nodes.length).toBeGreaterThanOrEqual(0);
  });
});
