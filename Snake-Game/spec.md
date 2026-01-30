# Snake Game Specification

## Overview
A browser-based Snake game built with HTML5 Canvas, featuring poison apples, hidden power-ups, and a dynamic particle background.

## Visual Design

### Theme
- **Background**: Pure black (#000)
- **Primary Color**: Light blue (#7dd3fc, #38bdf8)
- **Accent Colors**: Purple for poison (#9333ea), red for food (#ef4444)

### Particle System
- 150 floating particles with glow effects
- Particles pulse in opacity over time
- Connecting lines drawn between particles within 150px of each other
- Lines fade based on distance (max 40% opacity)
- Particle size: 2-6px with 2x glow radius

## Game Elements

### Snake
- Light blue gradient coloring
- Head has glowing effect with eyes that face movement direction
- Body segments fade in opacity from head to tail
- Starts with 3 segments at position (10, 10)
- Initial direction: moving right

### Regular Apples (Food)
- Red circular appearance (#ef4444) with glow
- Green stem on top
- Awards 10 points when eaten (20 with multiplier)
- 25% chance to contain a hidden power-up
- Respawns at random valid position after being eaten

### Poison Apples
- Purple appearance (#9333ea) with skull face design
- White eye sockets, purple nose, dripping effect
- 2 poison apples on the map at all times
- **Penalties when eaten**:
  - -30 points (minimum score is 0)
  - Snake shrinks by 2 segments (minimum 2 segments)
- Relocates to new position after being eaten
- 30% chance to all reposition when regular apple is eaten

## Power-Up System

### Activation
- Hidden in regular apples (25% chance per apple)
- Power-up type randomly selected when apple spawns
- Activated immediately upon eating the apple
- Duration: 8 seconds each

### Power-Up Types

| Power-Up | Indicator Color | Effect |
|----------|----------------|--------|
| Score Multiplier | Gold/Yellow | 2x points for eating apples |
| Slow-Mo | Blue | Game speed reduced to 1.8x slower |
| Invincibility | Purple | Cannot die from walls or self-collision; walls wrap around |

### Visual Indicators
- Active power-ups shown above game canvas
- Pulsing pill-shaped indicators with countdown timer
- Rainbow snake effect during invincibility

## Controls

| Input | Action |
|-------|--------|
| Arrow Keys / WASD | Change direction |
| Space | Pause/Resume game |

## Game Mechanics

### Movement
- Grid-based movement (20x20 grid on 400x400 canvas)
- Cannot reverse direction (180-degree turns blocked)
- Speed increases as score increases (minimum 50ms interval)

### Speed System
- Base speed: configurable via slider (50-200 on slider maps to 200-50ms interval)
- Speed labels: Very Slow, Slow, Normal, Fast, Very Fast
- Speed increases by 2ms per apple eaten (until minimum reached)
- Slow-mo power-up multiplies interval by 1.8x

### Collision Detection
- **Walls**: Game over (unless invincible, then wrap around)
- **Self**: Game over (unless invincible, then pass through)
- **Food**: Grow snake, add points, spawn new food
- **Poison**: Apply penalties, relocate poison apple

### Scoring
- Regular apple: 10 points
- With multiplier: 20 points
- Poison apple: -30 points
- High score persisted in localStorage

## UI Components

### Score Board
- Current score display
- High score display (persisted across sessions)

### Info Panel (Right Side)
- Poison apple explanation
- Speed control slider
- Hidden power-ups hint

### Overlays
- **Start Screen**: "Ready to Play?" with Start Game button
- **Game Over Screen**: Final score with Play Again button
- **Pause Overlay**: "PAUSED" text on dimmed canvas

## Technical Details

### Canvas Dimensions
- Game canvas: 400x400 pixels
- Grid size: 20x20 cells
- Cell size: 20x20 pixels

### Rendering
- 60 FPS particle animation (requestAnimationFrame)
- Game loop via setInterval (speed-dependent)
- Subtle grid lines on game canvas

### Storage
- High score: `localStorage.getItem('snakeHighScore')`

## File Structure
```
Snake-Game/
  index.html    # Complete game (single file)
  spec.md       # This specification
```
