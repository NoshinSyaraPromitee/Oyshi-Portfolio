export const PHOTO = '/placeholder/photo.svg';
export const FIGURE = '/placeholder/figure.svg';

export const fallback = (src = PHOTO) => (e) => {
  const img = e.currentTarget;
  if (img.dataset.fallback) return;
  img.dataset.fallback = '1';
  img.src = src;
};