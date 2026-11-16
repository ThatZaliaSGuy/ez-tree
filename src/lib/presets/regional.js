// Generated list of the regional presets (see regions.js for what the regions are)
import seaGrape from './sea_grape.json';
import tropicalAlmond from './tropical_almond.json';
import frangipani from './frangipani.json';
import banyanFig from './banyan_fig.json';
import flameTree from './flame_tree.json';
import casuarina from './casuarina.json';
import mangrove from './mangrove.json';
import beachNaupaka from './beach_naupaka.json';
import hibiscus from './hibiscus.json';
import scrubTangle from './scrub_tangle.json';
import croton from './croton.json';
import tiPlant from './ti_plant.json';
import coconutPalm from './coconut_palm.json';
import spruce from './spruce.json';
import birch from './birch.json';
import dwarfWillow from './dwarf_willow.json';
import saguaro from './saguaro.json';
import joshuaTree from './joshua_tree.json';
import ocotillo from './ocotillo.json';
import sagebrush from './sagebrush.json';
import deadSnag from './dead_snag.json';
import umbrellaAcacia from './umbrella_acacia.json';
import baobab from './baobab.json';
import thornBush from './thorn_bush.json';
import savannaGrass from './savanna_grass.json';
import cypress from './cypress.json';
import olive from './olive.json';
import maquisShrub from './maquis_shrub.json';
import fern from './fern.json';
import grassTuft from './grass_tuft.json';

export const RegionalPresets = {
  'Sea Grape': seaGrape,
  'Tropical Almond': tropicalAlmond,
  'Frangipani': frangipani,
  'Banyan Fig': banyanFig,
  'Flame Tree': flameTree,
  'Casuarina': casuarina,
  'Mangrove': mangrove,
  'Beach Naupaka': beachNaupaka,
  'Hibiscus': hibiscus,
  'Scrub Tangle': scrubTangle,
  'Croton': croton,
  'Ti Plant': tiPlant,
  'Coconut Palm': coconutPalm,
  'Spruce': spruce,
  'Birch': birch,
  'Dwarf Willow': dwarfWillow,
  'Saguaro': saguaro,
  'Joshua Tree': joshuaTree,
  'Ocotillo': ocotillo,
  'Sagebrush': sagebrush,
  'Dead Snag': deadSnag,
  'Umbrella Acacia': umbrellaAcacia,
  'Baobab': baobab,
  'Thorn Bush': thornBush,
  'Savanna Grass': savannaGrass,
  'Cypress': cypress,
  'Olive': olive,
  'Maquis Shrub': maquisShrub,
  'Fern': fern,
  'Grass Tuft': grassTuft,
};

// region: where it grows. kind: tree, shrub or ground cover. response: what the seasons do to it.
export const RegionalInfo = {
  'Sea Grape': { region: 'Tropical', kind: 'tree', response: 'none' },
  'Tropical Almond': { region: 'Tropical', kind: 'tree', response: 'none' },
  'Frangipani': { region: 'Tropical', kind: 'tree', response: 'none' },
  'Banyan Fig': { region: 'Tropical', kind: 'tree', response: 'none' },
  'Flame Tree': { region: 'Tropical', kind: 'tree', response: 'none' },
  'Casuarina': { region: 'Tropical', kind: 'tree', response: 'none' },
  'Mangrove': { region: 'Tropical', kind: 'tree', response: 'none' },
  'Beach Naupaka': { region: 'Tropical', kind: 'shrub', response: 'none' },
  'Hibiscus': { region: 'Tropical', kind: 'shrub', response: 'none' },
  'Scrub Tangle': { region: 'Tropical', kind: 'shrub', response: 'none' },
  'Croton': { region: 'Tropical', kind: 'ground', response: 'none' },
  'Ti Plant': { region: 'Tropical', kind: 'ground', response: 'none' },
  'Coconut Palm': { region: 'Tropical', kind: 'tree', response: 'none' },
  'Spruce': { region: 'Boreal', kind: 'tree', response: 'evergreen' },
  'Birch': { region: 'Boreal', kind: 'tree', response: 'deciduous' },
  'Dwarf Willow': { region: 'Boreal', kind: 'shrub', response: 'deciduous' },
  'Saguaro': { region: 'Arid', kind: 'tree', response: 'none' },
  'Joshua Tree': { region: 'Arid', kind: 'tree', response: 'none' },
  'Ocotillo': { region: 'Arid', kind: 'shrub', response: 'none' },
  'Sagebrush': { region: 'Arid', kind: 'shrub', response: 'evergreen' },
  'Dead Snag': { region: 'Arid', kind: 'tree', response: 'none' },
  'Umbrella Acacia': { region: 'Savanna', kind: 'tree', response: 'evergreen' },
  'Baobab': { region: 'Savanna', kind: 'tree', response: 'deciduous' },
  'Thorn Bush': { region: 'Savanna', kind: 'shrub', response: 'deciduous' },
  'Savanna Grass': { region: 'Savanna', kind: 'ground', response: 'none' },
  'Cypress': { region: 'Mediterranean', kind: 'tree', response: 'evergreen' },
  'Olive': { region: 'Mediterranean', kind: 'tree', response: 'evergreen' },
  'Maquis Shrub': { region: 'Mediterranean', kind: 'shrub', response: 'evergreen' },
  'Fern': { region: 'Temperate', kind: 'ground', response: 'deciduous' },
  'Grass Tuft': { region: 'Temperate', kind: 'ground', response: 'evergreen' },
};
