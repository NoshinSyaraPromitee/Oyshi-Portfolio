import Reveal from '../ui/Reveal';
import SectionTitle from '../ui/SectionTitle';
import MediaTile from '../ui/MediaTile';
import Lightbox from '../ui/Lightbox';
import useLightbox from '../../hooks/useLightbox';
import { useContent } from '../../content/ContentContext';

export default function Theatre() {
  const items = useContent('theatre') || [];
  const lightbox = useLightbox(items);
  if (!items.length) return null;

  return (
    <section className="section theatre" id="theatre">
      <div className="container">
        <SectionTitle title="Theatre" />
        <div className="trio__grid">
          {items.map((item, i) => (
            <Reveal key={`${item.src}-${i}`} delay={i * 120} className="trio__cell">
              <MediaTile item={item} onOpen={() => lightbox.open(i)} />
            </Reveal>
          ))}
        </div>
      </div>
      <Lightbox {...lightbox} />
    </section>
  );
}
