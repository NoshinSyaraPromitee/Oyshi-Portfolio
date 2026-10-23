const CLD = 'https://res.cloudinary.com/qovsfjpy/image/upload';
const cld = (path, width = 1200) => `${CLD}/f_auto,q_auto,w_${width}/${path}`;

export const competitions = [
  {
    id: 'fot',
    name: 'Face of Tomorrow',
    photos: [
      { type: 'image', src: cld('v1791989232/faceoftomorrow.jpg'), title: 'Face of Tomorrow', label: 'Winner' },
      { type: 'image', src: cld('v1791989232/faceoftomorrow_bootcamp.jpg'), title: 'Face of Tomorrow', label: 'Bootcamp' },
      { type: 'image', src: cld('v1791989233/competition_2.jpg'), title: 'Face of Tomorrow', label: 'Bootcamp' },
    ],
  },
  {
    id: 'starhunt',
    name: 'Deepto Star Hunt',
    photos: [
      { type: 'image', src: cld('v1791989231/Star_hunt.jpg'), title: 'Star Hunt', label: 'Deepto TV' },
      { type: 'image', src: cld('v1791989231/starhunt.jpg'), title: 'Star Hunt', label: 'Deepto TV' },
    ],
  },
];
