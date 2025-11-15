# Survival IO Game

A desktop multiplayer survival IO game inspired by MooMoo.io, built with Electron, TypeScript, and HTML5 Canvas.

## 🎮 Project Overview

This is a multi-phase development project creating a fully-featured survival game with:
- Desktop application (Electron)
- Real-time multiplayer (WebSocket)
- Resource gathering and crafting
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

### ✅ Phase 3: World & Resources (Complete)
- **Procedural biome generation** (5 biomes: Forest, Plains, Desert, Snow, Swamp)
- **Biome visualization** with distinct colors
- **Resource nodes** spawn based on biome (Trees, Rocks, Bushes, Minerals)
- **Gathering mechanics** (Press E to gather)
- **Inventory system** with real-time UI
- **Resource info display** (shows type and hits remaining)
- **Spatial resource lookup** for efficient interaction

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
│   ├── main/               # Electron main process
│   │   └── main.ts
│   ├── renderer/           # Game client code
│   │   ├── engine/
│   │   │   └── GameEngine.ts
│   │   ├── entities/
│   │   │   ├── Player.ts
│   │   │   ├── ResourceNode.ts
│   │   │   └── PlayerWithInventory.ts
│   │   ├── systems/
│   │   │   ├── Camera.ts
│   │   │   ├── InputManager.ts
│   │   │   ├── InteractionSystem.ts
│   │   │   └── Renderer.ts
│   │   ├── world/
│   │   │   ├── WorldGenerator.ts
│   │   │   └── Biome.ts
│   │   ├── ui/
│   │   │   └── InventoryUI.ts
│   │   ├── index.html
│   │   └── renderer.ts
│   ├── server/             # Game server (future)
│   └── shared/             # Shared types/constants
│       ├── constants.ts
│       ├── types.ts
│       └── types/
│           └── Resources.ts
├── assets/                 # Game assets (future)
├── dist/                   # Build output
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
- **SimplexNoise**: Procedural generation
- **WebSocket**: Real-time networking (future)
- **Node.js**: Server hosting (future)

## 🎮 Phase 3 Features

### Biome System
- **5 Distinct Biomes**: Forest, Plains, Desert, Snow, Swamp
- **Procedural Generation**: Using SimplexNoise for natural-looking biome distribution
- **Visual Differentiation**: Each biome has unique background color
- **Biome Info Display**: Shows current biome name in HUD

### Resource Nodes
- **Wood**: Found in Forest (trees), Snow (pines), Swamp (dead trees)
- **Stone**: Found in Forest (rocks), Snow (ice rocks), Desert (sandstone)
- **Food**: Found in Plains (bushes)
- **Minerals**: Found in Desert (cacti), Swamp (herbs)

### Gathering Mechanics
- **Press E** when near a resource to gather
- **Hit System**: Different resources require different hits (1-10)
- **Visual Feedback**: Yellow highlight on nearest gatherable resource
- **Info Display**: Shows resource type and remaining hits
- **Auto-collection**: Resources added to inventory when fully gathered
- **Node Removal**: Gathered resources disappear from world

### Inventory System
- **Top-right Panel**: Doesn't overlap with debug info
- **Real-time Updates**: Inventory changes instantly
- **Resource Tracking**: Wood, Stone, Food, Mineral counts
- **Persistent**: Inventory survives across gathering sessions

## 🎯 Controls

- **W / ↑** - Move up
- **A / ←** - Move left
- **S / ↓** - Move down
- **D / →** - Move right
- **E** - Gather resource (when near a resource node)

## 📊 Phase 3 Status

**Completed:**
- ✅ Procedural biome generation
- ✅ Biome visualization with colors
- ✅ Resource spawning based on biome type
- ✅ Proper resource density per biome
- ✅ E-key gathering interaction
- ✅ Inventory system with UI
- ✅ Resource info display
- ✅ Nearest resource highlighting
- ✅ Hit-based gathering (1-10 hits)
- ✅ Resource removal after gathering
- ✅ Unit tests for world and resources

**Testing Results:**
- ✅ Biomes clearly visible with distinct colors
- ✅ Resources spawn appropriately per biome
- ✅ Gathering works with E key
- ✅ Inventory updates correctly
- ✅ UI positioned properly (no overlap)
- ✅ Resource info displays near player
- ✅ No console errors

**Next Steps:**
- Add crafting recipes
- Implement crafting UI
- Add tool/weapon system

## 🧪 Testing Phase 3

### Quick Test (3 minutes)
1. Run `npm start`
2. Walk around - you should see different colored biome regions
3. Move to a resource node (tree/rock/bush)
4. Press **E** to gather - inventory should update
5. Check top-right inventory panel shows resources

### Full Test Checklist
- [ ] **Biomes**: Can see 5 different biome colors (green, tan, white, dark green, yellow)
- [ ] **Biome Info**: "Biome: Forest" (or other) displays in HUD
- [ ] **Resources**: Different biomes have different resource types
- [ ] **Gathering**: E key works when near resources
- [ ] **Visual Feedback**: Yellow highlight on nearest resource
- [ ] **Info Display**: "Tree [3 hits] - Press E" appears above resource
- [ ] **Inventory**: Top-right panel updates when gathering
- [ ] **Resource Removal**: Resources disappear after gathering
- [ ] **Hit System**: Some resources need multiple E presses
- [ ] **No Overlap**: Inventory doesn't cover FPS/debug text

### Biome Testing
**Forest** (Dark Green):
- High tree density (3 per cell)
- Moderate rocks (50% spawn rate)

**Plains** (Yellow-Green):
- Low trees (30% spawn rate)
- High bushes (70% spawn rate, 2 per cell)

**Desert** (Tan):
- Minerals/cacti (40% spawn rate)
- Rare rocks (30% spawn rate)

**Snow** (White):
- Pine trees (60% spawn rate)
- Ice rocks (40% spawn rate)

**Swamp** (Dark Gray-Green):
- Dead trees (40% spawn rate)
- Rare herbs/minerals (20% spawn rate)

### Run Tests

```bash
npm test
```

Expected output:
```
PASS  src/renderer/world/__tests__/WorldGenerator.test.ts
PASS  src/renderer/entities/__tests__/ResourceNode.test.ts

Test Suites: 2 passed, 2 total
Tests:       5 passed, 5 total
```

## 🐛 Known Issues (Fixed)

- ✅ **FIXED**: Biomes now visible with distinct colors
- ✅ **FIXED**: Resources spawn based on biome density
- ✅ **FIXED**: E key gathering now works
- ✅ **FIXED**: Inventory UI positioned correctly (top-right)
- ✅ **FIXED**: Resource info displays above nodes

## 📄 License

MIT License - See LICENSE file for details

## 👤 Author

Fizzolas - [GitHub](https://github.com/Fizzolas)

---

**Current Phase:** 3 - World Generation & Resources  
**Status:** ✅ Complete and fully functional  
**Branch:** `feature/world-resources`