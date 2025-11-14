import { ResourceType } from '../../shared/types/Resources';

export interface ResourceNodeProps {
  id: string;
  type: ResourceType;
  position: { x: number; y: number };
  biome: string;
  hitsRequired: number;
  currentHits: number;
  isGathered: boolean;
}

export class ResourceNode {
  public id: string;
  public type: ResourceType;
  public position: { x: number; y: number };
  public biome: string;
  public hitsRequired: number;
  public currentHits: number;
  public isGathered: boolean;

  constructor(props: ResourceNodeProps) {
    this.id = props.id;
    this.type = props.type;
    this.position = props.position;
    this.biome = props.biome;
    this.hitsRequired = props.hitsRequired;
    this.currentHits = props.currentHits;
    this.isGathered = props.isGathered;
  }

  /**
   * Handle gathering action
   */
  hit(): boolean {
    if (this.isGathered) return false;
    this.currentHits++;
    if (this.currentHits >= this.hitsRequired) {
      this.isGathered = true;
      return true; // was gathered
    }
    return false;
  }
}
