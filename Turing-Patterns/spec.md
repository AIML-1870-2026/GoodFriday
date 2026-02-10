# Turing Patterns Explorer - Specification

## Overview
A web-based reaction-diffusion simulator that generates Turing patterns in real-time. Users can explore different pattern types, manipulate the simulation through drawing, and customize visual appearance.

## Core Features

### 1. Reaction-Diffusion Simulation
- **Algorithm**: Gray-Scott model for reaction-diffusion
- **Grid Resolution**: 256x256 (adjustable based on performance)
- **Update Method**: Iterative numerical integration using discrete Laplacian
- **Performance**: Target 30+ FPS on modern browsers
- **Boundary Conditions**: Wrapped edges (toroidal topology)

### 2. Pattern Types (Presets)
Four distinct pattern presets with different feed (F) and kill (K) rate parameters:

- **Maze** (F=0.029, K=0.057): Creates labyrinthine, interconnected structures
- **Spots** (F=0.035, K=0.060): Produces stable, circular spots on background
- **Stripes** (F=0.035, K=0.065): Generates parallel stripe patterns
- **Spirals** (F=0.014, K=0.054): Forms spiral wave patterns

### 3. Interactive Drawing Tools
Allow users to disturb the simulation by adding chemical concentrations:

- **Brush**: Adds chemical B in circular area (adjustable radius: 5-50 pixels)
- **Eraser**: Resets area to base state (chemical A dominant)
- **Spray**: Randomly adds small dots of chemical B in area
- **Line**: Draws continuous line of chemical B while dragging

### 4. Visualization & Color Schemes
Multiple color schemes to visualize concentration gradients:

- **Classic** (Blue → White): Traditional visualization
- **Fire** (Black → Red → Yellow → White): Heat map style
- **Ocean** (Dark Blue → Cyan → White): Underwater aesthetic
- **Grayscale** (Black → White): Simple monochrome
- **Neon** (Purple → Pink → Cyan): Vibrant, high-contrast
- **Custom**: User-defined two-color gradient with color pickers

## UI Layout

### Overall Structure
```
┌─────────────────────────────────────────────────────┐
│                  Header/Title Bar                   │
├──────────────────────────┬──────────────────────────┤
│                          │                          │
│                          │   Control Panel (Right)  │
│   Canvas Display (Left)  │   ┌──────────────────┐   │
│                          │   │ Main Controls    │   │
│   (Pattern Visualization)│   │ (Always Visible) │   │
│                          │   ├──────────────────┤   │
│   (Interactive Area)     │   │ ▼ Pattern Types  │   │
│                          │   ├──────────────────┤   │
│                          │   │ ▼ Drawing Tools  │   │
│                          │   ├──────────────────┤   │
│                          │   │ ▼ Speed Control  │   │
│                          │   ├──────────────────┤   │
│                          │   │ ▼ Color Schemes  │   │
│                          │   ├──────────────────┤   │
│                          │   │ Information      │   │
│                          │   │ (Always Visible) │   │
│                          │   └──────────────────┘   │
└──────────────────────────┴──────────────────────────┘
```

### Left Panel: Canvas Display
- **Dimensions**: Square canvas, responsive (min 400px, max based on viewport)
- **Aspect Ratio**: 1:1 (square)
- **Border**: Subtle border to define edges
- **Background**: Black when simulation is cleared
- **Mouse Interaction**: Click and drag to use drawing tools

### Right Panel: Control Panel
Width: 300-350px, scrollable if content exceeds viewport height

#### Permanent Controls (Always Visible)
Located at the top of the control panel:

1. **Playback Controls** (Horizontal button group)
   - Play/Pause button (toggles icon and text)
   - Clear/Reset button (confirms before clearing)
   - Save Image button (downloads current pattern as PNG)

#### Collapsible Sections

**1. Pattern Types** (▼/▶ toggle)
- Radio button group or button grid
- Visual preview icons for each pattern type (optional)
- Selecting a pattern applies preset parameters and reinitializes simulation

**2. Drawing Tools** (▼/▶ toggle)
- Radio button group for tool selection
- Brush size slider (5-50 pixels) with numeric display
- Active tool highlighted
- Visual cursor changes on canvas to reflect tool

**3. Speed Control** (▼/▶ toggle)
- Slider: 0.5x to 4x simulation speed
- Current speed display (e.g., "2.0x")
- Iterations per frame control

**4. Color Schemes** (▼/▶ toggle)
- Dropdown or button grid for preset schemes
- If "Custom" selected:
  - Color picker for low concentration (color A)
  - Color picker for high concentration (color B)
  - Live preview of gradient

#### Information Panel (Always Visible)
Located at the bottom of the control panel:

- **Title**: "About Turing Patterns"
- **Content**: 
  - Brief explanation (2-3 sentences) of reaction-diffusion systems
  - Note about Alan Turing's contribution
  - Mention of natural occurrences (animal patterns, chemical systems)
- **Formatting**: Readable text, slightly smaller font, distinct background
- **Length**: ~100-150 words maximum

## Interaction Behaviors

### Canvas Interactions

1. **Mouse Down**: Activate selected drawing tool at cursor position
2. **Mouse Drag**: Continuously apply tool along path
3. **Mouse Up**: Deactivate tool
4. **Touch Support**: Same behavior for touch events (mobile-friendly)
5. **Visual Feedback**: Cursor changes based on selected tool (crosshair, circle, etc.)

### Drawing Tool Details

- **Brush**: Adds maximum concentration of chemical B in circular area
- **Eraser**: Sets both chemicals to initial balanced state
- **Spray**: Randomly places small dots (2-3 pixel radius) within brush size area
- **Line**: Draws continuous line with anti-aliasing

### Control Interactions

1. **Pattern Type Selection**: 
   - Applies preset F and K values
   - Optionally clears canvas or overlays on existing pattern (user choice)
   - Provides smooth transition if not clearing

2. **Play/Pause**:
   - Pauses computation but retains state
   - Button shows current state clearly

3. **Clear/Reset**:
   - Confirmation dialog: "Clear current pattern?"
   - Resets to uniform low concentration with small random seed

4. **Save Image**:
   - Downloads current canvas as PNG
   - Filename format: `turing-pattern-YYYYMMDD-HHMMSS.png`

5. **Speed Control**:
   - Adjusts iterations per animation frame
   - Real-time response (no lag)

6. **Color Scheme**:
   - Immediately redraws canvas with new colors
   - Does not affect simulation state

## Parameter Ranges & Constants

### Simulation Parameters

```javascript
// Diffusion rates
const Du = 0.16;  // Diffusion rate for chemical U (A)
const Dv = 0.08;  // Diffusion rate for chemical V (B)

// Time step
const dt = 1.0;   // Time step for integration

// Pattern Presets (Feed rate F, Kill rate K)
const PRESETS = {
  maze: { F: 0.029, K: 0.057 },
  spots: { F: 0.035, K: 0.060 },
  stripes: { F: 0.035, K: 0.065 },
  spirals: { F: 0.014, K: 0.054 }
};

// Initial conditions
const initialU = 1.0;     // Start with all chemical U
const initialV = 0.0;     // No chemical V
const seedRadius = 10;    // Random seed area in center
```

### UI Parameter Ranges

```javascript
// Brush size
brushSize: {
  min: 5,
  max: 50,
  default: 15,
  step: 1
}

// Speed multiplier
speed: {
  min: 0.5,
  max: 4.0,
  default: 1.0,
  step: 0.1
}

// Iterations per frame (adjusted by speed)
iterationsPerFrame: {
  base: 10,
  multiplier: speed
}
```

### Color Scheme Definitions

```javascript
const COLOR_SCHEMES = {
  classic: {
    low: '#0066cc',   // Blue
    high: '#ffffff'   // White
  },
  fire: {
    low: '#000000',   // Black
    mid1: '#cc0000',  // Red
    mid2: '#ffff00',  // Yellow
    high: '#ffffff'   // White
  },
  ocean: {
    low: '#001f3f',   // Dark blue
    high: '#7fdbff'   // Cyan
  },
  grayscale: {
    low: '#000000',   // Black
    high: '#ffffff'   // White
  },
  neon: {
    low: '#9b59b6',   // Purple
    mid: '#e91e63',   // Pink
    high: '#00bcd4'   // Cyan
  },
  custom: {
    low: '#000000',   // User-defined
    high: '#ffffff'   // User-defined
  }
};
```

## Technical Implementation Notes

### Technology Stack
- **HTML5 Canvas** for rendering
- **Vanilla JavaScript** (or React if preferred)
- **CSS Grid/Flexbox** for layout
- **No external dependencies** for core simulation (optional: UI library)

### Performance Considerations
- Use typed arrays (Float32Array) for simulation grids
- Double buffering for read/write grids
- RequestAnimationFrame for smooth animation
- Consider WebGL for larger grids (optional enhancement)

### Responsive Design
- Mobile: Stack layout (canvas on top, controls below)
- Tablet: Side-by-side with adjusted widths
- Desktop: Full side-by-side layout as specified
- Breakpoint: ~768px for layout switch

### Accessibility
- Keyboard navigation for all controls
- ARIA labels for buttons and controls
- Alt text for visual elements
- High contrast mode support

## File Structure Suggestion

```
turing-patterns/
├── index.html
├── styles.css
├── js/
│   ├── simulation.js    # Gray-Scott algorithm
│   ├── renderer.js      # Canvas rendering & color mapping
│   ├── controls.js      # UI event handlers
│   └── main.js          # Application initialization
└── README.md
```

## User Experience Flow

1. **Initial Load**: 
   - Canvas shows blank/seeded state
   - Default pattern type selected (spots)
   - Play automatically starts

2. **Exploration**:
   - User switches pattern types to see different behaviors
   - Uses drawing tools to create custom disturbances
   - Adjusts speed to observe evolution

3. **Customization**:
   - Changes color scheme for aesthetic preference
   - Creates unique patterns through drawing

4. **Sharing**:
   - Saves favorite patterns as images
   - Optionally shares parameters (future enhancement)

## Future Enhancement Ideas
(Not required for initial implementation)

- URL parameter sharing for preset configurations
- Advanced parameter sliders (F, K, Du, Dv customization)
- Multiple pattern layers/blending
- Video recording of pattern evolution
- Gallery of saved patterns
- Random pattern generator
- Export simulation state (save/load)
