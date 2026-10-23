const CLD = 'https://res.cloudinary.com/qovsfjpy/image/upload';
const cld = (path, width = 1200) => `${CLD}/f_auto,q_auto,w_${width}/${path}`;

export const makeupLooks = [
  { type: 'image', src: cld('v1791989306/avatar.jpg'), title: 'Avatar', label: 'Fantasy Character' },
  { type: 'image', src: cld('v1791989305/joker.jpg'), title: 'Joker', label: 'Villain Character' },
  { type: 'image', src: cld('v1791989305/avatar_2.jpg'), title: 'Avatar II', label: 'Fantasy Character' },
  { type: 'image', src: cld('v1791989303/joker_2.jpg'), title: 'Joker II', label: 'Villain Character' },
  { type: 'image', src: cld('v1791989303/broken.jpg'), title: 'Broken', label: 'SFX Makeup' },
  { type: 'image', src: cld('v1791989301/mime.jpg'), title: 'Mime', label: 'Theatre Makeup' },
  { type: 'image', src: cld('v1791989301/mime_2.jpg'), title: 'Mime II', label: 'Theatre Makeup' },
];
