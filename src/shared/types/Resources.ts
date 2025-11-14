export type ResourceType = 'wood' | 'stone' | 'food' | 'mineral';

export interface ResourceAmount {
  wood: number;
  stone: number;
  food: number;
  mineral: number;
}

export interface Inventory {
  resources: ResourceAmount;
}

export interface ResourceNode {
  id: string;
  type: ResourceType;
  position: { x: number; y: number };
  biome: string;
  hitsRequired: number;
  currentHits: number;
  isGathered: boolean;
}
