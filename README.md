# Survival IO Game

A desktop multiplayer survival IO game inspired by MooMoo.io, built with Electron, TypeScript, and HTML5 Canvas.

## 🎮 Project Overview

This is a multi-phase development project creating a fully-featured survival game with:
- Desktop application (Electron)
- Procedurally generated world with multiple biomes
- Resource gathering and crafting
- Real-time multiplayer (WebSocket)
- Base building mechanics
- Combat system
- Progressive upgrades

## 📋 Development Phases

### ✅ Phase 1: Project Setup (Complete)
- Electron + TypeScript foundation
- Build system (Webpack)
- Basic window launcher
- Development environment

### ✅ Phase 2: Core Game Loop (Complete)
- Game engine with 60 FPS loop
- Player entity with smooth movement
- WASD + Arrow key controls
- Camera system with smooth following
- World rendering (2000x2000 map)
- FPS counter and debug info

### ✅ Phase 3: World Generation & Resources (Complete)
- **Procedural biome generation** (5 biomes: forest, plains, desert, snow, swamp)
- **Resource nodes** (trees, rocks, bushes, minerals)
- **Gathering mechanics** (Press E to interact)
- **Inventory system** with real-time UI
- **Spatial resource lookup** for efficient gathering

### 🔜 Future Phases
- Phase 4: Crafting system
- Phase 5: Building mechanics
- Phase 6: Multiplayer networking
- Phase 7: Combat mechanics
- Phase 8: UI/HUD improvements
- Phase 9: Polish and optimization

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/Fizzolas/survival-io-game.git

# Navigate to project directory
cd survival-io-game

# Checkout Phase 3 branch
git checkout feature/world-resources

# Install dependencies
npm install

# Start the game
npm start
```

## 📝 Scripts

- `npm start` - Build and launch the Electron app
- `npm run dev` - Watch mode + launch (auto-rebuild on changes)
- `npm run build` - Production build
- `npm test` - Run test suite
- `npm run clean` - Clean build artifacts

## 🏗️ Project Structure

```
survival-io-game/
├── src/
│   ├── main/              # Electron main process
│   │   └── main.ts        # App entry point
│   ├── renderer/          # Game client code
│   │   ├── engine/
│   │   │   └── GameEngine.ts       # Core game loop (Phase 2)
│   │   ├── entities/
│   │   │   ├── Player.ts           # Player logic (Phase 2)
│   │   │   ├── PlayerWithInventory.ts  # Extended player (Phase 3)
│   │   │   └── ResourceNode.ts     # Resource entities (Phase 3)
│   │   ├── systems/
│   │   │   ├── Camera.ts           # Viewport management (Phase 2)
│   │   │   ├── InputManager.ts    # Keyboard input (Phase 2)
│   │   │   ├── Renderer.ts         # Canvas drawing (Phase 2)
│   │   │   └── InteractionSystem.ts # Gathering (Phase 3)
│   │   ├── world/
│   │   │   ├── WorldGenerator.ts   # Biome generation (Phase 3)
│   │   │   └── Biome.ts            # Biome configs (Phase 3)
│   │   ├── ui/
│   │   │   └── InventoryUI.ts      # Inventory display (Phase 3)
│   │   ├── index.html     # Main HTML
│   │   └── renderer.ts    # Game initialization
│   ├── server/            # Game server (future)
│   └── shared/            # Shared types/constants
│       ├── constants.ts
│       ├── types.ts
│       └── types/
│           └── Resources.ts        # Resource types (Phase 3)
├── assets/                # Game assets (future)
├── dist/                  # Build output
├── package.json
├── tsconfig.json
├── webpack.config.js
└── README.md
```

## 🛠️ Technology Stack

- **Electron**: Desktop app framework
- **TypeScript**: Type-safe development
- **Webpack**: Module bundling
- **HTML5 Canvas**: 2D rendering
- **Jest**: Unit testing
- **Custom Noise Generator**: Procedural generation
- **WebSocket**: Real-time networking (future)
- **Node.js**: Server hosting (future)

## 🎮 Phase 3 Features

### Procedural World Generation
- **5 distinct biomes** with unique characteristics:
  - **Forest** 🌲: Dense trees, moderate rocks
  - **Plains** 🌾: Sparse trees, abundant bushes, open areas
  - **Desert** 🏜️: Cacti, minerals, scarce vegetation
  - **Snow** ❄️: Pine trees, ice rocks, cold climate
  - **Swamp** 🌿: Dead trees, rare herbs, unique minerals
- **Noise-based generation** for natural-looking biome transitions
- **Consistent seed** for reproducible worlds

### Resource System
- **4 resource types**:
  - **Wood** 🪵: From trees (3-4 hits to gather)
  - **Stone** 🪨: From rocks (5-6 hits to gather)
  - **Food** 🍎: From bushes (1 hit to gather)
  - **Minerals** 💎: Rare resources (10 hits to gather)
- **Biome-specific distribution**: Each biome has unique resource densities
- **Visual differentiation**: Each resource type has distinct color and size

### Gathering Mechanics
- **Press E** to interact with nearby resources
- **Proximity detection** (30 unit radius)
- **Multi-hit gathering**: Different resources require different effort
- **Visual feedback**: Resources disappear when fully gathered
- **Console logging**: Track gathering progress

### Inventory System
- **Stacking resources**: Wood x15, Stone x8, etc.
- **Real-time UI updates**: See inventory change as you gather
- **Clean HUD display**: Top-left corner inventory panel
- **4 resource counters**: Wood, Stone, Food, Mineral

## 🎯 Controls

### Movement
- **W / ↑** - Move up
- **A / ←** - Move left
- **S / ↓** - Move down
- **D / →** - Move right

### Interaction
- **E** - Gather resource (when near a resource node)

## 🗺️ Biome Distribution

Biomes are generated using a noise-based algorithm:

| Noise Value | Biome | Characteristics |
|-------------|-------|----------------|
| < -0.4 | Swamp | Rare herbs, dead trees, murky |
| -0.4 to -0.15 | Forest | Dense trees, moderate rocks |
| -0.15 to 0.15 | Plains | Open areas, many bushes |
| 0.15 to 0.5 | Desert | Cacti, minerals, arid |
| > 0.5 | Snow | Pine trees, ice rocks, frozen |

## 🧪 Testing

Run unit tests:
```bash
npm test
```

Tests cover:
- Player movement and physics
- Camera following and boundaries
- Input management
- World generation
- Resource node mechanics
- Inventory system

## 📊 Phase 3 Status

**Completed:**
- ✅ Procedural biome generation with noise
- ✅ 5 distinct biome types
- ✅ Resource node spawning per biome
- ✅ E-key interaction system
- ✅ Multi-hit gathering mechanics
- ✅ Inventory tracking and stacking
- ✅ Real-time inventory UI
- ✅ Spatial resource lookup
- ✅ Unit tests for world and resources

**Testing Results:**
- ✅ World generates with clear biome patches
- ✅ Resources spawn in biome-appropriate locations
- ✅ Gathering works with proximity detection
- ✅ Inventory updates correctly
- ✅ Resources disappear after gathering
- ✅ No console errors

**Next Steps:**
- Add gathering progress bar
- Implement resource respawn
- Add collision detection for resources
- Create crafting recipes

## 🎨 Resource Visual Guide

- 🟢 **Wood nodes** (Green, radius 23): Trees in forest/snow
- ⚪ **Stone nodes** (Gray, radius 18): Rocks in various biomes
- 🟠 **Food nodes** (Orange, radius 14): Bushes in plains
- 🔵 **Mineral nodes** (Teal, radius 19): Rare finds in desert/swamp

## 🐛 Known Issues

- Resource nodes may overlap in rare cases (visual only)
- No gathering animation yet (instant after required hits)
- No resource respawn (once gathered, gone forever)
- Player can move while gathering

## 📈 Performance Metrics

**Expected Performance:**
- FPS: 60 (stable)
- CPU usage: <8%
- Memory: ~90-110 MB
- Resource nodes: ~500-800 depending on world size
- No frame drops during gathering

## 🔧 Troubleshooting

### Build Errors
If you see TypeScript errors:
```bash
# Clean and rebuild
npm run clean
npm install
npm start
```

### Missing Dependencies
```bash
# Reinstall all dependencies
rm -rf node_modules package-lock.json
npm install
```

### Resources Not Appearing
- Walk around the map - different biomes have different densities
- Check console for world generation logs
- Verify you're on the correct branch: `git checkout feature/world-resources`

## 📄 License

MIT License - See LICENSE file for details

## 👤 Author

Fizzolas - [GitHub](https://github.com/Fizzolas)

---

**Current Phase:** 3 - World Generation & Resources  
**Status:** ✅ Complete and runnable  
**Branch:** `feature/world-resources`

**Ready to explore?**
```bash
git checkout feature/world-resources
npm install
npm start
```

Move around with WASD, approach resources, and press E to gather! 🎮