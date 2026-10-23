import { useState } from 'react';
import SectionTitle from '../ui/SectionTitle';
import Tabs from '../ui/Tabs';
import PhotoTile from '../ui/PhotoTile';
import Lightbox from '../ui/Lightbox';
import useLightbox from '../../hooks/useLightbox';
import { useContent } from '../../content/ContentContext';

export default function Photoshoots() {
  const albums = (useContent('albums') || [])
    .map((a, i) => ({ ...a, id: a.id || `album-${i}` }))
    .filter((a) => a.photos && a.photos.length);
  const [active, setActive] = useState(null);
  const current = albums.find((a) => a.id === active) || albums[0];
  const lightbox = useLightbox(current ? current.photos : []);
  if (!current) return null;

  const change = (id) => {
    lightbox.close();
    setActive(id);
  };

  return (
    <section className="section shoots" id="shoots">
      <div className="container">
        <div className="shoots__head">
          <SectionTitle title="Photoshoots" />
          <Tabs items={albums} active={current.id} onChange={change} />
        </div>
        <div key={current.id} className="masonry">
          {current.photos.map((photo, i) => (
            <PhotoTile key={`${photo.src}-${i}`} photo={{ ...photo, title: photo.title || current.label }} index={i} onOpen={() => lightbox.open(i)} />
          ))}
        </div>
      </div>
      <Lightbox {...lightbox} />
    </section>
  );
}
