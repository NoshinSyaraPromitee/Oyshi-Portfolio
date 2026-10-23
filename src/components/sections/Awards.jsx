import Reveal from '../ui/Reveal';
import SectionTitle from '../ui/SectionTitle';
import MediaTile from '../ui/MediaTile';
import Lightbox from '../ui/Lightbox';
import useLightbox from '../../hooks/useLightbox';
import { useContent } from '../../content/ContentContext';

export default function Awards() {
  const competitions = (useContent('competitions') || []).filter((c) => c.photos && c.photos.length);
  const allPhotos = competitions.flatMap((c) => c.photos);
  const lightbox = useLightbox(allPhotos);
  if (!competitions.length) return null;

  return (
    <section className="section awards" id="competition">
      <div className="container">
        <SectionTitle title="Competition" />
        {competitions.map((comp, ci) => (
          <div key={`${comp.name}-${ci}`} className="awards__group">
            <Reveal as="h3" className="awards__name gold-text">{comp.name}</Reveal>
            <div className="awards__grid">
              {comp.photos.map((item, i) => (
                <Reveal key={`${item.src}-${i}`} delay={i * 120} className="awards__cell">
                  <MediaTile item={item} onOpen={() => lightbox.open(allPhotos.indexOf(item))} />
                </Reveal>
              ))}
            </div>
          </div>
        ))}
      </div>
      <Lightbox {...lightbox} />
    </section>
  );
}
