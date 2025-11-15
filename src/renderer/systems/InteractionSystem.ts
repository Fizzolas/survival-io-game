import { ResourceNode } from '../entities/ResourceNode';
import { Player } from '../entities/Player';
import { Inventory } from '../../shared/types/Resources';

/**
 * Handles player interaction with resources (E key to gather)
 */
export class InteractionSystem {
  private readonly GATHER_RADIUS = 60;
  public gathering: {
    node: ResourceNode | null;
    progress: number;
    active: boolean;
  } = {
    node: null,
    progress: 0,
    active: false,
  };

  constructor(
    private getNearbyResources: (x: number, y: number, r: number) => ResourceNode[],
    private player: Player,
    private inventory: Inventory
  ) {
    this.setupListeners();
    console.log('InteractionSystem initialized - Press E to gather resources');
  }

  /**
   * Set up keyboard listeners
   */
  private setupListeners(): void {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'e' || e.key === 'E') {
        this.attemptGather();
        e.preventDefault();
      }
    });
  }

  /**
   * Attempt to gather from nearby resource
   */
  attemptGather(): void {
    const nearby = this.getNearbyResources(
      this.player.position.x,
      this.player.position.y,
      this.GATHER_RADIUS
    );

    if (!nearby.length) {
      console.log('No resources nearby');
      return;
    }

    // Get closest resource
    const node = nearby.sort((a, b) => {
      const distA = Math.hypot(a.position.x - this.player.position.x, a.position.y - this.player.position.y);
      const distB = Math.hypot(b.position.x - this.player.position.x, b.position.y - this.player.position.y);
      return distA - distB;
    })[0];

    console.log(`Gathering from ${node.type} (${node.currentHits + 1}/${node.hitsRequired})`);

    // Hit the resource
    const gathered = node.hit();

    if (gathered) {
      // Resource fully gathered
      this.inventory.resources[node.type]++;
      console.log(`Gathered ${node.type}! Inventory: ${this.inventory.resources[node.type]}`);
      this.gathering.active = false;
      this.gathering.node = null;
    } else {
      // Still gathering
      this.gathering.active = true;
      this.gathering.node = node;
    }
  }

  /**
   * Get nearest resource within radius
   */
  getNearestResource(): ResourceNode | null {
    const nearby = this.getNearbyResources(
      this.player.position.x,
      this.player.position.y,
      this.GATHER_RADIUS
    );

    if (!nearby.length) return null;

    return nearby.sort((a, b) => {
      const distA = Math.hypot(a.position.x - this.player.position.x, a.position.y - this.player.position.y);
      const distB = Math.hypot(b.position.x - this.player.position.x, b.position.y - this.player.position.y);
      return distA - distB;
    })[0];
  }

  /**
   * Reset gathering state
   */
  reset(): void {
    this.gathering = { node: null, progress: 0, active: false };
  }
}