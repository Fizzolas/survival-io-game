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

### 🔜 Future Phases
- Phase 3: Resource gathering
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

# Checkout Phase 2 branch
git checkout feature/core-game-loop

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
│   ├── main/          # Electron main process
│   │   └── main.ts    # App entry point
│   ├── renderer/      # Game client code
│   │   ├── engine/
│   │   │   └── GameEngine.ts      # Core game loop
│   │   ├── entities/
│   │   │   └── Player.ts          # Player logic
│   │   ├── systems/
│   │   │   ├── Camera.ts          # Viewport management
│   │   │   ├── InputManager.ts   # Keyboard input
│   │   │   └── Renderer.ts        # Canvas drawing
│   │   ├── index.html # Main HTML
│   │   └── renderer.ts # Game initialization
│   ├── server/        # Game server (future)
│   └── shared/        # Shared types/constants
│       ├── constants.ts
│       └── types.ts
├── assets/            # Game assets (future)
├── dist/              # Build output
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
- **WebSocket**: Real-time networking (future)
- **Node.js**: Server hosting (future)

## 🎮 Phase 2 Features

### Game Engine
- **60 FPS game loop** with delta time
- **requestAnimationFrame** for smooth rendering
- **FPS counter** for performance monitoring
- **Modular architecture** (Engine, Entities, Systems)

### Player Movement
- **WASD + Arrow keys** for 8-directional movement
- **Smooth acceleration** and friction
- **Speed normalization** for diagonal movement
- **Max speed cap** at 200 units/second
- **Direction indicator** showing movement

### Camera System
- **Smooth camera following** with lerp
- **World boundary clamping**
- **Screen/world coordinate conversion**
- **Viewport culling** support

### World Rendering
- **2000x2000 unit map**
- **Grass texture** with checkered pattern
- **Grid overlay** (100 unit spacing)
- **World border** visualization

### Debug HUD
- **FPS counter**
- **Player position** (X, Y)
- **Player speed** (units/second)
- **Control hints**

## 📊 Phase 2 Status

**Completed:**
- ✅ GameEngine class with game loop
- ✅ Player entity with movement
- ✅ Camera system with following
- ✅ InputManager for keyboard
- ✅ Renderer for canvas drawing
- ✅ World map rendering
- ✅ Unit tests for core systems

**Testing Results:**
- ✅ Window launches successfully
- ✅ Player moves smoothly with WASD
- ✅ Camera follows player correctly
- ✅ FPS maintains 60 consistently
- ✅ No console errors

**Next Steps:**
- Add resource nodes (trees, rocks)
- Implement gathering mechanics
- Create inventory system

## 🎯 Controls

- **W / ↑** - Move up
- **A / ←** - Move left
- **S / ↓** - Move down
- **D / →** - Move right

## 🧪 Testing

Run unit tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm test -- --watch
```

## 📄 License

MIT License - See LICENSE file for details

## 👤 Author

Fizzolas - [GitHub](https://github.com/Fizzolas)

---

**Current Phase:** 2 - Core Game Loop & Rendering  
**Status:** ✅ Complete and runnable  
**Branch:** `feature/core-game-loop`