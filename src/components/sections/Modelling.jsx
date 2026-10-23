import Reveal from '../ui/Reveal';
import SectionTitle from '../ui/SectionTitle';
import MediaTile from '../ui/MediaTile';
import Lightbox from '../ui/Lightbox';
import useLightbox from '../../hooks/useLightbox';
import { useContent } from '../../content/ContentContext';

export default function Modelling() {
  const modelling = useContent('modelling') || [];
  const lightbox = useLightbox(modelling);
  if (!modelling.length) return null;

  return (
    <section className="section modelling" id="modelling">
      <div className="container">
        <SectionTitle title="Modelling" />
        <div className="editorial-grid">
          {modelling.map((item, i) => (
            <Reveal
              key={`${item.src}-${i}`}
              delay={(i % 3) * 120}
              className={`editorial-grid__cell editorial-grid__cell--${item.span || 'normal'}`}
            >
              <MediaTile item={item} onOpen={() => lightbox.open(i)} />
            </Reveal>
          ))}
        </div>
      </div>
      <Lightbox {...lightbox} />
    </section>
  );
}
