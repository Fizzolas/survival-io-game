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

### ✅ Phase 1: Project Setup (Current)
- Electron + TypeScript foundation
- Build system (Webpack)
- Basic window launcher
- Development environment

### 🔜 Future Phases
- Phase 2: Core game loop and rendering
- Phase 3: Player movement and controls
- Phase 4: Resource gathering
- Phase 5: Crafting system
- Phase 6: Multiplayer networking
- Phase 7: Combat mechanics
- Phase 8: UI/HUD
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

# Install dependencies
npm install

# Start the development build
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
│   │   ├── index.html # Main HTML file
│   │   └── renderer.ts # Canvas rendering
│   ├── server/        # Game server (future)
│   └── shared/        # Shared types/constants
│       ├── constants.ts
│       └── types.ts
├── assets/            # Game assets (future)
├── dist/              # Build output
├── package.json       # Dependencies
├── tsconfig.json      # TypeScript config
├── webpack.config.js  # Build configuration
└── README.md
```

## 🛠️ Technology Stack

- **Electron**: Desktop app framework
- **TypeScript**: Type-safe development
- **Webpack**: Module bundling
- **HTML5 Canvas**: 2D rendering
- **WebSocket**: Real-time networking (future)
- **Node.js**: Server hosting (future)

## 📊 Phase 1 Status

**Completed:**
- ✅ Repository initialization
- ✅ TypeScript configuration
- ✅ Webpack build system
- ✅ Electron window launcher
- ✅ Canvas rendering setup
- ✅ Hello World display
- ✅ Development scripts

**Next Steps:**
- Core game loop implementation
- Player entity system
- Input handling

## 📄 License

MIT License - See LICENSE file for details

## 👤 Author

Fizzolas - [GitHub](https://github.com/Fizzolas)

---

**Current Phase:** 1 - Project Setup  
**Status:** ✅ Complete and runnable