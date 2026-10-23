import { fallback, FIGURE } from '../../utils/fallback';

export default function Cutout({ src, alt = '', className = '', glow = true, fade = false }) {
  return (
    <figure className={`cutout ${fade ? 'cutout--fade' : ''} ${className}`}>
      {glow && <span className="cutout__glow" aria-hidden="true" />}
      <img className="cutout__img" src={src} alt={alt} draggable="false" onError={fallback(FIGURE)} />
    </figure>
  );
}