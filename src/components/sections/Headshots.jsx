import Reveal from '../ui/Reveal';
import SectionTitle from '../ui/SectionTitle';
import MediaTile from '../ui/MediaTile';
import Lightbox from '../ui/Lightbox';
import useLightbox from '../../hooks/useLightbox';
import { useContent } from '../../content/ContentContext';

export default function Headshots() {
  const items = useContent('headshots') || [];
  const lightbox = useLightbox(items);
  if (!items.length) return null;

  return (
    <section className="section headshots" id="headshots">
      <div className="container">
        <SectionTitle title="Headshots" />
        <div className="headshots__grid">
          {items.map((item, i) => (
            <Reveal key={`${item.src}-${i}`} delay={i * 120} className="headshots__cell">
              <MediaTile item={item} onOpen={() => lightbox.open(i)} />
            </Reveal>
          ))}
        </div>
      </div>
      <Lightbox {...lightbox} />
    </section>
  );
}
