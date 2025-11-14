# Phase 2 Demo - Core Game Loop & Rendering

## 🎬 What You'll See

When you run Phase 2, you'll see:

### Visual Elements
1. **Game Window**
   - 1280x720 pixel Electron window
   - Full-screen canvas with dark background

2. **World Map**
   - 2000x2000 unit grass-textured world
   - Checkered grass pattern (alternating light/dark green)
   - 100-unit grid overlay
   - Visible world border

3. **Player Character**
   - Teal circle (20 pixel radius)
   - Black outline (3px)
   - Shadow effect underneath
   - White direction indicator showing movement

4. **Camera**
   - Smoothly follows player
   - Centers player in viewport
   - Respects world boundaries

5. **HUD Display (Top Left)**
   ```
   FPS: 60
   Position: (1000, 1000)
   Speed: 185
   ```

6. **Controls Hint (Bottom Left)**
   ```
   Controls: WASD or Arrow Keys
   ```

## 🕹️ How to Test

### Movement Test
1. Launch the game: `npm start`
2. Press **W** - Player moves up smoothly
3. Press **A** - Player moves left smoothly
4. Press **S** - Player moves down smoothly
5. Press **D** - Player moves right smoothly
6. Press **W+D** - Player moves diagonally (up-right)
7. Release keys - Player decelerates smoothly (friction)

### Camera Test
1. Move to top-left corner of world (0, 0)
2. Camera stops at boundary (doesn't show outside world)
3. Move to center of world (1000, 1000)
4. Camera follows smoothly with slight lag (lerp effect)
5. Move to bottom-right corner (2000, 2000)
6. Camera stops at boundary

### Performance Test
1. Check FPS counter - should maintain 60 FPS
2. Move rapidly in all directions
3. FPS should remain stable
4. No stuttering or lag

### Debug Info Test
1. **Position** updates in real-time as you move
2. **Speed** shows 0 when stationary
3. **Speed** shows ~200 when moving at max speed
4. **Direction indicator** (white line) points in movement direction

## 📸 Expected Appearance

### At Spawn (Center of World)
```
+----------------------------------+
|  FPS: 60                        |
|  Position: (1000, 1000)         |
|  Speed: 0                       |
|                                 |
|                                 |
|         [Dark Green]            |
|         [Checkered]             |
|         [Grass Pattern]         |
|              ●                 |  ← Player (teal circle)
|         [With Grid]             |
|         [Overlay]               |
|                                 |
|                                 |
|  Controls: WASD or Arrow Keys   |
+----------------------------------+
```

### While Moving Right
```
+----------------------------------+
|  FPS: 60                        |
|  Position: (1150, 1000)         |
|  Speed: 195                     |
|                                 |
|                                 |
|         [Dark Green]            |
|         [Checkered]             |
|         [Grass Pattern]         |
|              ●───>            |  ← Player with direction
|         [With Grid]             |
|         [Overlay]               |
|                                 |
|                                 |
|  Controls: WASD or Arrow Keys   |
+----------------------------------+
```

## ✅ Success Criteria Checklist

Run through this checklist to verify Phase 2:

- [ ] Window launches without errors
- [ ] Canvas fills entire window
- [ ] Grass background visible with pattern
- [ ] Grid lines visible
- [ ] Player circle visible in teal color
- [ ] FPS counter shows ~60
- [ ] Position displays correctly
- [ ] Speed shows 0 when idle
- [ ] **W** key moves player up
- [ ] **A** key moves player left
- [ ] **S** key moves player down
- [ ] **D** key moves player right
- [ ] Arrow keys also work
- [ ] Diagonal movement works (W+D, W+A, etc.)
- [ ] Player decelerates when keys released
- [ ] Camera follows player smoothly
- [ ] Camera stops at world boundaries
- [ ] Direction indicator shows movement direction
- [ ] Speed increases when moving
- [ ] No console errors
- [ ] Window can be resized
- [ ] Game continues smoothly after resize

## 🐛 Known Limitations (By Design)

These are intentional for Phase 2:
- No resource nodes yet
- No inventory system
- No crafting
- No other players
- No enemies
- No buildings
- No collision detection
- No sounds
- Player can move through world borders (will fix in Phase 3)

## 📊 Performance Metrics

**Expected Performance:**
- FPS: 60 (stable)
- CPU usage: <5%
- Memory: ~80-100 MB
- Frame time: ~16ms
- No dropped frames
- No memory leaks

**If FPS drops below 55:**
- Check Chrome DevTools Performance tab
- Verify no other heavy processes running
- Try closing other applications

## 🐞 Troubleshooting

### Problem: Window is black
**Solution:** Check browser console (F12) for errors

### Problem: Player doesn't move
**Solution:** 
- Click on the canvas to focus it
- Check if keys are registering in console
- Verify no keyboard shortcuts conflicting

### Problem: FPS is low (<45)
**Solution:**
- Close other applications
- Check if hardware acceleration is enabled
- Verify GPU drivers are up to date

### Problem: Camera jerky
**Solution:** 
- This is normal at world edges
- In center, should be smooth
- Check FPS isn't dropping

### Problem: Player moves through walls
**Solution:** 
- This is expected! No collision yet
- Will be added in Phase 3

## 📦 Next Phase Preview

Phase 3 will add:
- Resource nodes (trees, rocks, bushes)
- Resource gathering on click
- Resource counter in HUD
- Collision detection
- World boundary enforcement
- Resource respawn system

---

**Ready to test?**

```bash
git checkout feature/core-game-loop
npm install
npm start
```

Move around with WASD and enjoy the smooth movement! 🎮