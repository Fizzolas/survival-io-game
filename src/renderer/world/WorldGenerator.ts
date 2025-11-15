// Lightweight SimplexNoise implementation
export class SimplexNoise {
  private seed: number;

  constructor(seed: string = 'default') {
    // Simple hash for seed
    this.seed = 0;
    for (let i = 0; i < seed.length; i++) {
      this.seed = ((this.seed << 5) - this.seed) + seed.charCodeAt(i);
      this.seed = this.seed & this.seed;
    }
  }

  noise2D(x: number, y: number): number {
    // Simple pseudo-random noise
    const hash = Math.sin(x * 12.9898 + y * 78.233 + this.seed) * 43758.5453;
    return (hash - Math.floor(hash)) * 2 - 1;
  }
}

import { BiomeType } from './Biome';
import { ResourceNode } from '../entities/ResourceNode';

export class WorldGenerator {
  private width: number;
  private height: number;
  private simplex: SimplexNoise;

  public biomeMap: Map<string, BiomeType> = new Map();
  public resourceNodes: ResourceNode[] = [];

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.simplex = new SimplexNoise('survival-seed-123');
    this.generateBiomes();
    this.spawnResources();
    console.log(`World generated: ${this.resourceNodes.length} resource nodes`);
  }

  /**
   * Generate biomes using noise
   */
  generateBiomes(): void {
    const scale = 0.003; // Larger biome patches
    const cellSize = 100; // Biome cell size
    
    for (let x = 0; x < this.width; x += cellSize) {
      for (let y = 0; y < this.height; y += cellSize) {
        const noiseVal = this.simplex.noise2D(x * scale, y * scale);
        let biome: BiomeType;
        
        if (noiseVal < -0.4) biome = 'swamp';
        else if (noiseVal < -0.15) biome = 'forest';
        else if (noiseVal < 0.15) biome = 'plains';
        else if (noiseVal < 0.5) biome = 'desert';
        else biome = 'snow';
        
        this.biomeMap.set(`${x},${y}`, biome);
      }
    }
  }

  /**
   * Spawn resources based on biome
   */
  spawnResources(): void {
    const cellSize = 100;
    
    for (let x = 0; x < this.width; x += cellSize) {
      for (let y = 0; y < this.height; y += cellSize) {
        const biome = this.getBiomeAt(x, y);
        if (!biome) continue;

        // Spawn resources based on biome type
        if (biome === 'forest') {
          // High tree density
          for (let i = 0; i < 3; i++) {
            this.addResource('wood', x, y, cellSize, biome, 3);
          }
          // Moderate rocks
          if (Math.random() < 0.5) {
            this.addResource('stone', x, y, cellSize, biome, 5);
          }
        } else if (biome === 'plains') {
          // Low trees, high bushes
          if (Math.random() < 0.3) {
            this.addResource('wood', x, y, cellSize, biome, 3);
          }
          for (let i = 0; i < 2; i++) {
            if (Math.random() < 0.7) {
              this.addResource('food', x, y, cellSize, biome, 1);
            }
          }
        } else if (biome === 'desert') {
          // Cacti (minerals)
          if (Math.random() < 0.4) {
            this.addResource('mineral', x, y, cellSize, biome, 10);
          }
          // Rare rocks
          if (Math.random() < 0.3) {
            this.addResource('stone', x, y, cellSize, biome, 7);
          }
        } else if (biome === 'snow') {
          // Pine trees
          if (Math.random() < 0.6) {
            this.addResource('wood', x, y, cellSize, biome, 4);
          }
          // Ice rocks
          if (Math.random() < 0.4) {
            this.addResource('stone', x, y, cellSize, biome, 6);
          }
        } else if (biome === 'swamp') {
          // Dead trees
          if (Math.random() < 0.4) {
            this.addResource('wood', x, y, cellSize, biome, 3);
          }
          // Rare herbs
          if (Math.random() < 0.2) {
            this.addResource('mineral', x, y, cellSize, biome, 10);
          }
        }
      }
    }
  }

  /**
   * Add a resource node at random position within cell
   */
  private addResource(
    type: 'wood' | 'stone' | 'food' | 'mineral',
    cellX: number,
    cellY: number,
    cellSize: number,
    biome: BiomeType,
    hits: number
  ): void {
    const offsetX = Math.random() * (cellSize - 40) + 20;
    const offsetY = Math.random() * (cellSize - 40) + 20;
    
    this.resourceNodes.push(new ResourceNode({
      id: `${biome}-${type}-${cellX}-${cellY}-${Math.random()}`,
      type,
      position: { x: cellX + offsetX, y: cellY + offsetY },
      biome,
      hitsRequired: hits,
      currentHits: 0,
      isGathered: false,
    }));
  }

  /**
   * Get biome at world coordinates
   */
  getBiomeAt(x: number, y: number): BiomeType | null {
    const cellSize = 100;
    const cellX = Math.floor(x / cellSize) * cellSize;
    const cellY = Math.floor(y / cellSize) * cellSize;
    return this.biomeMap.get(`${cellX},${cellY}`) || null;
  }

  /**
   * Get resources near position
   */
  getNearbyResources(x: number, y: number, radius: number): ResourceNode[] {
    return this.resourceNodes.filter(node =>
      !node.isGathered &&
      Math.hypot(node.position.x - x, node.position.y - y) <= radius
    );
  }

  /**
   * Get biome color for rendering
   */
  getBiomeColor(biome: BiomeType): string {
    switch (biome) {
      case 'forest': return '#2d5016';
      case 'plains': return '#7a9b3a';
      case 'desert': return '#d4a574';
      case 'snow': return '#e8f4f8';
      case 'swamp': return '#4a5d4a';
      default: return '#5d8a3a';
    }
  }
}