import { WorldGenerator } from './world/WorldGenerator';
import { Player } from './entities/Player';
import { Camera } from './systems/Camera';
import { Renderer } from './systems/Renderer';
import { InputManager } from './systems/InputManager';
import { InteractionSystem } from './systems/InteractionSystem';
import { InventoryUI } from './ui/InventoryUI';
import { Inventory } from '../shared/types/Resources';

console.log('=== Survival IO Game - Phase 3 ===');

let worldGen: WorldGenerator | null = null;
let player: Player | null = null;
let camera: Camera | null = null;
let renderer: Renderer | null = null;
let inputManager: InputManager | null = null;
let inventory: Inventory = {
  resources: { wood: 0, stone: 0, food: 0, mineral: 0 },
};
let inventoryUI: InventoryUI | null = null;
let interactionSystem: InteractionSystem | null = null;

window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
  if (!canvas) return;
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    if (camera) camera.resize(canvas.width, canvas.height);
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  worldGen = new WorldGenerator(2000, 2000);
  player = new Player(1000, 1000);
  camera = new Camera(canvas.width, canvas.height, 2000, 2000);
  camera.setTarget(player);
  inputManager = new InputManager();
  renderer = new Renderer(canvas.getContext('2d')!, camera);
  inventoryUI = new InventoryUI(inventory);
  interactionSystem = new InteractionSystem(worldGen, player, inventory);
  function gameLoop() {
    // Input / state update
    const input = inputManager!.getInputState();
    player!.update(1 / 60, input);
    camera!.update();
    // Render world/biomes/resources
    renderer!.clear();
    renderer!.drawWorld(2000, 2000);
    // Draw resource nodes
    worldGen!.resourceNodes.forEach((node) => {
      if (node.isGathered) return;
      // Node shape by type
      let color = '#654321';
      let r = 18;
      if (node.type === 'wood') {
        color = '#5d813b'; r = 23;
      } else if (node.type === 'stone') {
        color = '#a7a9a9'; r = 18;
      } else if (node.type === 'food') {
        color = '#e6a161'; r = 14;
      } else if (node.type === 'mineral') {
        color = '#32b8c6'; r = 19;
      }
      let pos = camera!.worldToScreen(node.position);
      renderer!.ctx.save();
      renderer!.ctx.beginPath();
      renderer!.ctx.arc(pos.x, pos.y, r, 0, Math.PI * 2);
      renderer!.ctx.fillStyle = color;
      renderer!.ctx.globalAlpha = 0.95;
      renderer!.ctx.fill();
      renderer!.ctx.restore();
    });
    // Draw player
    renderer!.drawPlayer(player!);
    // UI: FPS (placeholder), debug, inventory
    renderer!.drawUI(60, player!);
    inventoryUI!.draw(renderer!.ctx);
    requestAnimationFrame(gameLoop);
  }
  gameLoop();
});
