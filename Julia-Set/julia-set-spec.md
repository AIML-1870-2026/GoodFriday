# Julia Set Explorer - Specification

## Overview
An interactive web-based fractal explorer that renders Julia sets and the Mandelbrot set in real-time. Users can explore different regions of the complex plane, adjust parameters dynamically, and visualize the mathematical beauty of these fractals through various color schemes and animations.

## Core Features

### 1. Fractal Rendering Engine
- **Algorithm**: Escape-time algorithm for complex iteration
- **Julia Set**: z → z² + c, where c is a complex constant
- **Mandelbrot Set**: z → z² + c, where z starts at 0 and c varies per pixel
- **Max Iterations**: 100-500 (adjustable for quality vs. performance)
- **Resolution**: Full canvas resolution with pixel-perfect rendering
- **Performance**: Progressive rendering for smooth interaction, target 30+ FPS during navigation

### 2. Navigation & Interaction
Users can explore the fractal space intuitively:

- **Mouse Wheel Zoom**: Scroll to zoom in/out (centered on cursor position)
- **Click-and-Drag Pan**: Drag to move around the complex plane
- **Double-Click Zoom**: Double-click to zoom in 2x at that point
- **Reset View**: Button to return to default view
- **Zoom Level Display**: Show current zoom level (e.g., "100x", "1000x")
- **Coordinate Display**: Show current complex plane coordinates on hover

### 3. Julia Set Parameters
Real-time adjustable complex constant c = a + bi:

- **Real Part (a)**: Slider range -2.0 to 2.0, step 0.01
- **Imaginary Part (b)**: Slider range -2.0 to 2.0, step 0.01
- **Live Update**: Fractal re-renders as sliders are dragged
- **Numeric Input**: Text boxes for precise value entry
- **Random Button**: Generate random interesting c values

### 4. Famous Julia Set Presets
Pre-configured buttons for well-known Julia sets:

- **Dendrite** (c = 0.0 + 1.0i): Tree-like branching structure
- **Spiral** (c = -0.4 + 0.6i): Swirling spiral patterns  
- **Rabbit** (c = -0.123 + 0.745i): Rabbit-like silhouette with three-fold symmetry
- **Dragon** (c = -0.8 + 0.156i): Dragon curve fractal
- **San Marco** (c = -0.75 + 0.0i): Symmetric fractal named after basilica
- **Siegel Disk** (c = -0.391 - 0.587i): Circular disk structure
- **Douady's Rabbit** (c = -0.122561 + 0.74486i): High-precision rabbit variant
- **Custom**: Save and recall user-defined favorites (up to 5 slots)

### 5. Mandelbrot Mode Toggle
Switch between Julia and Mandelbrot visualization:

- **Toggle Button**: Switch between "Julia Set" and "Mandelbrot Set" modes
- **Mode Indicator**: Clear visual indication of current mode
- **Mandelbrot Behavior**: 
  - In Mandelbrot mode, displays the full Mandelbrot set
  - Hovering over Mandelbrot set shows preview of corresponding Julia set
  - Clicking sets that c value and switches to Julia mode
- **Default View**: Mandelbrot (-2.5 to 1.5 real, -1.5 to 1.5 imaginary)

### 6. Color Schemes
Multiple visualization options with smooth gradients:

- **Classic** (Black → Blue → Cyan → White): Traditional fractal coloring
- **Fire** (Black → Red → Orange → Yellow → White): Heat map style
- **Ice** (Dark Blue → Blue → Cyan → White): Cool color palette
- **Rainbow** (Red → Orange → Yellow → Green → Cyan → Blue → Magenta): Full spectrum
- **Monochrome** (Black → Gray → White): Simple grayscale
- **Psychedelic** (Purple → Pink → Orange → Yellow → Green): High-contrast vibrant
- **Ocean** (Navy → Blue → Turquoise → Seafoam): Underwater aesthetic
- **Sunset** (Deep Purple → Orange → Pink → Peach): Warm gradient
- **Custom**: User-defined gradient with color picker stops

**Color Mapping Options:**
- Smooth coloring algorithm (continuous potential)
- Banding control slider (1-20 bands for posterized effects)
- Interior color selector (color for points in the set)
- Invert colors checkbox

### 7. Animation Features
Morph between different c values to visualize transformation:

- **Play/Pause Animation**: Toggle button for animation control
- **Animation Path Types**:
  - **Circular**: c moves in a circle in the complex plane
  - **Linear**: c moves linearly between two points
  - **Preset Tour**: Cycles through famous Julia sets
  - **Custom Path**: User defines waypoints
- **Animation Speed**: Slider from 0.1x to 5.0x speed
- **Frame Rate**: Target 30-60 FPS
- **Loop Option**: Checkbox to repeat animation infinitely
- **Export Animation**: Record as GIF or video (future enhancement)

### 8. Quality & Performance Settings
Adjustable rendering options:

- **Iteration Count**: Slider 50-1000 (affects detail and computation time)
- **Render Quality**: Low/Medium/High/Ultra presets
- **Anti-aliasing**: Toggle for smoother edges (supersampling)
- **Progressive Rendering**: Toggle for responsive vs. quality-first rendering

### 9. Save & Export
Capture and share creations:

- **Save Image**: Download current view as PNG
  - Filename format: `julia-set-[a]_[b]i-YYYYMMDD-HHMMSS.png`
  - Option for higher resolution export (2x, 4x current canvas size)
- **Save State**: Export current parameters as JSON for recreation
- **Load State**: Import saved parameter configurations
- **Share URL**: Generate URL with encoded parameters (future enhancement)

## UI Layout

### Overall Structure
```
┌─────────────────────────────────────────────────────────────────┐
│                         Header/Title Bar                        │
│              "Julia Set Explorer" | Mode: [Julia/Mandelbrot]    │
├─────────────────────────────────────┬───────────────────────────┤
│                                     │   Control Panel (Right)   │
│                                     │   ┌───────────────────┐   │
│                                     │   │ Mode & Quick      │   │
│         Canvas Display (Left)       │   │ Actions           │   │
│                                     │   ├───────────────────┤   │
│      (Interactive Fractal View)     │   │ ▼ Parameters      │   │
│                                     │   ├───────────────────┤   │
│    [Coordinate & Zoom Info Overlay] │   │ ▼ Presets         │   │
│                                     │   ├───────────────────┤   │
│                                     │   │ ▼ Color Scheme    │   │
│                                     │   ├───────────────────┤   │
│                                     │   │ ▼ Navigation      │   │
│                                     │   ├───────────────────┤   │
│                                     │   │ ▼ Animation       │   │
│                                     │   ├───────────────────┤   │
│                                     │   │ ▼ Quality         │   │
│                                     │   ├───────────────────┤   │
│                                     │   │ Information       │   │
│                                     │   │ (Always Visible)  │   │
│                                     │   └───────────────────┘   │
└─────────────────────────────────────┴───────────────────────────┘
```

### Left Panel: Canvas Display
- **Dimensions**: Responsive, maintains aspect ratio (default 800x800px)
- **Minimum Size**: 600x600px
- **Maximum Size**: Fills available viewport height
- **Aspect Ratio**: 1:1 (square) preferred, flexible for different screens
- **Background**: Black during computation
- **Overlays**: 
  - Current coordinates (top-left corner)
  - Zoom level indicator (top-right corner)
  - Loading indicator during progressive rendering
  - Crosshair at center (optional, toggleable)

### Right Panel: Control Panel
Width: 320-380px, scrollable, collapsible sections

#### Permanent Controls (Always Visible at Top)

**Mode Toggle**
- Large toggle switch: "Julia Set" ⟷ "Mandelbrot Set"
- Current mode clearly highlighted

**Quick Actions** (Button row)
- Save Image button (download icon)
- Reset View button (home icon)
- Random Julia button (dice icon)

#### Collapsible Sections

**1. Parameters** (▼/▶ toggle)
*Julia Set Mode:*
- **Real Part (a)**: 
  - Slider: -2.0 to 2.0, default 0.0
  - Numeric input box with validation
- **Imaginary Part (b)**:
  - Slider: -2.0 to 2.0, default 0.0
  - Numeric input box with validation
- **Visual**: Mini preview showing c position on complex plane

*Mandelbrot Mode:*
- Read-only display: "Exploring Mandelbrot Set"
- Note: "Click on canvas to select c value"

**2. Presets** (▼/▶ toggle)
- Grid of preset buttons (2-3 columns)
- Each button shows:
  - Preset name
  - Small thumbnail preview (optional)
  - Complex value on hover
- "My Favorites" section with 5 save slots
  - Save current button
  - Load/Delete saved presets

**3. Color Scheme** (▼/▶ toggle)
- Dropdown or button grid for preset schemes
- **Color Options**:
  - Scheme selector (dropdown or tiles)
  - Interior color picker (points inside set)
  - Invert colors checkbox
  - Banding slider (1-20 bands)
- **Custom Gradient** (if selected):
  - Multiple color stop pickers (3-5 stops)
  - Position sliders for each stop
  - Live gradient preview bar

**4. Navigation** (▼/▶ toggle)
- **Zoom Controls**:
  - Zoom In button (+)
  - Zoom Out button (-)
  - Reset View button (home)
  - Zoom level display (e.g., "512x")
- **Pan Controls**:
  - Arrow buttons (↑ ↓ ← →)
  - Or mini joystick interface
- **Coordinate Input**:
  - Center Real: input box
  - Center Imaginary: input box
  - "Go" button to jump to coordinates
- **Zoom to Region**:
  - Click and drag rectangle on canvas (future enhancement)

**5. Animation** (▼/▶ toggle)
- **Playback**:
  - Play/Pause button (large, prominent)
  - Progress bar showing animation position
- **Animation Type**:
  - Radio buttons: Circular / Linear / Preset Tour / Custom
- **Speed Control**:
  - Slider: 0.1x to 5.0x
  - Current speed display
- **Loop Settings**:
  - Loop checkbox
  - Number of loops input (or infinite)
- **Path Configuration** (when Custom selected):
  - Add waypoint button
  - List of waypoints with delete option
  - Preview path on mini complex plane

**6. Quality** (▼/▶ toggle)
- **Preset Quality**:
  - Radio buttons: Low / Medium / High / Ultra
  - Each shows iteration count
- **Custom Settings**:
  - Max iterations slider (50-1000)
  - Anti-aliasing checkbox
  - Progressive rendering checkbox
- **Performance Info**:
  - Current FPS display
  - Render time for last frame

#### Information Panel (Always Visible at Bottom)

**Title**: "About Julia Sets & The Mandelbrot Set"

**Content**:
- **Julia Sets**:
  - 2-3 sentence explanation of Julia sets
  - Formula: zₙ₊₁ = zₙ² + c
  - Connection to the complex plane
  
- **Mandelbrot Set**:
  - Brief explanation (2-3 sentences)
  - Relationship to Julia sets (each point generates a Julia set)
  - Historical note about Benoît Mandelbrot

- **Tips**:
  - How to navigate (scroll, drag)
  - What colors represent (escape time)
  - Interesting areas to explore

**Formatting**: 
- Compact, readable text (~150-200 words total)
- Collapsible sub-sections if needed
- Links to further reading (optional)
- Mathematical notation using proper symbols

## Interaction Behaviors

### Canvas Interactions

**Mouse Events:**
1. **Scroll/Wheel**: 
   - Zoom in/out centered on cursor position
   - Zoom factor: 1.2x per scroll tick
   - Smooth zoom animation

2. **Click-and-Drag**:
   - *Julia Mode*: Pan the view
   - *Mandelbrot Mode*: Pan + preview Julia set on hover
   - Visual feedback: cursor changes to grabbing hand

3. **Double-Click**:
   - Zoom in 2x at clicked point
   - Smooth animation to new zoom level

4. **Hover** (Mandelbrot mode only):
   - Show coordinates of hovered point
   - Optional: Tiny preview of corresponding Julia set

5. **Click** (Mandelbrot mode only):
   - Select c value at clicked point
   - Switch to Julia mode with that c
   - Brief animation transition

**Touch Support** (Mobile/Tablet):
- Pinch to zoom
- Two-finger drag to pan
- Tap to select (Mandelbrot mode)
- Long press for context menu (future)

### Control Interactions

**1. Parameter Sliders** (Julia Mode):
- Live update as slider is dragged
- Debounced for performance (update every 50ms max)
- Numeric input updates slider position
- Out-of-range values clamped to valid range
- Visual feedback during computation

**2. Preset Buttons**:
- Click to load preset immediately
- Smooth morphing transition (optional)
- Highlight currently active preset
- Tooltip shows full complex value

**3. Mode Toggle**:
- Switches between Julia and Mandelbrot
- Preserves zoom/pan state when switching
- Smooth cross-fade transition
- Updates UI to show/hide relevant controls

**4. Color Scheme Selector**:
- Immediate re-render with new colors
- Does not recompute fractal data (fast)
- Preview swatch for each scheme
- Custom scheme saves with state

**5. Animation Controls**:
- **Play**: Starts animation loop
- **Pause**: Freezes at current frame, preserves state
- **Speed Slider**: Adjusts in real-time
- **Path Type**: Changes animation behavior immediately
- Progress bar is draggable for scrubbing

**6. Navigation Buttons**:
- Zoom in/out: Incremental zoom by 2x
- Arrows: Pan by 25% of viewport
- Reset: Smooth animation back to default view
- Coordinate input: Validates and jumps on Enter or Go button

**7. Quality Settings**:
- Preset buttons: Instant change to iteration counts
- Custom slider: Updates on release (not during drag)
- AA toggle: Re-renders immediately
- Progressive rendering: Affects next render

**8. Save/Export**:
- **Save Image**: 
  - Opens dialog for resolution selection
  - Generates and auto-downloads PNG
  - Shows preview before download
- **Save State**:
  - Downloads JSON file with all parameters
  - Filename: `julia-state-YYYYMMDD-HHMMSS.json`
- **Load State**:
  - File picker for JSON import
  - Validates format before applying
  - Error message if invalid

## Parameter Ranges & Constants

### Fractal Computation

```javascript
// Complex plane default view (Julia mode)
const DEFAULT_JULIA_VIEW = {
  centerReal: 0.0,
  centerImag: 0.0,
  width: 4.0,        // Real axis span
  height: 4.0        // Imaginary axis span
};

// Complex plane default view (Mandelbrot mode)
const DEFAULT_MANDELBROT_VIEW = {
  centerReal: -0.5,
  centerImag: 0.0,
  width: 3.5,
  height: 3.0
};

// Iteration settings
const MAX_ITERATIONS = {
  low: 100,
  medium: 250,
  high: 500,
  ultra: 1000
};

// Escape radius
const ESCAPE_RADIUS = 2.0;
const ESCAPE_RADIUS_SQUARED = 4.0;  // Optimization

// Color smoothing
const SMOOTH_COLORING = true;  // Use continuous potential
```

### Julia Set Presets

```javascript
const JULIA_PRESETS = {
  dendrite: { 
    real: 0.0, 
    imag: 1.0,
    name: "Dendrite",
    description: "Tree-like branching structure"
  },
  spiral: { 
    real: -0.4, 
    imag: 0.6,
    name: "Spiral",
    description: "Beautiful swirling patterns"
  },
  rabbit: { 
    real: -0.123, 
    imag: 0.745,
    name: "Rabbit",
    description: "Three-fold symmetric creature"
  },
  dragon: { 
    real: -0.8, 
    imag: 0.156,
    name: "Dragon",
    description: "Dragon curve fractal"
  },
  sanMarco: { 
    real: -0.75, 
    imag: 0.0,
    name: "San Marco",
    description: "Basilica-like symmetry"
  },
  siegelDisk: { 
    real: -0.391, 
    imag: -0.587,
    name: "Siegel Disk",
    description: "Circular disk structure"
  },
  douadyRabbit: { 
    real: -0.122561, 
    imag: 0.74486,
    name: "Douady's Rabbit",
    description: "High-precision rabbit variant"
  },
  galaxy: {
    real: -0.70176,
    imag: -0.3842,
    name: "Galaxy",
    description: "Spiral galaxy appearance"
  }
};
```

### UI Parameter Ranges

```javascript
// Parameter sliders
parameterSliders: {
  real: {
    min: -2.0,
    max: 2.0,
    default: 0.0,
    step: 0.01
  },
  imaginary: {
    min: -2.0,
    max: 2.0,
    default: 0.0,
    step: 0.01
  }
}

// Zoom constraints
zoom: {
  min: 1.0,          // Maximum zoom out
  max: 1e10,         // Maximum zoom in
  factor: 1.2,       // Per scroll tick
  doubleclickFactor: 2.0
}

// Animation settings
animation: {
  speed: {
    min: 0.1,
    max: 5.0,
    default: 1.0,
    step: 0.1
  },
  framesPerSecond: 30,
  circularRadius: 0.7896  // Golden ratio for aesthetics
}

// Color banding
banding: {
  min: 1,
  max: 20,
  default: 1,
  step: 1
}

// Quality presets
quality: {
  low: { iterations: 100, aa: false },
  medium: { iterations: 250, aa: false },
  high: { iterations: 500, aa: true },
  ultra: { iterations: 1000, aa: true }
}
```

### Color Scheme Definitions

```javascript
const COLOR_SCHEMES = {
  classic: [
    { stop: 0.0, color: '#000000' },   // Black
    { stop: 0.16, color: '#0000aa' },  // Dark blue
    { stop: 0.5, color: '#00ffff' },   // Cyan
    { stop: 1.0, color: '#ffffff' }    // White
  ],
  fire: [
    { stop: 0.0, color: '#000000' },   // Black
    { stop: 0.25, color: '#8b0000' },  // Dark red
    { stop: 0.5, color: '#ff4500' },   // Orange red
    { stop: 0.75, color: '#ffff00' },  // Yellow
    { stop: 1.0, color: '#ffffff' }    // White
  ],
  ice: [
    { stop: 0.0, color: '#001f3f' },   // Navy
    { stop: 0.33, color: '#0074d9' },  // Blue
    { stop: 0.67, color: '#7fdbff' },  // Aqua
    { stop: 1.0, color: '#ffffff' }    // White
  ],
  rainbow: [
    { stop: 0.0, color: '#ff0000' },   // Red
    { stop: 0.17, color: '#ff7f00' },  // Orange
    { stop: 0.33, color: '#ffff00' },  // Yellow
    { stop: 0.5, color: '#00ff00' },   // Green
    { stop: 0.67, color: '#00ffff' },  // Cyan
    { stop: 0.83, color: '#0000ff' },  // Blue
    { stop: 1.0, color: '#8b00ff' }    // Violet
  ],
  monochrome: [
    { stop: 0.0, color: '#000000' },   // Black
    { stop: 0.5, color: '#808080' },   // Gray
    { stop: 1.0, color: '#ffffff' }    // White
  ],
  psychedelic: [
    { stop: 0.0, color: '#9b59b6' },   // Purple
    { stop: 0.25, color: '#e91e63' },  // Pink
    { stop: 0.5, color: '#ff9800' },   // Orange
    { stop: 0.75, color: '#ffeb3b' },  // Yellow
    { stop: 1.0, color: '#4caf50' }    // Green
  ],
  ocean: [
    { stop: 0.0, color: '#000080' },   // Navy
    { stop: 0.33, color: '#0080ff' },  // Ocean blue
    { stop: 0.67, color: '#40e0d0' },  // Turquoise
    { stop: 1.0, color: '#f0fff0' }    // Honeydew
  ],
  sunset: [
    { stop: 0.0, color: '#2c003e' },   // Deep purple
    { stop: 0.33, color: '#ff6b35' },  // Orange
    { stop: 0.67, color: '#ff8dc7' },  // Pink
    { stop: 1.0, color: '#ffd5cd' }    // Peach
  ]
};

// Interior color (points in the set)
const INTERIOR_COLOR_DEFAULT = '#000000';  // Black
```

## Technical Implementation Notes

### Technology Stack
- **HTML5 Canvas** for rendering (2D context)
- **Vanilla JavaScript** or **React** (recommend vanilla for performance)
- **Web Workers** for computation (offload from main thread)
- **CSS Grid/Flexbox** for layout
- **Optional**: GPU.js or WebGL for GPU acceleration

### Algorithm Details

**Escape-Time Algorithm (Julia Set):**
```javascript
function juliaIteration(x0, y0, cReal, cImag, maxIter) {
  let x = x0;
  let y = y0;
  let iteration = 0;
  
  while (x*x + y*y <= 4.0 && iteration < maxIter) {
    const xTemp = x*x - y*y + cReal;
    y = 2*x*y + cImag;
    x = xTemp;
    iteration++;
  }
  
  // Smooth coloring using continuous potential
  if (iteration < maxIter) {
    const log_zn = Math.log(x*x + y*y) / 2;
    const nu = Math.log(log_zn / Math.log(2)) / Math.log(2);
    iteration = iteration + 1 - nu;
  }
  
  return iteration;
}
```

**Mandelbrot Set:**
```javascript
function mandelbrotIteration(x0, y0, maxIter) {
  let x = 0;
  let y = 0;
  let iteration = 0;
  
  while (x*x + y*y <= 4.0 && iteration < maxIter) {
    const xTemp = x*x - y*y + x0;
    y = 2*x*y + y0;
    x = xTemp;
    iteration++;
  }
  
  // Smooth coloring
  if (iteration < maxIter) {
    const log_zn = Math.log(x*x + y*y) / 2;
    const nu = Math.log(log_zn / Math.log(2)) / Math.log(2);
    iteration = iteration + 1 - nu;
  }
  
  return iteration;
}
```

### Performance Optimizations

1. **Web Workers**:
   - Render in separate thread
   - Split canvas into tiles for parallel processing
   - 4-8 workers depending on CPU cores

2. **Progressive Rendering**:
   - First pass: Low resolution (every 4th pixel)
   - Second pass: Medium resolution (every 2nd pixel)
   - Final pass: Full resolution
   - User sees preview quickly while details fill in

3. **Smart Re-rendering**:
   - Only recompute when parameters change
   - Cache color mapping separately from computation
   - Dirty region tracking for partial updates

4. **GPU Acceleration** (Optional):
   - Use WebGL fragment shaders for pixel computation
   - 10-100x speedup for high resolutions
   - Fallback to CPU for unsupported browsers

5. **Zoom Optimization**:
   - Use high-precision arithmetic for deep zooms (BigDecimal)
   - Perturbation theory for extreme zoom levels
   - Limit zoom based on precision available

### Responsive Design

**Breakpoints:**
- **Mobile** (< 768px): 
  - Stack layout (canvas above, controls below)
  - Simplified controls (fewer visible options)
  - Touch-optimized buttons (larger tap targets)
  
- **Tablet** (768px - 1024px):
  - Side-by-side with narrower control panel
  - Collapsible control panel (drawer)
  
- **Desktop** (> 1024px):
  - Full layout as specified
  - Optional: Detachable control panel

### Accessibility

- **Keyboard Navigation**:
  - Tab through all controls
  - Arrow keys to adjust sliders
  - Enter to activate buttons
  - Space to play/pause animation
  
- **Screen Reader Support**:
  - ARIA labels for all interactive elements
  - Announce parameter changes
  - Describe fractal regions (interior/exterior)
  
- **Visual**:
  - High contrast mode option
  - Keyboard focus indicators
  - Sufficient color contrast in UI (WCAG AA)
  
- **Motion**:
  - Respect prefers-reduced-motion
  - Option to disable animations
  - Pause animations when tab not visible

### Browser Compatibility

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Required Features**: Canvas 2D, ES6, Web Workers
- **Optional Features**: WebGL (graceful degradation)
- **Polyfills**: None required for core functionality

## File Structure

```
julia-set-explorer/
├── index.html
├── styles/
│   ├── main.css
│   ├── controls.css
│   └── responsive.css
├── js/
│   ├── main.js              # App initialization
│   ├── fractal.js           # Core algorithms
│   ├── renderer.js          # Canvas rendering
│   ├── colorSchemes.js      # Color mapping
│   ├── navigation.js        # Zoom/pan logic
│   ├── animation.js         # Animation controller
│   ├── controls.js          # UI event handlers
│   ├── presets.js           # Julia set presets
│   └── workers/
│       └── compute.worker.js  # Web worker for computation
├── assets/
│   ├── icons/               # UI icons
│   └── thumbnails/          # Preset thumbnails (optional)
└── README.md
```

## User Experience Flow

### 1. Initial Load
- Canvas displays default Julia set (Dendrite or Spiral)
- All controls visible and ready
- Information panel explains what user is seeing
- Smooth render animation (progressive)

### 2. Exploration Phase
- User drags sliders to see real-time changes
- Clicks presets to jump to famous patterns
- Zooms and pans to explore details
- Switches color schemes for aesthetic preference

### 3. Discovery Phase
- User finds interesting region
- Saves image of discovery
- Tweaks parameters for variations
- Shares via URL parameters

### 4. Advanced Usage
- Switches to Mandelbrot mode
- Clicks points to see corresponding Julia sets
- Creates animation tour
- Exports high-resolution renders

### 5. Learning Phase
- Reads information panel
- Experiments with parameter effects
- Observes relationship between Mandelbrot and Julia sets
- Develops intuition for complex dynamics

## Animation Implementation Details

### Animation Types

**1. Circular Path:**
```javascript
// c moves in a circle: c(t) = r * e^(i*2πt)
function circularPath(t, radius = 0.7896) {
  const angle = 2 * Math.PI * t;
  return {
    real: radius * Math.cos(angle),
    imag: radius * Math.sin(angle)
  };
}
```

**2. Linear Interpolation:**
```javascript
// c moves linearly from c0 to c1
function linearPath(t, c0, c1) {
  return {
    real: c0.real + t * (c1.real - c0.real),
    imag: c0.imag + t * (c1.imag - c0.imag)
  };
}
```

**3. Preset Tour:**
```javascript
// Cycles through preset Julia sets with smooth transitions
function presetTour(t, presets, transitionTime = 0.2) {
  const n = presets.length;
  const segment = Math.floor(t * n);
  const nextSegment = (segment + 1) % n;
  const localT = (t * n) % 1;
  
  // Smooth transition vs. dwelling time
  const transitionT = smoothstep(localT, transitionTime);
  
  return lerp(presets[segment], presets[nextSegment], transitionT);
}
```

**4. Custom Path:**
- User defines waypoints in complex plane
- Bezier curve interpolation between points
- Adjustable dwell time at each waypoint

### Animation Controls

- **Timeline Scrubbing**: Drag progress bar to jump to any frame
- **Speed Adjustment**: Real-time speed changes (0.1x to 5.0x)
- **Export**: Record animation to GIF/MP4 (future enhancement)

## Educational Content (Information Panel)

### Text Content

**Julia Sets**

Julia sets are fractals defined by the iterative equation zₙ₊₁ = zₙ² + c, where z and c are complex numbers. For each point in the complex plane, we test whether the iteration escapes to infinity (colored) or remains bounded (typically black). The value c determines the shape of the Julia set—small changes in c can produce dramatically different patterns.

**The Mandelbrot Set**

The Mandelbrot set is the collection of all complex numbers c for which the Julia set is connected. Each point in the Mandelbrot set corresponds to a Julia set with a particular shape. Points inside the set (black regions) have Julia sets that are connected, while points outside produce disconnected "dust" Julia sets. The intricate boundary reveals infinite complexity at every zoom level.

**Connection Between Them**

Every point c in the complex plane generates its own unique Julia set. The Mandelbrot set acts as a map or index of all Julia sets: click any point on the Mandelbrot set to see its corresponding Julia set. This deep connection, discovered by mathematician Gaston Julia and popularized by Benoît Mandelbrot, reveals the beautiful structure of complex dynamics.

**Navigation Tips**
- **Zoom**: Scroll mouse wheel to zoom in/out
- **Pan**: Click and drag to move around
- **Explore**: Try the presets to see famous patterns
- **Experiment**: Adjust the sliders to create your own fractals
- **Colors**: Different colors represent how quickly points escape to infinity

**Interesting Regions to Explore**
- The boundary between colored and black regions
- "Seahorse valley" in the Mandelbrot set (around -0.75 + 0.1i)
- Mini-Mandelbrots inside the main set
- Spiral arms in the Dendrite Julia set

## Future Enhancements
(Not required for initial implementation)

- **Advanced Features**:
  - 3D Julia sets (quaternion fractals)
  - Other fractal types (Newton, burning ship, etc.)
  - Orbit traps for coloring
  - Distance estimation for sharper boundaries
  
- **Sharing & Community**:
  - Gallery of user-created fractals
  - Social media sharing with preview images
  - Collaborative exploration mode
  
- **Export Options**:
  - 4K/8K resolution renders
  - Video export of animations
  - 3D printed models (STL export)
  - Vector export for specific patterns
  
- **Educational**:
  - Interactive tutorials
  - Mathematical derivations
  - Historical timeline
  - Links to research papers
  
- **Performance**:
  - GPU.js or WebGL implementation
  - Arbitrary precision arithmetic for extreme zooms
  - Server-side rendering for ultra-high resolution

## Success Criteria

A successful implementation will:

1. **Render smoothly**: 30+ FPS during navigation and parameter changes
2. **Be intuitive**: Users can create interesting fractals within 30 seconds
3. **Be educational**: Information panel clearly explains the mathematics
4. **Be beautiful**: Color schemes make fractals visually appealing
5. **Be responsive**: Works well on desktop, tablet, and mobile
6. **Be performant**: Handles deep zooms (1000x+) without crashing
7. **Be shareable**: Users can save and share their discoveries

## Testing Checklist

- [ ] All presets load correctly
- [ ] Parameter sliders update fractal in real-time
- [ ] Zoom and pan work smoothly
- [ ] Color schemes apply correctly
- [ ] Animation plays without stuttering
- [ ] Mode toggle switches properly
- [ ] Save image downloads PNG correctly
- [ ] Mobile touch gestures work
- [ ] Keyboard navigation functional
- [ ] All collapsible sections expand/collapse
- [ ] Progressive rendering shows preview quickly
- [ ] Deep zooms maintain precision
- [ ] Information panel is readable and accurate
