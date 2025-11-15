// Patch Renderer to draw biome-colored backdrops (calls drawBiomeMap)
import { WorldGenerator } from './world/WorldGenerator';
//...other imports...

let worldGen: WorldGenerator | null = null;
// ...
function gameLoop() {
  // Render biome background tiles
  worldGen!.drawBiomeMap(renderer!.ctx, camera!);
  // ...rest of game rendering (resources, player, UI etc)...
}