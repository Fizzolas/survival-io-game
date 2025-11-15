import { WorldGenerator } from './world/WorldGenerator';
import { Player } from './entities/Player';
import { Camera } from './systems/Camera';
import { Renderer } from './systems/Renderer';
import { InputManager } from './systems/InputManager';
import { InteractionSystem } from './systems/InteractionSystem';
import { InventoryUI } from './ui/InventoryUI';
import { Inventory } from '../shared/types/Resources';
import { BiomeType } from './world/Biome';

console.log('=== Survival IO Game - Phase 3 (Fixed) ===');

let worldGen: WorldGenerator | null = null;
let player: Player | null = null;
let camera: Camera | null = null;
let renderer: Renderer | null = null;
let inputManager: InputManager | null = null;
let interactionSystem: InteractionSystem | null = null;
let inventory: Inventory = {
  resources: { wood: 0, stone: 0, food: 0, mineral: 0 },
};
let inventoryUI: InventoryUI | null = null;

window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
  if (!canvas) {
    console.error('Canvas not found!');
    return;
  }

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    console.error('Could not get canvas context!');
    return;
  }

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    if (camera) camera.resize(canvas.width, canvas.height);
  }
  
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Initialize world and systems
  worldGen = new WorldGenerator(2000, 2000);
  player = new Player(1000, 1000);
  camera = new Camera(canvas.width, canvas.height, 2000, 2000);
  camera.setTarget(player);
  inputManager = new InputManager();
  renderer = new Renderer(ctx, camera);
  inventoryUI = new InventoryUI(inventory);
  interactionSystem = new InteractionSystem(
    (x: number, y: number, r: number) => worldGen!.getNearbyResources(x, y, r),
    player,
    inventory
  );

  console.log('Game initialized successfully');
  console.log('Controls: WASD to move, E to gather');

  function gameLoop() {
    // Update
    const input = inputManager!.getInputState();
    player!.update(1 / 60, input);
    camera!.update();

    // Clear
    renderer!.clear();

    // Draw biome backgrounds
    drawBiomes(ctx, camera!, worldGen!);

    // Draw world grid
    renderer!.drawWorld(2000, 2000);

    // Draw resource nodes
    drawResources(ctx, camera!, worldGen!, player!, interactionSystem!);

    // Draw player
    renderer!.drawPlayer(player!);

    // Draw UI
    renderer!.drawUI(60, player!);
    
    // Draw inventory (top-right)
    inventoryUI!.draw(ctx, canvas.width, canvas.height);

    // Draw current biome info
    drawBiomeInfo(ctx, player!, worldGen!);

    requestAnimationFrame(gameLoop);
  }

  gameLoop();
});

/**
 * Draw biome background colors
 */
function drawBiomes(
  ctx: CanvasRenderingContext2D,
  camera: Camera,
  worldGen: WorldGenerator
): void {
  ctx.save();
  ctx.translate(-camera.position.x, -camera.position.y);

  const cellSize = 100;
  for (let x = 0; x < 2000; x += cellSize) {
    for (let y = 0; y < 2000; y += cellSize) {
      const biome = worldGen.getBiomeAt(x, y);
      if (!biome) continue;

      ctx.fillStyle = worldGen.getBiomeColor(biome);
      ctx.fillRect(x, y, cellSize, cellSize);
    }
  }

  ctx.restore();
}

/**
 * Draw resource nodes with info
 */
function drawResources(
  ctx: CanvasRenderingContext2D,
  camera: Camera,
  worldGen: WorldGenerator,
  player: Player,
  interactionSystem: InteractionSystem
): void {
  const nearestResource = interactionSystem.getNearestResource();

  worldGen.resourceNodes.forEach((node) => {
    if (node.isGathered) return;

    const screenPos = camera.worldToScreen(node.position);
    const isNearest = nearestResource?.id === node.id;

    // Resource color and size
    let color = '#654321';
    let radius = 15;
    let label = '';

    if (node.type === 'wood') {
      color = '#5d813b';
      radius = 18;
      label = 'Tree';
    } else if (node.type === 'stone') {
      color = '#a7a9a9';
      radius = 16;
      label = 'Rock';
    } else if (node.type === 'food') {
      color = '#e6a161';
      radius = 12;
      label = 'Bush';
    } else if (node.type === 'mineral') {
      color = '#32b8c6';
      radius = 14;
      label = 'Mineral';
    }

    ctx.save();

    // Highlight if nearest
    if (isNearest) {
      ctx.strokeStyle = '#ffff00';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(screenPos.x, screenPos.y, radius + 5, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Draw resource
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(screenPos.x, screenPos.y, radius, 0, Math.PI * 2);
    ctx.fill();

    // Border
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Show info if nearest
    if (isNearest) {
      ctx.fillStyle = '#ffffff';
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 3;
      ctx.font = 'bold 12px Arial';
      ctx.textAlign = 'center';
      
      const text = `${label} [${node.hitsRequired - node.currentHits} hits] - Press E`;
      ctx.strokeText(text, screenPos.x, screenPos.y - radius - 10);
      ctx.fillText(text, screenPos.x, screenPos.y - radius - 10);
    }

    ctx.restore();
  });
}

/**
 * Draw current biome info
 */
function drawBiomeInfo(
  ctx: CanvasRenderingContext2D,
  player: Player,
  worldGen: WorldGenerator
): void {
  const biome = worldGen.getBiomeAt(player.position.x, player.position.y);
  if (!biome) return;

  ctx.save();
  ctx.fillStyle = '#ffffff';
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 3;
  ctx.font = 'bold 16px Arial';
  ctx.textAlign = 'left';

  const text = `Biome: ${biome.charAt(0).toUpperCase() + biome.slice(1)}`;
  ctx.strokeText(text, 10, 120);
  ctx.fillText(text, 10, 120);

  ctx.restore();
}