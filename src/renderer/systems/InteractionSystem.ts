import { ResourceNode } from '../entities/ResourceNode';
import { Player } from '../entities/Player';
import { Inventory, ResourceType } from '../../shared/types/Resources';

/**
 * Handles interaction logic (E to gather)
 */
export class InteractionSystem {
  private readonly GATHER_RADIUS = 30;
  public gathering: { node: ResourceNode | null; progress: number; active: boolean } = {
    node: null,
    progress: 0,
    active: false,
  };

  constructor(
    private world: { getNearbyResources: (x: number, y: number, radius: number) => ResourceNode[] },
    private player: Player,
    private inventory: Inventory
  ) {
    this.setUpListeners();
  }

  setUpListeners() {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'e' || e.key === 'E') {
        this.attemptGather();
      }
    });
  }

  attemptGather() {
    const nearby = this.world.getNearbyResources(
      this.player.position.x,
      this.player.position.y,
      this.GATHER_RADIUS,
    );
    if (!nearby.length) return;
    const node = nearby[0];
    this.gathering.active = true;
    this.gathering.node = node;
    this.gathering.progress = 0;
    // Simulate gather animation (would animate in main loop)
    const wasGathered = node.hit();
    if (wasGathered) {
      // Type-safe resource increment
      const resourceType: ResourceType = node.type;
      this.inventory.resources[resourceType]++;
      this.gathering.active = false;
      console.log(`Gathered ${resourceType}! Total: ${this.inventory.resources[resourceType]}`);
    }
  }

  /**
   * Reset gathering state
   */
  reset() {
    this.gathering = { node: null, progress: 0, active: false };
  }
}