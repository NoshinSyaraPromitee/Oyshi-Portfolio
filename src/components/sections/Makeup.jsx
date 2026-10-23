import Reveal from '../ui/Reveal';
import SectionTitle from '../ui/SectionTitle';
import MediaTile from '../ui/MediaTile';
import Lightbox from '../ui/Lightbox';
import useLightbox from '../../hooks/useLightbox';
import { useContent } from '../../content/ContentContext';

export default function Makeup() {
  const items = useContent('makeup') || [];
  const lightbox = useLightbox(items);
  if (!items.length) return null;

  return (
    <section className="section makeup" id="makeup">
      <div className="container">
        <SectionTitle title="Makeup" />
        <div className="makeup__grid">
          {items.map((item, i) => (
            <Reveal key={`${item.src}-${i}`} delay={(i % 4) * 120} className="makeup__cell">
              <MediaTile item={item} onOpen={() => lightbox.open(i)} />
            </Reveal>
          ))}
        </div>
      </div>
      <Lightbox {...lightbox} />
    </section>
  );
}
