// Regions of the world: which presets grow where, what kind of plant each is,
// what the seasons do to it, and how much snow a region's winter brings.

import { TreePreset, SeaPresets } from './presets/index';
import { RegionalInfo } from './presets/regional';
import { winterness } from './season';

export const PlantKind = {
  Tree: 'tree',
  Shrub: 'shrub',
  // ground cover: grasses, ferns, small foliage plants
  Ground: 'ground',
  Sea: 'sea',
  Other: 'other',
};

// The presets ez-tree has always had: broadleaf trees and bushes of the
// temperate zone, and pines, which also grow in the boreal forest
function stockInfo(name) {
  if (name === 'Trellis') return { regions: [], kind: PlantKind.Other, response: 'deciduous' };
  if (SeaPresets.includes(name)) return { regions: ['Reef'], kind: PlantKind.Sea, response: 'none' };
  if (name.startsWith('Pine')) return { regions: ['Temperate', 'Boreal'], kind: PlantKind.Tree, response: 'evergreen' };
  if (name.startsWith('Aspen')) return { regions: ['Temperate', 'Boreal'], kind: PlantKind.Tree, response: 'deciduous' };
  if (name.startsWith('Bush')) return { regions: ['Temperate'], kind: PlantKind.Shrub, response: 'deciduous' };
  return { regions: ['Temperate'], kind: PlantKind.Tree, response: 'deciduous' };
}

/**
 * What is known about a preset
 * @param {string} name A key of TreePreset
 * @returns {{ regions: string[], kind: string, response: string } | null}
 * `response` is what the seasons do to the plant (see SeasonResponse)
 */
export function presetInfo(name) {
  if (!TreePreset[name]) return null;
  const info = RegionalInfo[name];
  if (info) return { regions: [info.region], kind: info.kind, response: info.response };
  return stockInfo(name);
}

const presetsOf = (region) =>
  Object.keys(TreePreset).filter((name) => presetInfo(name).regions.includes(region));

/**
 * The regions. `snow` is how deep a region's midwinter snow lies on its
 * plants (0 none .. 1 deep); `seasons` is whether its year has a winter that
 * bares the deciduous trees.
 */
export const Regions = {
  Temperate: {
    description: 'Broadleaf woodland with four seasons',
    snow: 0.55,
    seasons: true,
    presets: presetsOf('Temperate'),
  },
  Boreal: {
    description: 'Northern conifer forest and its scrub: long, snowy winters',
    snow: 1,
    seasons: true,
    presets: presetsOf('Boreal'),
  },
  Mediterranean: {
    description: 'Evergreen trees and scrub of dry summers and mild winters',
    snow: 0.1,
    seasons: true,
    presets: presetsOf('Mediterranean'),
  },
  Arid: {
    description: 'Desert succulents, scrub and dead wood',
    snow: 0.05,
    seasons: false,
    presets: presetsOf('Arid'),
  },
  Savanna: {
    description: 'Scattered flat-topped trees over grass',
    snow: 0,
    seasons: false,
    presets: presetsOf('Savanna'),
  },
  Tropical: {
    description: 'Shore, lowland and island plants of the wet tropics',
    snow: 0,
    seasons: false,
    presets: presetsOf('Tropical'),
  },
  Reef: {
    description: 'Corals, sea fans, kelp and seagrass',
    snow: 0,
    seasons: false,
    presets: presetsOf('Reef'),
  },
};

/**
 * The presets of a region, optionally of one kind
 * @param {string} region A key of Regions
 * @param {string} [kind] A PlantKind
 * @returns {string[]}
 */
export function regionPresets(region, kind) {
  const names = Regions[region]?.presets ?? [];
  return kind ? names.filter((name) => presetInfo(name).kind === kind) : names;
}

/**
 * The snow lying on a region's plants at a time of year
 * @param {string} region A key of Regions
 * @param {number} time Fraction of the year (0 = midwinter)
 * @returns {number} 0 none .. 1 deep
 */
export function regionSnow(region, time) {
  return (Regions[region]?.snow ?? 0) * winterness(time);
}

/**
 * Sets a tree's season options for a preset in a region at a time of year:
 * the preset's response to the seasons, the time, and the region's snow.
 * Call tree.generate() afterwards.
 * @param {import('./tree').Tree} tree
 * @param {string} presetName
 * @param {string} region
 * @param {number} time Fraction of the year (0 = midwinter)
 */
export function applyRegionSeason(tree, presetName, region, time) {
  const info = presetInfo(presetName);
  const season = tree.options.season;
  season.enabled = !!Regions[region]?.seasons;
  season.time = time;
  season.response = info?.response ?? 'auto';
  season.snow = regionSnow(region, time);
}
