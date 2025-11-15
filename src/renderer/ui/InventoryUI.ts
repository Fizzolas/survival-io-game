import { Inventory } from '../../shared/types/Resources';

/**
 * Renders the inventory UI panel (top-right corner)
 */
export class InventoryUI {
  constructor(private inventory: Inventory) {}

  /**
   * Draw inventory panel (top-right corner)
   */
  draw(ctx: CanvasRenderingContext2D, canvasWidth: number): void {
    ctx.save();
    // Position inventory panel at top-right
    const panelWidth = 200;
    const panelHeight = 120;
    const x = canvasWidth - panelWidth - 16;
    const y = 16;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(x, y, panelWidth, panelHeight);
    ctx.strokeStyle = '#32b8c6';
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, panelWidth, panelHeight);
    ctx.fillStyle = '#32b8c6';
    ctx.font = 'bold 18px Arial';
    ctx.fillText('Inventory', x + 10, y + 25);
    ctx.fillStyle = '#f5f5f5';
    ctx.font = '14px Arial';
    const startY = y + 50;
    const lineHeight = 20;
    ctx.fillText(`Wood: ${this.inventory.resources.wood}`, x + 10, startY);
    ctx.fillText(`Stone: ${this.inventory.resources.stone}`, x + 10, startY + lineHeight);
    ctx.fillText(`Food: ${this.inventory.resources.food}`, x + 10, startY + lineHeight * 2);
    ctx.fillText(`Mineral: ${this.inventory.resources.mineral}`, x + 10, startY + lineHeight * 3);
    ctx.restore();
  }
}
