const CLD = 'https://res.cloudinary.com/qovsfjpy/image/upload';
const cld = (path, width = 1200) => `${CLD}/f_auto,q_auto,w_${width}/${path}`;

export const costars = [
  { type: 'image', src: cld('v1791989090/Intekhab_Dinar.jpg'), title: 'Intekhab Dinar', label: 'Co-star' },
  { type: 'image', src: cld('v1791989089/Shamol_Mawla.jpg'), title: 'Shamol Mawla', label: 'Co-star' },
  { type: 'image', src: cld('v1791989089/Deepa_Khandakar..jpg'), title: 'Deepa Khandakar', label: 'Co-star' },
];

export const theatre = [
  { type: 'image', src: cld('v1791989351/ontheareStage.jpg'), title: 'On Stage', label: 'Theatre' },
  { type: 'image', src: cld('v1791989351/dance.jpg'), title: 'Dance', label: 'Performance' },
  { type: 'image', src: cld('v1791989349/ontheare_Stage_sokuntola.jpg'), title: 'Shakuntala', label: 'Theatre' },
];
