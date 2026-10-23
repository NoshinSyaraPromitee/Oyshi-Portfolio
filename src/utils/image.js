import { media } from '../data/media';

const UPLOAD = '/image/upload/';

const optimise = (url, width) => url.replace(UPLOAD, `${UPLOAD}f_auto,q_auto,w_${width}/`);

export const image = (path, width = 1600) => {
  const remote = media[path];
  return remote ? optimise(remote, width) : `/images/${path}`;
};