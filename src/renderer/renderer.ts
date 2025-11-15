// Patch Renderer to give resources distinct colors/textures based on biome
import { getBiomeColor } from './world/BiomeColors';
// ...
worldGen!.resourceNodes.forEach((node) => {
  if (node.isGathered) return;
  let color = '#654321';
  let r = 18;
  // Override by resource/biome type
  if (node.type === 'wood') {
    color = (node.biome === 'snow') ? '#c2dddf' : (node.biome === 'swamp' ? '#7d6942' : '#5d813b');
    r = node.biome === 'swamp' ? 19 : 23;
  } else if (node.type === 'stone') {
    color = node.biome === 'snow' ? '#eaf7fa' : '#a7a9a9';
    r = 18;
  } else if (node.type === 'food') {
    color = node.biome === 'plains' ? '#e6a161' : '#bede72';
    r = 14;
  } else if (node.type === 'mineral') {
    color = node.biome === 'desert' ? '#f4d06c' : (node.biome === 'swamp' ? '#617073' : '#32b8c6');
    r = 19;
  }
  // ...rest drawing code...
});