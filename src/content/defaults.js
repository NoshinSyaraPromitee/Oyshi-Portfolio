import { profile } from '../data/profile';
import { reel } from '../data/reel';
import { categories, extra } from '../data/works';
import { modelling, headshots, albums } from '../data/gallery';
import { makeupLooks } from '../data/makeup';
import { costars, theatre } from '../data/stage';
import { competitions } from '../data/competitions';
import { press } from '../data/press';
import { marquee } from '../data/marquee';

/*
  Everything the editor can change.
  The site uses these until a saved version exists in Supabase.
*/
export const defaults = {
  profile,
  marquee,
  reel,
  works: { categories, extra },
  headshots,
  modelling,
  albums,
  makeup: makeupLooks,
  theatre,
  costars,
  competitions,
  press,
};

export const sections = [
  { key: 'profile', label: 'Profile, About and Contact' },
  { key: 'marquee', label: 'Film strip' },
  { key: 'reel', label: 'Showreel videos' },
  { key: 'works', label: 'Work: movies, posters, tabs' },
  { key: 'headshots', label: 'Headshots' },
  { key: 'modelling', label: 'Modelling' },
  { key: 'albums', label: 'Photoshoots' },
  { key: 'makeup', label: 'Makeup' },
  { key: 'theatre', label: 'Theatre' },
  { key: 'costars', label: 'Co-stars' },
  { key: 'competitions', label: 'Competition' },
  { key: 'press', label: 'Press' },
];
