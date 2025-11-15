import { BiomeType } from './Biome';
import { ResourceNode } from '../../shared/types/Resources';
import { getBiomeColor } from './BiomeColors';
import SimplexNoise from 'simplex-noise';

export class WorldGenerator {
  private width: number;
  private height: number;
  private simplex: SimplexNoise;

  public biomeMap: BiomeType[][];
  public resourceNodes: ResourceNode[] = [];

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.simplex = new SimplexNoise('survival-seed');
    this.biomeMap = [];
    this.generateBiomes();
    this.spawnResources();
  }

  // Generate larger contiguous biome regions
  generateBiomes(): void {
    const scale = 0.0042; // Larger scale, more natural regions
    for (let x = 0; x < this.width; x += 40) {
      this.biomeMap[x] = [];
      for (let y = 0; y < this.height; y += 40) {
        const noiseVal = this.simplex.noise2D(x * scale, y * scale);
        let biome: BiomeType;
        if (noiseVal < -0.45) biome = 'swamp';
        else if (noiseVal < -0.22) biome = 'forest';
        else if (noiseVal < 0.15) biome = 'plains';
        else if (noiseVal < 0.39) biome = 'desert';
        else biome = 'snow';
        this.biomeMap[x][y] = biome;
      }
    }
  }

  // Draw background tiles per biome
  drawBiomeMap(ctx: CanvasRenderingContext2D, camera: any) {
    ctx.save();
    for (let x = 0; x < this.width; x += 40) {
      for (let y = 0; y < this.height; y += 40) {
        const biome = this.biomeMap[x][y];
        if (!biome) continue;
        const screenPos = camera.worldToScreen({ x: x, y: y });
        ctx.fillStyle = getBiomeColor(biome);
        ctx.fillRect(screenPos.x, screenPos.y, 40, 40);
      }
    }
    ctx.restore();
  }

  // Place resource nodes with local coherence
  spawnResources(): void {
    for (let x = 0; x < this.width; x += 40) {
      for (let y = 0; y < this.height; y += 40) {
        const biome = this.biomeMap[x][y];
        if (!biome) continue;
        const center = { x: x + 20, y: y + 20 };
        // Forest: dense, only forest nodes
        if (biome === 'forest' && Math.random() < 0.85)
          this.resourceNodes.push({
            id: `${biome}-tree-${x}-${y}`,
            type: 'wood',
            position: center,
            biome,
            hitsRequired: 3,
            currentHits: 0,
            isGathered: false,
          });
        // Plains: mostly bushes
        if (biome === 'plains' && Math.random() < 0.45)
          this.resourceNodes.push({
            id: `${biome}-bush-${x}-${y}`,
            type: 'food',
            position: center,
            biome,
            hitsRequired: 1,
            currentHits: 0,
            isGathered: false,
          });
        // Desert: only minerals/cacti
        if (biome === 'desert' && Math.random() < 0.6)
          this.resourceNodes.push({
            id: `${biome}-cactus-${x}-${y}`,
            type: 'mineral',
            position: center,
            biome,
            hitsRequired: 10,
            currentHits: 0,
            isGathered: false,
          });
        // Snow: pine, ice_rocks
        if (biome === 'snow' && Math.random() < 0.7)
          this.resourceNodes.push({
            id: `${biome}-pine-${x}-${y}`,
            type: 'wood',
            position: center,
            biome,
            hitsRequired: 4,
            currentHits: 0,
            isGathered: false,
          });
        // Swamp: rare mineral/herb
        if (biome === 'swamp' && Math.random() < 0.4)
          this.resourceNodes.push({
            id: `${biome}-herb-${x}-${y}`,
            type: 'mineral',
            position: center,
            biome,
            hitsRequired: 10,
            currentHits: 0,
            isGathered: false,
          });
      }
    }
  }

  getNearbyResources(x: number, y: number, radius: number): ResourceNode[] {
    return this.resourceNodes.filter(node =>
      !node.isGathered &&
      Math.hypot(node.position.x - x, node.position.y - y) <= radius);
  }
}
