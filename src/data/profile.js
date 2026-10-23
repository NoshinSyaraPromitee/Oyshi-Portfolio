import { image } from '../utils/image';

export const profile = {
  firstName: 'Sadiya',
  lastName: 'Oyshi',
  fullName: 'Sadiya Tabassum Oyshi',
  since: 'Born for the spotlight',
  tagline: 'Actress, model and theatre artist bringing stage-trained depth to every frame.',
  bio: [
    'Sadiya Tabassum Oyshi is an actress and model whose work spans films, television dramas, YouTube series and OVCs. A student of Theatre at Jagannath University, she brings the discipline and presence of the stage to every role she takes on.',
    'Audiences also know her from television reality shows, while her face fronts advertisements, posters, fashion campaigns and editorial photoshoots that celebrate elegance, culture and modern femininity.',
  ],
  education: {
    label: 'Education',
    subject: 'Theatre',
    institute: 'Jagannath University, Dhaka',
    url: 'https://www.facebook.com/Jagannath.University.Dhaka',
  },
  stats: [
    { value: '01', label: 'Hoichoi Original' },
    { value: '01', label: 'Reality Show' },
    { value: '02', label: 'OVCs' },
    { value: '04', label: 'TVCs and Ads' },
  ],
  cutouts: {
    hero: image('cutouts/hero.png', 1400),
    about: image('cutouts/about.png', 1200),
    contact: image('cutouts/contact.png', 1200),
  },
  contact: {
    email: 'sadiyaoyshi1408@gmail.com',
    phone: '015170005006',
    address: 'Koltabazar, Wasa Pump, Puran Dhaka',
  },
  socials: [
    { label: 'Facebook', url: 'https://facebook.com' },
    { label: 'Instagram', url: 'https://instagram.com' },
    { label: 'YouTube', url: 'https://youtube.com' },
  ],
};

export const navLinks = [
  { id: 'reel', primary: true, label: 'Showreel' },
  { id: 'about', label: 'About' },
  { id: 'headshots', primary: true, label: 'Headshots' },
  { id: 'work', primary: true, label: 'Work' },
  { id: 'modelling', label: 'Modelling' },
  { id: 'shoots', label: 'Photoshoots' },
  { id: 'makeup', label: 'Makeup' },
  { id: 'theatre', label: 'Theatre' },
  { id: 'costars', label: 'Co-stars' },
  { id: 'competition', label: 'Competition' },
  { id: 'press', label: 'Press' },
  { id: 'contact', primary: true, label: 'Contact' },
];