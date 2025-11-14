import { BiomeType } from './Biome';
import { ResourceNode as ResourceNodeType } from '../../shared/types/Resources';

/**
 * Simplified noise generator (deterministic)
 * In production, use simplex-noise or perlin-noise package
 */
class SimplexNoise {
  constructor(private seed: string) {}
  
  noise2D(x: number, y: number): number {
    // Simple pseudo-random noise based on coordinates
    const hash = (x * 374761393 + y * 668265263) >>> 0;
    return (((hash * 2654435761) >>> 0) / 4294967296) * 2 - 1;
  }
}

export class WorldGenerator {
  private width: number;
  private height: number;
  private simplex: SimplexNoise;

  public biomeMap: BiomeType[][];
  public resourceNodes: ResourceNodeType[] = [];

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.simplex = new SimplexNoise('survival-seed');
    this.biomeMap = [];
    this.generateBiomes();
    this.spawnResources();
  }

  // Generate biomes with noise
  generateBiomes(): void {
    const scale = 0.009; // controls size of biomes
    for (let x = 0; x < this.width; x += 40) {
      this.biomeMap[x] = [];
      for (let y = 0; y < this.height; y += 40) {
        const noiseVal = this.simplex.noise2D(x * scale, y * scale);
        let biome: BiomeType;
        if (noiseVal < -0.4) biome = 'swamp';
        else if (noiseVal < -0.15) biome = 'forest';
        else if (noiseVal < 0.15) biome = 'plains';
        else if (noiseVal < 0.5) biome = 'desert';
        else biome = 'snow';
        this.biomeMap[x][y] = biome;
      }
    }
  }

  // Place resource nodes according to biome
  spawnResources(): void {
    for (let x = 0; x < this.width; x += 40) {
      for (let y = 0; y < this.height; y += 40) {
        const biome = this.biomeMap[x]?.[y];
        if (!biome) continue;
        
        const center = { x: x + 20, y: y + 20 };
        
        // Forest: trees, rocks
        if (biome === 'forest') {
          this.resourceNodes.push({
            id: `${biome}-tree-${x}-${y}`,
            type: 'wood',
            position: center,
            biome,
            hitsRequired: 3,
            currentHits: 0,
            isGathered: false,
          });
          if (Math.random() < 0.4)
            this.resourceNodes.push({
              id: `${biome}-rock-${x}-${y}`,
              type: 'stone',
              position: { x: x + 12, y: y + 28 },
              biome,
              hitsRequired: 5,
              currentHits: 0,
              isGathered: false,
            });
        } else if (biome === 'plains') {
          if (Math.random() < 0.6)
            this.resourceNodes.push({
              id: `${biome}-bush-${x}-${y}`,
              type: 'food',
              position: center,
              biome,
              hitsRequired: 1,
              currentHits: 0,
              isGathered: false,
            });
        } else if (biome === 'desert') {
          if (Math.random() < 0.3)
            this.resourceNodes.push({
              id: `${biome}-cactus-${x}-${y}`,
              type: 'mineral',
              position: center,
              biome,
              hitsRequired: 10,
              currentHits: 0,
              isGathered: false,
            });
        } else if (biome === 'snow') {
          this.resourceNodes.push({
            id: `${biome}-pine-${x}-${y}`,
            type: 'wood',
            position: center,
            biome,
            hitsRequired: 4,
            currentHits: 0,
            isGathered: false,
          });
          if (Math.random() < 0.3)
            this.resourceNodes.push({
              id: `${biome}-ice-rock-${x}-${y}`,
              type: 'stone',
              position: { x: x + 10, y: y + 15 },
              biome,
              hitsRequired: 6,
              currentHits: 0,
              isGathered: false,
            });
        } else if (biome === 'swamp') {
          this.resourceNodes.push({
            id: `${biome}-herb-${x}-${y}`,
            type: 'mineral',
            position: center,
            biome,
            hitsRequired: 10,
            currentHits: 0,
            isGathered: false,
          });
          if (Math.random() < 0.2)
            this.resourceNodes.push({
              id: `${biome}-dead-tree-${x}-${y}`,
              type: 'wood',
              position: { x: x + 16, y: y + 14 },
              biome,
              hitsRequired: 3,
              currentHits: 0,
              isGathered: false,
            });
        }
      }
    }
  }

  // Helper to get resources at specified area for spatial hash lookup
  getNearbyResources(x: number, y: number, radius: number): ResourceNodeType[] {
    return this.resourceNodes.filter(node =>
      !node.isGathered &&
      Math.hypot(node.position.x - x, node.position.y - y) <= radius);
  }
}