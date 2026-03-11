# Dicero — Game Specification

## Overview

**Dicero** is a single-player roguelike deckbuilder where poker is replaced by Yahtzee-style dice rolling. Inspired by Balatro's structure, players roll dice to form scoring combinations, collect **Charms** (passive modifiers), use **Blessings** to level up scoring categories, and apply **Enchantments** to modify individual dice — all while progressing through five increasingly difficult **Trials**, each culminating in a boss encounter with a unique modifier.

**Theme:** Mystical / arcane. The player is a wandering sorcerer rolling ancient dice in enchanted trials. Enemies are magical creatures and corrupted spirits. Charms are artifacts of power. The dice themselves are relics of a forgotten age.

**Tech:** Single-file HTML/CSS/JS browser game. No frameworks, no build step. Web Audio API for synthesized SFX. Canvas-based starfield background and 3D dice cascade effects.

---

## Core Mechanics

### Dice Rolling

- The player rolls **5 standard six-sided dice** (faces 1–6).
- After each roll, the player may **keep** (click to select) any number of dice and **reroll** the rest.
- The player gets **3 rerolls** per encounter (initial roll + 3 rerolls = 4 total roll opportunities per hand).
- After rolling, the player selects a **scoring category** from the right sidebar to score the hand.
- Kept dice are visually raised with a gold glow. They cannot be animated or have their values changed during rerolls.

### Scoring Formula

```
SCORE = (Base Chips + Die Values + Charm Bonuses) × (Base Mult + Charm Mult Bonuses)
```

- **Chips** = sum of scored dice face values + category base chips + Charm chip bonuses
- **Mult** = category base mult + Charm mult bonuses
- Additive mult (+mult) resolves before multiplicative mult (×mult)
- Charm slot order (left to right) determines activation sequence

### Scoring Categories

Categories are **reusable** — the same category can be scored multiple times per run. Each has base chips and mult that increase when leveled up with Blessings.

| Category | Description | Base Chips | Base Mult |
|---|---|---|---|
| **Ones** | All dice showing 1 | 8 | 3 |
| **Twos** | All dice showing 2 | 8 | 3 |
| **Threes** | All dice showing 3 | 9 | 3 |
| **Fours** | All dice showing 4 | 10 | 3 |
| **Fives** | All dice showing 5 | 11 | 3 |
| **Sixes** | All dice showing 6 | 12 | 3 |
| **Three of a Kind** | 3+ same value | 18 | 3 |
| **Four of a Kind** | 4+ same value | 32 | 5 |
| **Full House** | 3 of one + 2 of another | 22 | 4 |
| **Small Straight** | 4 sequential dice | 25 | 4 |
| **Large Straight** | 5 sequential dice | 40 | 7 |
| **Dicero** | All 5 dice same value (Yahtzee) | 50 | 12 |
| **Chance** | Any combination, sum of all dice | 6 | 2 |

### Hands and Encounters

- The player has **4 hands** per encounter (attempts to score).
- **3 rerolls** shared across the encounter (not per hand).
- Cumulative score across all hands must meet or exceed the enemy's **target score** to win.
- Running out of hands without meeting the target ends the run.

---

## Progression: The Five Trials

Each run consists of **5 Trials**. Each Trial contains **4 enemy encounters** (3 regular + 1 boss). Target scores increase with each encounter and Trial.

After every non-boss encounter, the player visits the **Shop**.

### Score Scaling

| Trial | Base Target | Boss Target |
|---|---|---|
| Trial 1: The Ember Sanctum | 300 | 450 |
| Trial 2: The Hollow Depths | 750 | 2,250 |
| Trial 3: The Shattered Spire | 3,000 | 10,000 |
| Trial 4: The Obsidian Rift | 15,000 | 50,000 |
| Trial 5: The Astral Throne | 75,000 | 250,000 |

Within each Trial, enemies scale from 1× to ~2.5× the base target. Boss targets are listed above.

---

## Enemies

Each Trial has 3 regular enemies with no special effects, followed by a **Boss** with a unique modifier that changes gameplay.

### Trial 1: The Ember Sanctum

| Enemy | Effect |
|---|---|
| **Cinder Imp** | No effect |
| **Ember Golem** | No effect |
| **Flame Keeper** | No effect |
| **BOSS: Pyraxxus** | Sixes are debuffed — those dice give 0 chips and skip Charm effects |

### Trial 2: The Hollow Depths

| Enemy | Effect |
|---|---|
| **Spore Crawler** | No effect |
| **Fungal Shaman** | No effect |
| **Crystal Lurker** | No effect |
| **BOSS: Gloomjaw** | After each hand, lowest-scoring used category is devoured (disabled) |

### Trial 3: The Shattered Spire

| Enemy | Effect |
|---|---|
| **Storm Elemental** | No effect |
| **Skyborne Sentinel** | No effect |
| **Shardcaster** | No effect |
| **BOSS: Voltaryx** | Can't score same category twice in a row |

### Trial 4: The Obsidian Rift

| Enemy | Effect |
|---|---|
| **Void Flickerer** | No effect |
| **Glass Stalker** | No effect |
| **Null Prophet** | No effect |
| **BOSS: Nihilex** | Two random numbers banned (0 chips, don't count for combos) |

### Trial 5: The Astral Throne

| Enemy | Effect |
|---|---|
| **Stellar Wisp** | No effect |
| **Constellation Beast** | No effect |
| **Fate Spinner** | No effect |
| **BOSS: Aeonax** | Three numbers banned, -1 hand |

---

## Charms

Charms are the core build-defining element — equivalent to Balatro's Jokers. The player holds them in **Charm Slots** (starting with 5, expandable). Charms persist across the entire run until sold or destroyed. Charms can be **drag-reordered** in the sidebar.

### Charm Rarities

| Rarity | Shop Rate | Cost Range |
|---|---|---|
| **Common** | 70% | $4–6 |
| **Uncommon** | 25% | $6–9 |
| **Rare** | 5% | $10–16 |
| **Legendary** | Special | $18–20 |

### Charm Activation Types

| Type | When It Triggers |
|---|---|
| **On Roll** | When dice are rolled |
| **On Keep** | When dice are locked in |
| **On Score** | Per scored die during scoring |
| **On Reroll** | When rerolling dice |
| **On Category** | When a specific category is scored |
| **Independent** | Flat bonuses after scoring |
| **Scaling** | Permanent stat gains over the run |
| **Economy** | Gold generation or shop advantages |
| **Passive** | Always-on rule changes |

### All Charms

#### Common

| Charm | Icon | Effect | Type |
|---|---|---|---|
| Lucky Penny | 🪙 | +8 chips | Independent |
| Iron Die | 🎲 | +4 mult | Independent |
| Snake Eyes | 🐍 | +20 chips when any pair is rolled | On Roll |
| Steady Hand | ✋ | +1 mult per die kept on first reroll | On Keep |
| Copper Ring | 💍 | +$1 after each encounter | Economy |
| Warm Ember | 🔥 | Dice showing 1 give +5 chips when scored | On Score |
| Loaded Bones | 🦴 | +15 chips when scoring Chance | On Category |
| Gambler's Grin | 😏 | +1 mult per reroll used | On Reroll |
| Tallow Candle | 🕯️ | +15 chips if scoring exactly 2 dice | On Score |
| Field Mouse | 🐭 | Score <100: gain $2 | Economy |
| Double Down | 👯 | +4 mult when scoring a pair or better | On Score |
| Road Runner | 🏃 | +3 mult when scoring any Straight | On Score |
| War Drum | 🥁 | +1 mult permanently per encounter won | Scaling |
| Golden Ticket | 🎫 | +$1 per 6 scored in a hand | Economy |
| Pair Bond | 💑 | +12 chips per pair in your dice | On Score |
| Compass | 🧭 | +20 chips when scoring any Straight | On Score |
| Balanced Diet | 🥗 | +2 mult when scoring Full House | On Score |
| Number Cruncher | 🔢 | +2 mult per matching die beyond the first | On Score |
| Herd Instinct | 🐑 | +1 mult permanently per Three of a Kind scored | Scaling |
| Treasure Hunter | ⛏️ | +3 chips permanently per encounter | Scaling |
| Underdog | 🐕 | +4 mult when score is below 50% of target | On Score |
| Fortress | 🏰 | +1 mult per kept die (scored or not) | On Score |
| Lucky Clover | ☘️ | 20% chance: +15 chips after each hand | On Score |
| Recycler | ♻️ | +1 mult permanently each time you use all 3 rerolls | Scaling |
| Piggy Bank | 🐷 | +$1 per encounter; sell for accumulated gold | Scaling |
| Reroll Addict | 🎡 | +1 reroll per encounter | Passive |

#### Uncommon

| Charm | Icon | Effect | Type |
|---|---|---|---|
| Obsidian Shard | 🗡️ | Each 6 scored: ×1.5 mult | On Score |
| Fortune's Wheel | ☸️ | +3 chips permanently per full reroll | Scaling |
| Echoing Die | 🔊 | Highest scored die triggers twice | On Score |
| Bone Abacus | 🧮 | +1 mult permanently per Four of a Kind | Scaling |
| Snake Charmer | 🪈 | Small Straights: +20 chips, +2 mult | On Category |
| Hexed Coin | 🪬 | +$4/encounter | Economy |
| Stone Mask | 🗿 | All 5 dice different: +6 mult | On Score |
| Blood Pact | 🩸 | +5 mult, but -1 hand/encounter | Independent |
| Triple Threat | 🎯 | Three of a Kind: retrigger highest die | On Score |
| Even Steven | ⚖️ | Each even die (2,4,6) scored: +3 mult | On Score |
| Odd Todd | 🃏 | Each odd die (1,3,5) scored: +3 mult | On Score |
| Glass Cannon | 💣 | ×2 mult, destroyed after 3 uses | On Score |
| Midas Touch | 👑 | +2 chips permanently per $1 spent in shops | Scaling |
| Tax Collector | 🏛️ | +$2 per unused hand at end of encounter | Economy |
| Mob Mentality | 👥 | +3 mult per die showing the most common value | On Score |
| Domino Effect | 🀄 | Four of a Kind: retrigger all matching dice | On Score |
| Highway | 🛣️ | Large Straight: +5 mult | On Category |
| Shortcut | ⚡ | Small Straight: ×1.5 mult | On Score |
| Home Sweet Home | 🏠 | Full House: +25 chips, +3 mult | On Category |
| Rage Crystal | 💎 | +0.5 mult permanently per hand played | Scaling |
| Momentum | 🏎️ | +2 mult for each consecutive hand scoring 100+ (resets on fail) | On Score |
| Golden Goose | 🪿 | +1 chip per $1 you have | On Score |
| Heavy Hitter | 🔨 | +20 chips when scoring 4+ dice | On Score |
| Lucky Seven | 🍀 | Dice sum to exactly 7: +50 chips | On Score |
| Bounty Hunter | 🎯 | +$3 for winning on your last hand | Economy |
| Merchant | 🏪 | Shop items cost $1 less (min $1) | Economy |
| Mirror Match | 🪞 | All 5 dice same parity (all odd or all even): +6 mult | On Score |
| Chaos Rider | 🌪️ | +5 chips per reroll used this hand | On Score |
| Iron Will | ⚔️ | +2 mult per hand already used this encounter | On Score |
| Dice Whisperer | 👂 | +2 mult per unkept die when scoring | On Score |
| Minimalist | ✂️ | +3 mult per empty charm slot | Independent |
| Ace Devotion | 1️⃣ | Each 1 scored: +8 chips, +2 mult | On Score |
| Twin Fangs | 2️⃣ | Each 2 scored: +8 chips, +2 mult | On Score |
| Trinity | 3️⃣ | Each 3 scored: +8 chips, +2 mult | On Score |
| Quad Core | 4️⃣ | Each 4 scored: +8 chips, +2 mult | On Score |
| High Five | 5️⃣ | Each 5 scored: +8 chips, +2 mult | On Score |
| Sixth Sense | 6️⃣ | Each 6 scored: +8 chips, +2 mult | On Score |
| Lone Wolf | 🐺 | Scoring exactly 1 die: ×2.5 mult | On Score |
| Sniper | 🎯 | Scoring exactly 1 or 2 dice: +20 chips, +3 mult | On Score |

#### Rare

| Charm | Icon | Effect | Type |
|---|---|---|---|
| Chrono Die | ⏳ | +1 reroll per encounter | Passive |
| The Ouroboros | 🐉 | +5 chips & +1 mult per failed encounter | Scaling |
| Golden Bones | ✨ | ×1.5 mult if you have $20+ | Independent |
| Fate Bender | 🔮 | Once/encounter: set a die to any value | Passive |
| Chaos Orb | 🌀 | Each roll: one random die is wild | On Roll |
| Echo Chamber | 🔁 | All scored dice trigger twice for chips | On Score |
| Blueprint | 📋 | Copies the effect of your first charm slot | Passive |
| Daredevil | 🏍️ | ×2 mult on your last hand | On Score |
| Devotee | 🛐 | All scored dice same number: ×2.5 mult | On Score |
| Loaded Dice | 🎰 | After rolling, one random unkept die copies the most common face | On Roll |
| Perfectionist | 💯 | Dicero: ×3 mult | On Score |
| Wanderlust | 🗺️ | +2 mult permanently per Straight scored | Scaling |
| Family Portrait | 🖼️ | Full House: retrigger all 5 dice | On Score |
| Inferno | 🌋 | ×1.5 mult if hand score exceeds 250 | On Score |
| Crescendo | 📈 | Each hand this encounter: +2 mult (stacks) | On Score |
| Turbulence | 🌊 | If you used all rerolls: ×1.5 mult | On Score |
| All In | 🎰 | ×3 mult but -1 hand. Only works with 2 hands or fewer left | On Score |
| Gambler's Ruin | 💀 | ×2 mult. If you lose the encounter, lose $5 | Independent |
| Last Stand | 🛡️ | On final hand: +10 mult, +30 chips | On Score |
| Precision | 🔬 | +4 mult per kept die not used in scoring | On Score |
| Steel Forge | ⚒️ | Steel dice give +8 mult instead of +4 | Passive |
| Overkill | 💥 | Beat target by 2x+ in a single hand: +$5 | Economy |
| Second Wind | 💨 | Once/encounter: if a hand scores 0, gain +1 hand back | Passive |
| Ancient Tome | 📜 | Every 3 encounters won, level up a random category | Scaling |
| Temple Pilgrim | 🏛️ | On boss kill: level up 2 random categories | Economy |
| Scholar | 📖 | After winning, level up most-used category this encounter | Economy |

#### Legendary

| Charm | Icon | Effect | Type |
|---|---|---|---|
| The First Die | 💠 | All dice +1 to face value (6→7) | Passive |
| Paradox Engine | ⚡ | 12% chance mult is squared | On Score |
| Eternity's Gambit | ♾️ | Choose a category: ×3 mult for the encounter | Passive |
| The Alchemist | ⚗️ | Chips and Mult are swapped before multiplying | On Score |
| Golden Ratio | 🌀 | Dice show exactly 1-2-3-4-5: ×5 mult | On Score |
| Double or Nothing | 🎲 | 50% chance: ×2 mult. 50% chance: ÷2 mult | On Score |

### Number-Specific Charm Interactions

When a player has a charm that targets a specific die value (Ace Devotion, Twin Fangs, Trinity, Quad Core, High Five, Sixth Sense, Warm Ember, Obsidian Shard), any rolled die matching that value receives a **charm-boosted** visual effect — gold pulsing border and golden-tinted dots.

---

## Die Modifications / Enchantments

Enchantments are consumable items that permanently modify individual dice for the run. Each die can hold only **one** modification. Applied via the shop's enchantment system.

| Modification | Effect | Visual |
|---|---|---|
| **Steel** | +4 mult when kept but NOT scored | Metallic blue-gray border |
| **Gilded** | +10 chips when scored | Gold border |
| **Void** | ×1.5 mult but 0 chips when scored | Dark purple border |
| **Lucky** | 25% chance to trigger twice when scored | Green border |
| **Wild** | Counts as any value for combos | Rainbow border |
| **Weighted** | Always rolls 4–6 | Gold border |
| **Cursed** | +8 mult when scored, -1 hand if shows 1 | Red border |
| **Mirrored** | Die value also adds as mult when scored | Cyan border |

### Enchantment Items

| Item | Effect | Cost |
|---|---|---|
| Rune of Iron | Apply Steel | $5 |
| Goldweave | Apply Gilded | $6 |
| Shadow Ink | Apply Void | $5 |
| Chaos Rune | Apply Wild | $7 |
| Fate's Favor | Apply Lucky | $5 |
| Dark Bargain | Apply Cursed | $4 |
| Weight Rune | Apply Weighted | $6 |
| Mirror Shard | Apply Mirrored | $6 |
| Artisan's Touch | Remove a modification | $3 |

---

## Blessings (Category Leveling)

Blessings permanently level up a scoring category, increasing its base chips and mult.

| Blessing | Category | Chips/Level | Mult/Level |
|---|---|---|---|
| Blessing of Embers | Ones | +8 | +2 |
| Blessing of Tides | Twos | +8 | +2 |
| Blessing of Stone | Threes | +8 | +2 |
| Blessing of Wind | Fours | +8 | +2 |
| Blessing of Stars | Fives | +8 | +2 |
| Blessing of Shadow | Sixes | +8 | +2 |
| Blessing of Harmony | Full House | +15 | +2 |
| Blessing of Triplicity | Three of a Kind | +12 | +1 |
| Blessing of Dominion | Four of a Kind | +15 | +2 |
| Blessing of the Path | Small Straight | +15 | +2 |
| Blessing of the Journey | Large Straight | +20 | +3 |
| Blessing of Perfection | Dicero | +25 | +4 |
| Blessing of Fortune | Chance | +8 | +1 |

---

## Economy & Shop

### Gold Earning (per encounter)

- Base: $3 for regular enemies, $7 for bosses
- Unused hands: +$1 each
- Interest: +$1 per $5 held (max +$5, caps at $25 held)

### Shop Contents

Appears after each non-boss encounter.

| Slot | Contents |
|---|---|
| 2 Charm slots | Random Charms (rerollable, cost increases per reroll) |
| 1 Blessing slot | Random Blessing ($3–5) |
| 1 Enchantment slot | Random Enchantment ($3–7) |
| 1 Special item slot | Rotating specials |

### Special Shop Items

| Item | Effect | Cost |
|---|---|---|
| Extra Hand Scroll | +1 hand next encounter | $3 |
| Extra Reroll Scroll | +1 reroll next encounter | $3 |
| Dice Polish | One die starts at 6 next hand | $4 |
| Charm Slot +1 | Permanently +1 charm slot | $10 |

### Selling

- Charms can be sold for 50% of purchase price
- Some charms grant bonuses when sold (e.g., Piggy Bank)

---

## Run Structure

```
START RUN
│
├─ Choose Starting Charm (pick 1 of 3 random Common Charms)
│
├─ TRIAL 1: The Ember Sanctum
│   ├─ Enemy 1 → Shop
│   ├─ Enemy 2 → Shop
│   ├─ Enemy 3 → Shop
│   └─ BOSS: Pyraxxus → Trial Reward
│
├─ TRIAL 2: The Hollow Depths
│   ├─ Enemy 1 → Shop
│   ├─ Enemy 2 → Shop
│   ├─ Enemy 3 → Shop
│   └─ BOSS: Gloomjaw → Trial Reward
│
├─ TRIAL 3–4: (same structure)
│
├─ TRIAL 5: The Astral Throne
│   ├─ Enemy 1 → Shop
│   ├─ Enemy 2 → Shop
│   ├─ Enemy 3 → Shop
│   └─ FINAL BOSS: Aeonax → VICTORY
│
└─ END RUN
```

### Trial Rewards

After each boss, the player chooses one of three:
- **Rare Charm** (from pool)
- **Blessing** (level up a category)
- **Gold** (+$15)

---

## UI Layout

### Three-Column Layout

- **Left Sidebar (220px):** Charm slots with drag-to-reorder. Shows icon, name, rarity badge, description. Charms can be dragged to rearrange activation order.
- **Center:** 5 large 3D dice with visual states (unrolled/red, normal/purple, kept/gold, scored/green). Below: animated score display showing `Chips × Mult = Result`. Below that: scoring log and action buttons.
- **Right Sidebar (240px):** Scoring categories sorted by validity. Best pick highlighted in green. Shows category name, chips, mult, level, and projected total.
- **Top Bar:** Enemy name and effect, score progress bar (animated gradient), trial/encounter counter, gold/hands/rerolls display.

### Visual States

| State | Appearance |
|---|---|
| **Unrolled** | Red border, dark red background |
| **Normal** | Purple border, dark purple background |
| **Kept** | Gold border, raised position, pulsing gold glow |
| **Scored** | Green border, green glow |
| **Charm-Boosted** | Gold pulsing border, golden dots (when a charm targets that die value) |
| **Rolling** | Border hidden, 3D cube rotation animation |
| **Modified** | Border color matches modification type |

### 3D Dice System

Each die is rendered as a 3D CSS cube with 6 faces. The visible face is determined by CSS `transform: rotateX/rotateY`. Rolling uses 4 animation variants with staggered timing for visual variety. Dot patterns are positioned absolutely within a grid for each face value (1–7, where 7 is enabled by The First Die charm).

### Score Progress Bar

The top bar includes a progress bar showing cumulative score vs target. Uses a gradient (`#5030a0 → #7050c0 → #e8d080 → #ffd700`) with a slow color strobe animation. Boss encounters switch to a red/gold theme.

---

## Audio System (Web Audio API)

All sounds are synthesized — no audio files. Generated using oscillators, gains, and frequency sweeps.

| Sound | Trigger | Description |
|---|---|---|
| Roll | Dice rolled | 6 quick percussive taps |
| Keep | Die selected | Sine tone at 600Hz |
| Unkeep | Die deselected | Lower pitch (400Hz) |
| Score | Category scored | 5 cascading coin sounds (1800–2400Hz) |
| Chip | Chips revealed | Sine sweep down (1400→1000Hz) |
| Mult | Mult revealed | Cash register (1800+2200Hz + ring) |
| Charm | Charm acquired | Magical shimmer (880→1320Hz ascending) |
| Victory | Boss defeated | Ascending chord (C-E-G-C) |
| Defeat | Run failed | Descending notes (400→200Hz) |
| Buy | Shop purchase | Coin slide (1200→800Hz) |
| BigScore | Score >250 | Coin shower + rising shimmer |

---

## Special Mechanics

### The First Die (Legendary)

All dice gain +1 to face value. A die showing 6 displays as 7 with all 7 dot positions filled. Affects both combination detection and visual rendering.

### Wild Dice

Applied via Chaos Orb charm or Chaos Rune enchantment. Count as any value for combination purposes. Automatically assigned to form the best possible hand.

### Phased Die (Void Flickerer enemy)

One die shows random value each reroll. Can't be kept. Visual indicates phased state with hidden dots.

### Scoring Sequence (Order of Operations)

1. Determine combination and scored dice
2. Calculate base chips (die sum + category base)
3. Calculate base mult (category base)
4. On Score charm effects (left to right, per scored die)
5. On Category charm effects
6. Independent charm bonuses
7. Die modification effects (Gilded, Void, Steel, Mirrored, etc.)
8. Enemy passive effects
9. Final: Total Chips × Total Mult = Score
10. Add to cumulative score, check win condition

---

## Visual Design

### Color Palette

| Element | Color |
|---|---|
| Background | `#06060e` (deep dark blue) |
| Primary accent | `#e8d080` / `#ffd700` (gold) |
| Secondary accent | `#7848c0` / `#a050e0` (purple) |
| Chips text | `#6fbbff` (cyan) |
| Mult text | `#ff6b6b` (red) |
| Score result | `#ffd700` (gold) |
| Body text | `#d4c5a0` (cream) |
| UI text | `#c0b0e0` (lavender) |

### Effects

- **CRT overlay:** Subtle scanlines + vignette via CSS pseudo-elements
- **Starfield background:** Canvas-based animated particle starfield
- **Dice Cascade:** Falling 3D dice celebration on boss defeats
- **Font:** Chakra Petch (Google Fonts)

---

## Balancing Principles

- **Trial 1** teaches mechanics; beatable with minimal charms.
- **Trial 2** requires a basic build direction and a few synergistic charms.
- **Trial 3** is the mid-game check; scaling charms become essential.
- **Trial 4** demands exponential scaling; ×mult charms and leveled categories required.
- **Trial 5** is the victory lap for strong builds and a wall for weak ones.
- Boss encounters test "can my build handle this restriction?" not just "is my score high enough?"
