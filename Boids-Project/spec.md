# Boids Project - Specification

## Overview

An interactive flocking simulation built on Craig Reynolds's Boids algorithm (1986). The application renders 150 autonomous star-shaped agents ("boids") on an HTML5 Canvas, governed by three core steering rules: **separation**, **alignment**, and **cohesion**. A side panel provides real-time parameter tuning, behavior presets, mouse interaction tools, heterogeneous species support, obstacle placement, and live telemetry.

**Tech Stack:** Single-file HTML/CSS/JavaScript, HTML5 Canvas 2D rendering, no external dependencies.

---

## Architecture

### Layout

| Region | Description |
|---|---|
| **Simulation Window** | Flexible-width canvas filling the left portion of the viewport. Resizes dynamically on window resize. |
| **Control Panel** | Fixed 290px sidebar on the right. Scrollable. Contains all controls, stats, and toggles organized into labeled sections. |

### Core Loop

The simulation runs via `requestAnimationFrame` at native refresh rate:

1. Apply flocking rules (separation, alignment, cohesion) to all boids
2. Apply mouse interaction forces (attract/repel) if active
3. Update boid positions and enforce boundary rules
4. Clear canvas and redraw: boundary indicators, obstacles, boids, mouse cursor indicator
5. Update stats display (throttled to every 500ms for FPS)

---

## Flocking Rules (Craig Reynolds)

Each boid examines all other boids within its **neighbor radius** and computes three steering forces:

### Separation
- Steers **away** from nearby boids to avoid crowding
- Force is inversely proportional to distance (closer neighbors exert stronger repulsion)
- Applies to **all** boids regardless of species
- Weight: adjustable via slider (default: 1.5, range: 0-5)

### Alignment
- Steers toward the **average heading** of nearby boids
- Matches velocity direction of neighbors
- In species mode, only considers **same-species** neighbors
- Weight: adjustable via slider (default: 1.0, range: 0-5)

### Cohesion
- Steers toward the **average position** of nearby boids
- Pulls boid toward the center of mass of its local group
- In species mode, only considers **same-species** neighbors
- Weight: adjustable via slider (default: 1.0, range: 0-5)

### Steering Mechanics
- All forces are computed as desired velocities, then converted to steering forces via `steer()` function
- Steering is clamped by `maxForce` (0.15) to prevent instantaneous direction changes
- Final velocity is clamped by `maxSpeed` to enforce a speed limit

### Wrap-Aware Distance
- The `distWrapped()` function computes shortest-path distance between two points
- In wrap mode, distances account for toroidal topology (boids near opposite edges are treated as neighbors)

---

## Parameters

| Parameter | Default | Range | Step | Description |
|---|---|---|---|---|
| Separation | 1.5 | 0 - 5 | 0.1 | Separation force weight |
| Alignment | 1.0 | 0 - 5 | 0.1 | Alignment force weight |
| Cohesion | 1.0 | 0 - 5 | 0.1 | Cohesion force weight |
| Neighbor Radius | 80 | 20 - 200 | 5 | Perception radius in pixels |
| Max Speed | 4.0 | 1 - 10 | 0.5 | Maximum boid velocity |
| Mouse Force | 3.0 | 0.5 - 10 | 0.5 | Attract/repel cursor strength |
| Obstacle Radius | 30 | 10 - 80 | 5 | Size of placed obstacles |
| Avoidance Strength | 2.0 | 0.5 - 5 | 0.5 | Obstacle repulsion intensity |
| Species Count | 3 | 2 - 6 | 1 | Number of species (when enabled) |

---

## Presets

Three one-click presets snap all flocking parameters to curated configurations:

| Preset | Separation | Alignment | Cohesion | Radius | Speed | Behavior |
|---|---|---|---|---|---|---|
| **Schooling** | 0.5 | 4.0 | 2.0 | 100 | 4.0 | Tight, coordinated formations moving in unison |
| **Chaos** | 1.0 | 0.3 | 0.3 | 30 | 6.0 | Erratic, fast-moving individuals with minimal flocking |
| **Factions** | 2.0 | 1.5 | 4.5 | 60 | 3.5 | Dense clusters that maintain distance between groups |

---

## Mouse Interaction Tools

Four mutually exclusive mouse modes, selectable via toolbar buttons:

### Spawn Mode (default)
- **Action:** Click canvas to spawn 5 boids at cursor position
- **Spread:** 20px random scatter around click point
- **Species:** Random species assignment when species mode is active
- **Cursor:** Green circle with plus sign

### Attract Mode
- **Action:** Continuous force pulling boids toward cursor (no click required)
- **Radius:** 150px influence zone
- **Strength:** Scaled by Mouse Force slider, falls off linearly with distance
- **Cursor:** Blue circle with inward arrows

### Repel Mode
- **Action:** Continuous force pushing boids away from cursor (no click required)
- **Radius:** 150px influence zone
- **Strength:** Scaled by Mouse Force slider, falls off linearly with distance
- **Cursor:** Red circle with outward arrows

### Obstacle Mode
- **Action:** Click canvas to place a circular obstacle
- **Size:** Determined by Obstacle Radius slider at time of placement
- **Cursor:** Dashed red circle preview at obstacle size

---

## Heterogeneous Species

Toggle between uniform and multi-species modes:

### Uniform Mode (default)
- All boids share the same purple/blue color palette
- Color brightness scales with speed

### Species Mode
- Boids are divided into 2-6 species, each with a distinct color
- **Species palette:** Blue, Red, Green, Gold, Purple, Cyan
- **Flocking behavior changes:**
  - Separation applies to ALL boids (cross-species avoidance)
  - Alignment applies only to SAME species
  - Cohesion applies only to SAME species
- Species are assigned round-robin to existing boids when toggled on
- Spawned boids receive random species assignment
- Species count is adjustable via slider; changing it reassigns all existing boids
- Color legend displays active species with color dots

---

## Obstacles

- Placed via Obstacle mouse mode (click to drop)
- Rendered as red semi-transparent circles with center dot and X marker
- Boids within obstacle radius receive a repulsion force directed away from obstacle center
- Repulsion strength increases as boid gets closer to obstacle center (linear falloff)
- Obstacle avoidance respects wrap-aware distance calculations
- **Clear Obstacles** button removes all obstacles at once
- Obstacles persist through pause/resume but are cleared on reset

---

## Boundary Modes

Toggle switch between two boundary behaviors:

### Wrap (default)
- Boids exiting one edge reappear on the opposite edge (toroidal topology)
- Distance calculations account for wrapping
- Visual: Subtle dotted border

### Bounce
- Boids reflect off canvas edges with velocity inversion
- 6px margin from edge
- Visual: Dashed blue border

---

## Real-Time Stats

Four metrics displayed in a 2x2 grid, updated every frame (FPS throttled to 500ms sampling):

| Stat | Description |
|---|---|
| **FPS** | Frames per second (sampled over 500ms windows) |
| **Boids** | Current total boid count (increases with spawning) |
| **Avg Speed** | Mean velocity magnitude across all boids |
| **Avg Neighbors** | Mean same-species neighbor count per boid |

---

## Action Controls

| Button | Behavior |
|---|---|
| **Pause / Resume** | Freezes/unfreezes simulation physics. Boids still render but don't move. Button text toggles. |
| **Reset** | Restores all parameters to defaults, clears obstacles, reinitializes 150 boids, unpauses. |

---

## Boid Rendering

- **Shape:** 4-pointed star (8-vertex polygon alternating between outer radius 5px and inner radius 2px)
- **Orientation:** Rotated to face direction of travel via `atan2(vy, vx)`
- **Color (uniform mode):** Purple-blue gradient, brightness scales with speed
- **Color (species mode):** Species-specific palette, brightness scales with speed
- **Glow:** 4px shadow blur in matching color for a soft luminous effect

---

## Initial State

| Property | Value |
|---|---|
| Boid count | 150 |
| Positions | Random across canvas |
| Velocities | Random direction, speed 1-3 |
| Boundary mode | Wrap |
| Mouse mode | Spawn |
| Species | Disabled (uniform) |
| Obstacles | None |
| Paused | No |
