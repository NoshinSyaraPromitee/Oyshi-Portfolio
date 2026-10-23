import { useEffect } from 'react';
import ArrowButton from './ArrowButton';
import { fallback } from '../../utils/fallback';

export default function Lightbox({ item, close, next, prev }) {
  useEffect(() => {
    if (!item) return;
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [item, close, next, prev]);

  if (!item) return null;
  const isVideo = item.type === 'video';

  return (
    <div className="lightbox" role="dialog" aria-modal="true" onClick={close}>
      <div className="lightbox__stage" onClick={(e) => e.stopPropagation()}>
        {isVideo ? (
          <video key={item.src} src={item.src} poster={item.poster} controls autoPlay playsInline />
        ) : (
          <img key={item.src} src={item.src} alt={item.title} onError={fallback()} />
        )}
        <div className="lightbox__bar">
          <p>
            {item.title}
            {item.label && <small>{item.label}</small>}
          </p>
          <div className="lightbox__nav">
            <ArrowButton dir="left" onClick={prev} label="Previous" />
            <ArrowButton dir="right" onClick={next} label="Next" />
          </div>
        </div>
      </div>
      <button className="lightbox__close eyebrow" onClick={close} aria-label="Close">
        Close
      </button>
    </div>
  );
}