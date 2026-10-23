import { useMemo, useState } from 'react';
import SectionTitle from '../ui/SectionTitle';
import Tabs from '../ui/Tabs';
import WorkCard from '../ui/WorkCard';
import { useContent } from '../../content/ContentContext';
import { buildWorks } from '../../data/works';

export default function Filmography() {
  const reel = useContent('reel') || [];
  const { categories = [], extra = {} } = useContent('works') || {};
  const { works, activeCategories } = useMemo(() => buildWorks(reel, categories, extra), [reel, categories, extra]);
  const [active, setActive] = useState(null);

  if (!activeCategories.length) return null;
  const current = activeCategories.find((c) => c.id === active) || activeCategories[0];

  return (
    <section className="section filmography" id="work">
      <div className="container">
        <div className="filmography__head">
          <SectionTitle title="Filmography" />
          <Tabs items={activeCategories} active={current.id} onChange={setActive} />
        </div>
        <div key={current.id} className={`work-grid work-grid--${current.ratio}`}>
          {works[current.id].map((work, i) => (
            <WorkCard key={`${work.link || work.title}-${i}`} work={work} ratio={current.ratio} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
