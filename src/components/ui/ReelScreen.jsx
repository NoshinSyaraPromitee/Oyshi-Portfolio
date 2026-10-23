import { drive } from '../../utils/drive';
import { fallback } from '../../utils/fallback';

export default function ReelScreen({ item, playing, onPlay }) {
  return (
    <div className="reel-screen">
      {playing ? (
        <iframe
          key={item.id}
          src={drive.preview(item.id)}
          title={item.title}
          allow="autoplay; fullscreen"
          allowFullScreen
        />
      ) : (
        <button className="reel-screen__poster" onClick={onPlay} aria-label={`Play ${item.title}`}>
          <img src={drive.thumb(item.id)} alt="" onError={fallback()} />
          <span className="reel-screen__play">
            <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
              <path d="M8 5.5v13l11-6.5z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}