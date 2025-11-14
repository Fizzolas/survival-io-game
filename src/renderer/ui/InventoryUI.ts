import { Inventory } from '../../shared/types/Resources';

export class InventoryUI {
  constructor(private inventory: Inventory) {}

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.font = '16px Arial';
    ctx.fillStyle = '#fafafa';
    ctx.strokeStyle = '#aaa';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.rect(16, 16, 190, 95);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#222';
    ctx.font = 'bold 17px Arial';
    ctx.fillText('Inventory', 30, 36);

    ctx.font = '14px Arial';
    ctx.fillText(`Wood: ${this.inventory.resources.wood}`, 30, 58);
    ctx.fillText(`Stone: ${this.inventory.resources.stone}`, 30, 78);
    ctx.fillText(`Food: ${this.inventory.resources.food}`, 30, 98);
    ctx.fillText(`Mineral: ${this.inventory.resources.mineral}`, 115, 58);
    ctx.restore();
  }
}
