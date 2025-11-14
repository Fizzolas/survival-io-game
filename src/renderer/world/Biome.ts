export type BiomeType = 'forest' | 'plains' | 'desert' | 'snow' | 'swamp';

export class Biome {
  constructor(public type: BiomeType) {}

  static getBiomeConfig(type: BiomeType) {
    switch (type) {
      case 'forest': return { trees: 80, rocks: 30, bushes: 10 };
      case 'plains': return { trees: 20, rocks: 15, bushes: 60 };
      case 'desert': return { cacti: 30, rocks: 45, bushes: 5 };
      case 'snow': return { pine: 50, ice_rocks: 35, bushes: 2 };
      case 'swamp': return { dead_trees: 35, rocks: 15, herbs: 10 };
      default: return {};
    }
  }
}
