import { Inventory } from '../../shared/types/Resources';
import { Player } from './Player';

export class PlayerWithInventory extends Player {
  public inventory: Inventory;

  constructor(x: number, y: number) {
    super(x, y);
    this.inventory = {
      resources: { wood: 0, stone: 0, food: 0, mineral: 0 },
    };
  }
}
