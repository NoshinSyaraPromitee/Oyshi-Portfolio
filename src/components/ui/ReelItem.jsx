import { drive } from '../../utils/drive';
import { fallback } from '../../utils/fallback';

export default function ReelItem({ item, active, onSelect }) {
  return (
    <button className={`reel-item ${active ? 'is-active' : ''}`} onClick={onSelect} aria-pressed={active}>
      <span className="reel-item__thumb">
        <img src={drive.thumb(item.id, 320)} alt="" loading="lazy" onError={fallback()} />
      </span>
      <span className="reel-item__text">
        <small>{[item.type, item.platform].filter(Boolean).join(' \u00b7 ')}</small>
        {item.title}
      </span>
    </button>
  );
}