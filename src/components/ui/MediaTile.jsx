import { useRef } from 'react';
import { fallback } from '../../utils/fallback';

export default function MediaTile({ item, onOpen }) {
  const videoRef = useRef(null);
  const isVideo = item.type === 'video';

  const play = () => videoRef.current?.play().catch(() => {});
  const stop = () => videoRef.current?.pause();

  return (
    <button
      className="media-tile"
      onClick={onOpen}
      onMouseEnter={isVideo ? play : undefined}
      onMouseLeave={isVideo ? stop : undefined}
      aria-label={`Open ${item.title}`}
    >
      {isVideo ? (
        <video ref={videoRef} src={item.src} poster={item.poster} muted loop playsInline preload="metadata" />
      ) : (
        <img src={item.src} alt={item.title} loading="lazy" onError={fallback()} />
      )}
      {isVideo && <span className="media-tile__tag">Film</span>}
      <span className="media-tile__caption">
        {item.label && <small>{item.label}</small>}
        {item.title}
      </span>
    </button>
  );
}