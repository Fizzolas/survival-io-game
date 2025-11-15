export const BIOME_COLORS = {
  forest: '#357856',
  plains: '#b5d56e',
  desert: '#e0c585',
  snow: '#eaf7fa',
  swamp: '#484f43'
};

export function getBiomeColor(type: string): string {
  return BIOME_COLORS[type] || '#32b8c6';
}
