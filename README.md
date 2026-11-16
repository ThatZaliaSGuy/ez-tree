# EZ-Tree

![NPM Version](https://img.shields.io/npm/v/%40dgreenheck%2Fez-tree)
![NPM Downloads](https://img.shields.io/npm/dw/%40dgreenheck%2Fez-tree)
![GitHub Repo stars](https://img.shields.io/github/stars/dgreenheck/ez-tree)
![X (formerly Twitter) Follow](https://img.shields.io/twitter/follow/dangreenheck)
![YouTube Channel Subscribers](https://img.shields.io/youtube/channel/subscribers/UCrdx_EU_Wx8_uBfqO0cI-9Q)

<p align="center">
<img src="https://github.com/user-attachments/assets/cb5f5edd-3e1b-453d-925f-734965126b17">
</p>

# About
EZ-Tree is a procedural tree generator with dozens of tunable parameters. The standalone tree generation code is published as a library and can be imported into your own application for dynamically generating trees on demand. Additionally, there is a standalone web app which allows you to create trees within the browser and export as .PNG or .GLB files.

# App
https://eztree.dev

# Installation

```js
npm i @dgreenheck/ez-tree
```

# Usage

```js
// Create new instance
const tree = new Tree();

// Set parameters
tree.options.seed = 12345;
tree.options.trunk.length = 20;
tree.options.branch.levels = 3;

// Generate tree and add to your Three.js scene
tree.generate();
scene.add(tree);
```

Any time the tree parameters are changed, you must call `generate()` to regenerate the geometry.

## Levels of Detail (LODs)

For scenes with many trees, `generateLODs()` builds the tree at multiple levels of detail hosted in a `THREE.LOD` object inside the tree group. The renderer automatically switches levels based on camera distance. All levels are meshed from the same skeleton, so the tree's silhouette stays consistent across switches — distant levels just use fewer ring segments and fewer (but larger) leaves.

```js
const tree = new Tree();
tree.loadPreset('Ash Medium');
tree.generateLODs(); // instead of generate()
scene.add(tree);
```

The default levels (`Tree.defaultLODLevels`) switch at 100 and 250 units, reducing to roughly 40% and 20% of the full triangle count. You can pass custom levels:

```js
tree.generateLODs([
  { distance: 0, detail: {} }, // full detail
  {
    distance: 80,
    hysteresis: 0.05,
    detail: {
      sectionStride: 3,    // sample every 3rd ring along each branch
      segmentFactor: 0.75, // reduce radial segments to 75% (min 3)
      leafStride: 2,       // keep every 2nd leaf...
      leafScale: 1.4,      // ...enlarged to preserve canopy coverage
      billboard: 'single', // drop the second crossed leaf quad
    },
  },
]);
```

All LOD levels share one bark material and one leaf material, so `tree.update(time)` animates wind at every level. Calling `generate()` afterwards tears the LOD down and restores the single full-detail mesh pair (note that exporting a tree generated with `generateLODs()` to GLB will include every level).

If you have your own LOD or instancing system, `tree.createGeometry(detail)` returns raw `{ branches, leaves }` `BufferGeometry` pairs at any detail level without touching the tree's own meshes.

# Running Standalone App Locally

To run the standalone app locally, you first need to build the EZ-Tree library before running the app.

```bash
npm install
npm run app
```

# Running App with Docker

```bash
docker compose build
docker compose up -d
```

# Tree Parameters

The `TreeOptions` class defines an options object that controls various parameters of a procedurally generated tree. Each property of this object allows for customization of the tree's appearance, including bark, branches, and leaves. Below is a detailed explanation of each property of the `TreeOptions` object.

## Sea Life

The same generator grows branching sea life. Six presets are included, listed in `SeaPresets`:

| Preset | Built from |
| --- | --- |
| `Staghorn Coral` | blunt tips (`branch.tip`), no leaves |
| `Finger Coral` | blunt tips, short thick branches |
| `Sea Fan` | planar growth (`branch.planar`) |
| `Sea Whip` | one level of long, blunt rods |
| `Giant Kelp` | long stipes with blade leaves (`leaves.width`, `segments`, `curl`) |
| `Seagrass` | a tuft of strap blades |

```js
import { Tree, SeaPresets } from '@dgreenheck/ez-tree';

const coral = new Tree();
coral.loadPreset('Staghorn Coral');
```

The massive forms of a reef (brain and boulder corals, plates, sponges) are not branching shapes and are out of scope.

## Regions

Every preset belongs to a region of the world and is a tree, a shrub or ground cover:

| Region | Presets |
| --- | --- |
| `Temperate` | Ash, Aspen, Oak, Pine, Bush 1 to 3, Fern, Grass Tuft |
| `Boreal` | Pine, Aspen, Spruce, Birch, Dwarf Willow |
| `Mediterranean` | Cypress, Olive, Maquis Shrub |
| `Arid` | Saguaro, Joshua Tree, Ocotillo, Sagebrush, Dead Snag |
| `Savanna` | Umbrella Acacia, Baobab, Thorn Bush, Savanna Grass |
| `Tropical` | Sea Grape, Tropical Almond, Frangipani, Banyan Fig, Flame Tree, Casuarina, Mangrove, Coconut Palm, Beach Naupaka, Hibiscus, Scrub Tangle, Croton, Ti Plant |
| `Reef` | the sea presets below |

```js
import { Tree, Regions, PlantKind, regionPresets, presetInfo, applyRegionSeason } from '@dgreenheck/ez-tree';

regionPresets('Savanna');                  // every savanna preset
regionPresets('Boreal', PlantKind.Shrub);  // ['Dwarf Willow']
presetInfo('Spruce');                      // { regions: ['Boreal'], kind: 'tree', response: 'evergreen' }

// a boreal birch in late autumn, with the snow that region has by then
const tree = new Tree();
tree.options.copy(structuredClone(TreePreset['Birch']));
applyRegionSeason(tree, 'Birch', 'Boreal', 0.85);
tree.generate();
```

## Seasons

`options.season` turns the year on a tree without changing its shape (no random numbers are drawn, so the same seed is the same tree in every season).

- **`enabled`**: Whether the time of year changes the foliage.
- **`time`**: The time of year, `0` to `1`: `0` midwinter, `0.25` spring, `0.5` midsummer, `0.75` autumn.
- **`response`**: `'auto'` (deciduous growth sheds its leaves, evergreen growth keeps them), `'deciduous'`, `'evergreen'` or `'none'`. `presetInfo(name).response` gives the right one for a preset.
- **`autumnTints`**: The colours leaves turn in autumn. Each leaf takes one, and turns at its own time.
- **`springTint`**: The colour of fresh leaves.
- **`blossom`**, **`blossomTint`**: The share of the leaves that open as blossom in spring, and its colour.
- **`snow`**: Snow cover, `0` to `1`: surfaces that face up turn white. `tree.setSnow(amount)` changes it without regenerating. `regionSnow(region, time)` gives a region's snow for a time of year.

A deciduous tree buds in spring (with blossom, if it has any), is in full leaf through summer, turns and sheds in autumn, and stands bare in winter. An evergreen keeps its leaves and dulls a little in winter.

`options.health` (`1` to `0`) is how alive the tree is: a dying tree loses leaves (the rest brown), sheds twigs, and its bark bleaches. `0` is a dead tree (see the `Dead Snag` preset).

## General Properties

- **`seed`**: Sets the initial value for random generation, ensuring consistent tree generation when using the same seed.
- **`type`**: Defines the type of the tree, which can be set to one of the options from the `TreeType` enumeration (e.g., `TreeType.Deciduous`).

## Bark Parameters

The `bark` object controls the appearance and properties of the tree trunk.

- **`type`**: Specifies the type of bark texture to use, selected from the `BarkType` enumeration (e.g., `BarkType.Oak`).
- **`tint`**: Determines the color tint applied to the bark, defined as a hexadecimal color value (e.g., `0xffffff` for white).
- **`flatShading`**: Boolean property indicating whether to use flat shading (`true`) or smooth shading (`false`) for the bark.
- **`textured`**: Boolean value that indicates if a texture is applied to the bark (`true` or `false`).
- **`textureScale`**: Controls the scale of the bark texture in both the `x` and `y` axes. It is an object with properties `x` and `y` to define the scaling factors.

## Branch Parameters

The `branch` object defines parameters for the trunk and branch levels of the tree.

- **`levels`**: Number of recursive branch levels. Setting this to `0` creates only the trunk, while higher values add more branches.
- **`angle`**: Defines the angle, in degrees, at which child branches grow relative to their parent branch. This is specified separately for each level.
- **`children`**: Specifies the number of child branches at each level, with the index (`0`, `1`, `2`, etc.) representing the level.
- **`force`**: Represents an external directional force encouraging tree growth, defined by `direction` (a vector object `{ x, y, z }`) and `strength` (a numeric value).
- **`gnarliness`**: Defines how twisted or curled each branch level should be, specified for each level.
- **`length`**: Length of the branches at each level. This is an object with keys representing each level.
- **`radius`**: Radius (or thickness) of the branches at each level.
- **`sections`**: Number of segments along the length of each branch level, controlling the resolution of the branch mesh.
- **`segments`**: Number of radial segments that make up each branch, with a higher value resulting in a smoother cylinder.
- **`start`**: Specifies where along the parent branch (as a fraction from `0` to `1`) the child branches should start forming.
- **`taper`**: Controls the tapering of the branches at each level. A value between `0` and `1` defines the reduction in radius from base to tip.
- **`whorls`**: Groups the child branches of each level into this many tiers (whorls) along the parent branch: the branches of a tier start at the same height and are spread evenly around the parent. `0` (the default) spreads the children evenly along the parent instead.
- **`planar`**: `0` to `1`. At `1` every branch grows in the XY plane, with its children alternating to either side: a flat fan (sea fans). `0` (the default) grows in the round.
- **`tip`**: `0` to `1`, deciduous growth. The share of its tapered radius a branch tip keeps, closed with a rounded cap (corals). `0` (the default) gives pointed tips.
- **`twist`**: Defines the amount of twisting applied to each branch level.

## Leaf Parameters

The `leaves` object defines properties that control the appearance and placement of leaves.

- **`type`**: Specifies the type of leaf texture, selected from the `LeafType` enumeration (e.g., `LeafType.Oak`).
- **`billboard`**: Defines how leaves are rendered. The `Billboard` enumeration can be set to `Single` or `Double` to indicate single or perpendicular double-sided leaves.
- **`angle`**: Defines the angle of the leaves relative to the parent branch, in degrees.
- **`count`**: Number of leaves to generate.
- **`start`**: Specifies where along the length of the branch (as a value between `0` and `1`) leaves should start growing.
- **`size`** of `0` grows no leaves.
- **`width`**: Width of a leaf as a fraction of its length (`1` = a square quad).
- **`segments`**: Number of quads along a leaf. Above `1` the leaf is a blade: a ribbon that can bend (kelp, seagrass).
- **`curl`**: Total bend of a blade over its length, in degrees.
- **`size`**: Size of the leaves, represented as a numeric value.
- **`sizeVariance`**: Specifies how much variance in size each leaf instance should have, making the leaves look more natural.
- **`tint`**: Tint color applied to the leaves, defined as a hexadecimal color value (e.g., `0xffffff` for white).
- **`alphaTest`**: Sets the alpha threshold for leaf transparency, controlling the transparency of the leaf textures.

