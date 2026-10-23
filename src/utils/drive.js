const base = 'https://drive.google.com';

export const drive = {
  view: (id) => `${base}/file/d/${id}/view`,
  preview: (id) => `${base}/file/d/${id}/preview`,
  thumb: (id, width = 1280) => `${base}/thumbnail?id=${id}&sz=w${width}`,
};