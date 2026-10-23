import { drive } from '../utils/drive';

const CLD = 'https://res.cloudinary.com/qovsfjpy/image/upload';
const cld = (path, width = 900) => `${CLD}/f_auto,q_auto,w_${width}/${path}`;

export const categories = [
  { id: 'tv', label: 'Web and TV Series', ratio: 'landscape' },
  { id: 'reality', label: 'Reality Shows', ratio: 'landscape' },
  { id: 'talk', label: 'Talk Shows', ratio: 'landscape' },
  { id: 'ovc', label: 'OVC', ratio: 'landscape' },
  { id: 'ads', label: 'TVC and Ads', ratio: 'landscape' },
  { id: 'movies', label: 'Movies', ratio: 'portrait' },
  { id: 'youtube', label: 'YouTube Series', ratio: 'landscape' },
  { id: 'posters', label: 'Posters', ratio: 'portrait' },
];

export const extra = {
  talk: [
    {
      title: 'KriyaCup Podcast',
      year: 'Podcast',
      role: 'Guest with Hussain Mohammad',
      meta: 'KriyaKarak presents KriyaCup Podcast',
      platform: 'YouTube',
      image: 'https://img.youtube.com/vi/WX0OuEPtkOU/hqdefault.jpg',
      link: 'https://youtu.be/WX0OuEPtkOU',
    },
  ],
  movies: [
    {
      title: 'APARNA - A Bangladeshi Girl',
      year: 'Feature Film',
      role: 'Lead Role - Aparna',
      meta: 'A film by Jakir Hassan | Producer Syed Twaha Bin Hasan',
      platform: 'Official Teaser',
      image: cld('v1792751667/Aparna.jpg'),
      link: 'https://www.facebook.com/share/v/1FjeDAdjAR/',
    },
  ],
  youtube: [],
  posters: [
    { title: 'APARNA', year: 'Poster', role: '', meta: '', platform: 'Poster', image: cld('v1792751667/Aparna.jpg'), link: '' },
    { title: 'APARNA', year: 'Poster', role: '', meta: '', platform: 'Poster', image: cld('v1792751718/aparna_2.jpg'), link: '' },
    { title: 'School Life', year: 'Poster', role: '', meta: '', platform: 'Poster', image: cld('v1791989248/schoollife.jpg'), link: '' },
    { title: 'Official Poster', year: 'Poster', role: '', meta: '', platform: 'Poster', image: cld('v1791989247/poster1.jpg'), link: '' },
  ],
};

const toWork = (item) => ({
  title: item.title,
  year: item.year || item.type,
  role: item.role,
  meta: item.meta,
  platform: item.platform,
  image: drive.thumb(item.id, 960),
  link: drive.view(item.id),
});

export const buildWorks = (reel, cats = categories, more = extra) => {
  const works = Object.fromEntries(
    cats.map((c) => [
      c.id,
      [...reel.filter((item) => item.category === c.id).map(toWork), ...((more && more[c.id]) || [])],
    ])
  );
  const active = cats.filter((c) => works[c.id].length > 0);
  return { works, activeCategories: active };
};
