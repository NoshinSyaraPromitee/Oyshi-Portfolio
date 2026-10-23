import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import SectionTitle from '../ui/SectionTitle';
import Tabs from '../ui/Tabs';
import WorkCard from '../ui/WorkCard';
import ArrowButton from '../ui/ArrowButton';
import { useContent } from '../../content/ContentContext';
import { buildWorks, categories } from '../../data/works';

export default function Filmography() {
  const reel = useContent('reel') || [];
  const { extra = {} } = useContent('works') || {};
  const { works, activeCategories } = useMemo(() => buildWorks(reel, categories, extra), [reel, extra]);
  const [active, setActive] = useState(null);
  const [edges, setEdges] = useState({ start: true, end: true });
  const track = useRef(null);

  const current = activeCategories.find((c) => c.id === active) || activeCategories[0];

  const measure = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setEdges({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8 });
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    el.scrollLeft = 0;
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [current && current.id, measure]);

  if (!current) return null;

  const slide = (dir) => {
    const el = track.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: 'smooth' });
  };

  const showArrows = !(edges.start && edges.end);

  return (
    <section className="section filmography" id="work">
      <div className="container">
        <div className="filmography__head">
          <SectionTitle title="Filmography" />
          <Tabs items={activeCategories} active={current.id} onChange={setActive} />
        </div>
        <div key={current.id} ref={track} className={`work-track work-track--${current.ratio}`} onScroll={measure}>
          {works[current.id].map((work, i) => (
            <WorkCard key={`${work.link || work.title}-${i}`} work={work} ratio={current.ratio} index={i} />
          ))}
        </div>
        {showArrows && (
          <div className="work-arrows">
            <ArrowButton dir="left" label="Previous" onClick={() => slide(-1)} disabled={edges.start} />
            <ArrowButton dir="right" label="Next" onClick={() => slide(1)} disabled={edges.end} />
          </div>
        )}
      </div>
    </section>
  );
}
