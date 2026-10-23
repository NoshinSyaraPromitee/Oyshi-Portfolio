import { image } from '../utils/image';

const CLD = 'https://res.cloudinary.com/qovsfjpy/image/upload';
const cld = (path, width = 1400) => `${CLD}/f_auto,q_auto,w_${width}/${path}`;

const shootPhoto = (album, n) => image(`shoots/${album}-${n}.jpg`);

export const modelling = [
  { type: 'image', src: cld('v1791988073/lookbook-1.jpg'), title: 'Lookbook', label: 'Fashion Retail', span: 'tall' },
  { type: 'image', src: cld('v1791988074/studio-1.jpg'), title: 'Emerald', label: 'Studio Portfolio', span: 'tall' },
  { type: 'image', src: cld('v1791988073/lookbook-2.jpg'), title: 'Soft Ivory', label: 'Fashion Retail', span: 'tall' },
  { type: 'image', src: cld('v1791988074/lookbook-3.jpg'), title: 'Floral Edit', label: 'Fashion Retail', span: 'tall' },
  { type: 'image', src: cld('v1791988075/lookbook-4.jpg'), title: 'Street Ready', label: 'Fashion Retail', span: 'tall' },
  { type: 'image', src: cld('v1791988074/studio-2.jpg'), title: 'Profile', label: 'Studio Portfolio', span: 'tall' },
  { type: 'image', src: cld('v1791988074/lookbook-5.jpg'), title: 'Rose Print', label: 'Fashion Retail', span: 'tall' },
  { type: 'image', src: cld('v1791988074/studio-3.jpg'), title: 'Poise', label: 'Studio Portfolio', span: 'tall' },
  { type: 'image', src: cld('v1791988074/lookbook-6.jpg'), title: 'Orchid', label: 'Fashion Retail', span: 'tall' },
  { type: 'image', src: cld('v1791988075/studio-4.jpg'), title: 'Star Hunt', label: 'Grooming Round', span: 'tall' },
];

/* Replace these with your headshot Cloudinary links */
export const headshots = [
  { type: 'image', src: cld('headshot-1.jpg', 1000), title: 'Natural', label: 'Headshot' },
  { type: 'image', src: cld('headshot-2.jpg', 1000), title: 'Commercial', label: 'Headshot' },
  { type: 'image', src: cld('headshot-3.jpg', 1000), title: 'Theatrical', label: 'Headshot' },
  { type: 'image', src: cld('headshot-4.jpg', 1000), title: 'Profile', label: 'Headshot' },
];

const album = (id, label, count) => ({
  id,
  label,
  photos: Array.from({ length: count }, (_, i) => ({
    src: shootPhoto(id, i + 1),
    title: label,
  })),
});

export const albums = [
  album('noir', 'Studio Noir', 11),
  album('starhunt', 'Star Hunt Glam', 7),
  album('saree', 'Saree Stories', 5),
  album('white', 'In White', 7),
  album('denim', 'Stage and Denim', 5),
  album('candid', 'Candid Light', 6),
];
