import { useCallback, useState } from 'react';

export default function useLightbox(items) {
  const [index, setIndex] = useState(null);
  const total = items.length;

  const open = useCallback((i) => setIndex(i), []);
  const close = useCallback(() => setIndex(null), []);
  const next = useCallback(() => setIndex((i) => (i + 1) % total), [total]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + total) % total), [total]);

  return {
    item: index === null ? null : items[index],
    index,
    total,
    open,
    close,
    next,
    prev,
  };
}