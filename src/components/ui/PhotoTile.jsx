import { fallback } from '../../utils/fallback';

export default function PhotoTile({ photo, index, onOpen }) {
  return (
    <button
      className="photo-tile"
      onClick={onOpen}
      style={{ animationDelay: `${(index % 6) * 70}ms` }}
      aria-label={`Open ${photo.title}`}
    >
      <img src={photo.src} alt={photo.title} loading="lazy" onError={fallback()} />
    </button>
  );
}