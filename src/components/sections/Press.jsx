import Reveal from '../ui/Reveal';
import SectionTitle from '../ui/SectionTitle';
import Lightbox from '../ui/Lightbox';
import useLightbox from '../../hooks/useLightbox';
import { fallback } from '../../utils/fallback';
import { useContent } from '../../content/ContentContext';

export default function Press() {
  const press = useContent('press') || {};
  const highlights = press.highlights || [];
  const items = press.image ? [{ type: 'image', src: press.image, title: press.source }] : [];
  const lightbox = useLightbox(items);
  if (!press.quote && !press.image && !highlights.length) return null;

  return (
    <section className="section press" id="press">
      <div className="container">
        <SectionTitle title="Press" />
        <div className="press__grid">
          <Reveal className="press__feature">
            {press.image && (
              <button className="press__image" onClick={() => lightbox.open(0)} aria-label={`Open ${press.source} feature`}>
                <img src={press.image} alt={`${press.source} feature`} loading="lazy" onError={fallback()} />
                {press.source && <span className="press__source eyebrow">As featured in {press.source}</span>}
              </button>
            )}
            {press.quote && <blockquote className="press__quote">&ldquo;{press.quote}&rdquo;</blockquote>}
            {press.link && (
              <a className="btn btn--ghost" href={press.link} target="_blank" rel="noreferrer">
                <span>Read the full feature</span>
              </a>
            )}
          </Reveal>
          <div className="press__list">
            {highlights.map((h, i) => (
              <Reveal key={`${h.text}-${i}`} delay={i * 90} className="press__item">
                <strong className="gold-text">{h.value}</strong>
                <p>{h.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
      <Lightbox {...lightbox} />
    </section>
  );
}
